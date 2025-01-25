import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../Css/Tambah.css";

const API_URL = "http://localhost:8080/api/data";

// Fungsi untuk upload gambar ke S3
const uploadToS3 = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://s3.lynk2.co/api/s3/Tambah", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Gagal mengupload gambar ke S3");
    }

    const data = await response.json();
    if (data.data && data.data.url_file) {
      console.log("URL gambar berhasil didapat:", data.data.url_file);
      return data.data.url_file;
    } else {
      throw new Error("URL gambar tidak tersedia dalam respons S3");
    }
  } catch (error) {
    console.error("Error upload ke S3:", error);
    throw error;
  }
};

function Tambah() {
  const [newProduct, setNewProduct] = useState({
    judulNovel: "",
    penulisNovel: "",
    ratingNovel: "",
    deskripsiNovel: "",
    hargaNovel: "",
  });

  const [selectedFile, setSelectedFile] = useState(null); // File gambar
  const [idAdmin, setIdAdmin] = useState(null); // ID admin dari localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    if (adminData && adminData.id) {
      setIdAdmin(adminData.id);
    } else {
      Swal.fire({
        icon: "error",
        title: "ID Admin tidak ditemukan",
        text: "Pastikan Anda login sebagai admin.",
      });
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const { judulNovel, penulisNovel, ratingNovel, deskripsiNovel, hargaNovel } = newProduct;

    // Validasi input
    if (!judulNovel || !penulisNovel || !ratingNovel || !deskripsiNovel || !hargaNovel || !selectedFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Harap Isi Semua Kolom!',
        text: 'Silakan isi semua kolom untuk menambahkan produk.',
        confirmButtonColor: '#9B4D96',
      });
      return;
    }

    if (isNaN(ratingNovel) || isNaN(hargaNovel)) {
      Swal.fire({
        icon: 'error',
        title: 'Data Tidak Valid',
        text: 'Harga dan stok harus berupa angka.',
        confirmButtonColor: '#9B4D96',
      });
      return;
    }

    // Ambil ID Admin dari localStorage
    if (!idAdmin) {
      Swal.fire({
        icon: 'error',
        title: 'Admin Tidak Ditemukan!',
        text: 'Tidak ada informasi admin yang ditemukan.',
        confirmButtonColor: '#9B4D96',
      });
      return;
    }

    try {
      let imageUrl = "";

      // Jika file gambar ada, upload ke S3
      if (selectedFile) {
        Swal.fire({
          title: "Mengupload gambar...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        imageUrl = await uploadToS3(selectedFile);

        Swal.close();
      }

      // Kirim data ke server dalam bentuk FormData
      const formData = new FormData();
      formData.append("produk", JSON.stringify({
        judulNovel,
        penulisNovel,
        ratingNovel,
        deskripsiNovel,
        hargaNovel,
      }));

      // Sertakan URL gambar jika upload berhasil
      if (imageUrl) {
        formData.append("file", selectedFile);
      }

      Swal.fire({
        title: "Menambahkan produk...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Kirim data ke backend
      const response = await axios.post(
        `${API_URL}/tambah/${idAdmin}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.close();
      Swal.fire({
        icon: "success",
        title: `Produk ${response.data.judulNovel} berhasil ditambahkan.`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/books");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menambahkan Produk',
        text: error.response?.data?.message || 'Terjadi kesalahan saat menambahkan produk.',
        confirmButtonColor: '#9B4D96',
      });
      console.error("Error:", error.response || error.message);
    }
  };

  return (
    <div className="add-container">
      <div className="add-product">
        <h2>Tambah Produk</h2>
        <input
          type="text"
          name="judulNovel"
          value={newProduct.judulNovel}
          onChange={handleChange}
          placeholder="Judul Novel"
          required
        />
        <input
          type="text"
          name="penulisNovel"
          value={newProduct.penulisNovel}
          onChange={handleChange}
          placeholder="Penulis Novel"
          required
        />
        <input
          type= "text"
          name="ratingNovel"
          value={newProduct.ratingNovel}
          onChange={handleChange}
          placeholder="Rating Novel"
          required
        />
        <input
          type="text"
          name="deskripsiNovel"
          value={newProduct.deskripsiNovel}
          onChange={handleChange}
          placeholder="Deskripsi Novel"
          required
        />
        <input
          type="number"
          name="hargaNovel"
          value={newProduct.hargaNovel}
          onChange={handleChange}
          placeholder="Harga Novel"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <div className="button-group">
          <button onClick={handleAddProduct}>Tambah</button>
          <button onClick={() => navigate("/product-list")}>Batal</button>
        </div>
      </div>
    </div>
  );
}

export default Tambah;

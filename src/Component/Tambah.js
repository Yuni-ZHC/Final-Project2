import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../Css/Tambah.css"; // Pastikan path CSS benar


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
  const [tambah, settambah] = useState({
    judulNovel: "",
    penulisNovel: "",
    ratingNovel: "",
    deskripsiNovel: "",
    hargaNovel: "",
    gambarNovel: "", // Untuk URL gambar
  });

  const [selectedFile, setSelectedFile] = useState(null); // Untuk menyimpan file yang dipilih
  const [idAdmin, setIdAdmin] = useState(null); // State untuk menyimpan idAdmin
  const navigate = useNavigate();

  // Ambil idAdmin dari localStorage saat komponen dimuat
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
      navigate("/login"); // Redirect ke halaman login jika admin belum login
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    settambah({
      ...tambah,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi jika idAdmin tidak ada
    if (!idAdmin) {
      Swal.fire({
        icon: "error",
        title: "ID Admin tidak ditemukan",
        text: "Pastikan Anda login sebagai admin.",
      });
      return;
    }

    try {
      let imageUrl = "";

      // Jika ada file yang dipilih, upload ke S3
      if (selectedFile) {
        Swal.fire({
          title: "Mengupload gambar...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        imageUrl = await uploadToS3(selectedFile);

        Swal.close(); // Tutup loading jika sukses
      }

      // Kirim data ke server
      await axios.post(`${API_URL}/tambah/${idAdmin}`, {
        judulNovel: tambah.judulNovel,
        deskripsiNovel: tambah.deskripsiNovel,
        ratingNovel: tambah.ratingNovel,
        hargaNovel: parseFloat(tambah.hargaNovel),
        penulisNovel: tambah.penulisNovel,
        gambarNovel: imageUrl, // Gunakan URL gambar dari S3
      });
      
      Swal.fire({
        icon: "success",
        title: "Data berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/books"); // Redirect ke halaman books
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan data",
        text: error.response ? error.response.data.message : "Terjadi kesalahan",
      });
    }
  };

  return (
    <div className="main-content">
      <h2>Tambah Novel</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="judulNovel"
          placeholder="Judul"
          value={tambah.judulNovel}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="penulisNovel"
          placeholder="Penulis"
          value={tambah.penulisNovel}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ratingNovel"
          placeholder="Rating"
          value={tambah.ratingNovel}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="deskripsiNovel"
          placeholder="Deskripsi"
          value={tambah.deskripsiNovel}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="hargaNovel"
          placeholder="Harga"
          value={tambah.hargaNovel}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">Tambah Novel</button>
      </form>
    </div>
  );
}

export default Tambah;

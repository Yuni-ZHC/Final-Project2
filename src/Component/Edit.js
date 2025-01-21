import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
// import "../Css/EditData.css";


const API_URL = "http://localhost:8080/api/data";


// Fungsi untuk upload gambar ke S3
const uploadToS3 = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://s3.lynk2.co/api/s3/Edit", {
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

function Edit() {
  const [formData, setFormData] = useState({
    judulNovel: "",
    penulisNovel: "",
    ratingNovel: "",
    deskripsiNovel: "",
    hargaNovel: "",
    gambarNovel: "", // Untuk URL gambar
  });

  const [selectedFile, setSelectedFile] = useState(null); // Untuk menyimpan file yang dipilih
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID dari URL

  useEffect(() => {
    // Mengambil data berdasarkan ID
    axios
      .get(`http://localhost:8080/api/data/produk/${id}`)
      .then((response) => {
        setFormData(response.data); // Set data ke form
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve idAdmin from local storage
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    const idAdmin = adminData ? adminData.id : null;

    if (!idAdmin) {
      Swal.fire({
        icon: "error",
        title: "Admin tidak ditemukan",
        text: "Silakan login sebagai admin.",
      });
      return;
    }

    try {
      let imageUrl = formData.gambarNovel; // Gunakan URL gambar yang ada jika tidak ada file baru yang dipilih

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

      // Update data ke server
      await axios.put(`${API_URL}/editById/${id}?idAdmin=${idAdmin}`, {
        ...formData,
        gambarNovel: imageUrl, // Gunakan URL gambar dari S3
      });
      

      Swal.fire({
        icon: "success",
        title: "Data berhasil diperbarui",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/books"); // Navigasi ke halaman books setelah edit
    } catch (error) {
      console.error("Terjadi kesalahan saat memperbarui data:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal memperbarui data",
        text: error.response ? error.response.data.message : "Terjadi kesalahan",
      });
    }
  };

  return (
    <div className="main-content">
      <h2>Edit Data</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="judulNovel"
          placeholder="Judul"
          value={formData.judulNovel}
          onChange={handleChange}
        />
        <input
          type="text"
          name="penulisNovel"
          placeholder="Penulis"
          value={formData.penulisNovel}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ratingNovel"
          placeholder="Rating"
          value={formData.ratingNovel}
          onChange={handleChange}
        />
        <input
          type="text"
          name="deskripsiNovel"
          placeholder="Deskripsi"
          value={formData.deskripsiNovel}
          onChange={handleChange}
        />
        <input
          type="text"
          name="hargaNovel"
          placeholder="Harga"
          value={formData.hargaNovel}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

export default Edit;

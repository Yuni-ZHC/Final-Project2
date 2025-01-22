import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../Css/Tambah.css";

const API_URL = "http://localhost:8080/api/data";

function Tambah() {
  const [tambah, settambah] = useState({
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
    settambah({
      ...tambah,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tambah.judulNovel || !tambah.penulisNovel || !tambah.ratingNovel || !tambah.deskripsiNovel || !tambah.hargaNovel) {
      Swal.fire({
        icon: "error",
        title: "Semua field wajib diisi",
        text: "Pastikan semua informasi sudah lengkap.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("produk", JSON.stringify(tambah));
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      Swal.fire({
        title: "Menambahkan data...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(`${API_URL}/tambah/${idAdmin}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Data berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/books");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan data",
        text: error.response?.data?.message || "Terjadi kesalahan pada server.",
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

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar1 from "./Navbar1";
import { useNavigate } from "react-router-dom";
import "../Css/Tambah.css"; // Pastikan path CSS benar

function Tambah({ idAdmin }) {
  const [tambah, settambah] = useState({
    judulNovel: "",
    penulisNovel: "",
    ratingNovel: "",
    deskripsiNovel: "",
    hargaNovel: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    settambah({
      ...tambah,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
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

    // Kirim data ke server
    axios
      .post(`http://localhost:8080/api/data/tambah/${idAdmin}`, {
        judulNovel: tambah.judulNovel,
        deskripsiNovel: tambah.deskripsiNovel,
        ratingNovel: tambah.ratingNovel,
        hargaNovel: parseFloat(tambah.hargaNovel), // Pastikan harga dikirim sebagai angka
        penulisNovel: tambah.penulisNovel,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Data berhasil ditambahkan!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/books"); // Redirect ke halaman books
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengirim data:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal menambahkan data",
          text: error.response ? error.response.data.message : "Terjadi kesalahan",
        });
      });
  };

  return (
    <div className="main-content">
      <Navbar1 />
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
        <button type="submit">Tambah Novel</button>
      </form>
    </div>
  );
}

export default Tambah;

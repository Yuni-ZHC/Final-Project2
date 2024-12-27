import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../Css/Tambah.css"; // Ensure the correct CSS path

function Tambah({ idAdmin }) {
  const [tambah, settambah] = useState({
    judulNovel: "",
    penulisNovel: "",
    ratingNovel: "",
    deskripsiNovel: "",
    hargaNovel: "",
  });

  const navigate = useNavigate();

  // Simulate dynamic input values and auto-submit the form
  useEffect(() => {
   
    handleSubmit({ preventDefault: () => {} });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    settambah({
      ...tambah,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault(); // Prevent the default form submission behavior if event is passed
    axios
      .post(`http://localhost:8080/api/data/tambah/${idAdmin}`, tambah)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Data berhasil ditambahkan!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/books"); // Navigate to books page after success
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
      <h2>Tambah Novel</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="judulNovel"
          placeholder="Judul"
          value={tambah.judulNovel}
          onChange={handleChange}
        />
        <input
          type="text"
          name="penulisNovel"
          placeholder="Penulis"
          value={tambah.penulisNovel}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ratingNovel"
          placeholder="Rating"
          value={tambah.ratingNovel}
          onChange={handleChange}
        />
        <input
          type="text"
          name="deskripsiNovel"
          placeholder="Deskripsi"
          value={tambah.deskripsiNovel}
          onChange={handleChange}
        />
        <input
          type="number"
          name="hargaNovel"
          placeholder="Harga"
          value={tambah.hargaNovel}
          onChange={handleChange}
        />
        <button type="submit">Tambah Novel</button>
      </form>
    </div>
  );
}

export default Tambah;

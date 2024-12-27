import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
// import "../Css/EditData.css";

function Edit() {
  const [formData, setFormData] = useState({
    judulNovel: "",
    penulisNovel: "",
    ratingNovel: "",
    deskripsiNovel: "",
    hargaNovel: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID dari URL

  useEffect(() => {
    // Mengambil data berdasarkan ID
    axios.get(`http://localhost:8080/api/data/getById/${id}`)
      .then(response => {
        setFormData(response.data); // Set data ke form
      })
      .catch(error => {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/data/editById/${id}`, formData)
      .then(response => {
        Swal.fire({
          icon: "success",
          title: "Data berhasil diperbarui",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/data"); // Navigasi ke dashboard setelah edit
      })
      .catch(error => {
        console.error("Terjadi kesalahan saat memperbarui data:", error);
      });
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
          <button type="submit">Simpan</button>
        </form>
      </div>
  );
}

export default Edit;
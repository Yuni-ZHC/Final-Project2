import React, { useEffect, useState } from "react";
import "../Css/Books.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const API_URL = "http://localhost:8080/api/data";

const Books = () => {
  const [produk, setProduk] = useState([]);
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const idAdmin = adminData ? adminData.id : null;

  useEffect(() => {
    const fetchProduk = async () => {
      if (idAdmin) {
        try {
          const response = await axios.get(`${API_URL}/getAllByAdmin/${idAdmin}`);
          if (response.data.length === 0) {
            Swal.fire("No products found", "This admin has no products.", "info");
          } else {
            setProduk(response.data);
          }
        } catch (error) {
          Swal.fire("Error", "An error occurred while fetching the products.", "error");
        }
      }
    };

    fetchProduk();
  }, [idAdmin]);

  const handleDeleteBook = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/delete/${id}`);
          setProduk(produk.filter((book) => book.id !== id));
          Swal.fire("Deleted!", "The product has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "An error occurred while deleting the product.", "error");
        }
      }
    });
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h2 className="products-title">Daftar Produk</h2>
        <button className="add-product-btn" onClick={() => navigate("/tambah")}>+</button>
      </div>
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Foto</th>
              <th>Judul</th>
              <th>Penulis</th>
              <th>Rating</th>
              <th>Deskripsi</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {produk.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>
                  {book.gambarNovel ? (
                    <img
                      src={book.gambarNovel}
                      alt={book.judulNovel}
                      className="product-image"
                    />
                  ) : (
                    "Foto Tidak Ditemukan"
                  )}
                </td>
                <td>{book.judulNovel}</td>
                <td>{book.penulisNovel}</td>
                <td>{book.ratingNovel}</td>
                <td>{book.deskripsiNovel}</td>
                <td>{book.hargaNovel}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/edit/${book.id}`}>
                      <button className="action-btn edit-btn">Edit</button>
                    </Link>
                    <button className="action-btn delete-btn" onClick={() => handleDeleteBook(book.id)}>Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;

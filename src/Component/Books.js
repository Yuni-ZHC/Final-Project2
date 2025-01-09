import React, { useEffect, useState } from 'react';
import Navbar1 from './Navbar1';
import '../Css/Books.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import Axios

const API_URL = "http://localhost:8080/api/data"; // Default API base URL

const Books = () => {
  const [produk, setProduk] = useState([]);
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const idAdmin = adminData ? adminData.id : null; // Get the admin's ID

  useEffect(() => {
    // Fetch produk menggunakan Axios
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
          console.error("Error fetching data:", error);
          Swal.fire("Error", "An error occurred while fetching the products.", "error");
        }
      }
    };

    fetchProduk();
  }, [idAdmin]);

  const handleDeleteBook = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/delete/${id}`);
          setProduk(produk.filter((book) => book.id !== id));
          Swal.fire("Deleted!", "The product has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting book:", error);
          Swal.fire("Error", "An error occurred while deleting the product.", "error");
        }
      }
    });
  };

  const handleAddProduct = () => {
    navigate("/tambah");
  };

  const handleEditBook = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/editById/${id}`, updatedData, {
        params: { idAdmin }
      });
      setProduk((prevProduk) =>
        prevProduk.map((book) => (book.id === id ? response.data : book))
      );
      Swal.fire("Success", "Product updated successfully", "success");
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire("Error", "An error occurred while updating the product.", "error");
    }
  };

  return (
    <div className="books">
      <Navbar1 />
      <div className="table-container">
        <div className="add-book-button">
          <h2>Daftar Produk</h2>
          <button onClick={handleAddProduct}>Tambah Buku</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
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
                <td>{book.judulNovel}</td>
                <td>{book.penulisNovel}</td>
                <td>{book.ratingNovel}</td>
                <td>{book.deskripsiNovel}</td>
                <td>{book.hargaNovel}</td>
                <td>
                  <div className="button-group">
                    <Link to={`/Edit/${book.id}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
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

import React, { useEffect, useState } from 'react';
import Navbar1 from './Navbar1';
import '../Css/Books.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Books = () => {
  const [produk, setProduk] = useState([]);
  const navigate = useNavigate(); // Use navigate hook
  const [newProduct, setNewProduct] = useState({ judulNovel: '', hargaNovel: '', deskripsiNovel: '', penulisNovel: '', ratingNovel: '' });

  // Fetch admin data from localStorage
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const idAdmin = adminData ? adminData.id : null; // Get the admin's ID

  useEffect(() => {
    // Only fetch produk if idAdmin exists
    if (idAdmin) {
      // Fetch produk based on the admin's ID
      fetch(`http://localhost:8080/api/data/getAllByAdmin/${idAdmin}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            Swal.fire("No products found", "This admin has no products.", "info");
          } else {
            setProduk(data); // Set the fetched produk to state
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          Swal.fire("Error", "An error occurred while fetching the products.", "error");
        });
    }
  }, [idAdmin]); // Fetch data whenever the idAdmin changes

  const handleDeleteBook = (id) => {
    // Confirm deletion
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Send DELETE request to server
        fetch(`http://localhost:8080/api/data/delete/${id}`, {
          method: 'DELETE', // Using DELETE method
        })
          .then((response) => {
            if (response.ok) {
              // If delete successful, remove the product from state
              setProduk(produk.filter((book) => book.id !== id));
              Swal.fire("Deleted!", "The product has been deleted.", "success");
            } else {
              console.error('Failed to delete the book');
              Swal.fire("Failed!", "There was an issue deleting the product.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting book:", error);
            Swal.fire("Error", "An error occurred while deleting the product.", "error");
          });
      }
    });
  };

  const handleAddProduct = () => {
    // Navigate to the "Tambah Buku" page when the button is clicked
    navigate("/tambah");
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

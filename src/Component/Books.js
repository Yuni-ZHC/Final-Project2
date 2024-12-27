import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../Css/Books.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Books = () => {
  const [produk, setProduk] = useState([]);
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({ judulNovel: '', hargaNovel: '', deskripsiNovel: '', penulisNovel: '', ratingNovel: '' });

  useEffect(() => {
    // Fetch produk dari API
    fetch('http://localhost:8080/api/data/produk')
      .then((response) => response.json())
      .then((data) => {
        setProduk(data); // Simpan data ke dalam state produk
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDeleteBook = (id) => {
    // Kirim permintaan DELETE ke server
    fetch(`http://localhost:8080/api/data/delete/${id}`, {
      method: 'DELETE', // Menggunakan metode DELETE
    })
      .then((response) => {
        if (response.ok) {
          // Jika penghapusan berhasil, hapus buku dari state produk
          setProduk(produk.filter((book) => book.id !== id));
        } else {
          console.error('Failed to delete the book');
        }
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  const handleAddProduct = async () => {
    if (newProduct.judulNovel && newProduct.hargaNovel && newProduct.deskripsiNovel && newProduct.penulisNovel && newProduct.ratingNovel) {
      // Fetch the admin ID and token from localStorage (assuming it's stored)
      const adminData = JSON.parse(localStorage.getItem("adminData"));
      const idAdmin = adminData?.id;
      const token = adminData?.token;
      
      if (!idAdmin || !token) {
        Swal.fire({
          icon: 'error',
          title: 'Admin Tidak Ditemukan!',
          text: 'Tidak ada informasi admin atau token yang ditemukan.',
          confirmButtonColor: '#9B4D96',
        });
        return;
      }

      const newProductData = {
        ...newProduct,
        idAdmin,
        hargaNovel: parseFloat(newProduct.hargaNovel),
        ratingNovel: parseFloat(newProduct.ratingNovel)
      };

      // Send POST request to backend
      try {
        const response = await fetch(`http://localhost:8080/api/data/tambah/${idAdmin}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `jwt ${token}`
          },
          body: JSON.stringify(newProductData),
        });

        if (response.ok) {
          const savedProduct = await response.json();
          
          // Show success alert
          Swal.fire({
            icon: 'success',
            title: 'Produk Ditambahkan!',
            text: `Produk ${savedProduct.judulNovel} berhasil ditambahkan.`,
            confirmButtonColor: '#9B4D96',
          }).then(() => {
            navigate("/product-list"); // Navigate after successful submission
          });
        } else {
          // Show error alert if the response is not OK
          Swal.fire({
            icon: 'error',
            title: 'Gagal Menambahkan Produk',
            text: 'Terjadi kesalahan saat menambahkan produk.',
            confirmButtonColor: '#9B4D96',
          });
        }
      } catch (error) {
        // Handle network or other errors
        Swal.fire({
          icon: 'error',
          title: 'Kesalahan Jaringan',
          text: 'Gagal terhubung ke server.',
          confirmButtonColor: '#9B4D96',
        });
      }
    } else {
      // Show warning alert if some fields are empty
      Swal.fire({
        icon: 'warning',
        title: 'Harap Isi Semua Kolom!',
        text: 'Silakan isi semua kolom untuk menambahkan produk.',
        confirmButtonColor: '#9B4D96',
      });
    }
  };

  return (
    <div className="books">
      <Navbar />
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

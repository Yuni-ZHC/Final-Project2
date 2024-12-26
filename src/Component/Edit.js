// src/components/EditBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../Css/Edit.css';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Fetch existing book data
  useEffect(() => {
    console.log(id); // Tambahkan untuk memastikan ID yang diterima benar
    axios.get(`http://localhost:3000/books/${id}`)
      .then(response => {
        const { image, title, author, rating, description, price } = response.data;
        setImage(image);
        setTitle(title);
        setAuthor(author);
        setRating(rating);
        setDescription(description);
        setPrice(price);
      })
      .catch(error => console.error("Error fetching data: ", error));
  }, [id]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBook = { image, title, author, rating, description, price };
    axios.put(`http://localhost:3000/books/${id}`, updatedBook)
      .then(() => {
        navigate('/books'); // Setelah berhasil, kembali ke halaman utama
      })
      .catch(error => console.error("Error updating book: ", error));
  };

  return (
    <div className="edit-book-container">
      <div className="card">
        <h1>Edit Buku</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Gambar URL</label>
            <input 
              type="text" 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Judul:</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Penulis</label>
            <input 
              type="text" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <input 
              type="number" 
              value={rating} 
              onChange={(e) => setRating(e.target.value)} 
              required 
              min="0" 
              max="5" 
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label>Deskripsi</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Harga</label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;

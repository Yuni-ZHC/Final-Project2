import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Css/Tambah.css';  
  

const Tambah = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { image, title, author, rating, description, price };
    axios.post('http://localhost:3000/books', newBook)
      .then(() => {
        navigate.push('/');
      })
      .catch(error => console.error("Error adding book: ", error));
  };

  return (
    <div className="add-book-container">
      <div className="card">
        <h1>Tambah Buku</h1>
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
            <label>Judul</label>
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
              min="0" max="5" step="0.1"
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

          <button type="submit" className="btn">Tambah Buku</button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;

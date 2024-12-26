import React, { useState } from 'react';
import Navbar from './Navbar';
import '../Css/Books.css';
import { Link } from 'react-router-dom';
import image1 from '../Image/mahen-removebg-preview.png';
import image2 from '../Image/skiforzonia-removebg-preview.png';
import image3 from '../Image/hujan-removebg-preview.png';
import image4 from '../Image/asavella-removebg-preview.png';
import image5 from '../Image/aliza-removebg-preview.png';
import image6 from '../Image/00-removebg-preview (1).png';
import image7 from '../Image/telukalaska-removebg-preview.png';
import image8 from '../Image/canva-removebg-preview.png';
import image9 from '../Image/angkasa-removebg-preview.png';
import image10 from '../Image/alezra-removebg-preview.png';
import image11 from '../Image/Arthur-removebg-preview.png';


const Books = () => {
  const Books = [
    {
      id: 1,
      images: image1,
      judul: 'Mahen Algrafa',
      penulis: 'Kusdina Ain',
      rating: '⭐⭐⭐⭐⭐',
      desc: 'Novel ini menceritakan tentang perjalanan hidup Mahen,seorang anak laki-laki yang ditinggal ibunya sejak kecil',
      price: 'Rp.99.000',
    },
    {
      id: 2,
      images: image2,
      judul: 'Skizofrenia',
      penulis: 'Disadisso',
      rating: '⭐⭐⭐⭐⭐',
      desc: 'Novel ini menjelaskan tentang tata cara penegakan diagnosis,penatalaksanaan,dan pemahaman tentang perjalanan penyakit pada skizofrenia.',
      price: 'Rp.99.000',
    },
    {
      id: 3,
      images: image3,
      judul: 'Hujan',
      penulis: 'Tere Liye',
      rating: '⭐⭐⭐⭐⭐',
      desc: 'Novel ini menceritakan kisah Lail,seorang gadis yang menjadi yatim piatu akibat bencana alam.',
      price: 'Rp.99.000',
    },
    {
      id: 4,
      images: image4,
      judul: 'Asavella',
      penulis: 'Alfida Nurhayati Adiana ',
      rating: '⭐⭐⭐⭐⭐',
      desc: 'Novel ini menceritakan tentang perjalanan hidup seorang remaja bernama Asavella yang mengalami berbagai kejadian menyakitkan. ',
      price: 'Harga: Rp.90.000',
    },
    {
      id: 5,
      images: image5,
      judul: 'Santri Pilihan Bunda',
      penulis: 'Falensia Salsyabila',
      rating: '⭐⭐⭐⭐⭐',
      desc: 'Novel ini bercerita tentang Aliza Shaqueena Iqala, seorang mahasiswi yang dijodohkan dengan Kinaan Ozama El Fatih, seorang santri di pondok pesantren terkenal.',
      price: 'Harga: Rp.99.000',
    },
    {
      id: 6,
      images: image6,
      judul: '00.00',
      penulis: 'Anugrah Ameylia Falensia',
      rating: '⭐⭐⭐⭐⭐',
      desc: ' Novel ini menceritakan kisah seorang gadis remaja bernama Lengkara Putri Langit yang mengalami berbagai masalah dalam hidupnya.',
      price: 'Harga: Rp.85.000',
    },
    {
      id: 7,
      images: image7,
      judul: 'Teluk Alaska',
      penulis: 'Eka Aryani',
      rating: '⭐⭐⭐⭐⭐',
      desc: 'Novel ini bercerita tentang kisah romansa, persahabatan, dan perundungan yang dialami oleh dua tokoh utama, yaitu Anastasia Mysha dan Alister Reygan. ',
      price: 'Harga: Rp.88.000',
    },
    {
      id: 8,
      images: image8,
      judul: 'Eccedentesiast',
      penulis: ' ItaKrn',
      rating: '⭐⭐⭐⭐⭐',
      desc: 'Novel ini menceritakan tentang Canva Narendra, seorang remaja yang bercita-cita untuk bertemu dengan orang tuanya. ',
      price: 'Harga: Rp.99.000',
    },
    {
      id: 9,
      images: image9,
      judul: 'Dia Angkasa',
      penulis: 'Nurwina Sari ',
      rating: '⭐⭐⭐⭐⭐',
      desc: 'Novel ini menceritakan kisah cinta antara Angkasa Naufal Merapi dan Aurelani Aurora. ',
      price: 'Harga: Rp.99.000',
    },
    {
      id: 10,
      images: image10,
      judul: 'Alezra',
      penulis: 'Kusdina Ain',
      rating: '⭐⭐⭐⭐⭐',
      desc: 'Novel ini bercerita tentang Ayyara, seorang gadis SMA yang dijodohkan dengan Alezra Elvando, ketua geng motor Egrios. ',
      price: 'Harga: Rp.99.000',
    },
    {
      id: 11,
      images: image11,
      judul: 'He is My Boyfriend',
      penulis: 'Thyfaa_hn',
      rating: '⭐⭐⭐⭐⭐',
      desc: 'Novel ini bercerita tentang Arthur Renaldi Agatha, pemimpin perkumpulan remaja Argos, yang mencintai Athena Carolyn Acacio dalam diam. ',
      price: 'Harga: Rp.99.000',
    },
  ];

  const [books, setBooks] = useState(Books);

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="books">
      <Navbar />
      <div className="table-container">
        {/* Pindahkan tombol "Tambah Buku" ke atas tabel */}
      <div className="add-book-button">
        <Link to="/Tambah">
          <button>Tambah Buku</button>
        </Link>
      </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Penulis</th>
              <th>Rating</th>
              <th>Deskripsi</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={book.images}
                    alt={book.judul}
                    style={{ width: '50px', height: 'auto' }}
                  />
                </td>
                <td>{book.penulis}</td>
                <td>{book.rating}</td>
                <td>{book.desc}</td>
                <td>{book.price}</td>
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

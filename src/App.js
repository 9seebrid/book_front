// App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]); // 책 데이터를 저장할 상태

  // 페이지 로드 시 데이터 가져오기
  useEffect(() => {
    // API 요청
    fetch('http://localhost:8002/books')
      .then((response) => {
        if (!response.ok) {
          throw new Error('데이터를 불러오는 데 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => setBooks(data)) // 성공 시 책 데이터 설정
      .catch((error) => console.error('API 요청 오류:', error));
  }, []);

  return (
    <div className="App">
      <h1>책 정보</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.book_id} className="book-item">
              <h2>{book.book_title}</h2>
              <p><strong>저자:</strong> {book.book_author}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>장르:</strong> {book.book_genre}</p>
              <p><strong>가격:</strong> {book.book_price}원</p>
              <a href={book.book_link} target="_blank" rel="noopener noreferrer">
                자세히 보기
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>책 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default App;
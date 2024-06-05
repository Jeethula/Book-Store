import React, { useEffect, useRef, useState } from 'react'

function Books() {

  const [books, setbooks] = useState({})
  const [search, setsearch] = useState('')
  const [loading, setloading] = useState(false)
  const timeoutRef = useRef(null);

  const fetchbooks = async () => {
    setloading(true);
    const response = await fetch(`https://openlibrary.org/search.json?q=${search}&limit=10&page=1`);
    const data = await response.json();
    setbooks(data);
    setloading(false);
  };

  const debouncedFetchbooks = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(fetchbooks, 1000);
  };

  useEffect(() => {
    debouncedFetchbooks();
    return () => clearTimeout(timeoutRef.current); 
  }, [search]);


  return (
    <div>
      <input type="text" placeholder="Search Books" onChange={(e)=>setsearch(e.target.value)} />
      <h1>Books</h1>
      {loading ? <p>Loading...</p> :
      <div>
        <ul>
          {books.docs && books.docs.map((book, index) => (
            <li key={index}>
              <h2>{book.title}</h2>
              <p>{book.author_name}</p>
              <p>{book.first_publish_year}</p>
            </li>
          ))}
        </ul>
      </div>
      }
    </div>
  )
}

export default Books

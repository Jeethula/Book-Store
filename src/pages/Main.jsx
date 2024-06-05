import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { FaUserPen } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";
import { FcRating } from "react-icons/fc";
import { MdOutlineMoving } from "react-icons/md";
import { FaLanguage } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";
import { MdBookmarkAdd } from "react-icons/md";
import { TbSearch } from "react-icons/tb";

function Main() {

  const [books, setbooks] = useState({})
  const [search, setsearch] = useState('')
  const [loading, setloading] = useState(false)
  const timeoutRef = useRef(null);

  const navigate = useNavigate();

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

    const addWishlist = (index) => {
    let wishlist = localStorage.getItem('wishlist') ;
    wishlist = wishlist ? JSON.parse(wishlist) : [];
    wishlist.push(books.docs[index]);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    navigate('/wishlist');
    }

  return (
    <div className='flex flex-col gap-5 items-center p-3 md:p-10 '>
      <div className='flex flex-col md:flex-row md:justify-evenly items-center gap-x-9'>
        <input className='w-[300px] md:w-[600px] h-[40px] border-black border-2 rounded-md ' type="text" placeholder="Search Books " onChange={(e)=>setsearch(e.target.value)} />
        <button className='flex items-center mt-3 gap-x-3 h-fit w-fit p-3 font-bold text-[20px] text-white bg-orange-600 hover:bg-orange-500 rounded-md' onClick={()=>navigate('/wishlist')}><MdBookmarkAdd />My Wishlist</button>
      </div>
      {loading ? <p>Loading...</p> : search=='' ? <h1 className='font-bold text-[30px] flex items-center gap-x-2'><TbSearch /> Search for books </h1> :
      <div className='bg-slate-100 w-full p-4 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg'>
          {books.docs && books.docs.map((book, index) => (
            <div className='bg-white rounded-lg p-2' key={index}>
               <h2 className='font-bold p-2 text-[20px]'>{book.title_sort}</h2>
                <p className='flex items-center gap-x-4 '>Author <FaUserPen /> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>: {book.author_name}</p>
                <p className='flex items-center gap-x-4 '> Published on  <BsCalendarDateFill /> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>: {book.first_publish_year}</p>
                <p className='flex items-center gap-x-4 '>Average rateings  <FcRating /> <span>&nbsp;&nbsp;</span>: {book.ratings_average}</p>
                <p className='flex items-center gap-x-4 '>language's available  <FaLanguage /> : {book.language.length}</p>
                <p className='flex items-center gap-x-4 '>No.of.pages  <FaBookReader /> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>: {book.number_of_pages_median}</p>
               <button className='flex items-center mt-3 gap-x-1 h-fit w-fit p-1 font-bold text-[15px] text-white bg-orange-600 hover:bg-orange-500 rounded-md' onClick={()=>addWishlist(index)}><MdBookmarkAdd />Add Wishlist</button>
            </div>
          ))}
      </div>
      }
    </div>
  )
}

export default Main

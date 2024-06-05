import React, { useEffect, useState } from 'react'
import { FaUserPen } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";
import { FcRating } from "react-icons/fc";
import { FaLanguage } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";


function Wishlist() {

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
      let storedWishlist = localStorage.getItem('wishlist');
      storedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      console.log(storedWishlist,"......")
      setWishlist(storedWishlist);
      console.log(wishlist,"......")
    }, []); 


    return (
        <div className='flex flex-col items-center'>
          <h1 className='font-bold text-[30px] p-9 flex gap-x-3 items-center '> My Wishlist <FaHeart /></h1>
          {wishlist.length > 0 ? (
            <div className='w-full p-12 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-100'>
              {wishlist.map((book, index) => (
                <div className=''>
                    <div className='bg-white rounded-lg p-2' key={index}>
                    <h2 className='font-bold p-2 text-[20px]'>{book.title_sort}</h2>
                    <p className='flex items-center gap-x-4 '>Author <FaUserPen /> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>: {book.author_name}</p>
                    <p className='flex items-center gap-x-4 '> Published on  <BsCalendarDateFill /> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>: {book.first_publish_year}</p>
                    <p className='flex items-center gap-x-4 '>Average rateings  <FcRating /> <span>&nbsp;&nbsp;</span>: {book.ratings_average}</p>
                    <p className='flex items-center gap-x-4 '>language's available  <FaLanguage /> : {book.language.length}</p>
                    <p className='flex items-center gap-x-4 '>No.of.pages  <FaBookReader /> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>: {book.number_of_pages_median}</p>
                </div>
             </div>
              ))}
            </div>
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      );
}

export default Wishlist

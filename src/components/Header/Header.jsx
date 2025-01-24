import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-700 text-white shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold mb-4 sm:mb-0">
          <a href="/">CouponMarket</a>
        </div>
        
        {/* Navigation */}
        <nav className="flex justify-center sm:justify-end flex-wrap">
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:text-gray-300">Home</a>
            </li>
            <li>
              <a href="/buy" className="hover:text-gray-300">Buy Coupons</a>
            </li>
            <li>
              <a href="/sell" className="hover:text-gray-300">Sell Coupons</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-300">Contact</a>
            </li>
          </ul>
        </nav>

        {/* Search Bar */}
        <div className="flex justify-center sm:justify-end w-full sm:w-auto mt-4 sm:mt-0">
          <input 
            type="text" 
            placeholder="Search coupon categories..." 
            className="w-full sm:w-62 px-4 py-2 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sell Your Coupons Button */}
        <div className="mt-4 sm:mt-0">
          <Link to='/sellform'>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              Sell Your Coupons
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

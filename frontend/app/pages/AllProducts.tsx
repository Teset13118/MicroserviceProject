"use client";
import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { ProductTable } from "../components/ProductTable";
import Link from 'next/link';
import { Category } from "@/types/types";
import { fetchCategory } from "../api/productServices";


export function AllProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  
  const fetchCategories = async () => {
    try{
      const response  = await fetchCategory()

      console.log("Category fetchdata : " ,response)
      setCategories(response)

    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories() 
  }, []);
    


  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          {/* <p className="text-gray-600 mt-1">Manage your product inventory</p> */}
        </div>

        <Link href="/addProduct">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 cursor-pointer">
            <Plus size={20} />
            Add Product
          </button>
        </Link>

        
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Categories</option>
            {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
            ))}
              </select>
            </div>
          </div>
        </div>
        <ProductTable showActions={true} />
      </div>
    </div>
  );
}

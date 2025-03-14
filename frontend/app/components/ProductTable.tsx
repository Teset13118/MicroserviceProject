import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Pencil, Trash2 } from "lucide-react";

interface Products {
  _id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  status: string;
  category: {
    _id: string;
    name: string;
  };
}

interface ProductTableProps {
  limit?: number;
  showActions?: boolean;
}

export function ProductTable({ limit, showActions = false }: ProductTableProps) {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await axios.get("http://localhost:8080/api/products");
        setProducts(resProducts.data.data);
      } catch (error) {
        console.error("Error fetching products API:", error);
      }
    };

    fetchData();
  }, []);

  const displayedProducts = limit ? products.slice(0, limit) : products;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500 text-white";
      case "Low Stock":
        return "bg-yellow-400 text-white";
      case "Out of Stock":
        return "bg-red-400 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            {showActions && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.length === 0 ? (
            <tr>
              <td colSpan={showActions ? 7 : 6} className="px-6 py-4 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          ) : (
            displayedProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.sku}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.category.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.quantity}</div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-center font-semibold ${getStatusStyle(product.status)}`}>
                  {product.status}
                </td>
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Pencil size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

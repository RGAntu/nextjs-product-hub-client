"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Fetch products from API (or static mock)
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
    }
    fetchProducts();
  }, []);

  // Handle search + category filter
  useEffect(() => {
    let result = products;

    if (category !== "All") {
      result = result.filter((item) => item.category === category);
    }

    if (search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, category, products]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Our Products</h1>
      <p className="text-center text-gray-500 mb-6">
        Discover our complete collection of premium products designed to
        enhance your lifestyle.
      </p>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />

        <div className="flex gap-2">
          {["All", "Electronics", "Home", "Food"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`btn btn-sm ${
                category === cat ? "btn-primary" : "btn-outline"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Count */}
      <p className="mb-4 text-gray-500">
        Showing {filtered.length} of {products.length} products
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="card card-compact bg-base-100 shadow hover:shadow-lg transition"
          >
            <figure>
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={200}
                className="rounded-t-lg object-cover"
                unoptimized
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-primary font-bold">${item.price}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-2">
                  <span className="badge badge-outline">{item.category}</span>
                  <span className="badge badge-secondary">Featured</span>
                </div>
                <Link
                  href={`/products/${item._id}`}
                  className="btn btn-sm btn-outline"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

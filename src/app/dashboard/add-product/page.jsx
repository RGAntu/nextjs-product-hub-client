"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If not authenticated → redirect to login
  if (status === "loading") return <p>Loading...</p>;
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert(" Product added successfully!");
      router.push("/products");
    } else {
      alert(" Failed to add product");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 border rounded-lg shadow bg-base-200"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          className="textarea textarea-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Add Product
        </button>
      </form>
    </div>
  );
}

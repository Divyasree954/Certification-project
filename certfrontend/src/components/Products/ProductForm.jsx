import React, { useState } from "react";
import API from "../../api";

const ProductForm = () => {
  const [formData, setFormData] = useState({ name: "", price: "", description: "", image: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/products", formData);
      alert("Product added successfully");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="price" placeholder="Price" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input name="image" placeholder="Image URL" onChange={handleChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;



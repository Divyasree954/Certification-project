import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../src/components/Auth/Signup";
import Login from "../src/components/Auth/Login";
import ProductList from "../src/components/Products/ProductList";
import ProductForm from "../src/components/Products/ProductForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-product" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;

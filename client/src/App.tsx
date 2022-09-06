import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./components";
import { AddPost, FullPost, Home, Login, Registration } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fullPost" element={<FullPost />} />
          <Route path="/addPost" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

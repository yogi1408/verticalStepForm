import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BankForm from "./BankForm";
import Header from "./Header";
import BankDetail from "./BankDetail";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<BankForm />} />
          <Route path="/detail" element={<BankDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BankForm from "./BankForm";
import Header from "./Header";
import BankDetail from "./BankDetail";
import NotFound from "./NotFound";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <React.Fragment>
                <Header />
                <BankForm />
              </React.Fragment>
            }
          />
          <Route
            path="/detail"
            element={
              <React.Fragment>
                <Header />
                <BankDetail />
              </React.Fragment>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes, Navigate
} from "react-router-dom";
import {ContactPage} from "./pages/Contact/contact.page";
import {CreateContactPage} from "./pages/Contact/create-contact.page";

function App() {
  return (
      <>
        <BrowserRouter>
          {
            <Routes>
              <Route path="/contact" element={<ContactPage/>}/>
              <Route path="/contact/create" element={<CreateContactPage />}/>
              <Route path="*" element={
                <main style={{padding: "1rem"}}>
                  <p>There's nothing here!</p>
                </main>
              }
              />
            </Routes>
          }
        </BrowserRouter>
      </>
  );
}

export default App;

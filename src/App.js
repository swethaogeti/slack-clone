import React from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./firebase-confing";
import Login from "./components/Login";
function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <BrowserRouter>
      <div className="App">
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Chat />}></Route>
              </Routes>
            </AppBody>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
  outline: 2px solid black;
`;

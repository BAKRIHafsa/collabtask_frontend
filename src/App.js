import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BoardList from "./components/BoardList";
import BoardDetail from "./components/BoardDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateBoard from "./components/CreateBoard";
import CardDetails from "./components/CardDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/boardlist/:userId/boards/:boardId"
          element={<BoardDetail />}
        />
        <Route
          path="/boardlist/:userId/boards/:boardId/lists/:listId/cards/:cardId"
          element={<CardDetails />}
        />
        <Route path="/boardlist/:userId" element={<BoardList />} />
        <Route path="/create-board" element={<CreateBoard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

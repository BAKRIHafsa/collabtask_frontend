import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/css/BoardList.css";

function BoardList() {
  const [boards, setBoards] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}/boards`
        );
        if (Array.isArray(response.data)) {
          setBoards(response.data);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    if (userId) {
      fetchBoards();
    }
  }, [userId]);

  const handleBoardClick = (boardId) => {
    navigate(`/boardlist/${userId}/boards/${boardId}`);
  };

  const handleAddBoard = () => {
    navigate("/create-board");
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="board-list-container">
      <div className="top-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h1>Your Boards</h1>
      <div className="board-list">
        {boards.map((board) => (
          <div
            key={board.id}
            className="board-item"
            onClick={() => handleBoardClick(board.id)}
          >
            <h2>{board.title}</h2>
            <p>{board.description}</p>
          </div>
        ))}
      </div>
      <button className="add-board-button" onClick={handleAddBoard}>
        Add Board
      </button>
    </div>
  );
}

export default BoardList;

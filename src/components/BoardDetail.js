import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ListDetail from "../components/ListDetail";
import "../components/css/boarddetail.css";

const BoardDetail = () => {
  const { boardId, userId } = useParams();
  const [board, setBoard] = useState({});
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const boardResponse = await axios.get(
          `http://localhost:8080/api/users/${userId}/boards/${boardId}`
        );
        setBoard(boardResponse.data);
        setUsers(boardResponse.data.users || []); // Ensure users is an array
        const listsResponse = await axios.get(
          `http://localhost:8080/api/users/${userId}/boards/${boardId}/lists`
        );
        setLists(listsResponse.data);
      } catch (error) {
        console.error("Error fetching board details", error);
      }
    };

    fetchBoardDetails();
  }, [userId, boardId]);

  const handleAddList = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/${userId}/boards/${boardId}/lists`,
        {
          title: newListTitle,
        }
      );
      setLists([...lists, response.data]);
      setNewListTitle("");
    } catch (error) {
      console.error("Error adding list", error);
    }
  };

  const handleDeleteList = (listId) => {
    setLists(lists.filter((list) => list.id !== listId));
  };

  const handleAddUser = async () => {
    try {
      let response;
      if (newUserId) {
        response = await axios.post(
          `http://localhost:8080/api/users/${userId}/boards/${boardId}/users/${newUserId}`
        );
      } else if (newUserEmail) {
        response = await axios.post(
          `http://localhost:8080/api/users/${userId}/boards/${boardId}/users/email/${newUserEmail}`
        );
      } else {
        throw new Error("Please provide either a user ID or email");
      }
      setUsers((prevUsers) => [...prevUsers, response.data]); // Update users state with the new user
      setNewUserId("");
      setNewUserEmail("");
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  return (
    <div className="board-detail-container">
      <h1>{board.title}</h1>
      <p>{board.description}</p>

      <div className="users-container">
        {users.map((user, index) => (
          <div
            key={`user-${user.id}-${index}`}
            className="user-circle"
            title={user.nom || "Unknown"}
          >
            {user.nom ? user.nom.charAt(0).toUpperCase() : "U"}
          </div>
        ))}
      </div>

      <div className="lists-container">
        {lists.map((list) => (
          <div key={`list-${list.id}`} className="list-item">
            <ListDetail list={list} onDelete={handleDeleteList} />
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="New List Title"
          className="add-list-container"
        />
        <button onClick={handleAddList} className="add-list-container-button">
          Add List
        </button>
      </div>

      <div>
        <input
          type="text"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          placeholder="New User Email"
          className="add-email-container"
        />
        <button onClick={handleAddUser} className="add-user-container-button">
          Add User
        </button>
      </div>
    </div>
  );
};

export default BoardDetail;

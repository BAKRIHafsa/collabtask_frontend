import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../components/css/ListDetail.css";

function ListDetail({ list, onDelete }) {
  const { userId, boardId } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [newCardDueDate, setNewCardDueDate] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}/boards/${boardId}/lists/${list.id}/cards`
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [userId, boardId, list.id]);

  const handleAddCard = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/${userId}/boards/${boardId}/lists/${list.id}/cards`,
        {
          title: newCardTitle,
          description: newCardDescription,
          dueDate: newCardDueDate,
        }
      );
      setCards([...cards, response.data]);
      setNewCardTitle("");
      setNewCardDescription("");
      setNewCardDueDate("");
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  const handleDeleteList = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/users/${userId}/boards/${boardId}/lists/${list.id}`
      );
      onDelete(list.id);
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const handleCardClick = (cardId) => {
    navigate(
      `/boardlist/${userId}/boards/${boardId}/lists/${list.id}/cards/${cardId}`
    );
  };

  return (
    <div className="list-detail">
      <h2>{list.title}</h2>
      <button className="delete-button" onClick={handleDeleteList}>
        Delete List
      </button>
      <div className="add-card-container">
        <input
          type="text"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={newCardDescription}
          onChange={(e) => setNewCardDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="text"
          value={newCardDueDate}
          onChange={(e) => setNewCardDueDate(e.target.value)}
          placeholder="Due Date"
        />
        <button className="add-card-button" onClick={handleAddCard}>
          Add Card
        </button>
      </div>
      <div className="cards">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card-container"
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-square">
              <h3>{card.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListDetail;

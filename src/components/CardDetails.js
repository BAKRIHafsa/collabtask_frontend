import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from '../components/CommentSection';
import '../components/css/CardDetail.css';

const CardDetails = () => {
  const { userId, boardId, listId, cardId } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}/boards/${boardId}/lists/${listId}/cards/${cardId}`);
        setCard(response.data);
      } catch (error) {
        console.error('Error fetching card details:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [userId, boardId, listId, cardId]);

  const handleDueDateChange = (e) => {
    setCard({ ...card, dueDate: e.target.value });
  };

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  if (error) {
    return <div>Error fetching card details</div>; // Display an error message if fetching fails
  }

  if (!card) {
    return null; // or a message indicating no card data is available
  }

  return (
    <div className="card-detail">
      <div className="card-header">
        <input
          type="text"
          value={card.title}
          onChange={(e) => setCard({ ...card, title: e.target.value })}
          className="card-title"
        />
      </div>
      <div className="card-body">
        <div className="card-section">
          <h3>Description</h3>
          <textarea
            value={card.description}
            onChange={(e) => setCard({ ...card, description: e.target.value })}
            className="card-description"
          />
        </div>
        <div className="card-section">
          <h3>Due Date</h3>
          <input
            type="date"
            value={formatDueDate(card.dueDate)}
            onChange={handleDueDateChange}
            className="card-due-date"
          />
        </div>
        <div className="card-section">
          <h3>Comments</h3>
          <CommentSection cardId={card.id} listId={listId} />
        </div>
      </div>
    </div>
  );
};

export default CardDetails;

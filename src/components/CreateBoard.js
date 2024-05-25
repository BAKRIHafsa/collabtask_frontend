import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/css/createboard.css';

function CreateBoard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/users/${userId}/boards`, {
        title,
        description,
      });
      if (response.status === 201) {
        navigate(`/boardlist/${userId}`); // Navigate back to the board list after creation
      }
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  return (
    <div className="create-board-container">
      <h1>Create Board</h1>
      <form className="create-board-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateBoard;

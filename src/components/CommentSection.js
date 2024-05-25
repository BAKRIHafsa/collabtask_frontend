import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../components/css/CommentSection.css';

const CommentSection = ({ cardId, listId }) => {
  const { userId, boardId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}/boards/${boardId}/lists/${listId}/cards/${cardId}/comments/all`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [userId, boardId, listId, cardId]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/users/${userId}/boards/${boardId}/lists/${listId}/cards/${cardId}/comments`, {
        text: newComment
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
      <div className="add-comment-container">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button className="add-comment-button" onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;

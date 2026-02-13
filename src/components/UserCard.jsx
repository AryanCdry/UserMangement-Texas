import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(user.id);
    }
  };

  return (
    <div className="user-card">
      <button className="delete-btn" onClick={handleDelete}>X</button>
      <h3>{user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
      <div className="card-actions">
        <button onClick={() => navigate(`/users/${user.id}`)}>View</button>
        <button onClick={() => navigate(`/users/${user.id}/edit`)}>Edit</button>
      </div>
    </div>
  );
};

export default UserCard;
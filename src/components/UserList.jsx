import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserCard from './UserCard';
import { fetchUsers, deleteUser } from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        let apiUsers = response.data;

        // Merge with localStorage edits
        apiUsers = apiUsers.map(user => {
          const localEdit = localStorage.getItem(`user_${user.id}`);
          return localEdit ? { ...user, ...JSON.parse(localEdit) } : user;
        });

        setUsers(apiUsers);
        setLoading(false);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };
    loadUsers();
  }, [location]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      // Also remove from localStorage if edited
      localStorage.removeItem(`user_${id}`);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading) return <div className="center">Loading...</div>;
  if (error) return <div className="center error">{error}</div>;

  return (
    <div className="user-list">
      <h1>User Management System</h1>
      <div className="user-grid">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
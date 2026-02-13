import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById, updateUser } from '../services/api';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', phone: '', website: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Load user details, merging with local edits
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetchUserById(id);
        let apiUser = response.data;

        // Check for local edits in localStorage and merge
        const localEdit = localStorage.getItem(`user_${id}`);
        if (localEdit) {
          apiUser = { ...apiUser, ...JSON.parse(localEdit) };
        }

        setUser({
          name: apiUser.name || '',
          email: apiUser.email || '',
          phone: apiUser.phone || '',
          website: apiUser.website || ''
        });
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id]);

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await updateUser(id, user);
      // Save to localStorage for persistence
      localStorage.setItem(`user_${id}`, JSON.stringify(user));
      setSuccess(true);
      setTimeout(() => navigate('/users'), 2000);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to update user');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="user-edit">
      <h1>Edit User</h1>
      {success && <div style={{ color: 'green' }}>User updated successfully! Redirecting...</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Phone:</label>
          <input type="tel" name="phone" value={user.phone} onChange={handleChange} required />
        </div>

        <div>
          <label>Website:</label>
          <input type="url" name="website" value={user.website} onChange={handleChange} required />
        </div>

        <button type="submit">Update User</button>
        <button type="button" onClick={() => navigate('/users')} style={{ marginLeft: '10px' }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
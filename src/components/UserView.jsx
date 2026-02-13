import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById } from '../services/api';
import '../styles.css';

const UserView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        setUser(apiUser);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) return <div className="center">Loading...</div>;
  if (error) return <div className="center error">{error}</div>;
  if (!user) return null;

  return (
    <div className="user-card">
      <h1>User Details</h1>

      <table className="user-grid">
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td><strong>Username</strong></td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td><strong>Email</strong></td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td><strong>Phone</strong></td>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <td><strong>Website</strong></td>
            <td>{user.website}</td>
          </tr>

          <tr>
            <td colSpan="2"><strong>Address</strong></td>
          </tr>
          <tr>
            <td>Street</td>
            <td>{user.address?.street}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>{user.address?.city}</td>
          </tr>
          <tr>
            <td>Zipcode</td>
            <td>{user.address?.zipcode}</td>
          </tr>

          <tr>
            <td colSpan="2"><strong>Company</strong></td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{user.company?.name}</td>
          </tr>
          <tr>
            <td>Catch Phrase</td>
            <td>{user.company?.catchPhrase}</td>
          </tr>
          <tr>
            <td>BS</td>
            <td>{user.company?.bs}</td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={() => navigate('/users')}
        style={{
          display: 'block',
          padding: '10px 25px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}>
        Back
      </button>
    </div>
  );
};

export default UserView;
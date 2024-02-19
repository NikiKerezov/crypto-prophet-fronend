import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const TelegramLinkCard = () => {
  const [telegramId, setTelegramId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your JWT storage mechanism (e.g., localStorage, context)
  const jwtToken = Cookies.get('token');
  const username = Cookies.get('username');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/userHandler/v2/user/setTelegramId', { username, telegramId }, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.status === 200) {
        console.log('Telegram ID linked successfully!', response.data);
      
        // Clear the input field
        Cookies.set('telegramId', telegramId);
        setTelegramId('');
        alert("Telegram ID linked successfully!");
      } else {
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error linking Telegram ID:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
        padding: '20px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
        <h3 style={{ marginBottom: '10px', fontSize: '1.2em', fontWeight: '500' }}>
          Link your Telegram ID
        </h3>
        <label htmlFor="telegramId" style={{ display: 'block', marginBottom: '5px', fontSize: '0.8em' }}>
          Telegram ID:
        </label>
        <input
          type="text"
          id="telegramId"
          name="telegramId"
          value={telegramId}
          onChange={(event) => setTelegramId(event.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '3px',
            fontSize: '1em',
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            textAlign: 'center',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          {isLoading ? 'Loading...' : 'Link Telegram ID'}
        </button>
        {error && (
          <p className="error" style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default TelegramLinkCard;

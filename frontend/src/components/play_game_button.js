// PlayGamePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlayGamePage = () => {
  const navigate = useNavigate();

  const handlePlayGame = () => {
    navigate('/Facevalidation'); // Navigate to FaceValidation
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={handlePlayGame}>
        Play Game
      </button>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("https://source.unsplash.com/1600x900/?game")', // nice background
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  button: {
    padding: '20px 50px',
    fontSize: '28px',
    fontWeight: 'bold',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'green',
    color: '#fff',
    boxShadow: '0 6px 15px rgba(0,0,0,0.3)',
    transition: '0.3s',
  },
};

export default PlayGamePage;

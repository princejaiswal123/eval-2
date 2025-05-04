import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [curr, setCurr] = useState(1);

  const pageRef = useRef(curr);

  const data = async (page) => {
    setLoad(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      setCharacters(response.data.results);
      setPage(response.data.info.pages);
      setLoad(false);
    } catch (error) {
      console.error('Error:', error);
      setLoad(false);
    }
  };

  useEffect(() => {
    data(curr);
    pageRef.current = curr; 
  }, [curr]);

  const move = () => {
    if (curr < page) {
      setCurr((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (curr > 1) {
      setCurr((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Rick and Morty</h1>
      {load ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {characters.map((character) => (
            <div className="card" key={character.id}>
              <img src={character.image} alt={character.name} />
              <h3>{character.name}</h3>
              <p>{character.species}</p>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={curr <= 1}>
          Prev
        </button>
        <span>Page {curr} of {page}</span>
        <button onClick={move} disabled={curr >= page}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;

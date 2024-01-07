import React, { useState } from 'react';
import './TopFifty.css';
const TopFifty = () => {
  const [players, setPlayers] = useState([]);

  const fetchTopFifty = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/top50'); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('There was a problem fetching the top fifty players data:', error);
    }
  };

  return (
    <div className='TopFifty'>
      <button onClick={fetchTopFifty}>Load Top 50 NBA Players Stats</button>
      <table>
        <thead>
          <tr>
            {/* Dynamically generate the headers */}
            {players[0] && Object.keys(players[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {/* Dynamically generate the table rows */}
          {players.map((player, index) => (
            <tr key={index}>
              {Object.values(player).map((value, idx) => <td key={idx}>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopFifty;

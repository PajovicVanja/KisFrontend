import React, { useState } from 'react';
import FilterPlayers from './FilterPlayers';
import { saveAs } from 'file-saver';
import './DownloadData.css';


const DownloadData = () => {
    const [playersData, setPlayersData] = useState(null);
    const [teamsData, setTeamsData] = useState(null);
    const [playersXml, setPlayersXml] = useState(null);
    const [teamsXml, setTeamsXml] = useState(null);
    const [showFilterPlayers, setShowFilterPlayers] = useState(false);

    const fetchData = (endpoint, setter) => {
        fetch(`http://localhost:5000/api/${endpoint}`, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched:', data);
            alert('Data fetched successfully, check console for details.');
            setter(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch data: ' + error.message);
        });
    };

    const convertToXml = (endpoint, setter) => {
        fetch(`http://localhost:5000/api/to_xml/${endpoint}`, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('XML Data:', data);
            setter(data.xml_content);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to convert to XML: ' + error.message);
        });
    };

    const downloadFileFromServer = (filename) => {
        fetch(`http://localhost:5000/api/download/${filename}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            saveAs(blob, filename);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to download file: ' + error.message);
        });
    };

    const toggleFilterPlayers = () => {
        setShowFilterPlayers(!showFilterPlayers);
    };
    return (
        <div className="DownloadData">
            <h1>Download Data</h1>
            <h2>Fetch, Convert and Download Original Players Data </h2>
            <button onClick={() => fetchData('fetch_players', setPlayersData)}>Fetch Players Data</button>
            <button onClick={() => downloadFileFromServer('players_data.json')}>Download Players Data</button>
            <button onClick={() => convertToXml('players', setPlayersXml)}>Convert Players to XML</button>
            <button onClick={() => downloadFileFromServer('players.xml')}>Download Players XML</button>
            <h2>Fetch, Convert and Download Original Teams Data </h2>
            <button onClick={() => fetchData('fetch_teams', setTeamsData)}>Fetch Teams Data</button>
            <button onClick={() => downloadFileFromServer('teams.json')}>Download Teams Data</button>
            <button onClick={() => convertToXml('teams', setTeamsXml)}>Convert Teams to XML</button>
            <button onClick={() => downloadFileFromServer('teams.xml')}>Download Teams XML</button>


            <button onClick={toggleFilterPlayers}>{showFilterPlayers ? 'Hide' : 'Show'} Filter Players</button>
            {showFilterPlayers && <FilterPlayers />}
        </div>
    );
}

export default DownloadData;

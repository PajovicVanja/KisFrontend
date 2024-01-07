import React, { useState, useEffect } from 'react';
import './FilterPlayers.css';

const FilterPlayers = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/fetch_teams')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Error fetching teams:', error));
    }, []);

    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
        setFilteredPlayers([]); 
    
        fetch(`http://localhost:5000/api/players_by_team/${event.target.value}`)
            .then(response => response.json())
            .then(data => {
                setFilteredPlayers(data); 
            })
            .catch(error => {
                console.error('Error fetching players:', error);
                setFilteredPlayers([]); 
            });
    };
    

    const formatData = (data) => {
        return data || data === 0 ? data : 'No Data';
    };

    return (
        <div className='FilterPlayers'>
            <h2>Filter Players by Team</h2>
            <select value={selectedTeam} onChange={handleTeamChange}>
                <option value="">Select a Team</option>
                {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.full_name}</option>
                ))}
            </select>

            {filteredPlayers.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Height (ft)</th>
                            <th>Height (in)</th>
                            <th>Position</th>
                            <th>Weight (lbs)</th>
                            <th>Team ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPlayers.map(player => (
                            <tr key={player.id}>
                                <td>{formatData(player.first_name)}</td>
                                <td>{formatData(player.last_name)}</td>
                                <td>{formatData(player.height_feet)}</td>
                                <td>{formatData(player.height_inches)}</td>
                                <td>{formatData(player.position)}</td>
                                <td>{formatData(player.weight_pounds)}</td>
                                <td>{formatData(player.teamID)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default FilterPlayers;

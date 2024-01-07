import React, { useState, useEffect } from 'react';
import './TeamsAndPlayersManagement.css';
const apiBaseUrl = 'http://localhost:5000'; // Update with the actual base URL of your Flask API

const TeamsAndPlayersManagement = () => {
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [newTeam, setNewTeam] = useState({ abbreviation: '', city: '', conference: '', division: '', full_name: '', name: '' });
    const [newPlayer, setNewPlayer] = useState({ first_name: '', last_name: '', height_feet: '', height_inches: '', position: '', weight_pounds: '', teamID: '' });


    const [showTeams, setShowTeams] = useState(false);
    const [showPlayers, setShowPlayers] = useState(false);

    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);
    const [teamToUpdate, setTeamToUpdate] = useState({});
    const [playerToUpdate, setPlayerToUpdate] = useState({});


    useEffect(() => {
        fetchTeams();
        fetchPlayers();
    }, []);


    const toggleTeams = () => setShowTeams(!showTeams);
    const togglePlayers = () => setShowPlayers(!showPlayers);

    const fetchTeams = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/teams`);
            const data = await response.json();
            setTeams(data);
        } catch (error) {
            console.error('Failed to fetch teams:', error);
        }
    };

    const fetchPlayers = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/players`);
            const data = await response.json();
            setPlayers(data);
        } catch (error) {
            console.error('Failed to fetch players:', error);
        }
    };

    // Handlers for creating new team/player
    const handleCreateTeam = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/teams`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTeam)
            });
            if (response.ok) {
                setNewTeam({ abbreviation: '', city: '', conference: '', division: '', full_name: '', name: '' });
                fetchTeams(); 
            }
        } catch (error) {
            console.error('Failed to create team:', error);
        }
    };

    const handleCreatePlayer = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/players`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPlayer)
            });
            if (response.ok) {
                setNewPlayer({ first_name: '', last_name: '', height_feet: '', height_inches: '', position: '', weight_pounds: '', teamID: '' });
                fetchPlayers(); 
            }
        } catch (error) {
            console.error('Failed to create player:', error);
        }
    };

    // Handlers for form field changes
    const handleTeamInputChange = (e) => {
        setNewTeam({ ...newTeam, [e.target.name]: e.target.value });
    };

    const handlePlayerInputChange = (e) => {
        setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
    };

   // Handler to fetch a single team and set it for editing
   const handleFetchTeam = async (teamId) => {
    try {
        const response = await fetch(`${apiBaseUrl}/teams/${teamId}`);
        const data = await response.json();
        setTeamToUpdate(data);
        setSelectedTeamId(teamId);  
    } catch (error) {
        console.error('Failed to fetch team:', error);
    }
};

    // Handler to update a team
    const handleUpdateTeam = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/teams/${selectedTeamId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teamToUpdate)
            });
            if (response.ok) {
                fetchTeams(); 
            }
        } catch (error) {
            console.error('Failed to update team:', error);
        }
    };

    // Handler to delete a team
    const handleDeleteTeam = async (teamId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/teams/${teamId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchTeams(); 
            }
        } catch (error) {
            console.error('Failed to delete team:', error);
        }
    };
     // Handler to fetch a single player and set it for editing
     const handleFetchPlayer = async (playerId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/players/${playerId}`);
            const data = await response.json();
            setPlayerToUpdate(data);
            setSelectedPlayerId(playerId); 
        } catch (error) {
            console.error('Failed to fetch player:', error);
        }
    };

    // Handler to update a player
    const handleUpdatePlayer = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/players/${selectedPlayerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(playerToUpdate)
            });
            if (response.ok) {
                fetchPlayers(); 
            }
        } catch (error) {
            console.error('Failed to update player:', error);
        }
    };

    // Handler to delete a player
    const handleDeletePlayer = async (playerId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/players/${playerId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchPlayers(); 
            }
        } catch (error) {
            console.error('Failed to delete player:', error);
        }
    };

    return (
        <div className='TeamsAndPlayersManagement'>
            <h2>Teams and Players Management</h2>

            {/* Team creation form */}
            <h3>Create Team</h3>
<div>
    <input
        name="abbreviation"
        value={newTeam.abbreviation}
        onChange={handleTeamInputChange}
        placeholder="Abbreviation"
    />
    <input
        name="city"
        value={newTeam.city}
        onChange={handleTeamInputChange}
        placeholder="City"
    />
    <input
        name="conference"
        value={newTeam.conference}
        onChange={handleTeamInputChange}
        placeholder="Conference"
    />
    <input
        name="division"
        value={newTeam.division}
        onChange={handleTeamInputChange}
        placeholder="Division"
    />
    <input
        name="full_name"
        value={newTeam.full_name}
        onChange={handleTeamInputChange}
        placeholder="Full Name"
    />
    <input
        name="name"
        value={newTeam.name}
        onChange={handleTeamInputChange}
        placeholder="Name"
    />
    <button onClick={handleCreateTeam}>Create Team</button>
</div>


            {/* Player creation form */}
            <h3>Create Player</h3>
<div>
    <input
        name="first_name"
        value={newPlayer.first_name}
        onChange={handlePlayerInputChange}
        placeholder="First Name"
    />
    <input
        name="last_name"
        value={newPlayer.last_name}
        onChange={handlePlayerInputChange}
        placeholder="Last Name"
    />
    <input
        type="number"
        name="height_feet"
        value={newPlayer.height_feet}
        onChange={handlePlayerInputChange}
        placeholder="Height (Feet)"
    />
    <input
        type="number"
        name="height_inches"
        value={newPlayer.height_inches}
        onChange={handlePlayerInputChange}
        placeholder="Height (Inches)"
    />
    <input
        name="position"
        value={newPlayer.position}
        onChange={handlePlayerInputChange}
        placeholder="Position"
    />
    <input
        type="number"
        name="weight_pounds"
        value={newPlayer.weight_pounds}
        onChange={handlePlayerInputChange}
        placeholder="Weight (Pounds)"
    />
    <input
        type="number"
        name="teamID"
        value={newPlayer.teamID}
        onChange={handlePlayerInputChange}
        placeholder="Team ID"
    />
    <button onClick={handleCreatePlayer}>Create Player</button>
</div>






            {/* Button to toggle visibility of teams list */}
            <button onClick={toggleTeams}>{showTeams ? 'Hide Teams' : 'Show Teams'}</button>
            {/* Teams list */}
            {showTeams && (
                <div>
                    <h3>Teams</h3>
            <ul>
                {teams.map(team => (
                    <li style={{ color: 'black' }} key={team.id}>
                        {team.full_name} - {team.abbreviation}
                        <button onClick={() => handleFetchTeam(team.id)}>Edit</button>
                        <button onClick={() => handleDeleteTeam(team.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {/* Form to update a team */}
{selectedTeamId && (
    <div>
        <h3>Update Team</h3>
        <input
            name="abbreviation"
            value={teamToUpdate.abbreviation || ''}
            onChange={(e) => setTeamToUpdate({ ...teamToUpdate, abbreviation: e.target.value })}
            placeholder="Abbreviation"
        />
        <input
            name="city"
            value={teamToUpdate.city || ''}
            onChange={(e) => setTeamToUpdate({ ...teamToUpdate, city: e.target.value })}
            placeholder="City"
        />
        <input
            name="conference"
            value={teamToUpdate.conference || ''}
            onChange={(e) => setTeamToUpdate({ ...teamToUpdate, conference: e.target.value })}
            placeholder="Conference"
        />
        <input
            name="division"
            value={teamToUpdate.division || ''}
            onChange={(e) => setTeamToUpdate({ ...teamToUpdate, division: e.target.value })}
            placeholder="Division"
        />
        <input
            name="full_name"
            value={teamToUpdate.full_name || ''}
            onChange={(e) => setTeamToUpdate({ ...teamToUpdate, full_name: e.target.value })}
            placeholder="Full Name"
        />
        <input
            name="name"
            value={teamToUpdate.name || ''}
            onChange={(e) => setTeamToUpdate({ ...teamToUpdate, name: e.target.value })}
            placeholder="Name"
        />
        <button onClick={handleUpdateTeam}>Update Team</button>
    </div>
)}
                </div>
            )}

            {/* Button to toggle visibility of players list */}
            <button onClick={togglePlayers}>{showPlayers ? 'Hide Players' : 'Show Players'}</button>
            {/* Players list */}
            {showPlayers && (
                <div>
                    <h3>Players</h3>
                    <ul>
                        {players.map(player => (
                            <li style={{ color: 'black' }} key={player.id}>
                                {player.first_name} {player.last_name}
                                <button onClick={() => handleFetchPlayer(player.id)}>Edit</button>
                                <button onClick={() => handleDeletePlayer(player.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    {/* Form to update a player */}
                    {selectedPlayerId && (
    <div>
        <h3>Update Player</h3>
        <input
            name="first_name"
            value={playerToUpdate.first_name || ''}
            onChange={(e) => setPlayerToUpdate({ ...playerToUpdate, first_name: e.target.value })}
            placeholder="First Name"
        />
        <input
            name="last_name"
            value={playerToUpdate.last_name || ''}
            onChange={(e) => setPlayerToUpdate({ ...playerToUpdate, last_name: e.target.value })}
            placeholder="Last Name"
        />
        <input
            type="number"
            name="height_feet"
            value={playerToUpdate.height_feet || ''}
            onChange={(e) => setPlayerToUpdate({ ...playerToUpdate, height_feet: e.target.value })}
            placeholder="Height (Feet)"
        />
        <input
            type="number"
            name="height_inches"
            value={playerToUpdate.height_inches || ''}
            onChange={(e) => setPlayerToUpdate({ ...playerToUpdate, height_inches: e.target.value })}
            placeholder="Height (Inches)"
        />
        <input
            name="position"
            value={playerToUpdate.position || ''}
            onChange={(e) => setPlayerToUpdate({ ...playerToUpdate, position: e.target.value })}
            placeholder="Position"
        />
        <input
            type="number"
            name="weight_pounds"
            value={playerToUpdate.weight_pounds || ''}
            onChange={(e) => setPlayerToUpdate({ ...playerToUpdate, weight_pounds: e.target.value })}
            placeholder="Weight (Pounds)"
        />
        <input
            type="number"
            name="teamID"
            value={playerToUpdate.teamID || ''}
            onChange={(e) => setPlayerToUpdate({ ...playerToUpdate, teamID: e.target.value })}
            placeholder="Team ID"
        />
        <button onClick={handleUpdatePlayer}>Update Player</button>
    </div>
)}

                </div>
            )}
        </div>
    );
};

export default TeamsAndPlayersManagement;

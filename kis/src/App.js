import React, { useState } from 'react';
import './App.css';
import DownloadData from './components/DownloadData'; 
import TeamsAndPlayersManagement from './components/TeamsAndPlayersManagement'; 
import TopFifty from './components/TopFifty'; 

function App() {
    const [activeTab, setActiveTab] = useState('download');

    return (
        <div className="App">
            <header className="App-header">
                <h1>NBA App</h1>
                <nav>
                    <ul className="nav-links">
                        <li className={activeTab === 'download' ? 'active' : ''} 
                            onClick={() => setActiveTab('download')}>
                            Download Data
                        </li>
                        <li className={activeTab === 'edit' ? 'active' : ''} 
                            onClick={() => setActiveTab('edit')}>
                            Edit Players and Teams
                        </li>
                        <li className={activeTab === 'topfifty' ? 'active' : ''} 
                            onClick={() => setActiveTab('topfifty')}>
                            Top 50 Players
                        </li>
                    </ul>
                </nav>

                <div className="content">
                    {activeTab === 'download' && <DownloadData />}
                    {activeTab === 'edit' && <TeamsAndPlayersManagement />}
                    {activeTab === 'topfifty' && <TopFifty />} 
                </div>
            </header>
        </div>
    );
}

export default App;

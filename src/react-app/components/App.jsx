import React, {useEffect, useState} from 'react';
import {Container} from 'reactstrap';

import { SettingsContext } from '../contexts/SettingsContext';
import Routes from "./Routes";
import {loadSettings, saveSettings} from "../utils/settingsHelper";

// noinspection JSUnusedLocalSymbols
const cryptoData = [
    {
        id: '1',
        cmc_rank: 1,
        symbol: 'btc',
        name: 'Bitcoin',
        quote: {
            USD: {
                price: 12000.658,
                volume_24h: 100000000,
                percent_change_24h: 10,
                percent_change_7d: -10,
                percent_change_30d: 5.2,
            }
        }
    }
];

const App = () => {
    const [settings, setSettings] = useState(null);

    const updateSettings = (newSettings) => {
        saveSettings(newSettings);
        setSettings(newSettings);
    };

    useEffect(() => {
        loadSettings().then(localSettings => {
            setSettings(localSettings);
        });
    }, []);

    return (
        <Container fluid className="main-app">
            <SettingsContext.Provider value={{
                settings,
                setSettings: updateSettings
            }}>
                <Routes/>
            </SettingsContext.Provider>
        </Container>
    );
};

export default App;
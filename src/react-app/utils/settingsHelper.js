import electron from "./electron-react-wrapper";

const path = window.require('path');
const fs = window.require('fs');

export const loadSettings = async () => {
    const userDataPath = (electron.app || electron.remote.app).getPath(
        'userData'
    );
    const configPath = path.join(userDataPath, 'config.json');

    let fileContent;
    try {
        const fileRaw = await fs.promises.readFile(configPath);
        fileContent = JSON.parse(fileRaw);
    } catch (error) {
        fileContent = {
            coinMarketCapApiKey: null
        };
        await fs.promises.writeFile(configPath, JSON.stringify(fileContent));
    }

    return fileContent;
}

export const saveSettings = async (settings) => {
    const userDataPath = (electron.app || electron.remote.app).getPath(
        'userData'
    );
    const configPath = path.join(userDataPath, 'config.json');
    await fs.promises.writeFile(configPath, JSON.stringify(settings));

    return settings;
}

const { app, autoUpdater, BrowserWindow, dialog } = require('electron');

const updateServerUrl = 'https://github.com/furthestgoose/Who-s-that-pokemon-/releases';

autoUpdater.setFeedURL({ url: updateServerUrl });

app.on('ready', () => {
  createWindow();
  autoUpdater.checkForUpdates();
});

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Available',
    message: 'A new version of the application is available. Would you like to download it now?',
    buttons: ['Download', 'Later']
  }).then((response) => {
    if (response.response === 0) {
      autoUpdater.downloadUpdate();
    }
  }).catch((error) => {
    console.error('Error showing update available dialog:', error);
  });
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Ready',
    message: 'The update has been downloaded and is ready to be installed. Would you like to install it now?',
    buttons: ['Install', 'Later']
  }).then((response) => {
    if (response.response === 0) {
      autoUpdater.quitAndInstall();
    }
  }).catch((error) => {
    console.error('Error showing update ready dialog:', error);
  });
});

autoUpdater.on('error', (error) => {
  if (error.message.includes('No updates available')) {
    // This is not an error, so you can simply log a message or do nothing
    console.log('No updates available.');
  } else {
    console.error('Update error:', error.message);
  }
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('Menu.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
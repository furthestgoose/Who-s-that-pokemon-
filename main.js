const { app,autoUpdater, BrowserWindow,dialog } = require('electron');

const updateServerUrl = 'https://github.com/furthestgoose/Who-s-that-pokemon-/releases'

autoUpdater.setFeedURL({
    url: updateServerUrl
});

setInterval(() => {
    autoUpdater.checkForUpdates();
}, 3600000);

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Available',
    message: 'A new version of the application is available. Would you like to install it now?',
    buttons: ['Install', 'Later']
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
    console.error('Update error:', error.message);
    dialog.showErrorBox('Update Error', 'An error occurred while checking for updates. Please try again later.');
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

  mainWindow.loadFile('Index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

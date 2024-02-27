const { app,autoUpdater, BrowserWindow,dialog } = require('electron');

const updateServerUrl = 'https://github.com/furthestgoose/Who-s-that-pokemon-/releases'
// set update server url

autoUpdater.setFeedURL({
  // sets url as the auto update server
    url: updateServerUrl
});

setInterval(() => {
    autoUpdater.checkForUpdates();
    // checks for updates every hour
}, 3600000);

autoUpdater.on('update-available', () => {
  /* if an update is available a dialog box will be displayed informing the user of this
   and will give them the option to download it now or later*/
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
    // error handling
    console.error('Error showing update available dialog:', error);
  });
});

autoUpdater.on('update-downloaded', () => {
  // once the update is downloaded the user is given the option to install it now or later
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Ready',
    message: 'The update has been downloaded and is ready to be installed. Would you like to install it now?',
    buttons: ['Install', 'Later']
  }).then((response) => {
    if (response.response === 0) {
      // if the user clicks installl the program exits and the update is installed
      autoUpdater.quitAndInstall();
    }
  }).catch((error) => {
    // error handling
    console.error('Error showing update ready dialog:', error);
  });
});


autoUpdater.on('error', (error) => {
  // autoUpdater error handling
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

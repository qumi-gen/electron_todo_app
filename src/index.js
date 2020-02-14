const { app, ipcMain,BrowserWindow } = require('electron');
const path = require('path');
const Datastore = require("nedb");
const db = new Datastore({
  filename:'no_todo.db',
  autoload: true,
  
});


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


ipcMain.on('init-message',function(event){
  db.find({'checked':false}).sort({'score':-1}).exec(function(err,sort_docs){
    event.sender.send('init-replay',sort_docs);
  });
})


ipcMain.on('asynchronous-message', function(event,arg) {
  db.insert(arg,function(err,newDoc){
    console.log('New',newDoc);
  });

    db.find({'checked':false}).sort({'score':-1}).exec(function(err,sort_docs){
    console.log(sort_docs)
    event.sender.send('asynchronous-replay',sort_docs);
  });

});

ipcMain.on('is_check',function(event,arg){
  console.log(arg);
  db.update({_id:arg._id},{$set:{checked:arg.checked}});
  db.find({'checked':false}).sort({'score':-1}).exec(function(err,sort_docs){
    console.log(sort_docs)
    event.sender.send('is_check-replay',sort_docs);
  });

});


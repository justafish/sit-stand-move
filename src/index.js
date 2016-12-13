import menubar from 'menubar';
const {app, Menu} = require('electron');

let mb = menubar({
  'node-integration': false,
  width: 500,
  height: 150
});

mb.on('ready', function ready () {
  let contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      type: 'normal',
      click: function() { app.quit(); }
    }
  ]);
  mb.tray.on('right-click', function() {
    mb.tray.popUpContextMenu(contextMenu);
  });
});

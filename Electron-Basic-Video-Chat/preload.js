const {
    contextBridge,
    desktopCapturer
} = require('electron');

// Expose the desktopCapturer so that the SDK can access to it
// via window.electron.desktopCapturer
contextBridge.exposeInMainWorld(
    'electron', {
      desktopCapturer,
    }
);

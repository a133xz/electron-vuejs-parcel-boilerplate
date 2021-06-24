const { contextBridge, ipcRenderer } = require("electron");

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("electron", {
    on(eventName, callback) {
      ipcRenderer.on(eventName, callback);
    },
    send: (channel, data) => {
      ipcRenderer.send(channel, data);
    }
  });
});

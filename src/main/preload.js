const { contextBridge, ipcRenderer } = require("electron");

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("electron", {
    send: (channel, data) => {
      // whitelist channels
      let validChannels = ["toMain", "showDialog"];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      let validChannels = ["fromMain"];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    }
  });
});

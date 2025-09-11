import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { codingAgent } from '../src/agent/agents/coding-agent';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('electron/index.html');
}

ipcMain.on('run-agent', async (event, input) => {
  const textStream = await codingAgent.run(input);
  let response = '';
  for await (const text of textStream) {
    response += text;
    event.sender.send('agent-response-stream', text);
  }
  codingAgent.memory.add({ role: 'assistant', content: response });
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

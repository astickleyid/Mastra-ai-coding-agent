import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  runAgent: (input: string) => ipcRenderer.send('run-agent', input),
  onAgentResponse: (callback: (response: string) => void) => {
    ipcRenderer.on('agent-response-stream', (event, response) => {
      callback(response);
    });
  },
});

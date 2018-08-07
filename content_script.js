const port = browser.runtime.connect();
port.onMessage.addListener((message) => {
  console.log(`Content: Received message ${message.type}`);
  if (message.type === 'background-ready') {
    console.log('Content: background ready');
    port.postMessage({
      type: 'page-data',
      data: window.location.href,
    });
  }
});
port.onDisconnect.addListener(() => {
  console.log('Content: Background not ready');
});
console.log('Content: Initialized');

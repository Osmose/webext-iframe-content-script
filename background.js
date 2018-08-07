browser.runtime.onConnect.addListener((port) => {
  console.log('Background: onConnect');
  port.onMessage.addListener((message) => {
    if (message.type === 'page-data') {
      console.log(`Background: Received page-data: ${message.data}`);
    }
  });
  port.postMessage({
    type: 'background-ready',
  });
  console.log('Background: Ready message sent');
});

setInterval(() => {
  console.log('Background: Creating iframe');

  const oldIframe = document.getElementById('iframe');
  if (oldIframe) {
    oldIframe.remove();
  }

  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.mkelly.me/fake-product-page/';
  iframe.id = 'iframe';
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
  document.body.appendChild(iframe);
  console.log('Background: iframe created');
}, 5000);

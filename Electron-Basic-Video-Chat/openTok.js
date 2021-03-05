// Set Credentials
const apiKey = '100';
const sessionId = '2_MX4xMDB-fjE2MTQ5NTgyMzUwMjh-cDk0WE9MbkgrcERGTmNuOTBkSnBBdi9Efn4';
const token = 'T1==cGFydG5lcl9pZD0xMDAmc2lnPWEyOGNjODViM2EzMTExZTU2ZTZjNjFlZWJjNDE1MzM4Y2NhZDNhZmU6c2Vzc2lvbl9pZD0yX01YNHhNREItZmpFMk1UUTVOVGd5TXpVd01qaC1jRGswV0U5TWJrZ3JjRVJHVG1OdU9UQmtTbkJCZGk5RWZuNCZjcmVhdGVfdGltZT0xNjE0OTU4MjM1Jm5vbmNlPTAuNzAyODMyOTY0NzY2MDMxOSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjE1MDQ0NjM1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';

if (!apiKey || !sessionId || !token) {
  alert('You need to add your apiKey, sessionId and token to openTok.js');
}

// Initialize Session
const session = OT.initSession(apiKey, sessionId);

// Set session event listeners
session.on({
  streamCreated: (event) => {
    session.subscribe(event.stream, 'subscriber', (error) => {
      if (error) {
        console.error(`There was an issue subscribing to the stream: ${error}`);
      }
    });
  },
  streamDestroyed: (event) => {
    console.log(`Stream with name ${event.stream.name} ended because of reason: ${event.reason}`);
  }
});

// Create a publisher
const publisher = OT.initPublisher('publisher', { videoSource: 'screen' }, (initError) => {
  if (initError) {
    console.error(`There was an error initializing the publisher: ${initError}`);
  }
});

// Connect to the session
session.connect(token, (error) => {
  // If the connection is successful, initialize a publisher and publish to the session
  if (error) {
    console.error(`There was an error connecting to session: ${error}`);
    publisher.destroy();
    return;
  }
  session.publish(publisher, (pubError) => {
    if (pubError) {
      console.error(`There was an error when trying to publish: ${pubError}`);
    }
  });
});

import {DeviceEventEmitter} from 'react-native';
import pairing from './pairing.json';

interface Config {
  url?: string;
}

var cidPrefix = (
  '0000000' + Math.floor(Math.random() * 0xffffffff).toString(16)
).slice(-8);
var cidCount = 0;
function getCid() {
  return cidPrefix + ('000' + (cidCount++).toString(16)).slice(-4);
}

const json = JSON.stringify({
  id: getCid(),
  type: 'subscribe',
  uri: 'ssap://audio/getVolume',
  // payload: {volume: 7},
});

export const connect = ({url = 'ws://192.168.68.61:3000'}: Config) => {
  const socket = new WebSocket(url, '', {
    headers: {
      Origin: 'null',
    },
  });

  console.log('Connecting');
  const payload = {
    ...pairing,
    'client-key': '708019c71bd81683c22bc3a86f2ddffe',
  };

  socket.addEventListener('open', () => {
    socket.send(
      JSON.stringify({
        type: 'register',
        id: getCid(),
        payload: payload,
      }),
    );
    // console.log(connection);
  });

  socket.addEventListener('close', message => {
    console.log('closed', message);
  });

  socket.addEventListener('message', message => {
    console.log(message);
    socket.send(json);
  });

  socket.addEventListener('error', error => {
    console.error('FAILED TO CONNECT TO SOCKET');
    console.error(error);
  });
};

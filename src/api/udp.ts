import {UdpSocket} from 'react-native-udp';
import dgram from 'react-native-udp';

const send = (
  socket: UdpSocket,
  message: Buffer,
  ip: string = '239.255.255.250',
  port: number = 1900,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.send(message, 0, message.length, port, ip, function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};

interface Options {
  broadcast?: boolean;
}
function createSocket({broadcast}: Options = {}) {
  return new Promise<UdpSocket>((resolve, reject) => {
    const handleSocketErrors = (err: any) => {
      socket.close();
      reject(err);
    };
    const socket = dgram
      .createSocket({type: 'udp4'})
      .on('error', handleSocketErrors)
      .once('bound', () => {
        if (broadcast) socket.setBroadcast(true);
        socket.startReceiving();
      })
      .once('listening', function () {
        socket.removeListener('error', handleSocketErrors);
        resolve(socket);
      });
    socket.bind();
  });
}
export const udpService = {
  send,
  createSocket,
};

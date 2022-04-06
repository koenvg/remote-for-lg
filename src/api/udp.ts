import UdpSocket from 'react-native-udp/lib/types/UdpSocket';

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
export const udpService = {
  send,
};

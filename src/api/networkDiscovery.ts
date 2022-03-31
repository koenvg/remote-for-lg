import dgram from 'react-native-udp';
import {Buffer} from 'buffer';
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

const broadcastSsdp = (
  socket: UdpSocket,
  ip: string = '239.255.255.250',
  port: number = 1900,
  target: string = 'ssdp:all',
) => {
  const query = Buffer.from(
    'M-SEARCH * HTTP/1.1\r\n' +
      `HOST: ${ip}:${port}\r\n` +
      'MAN: "ssdp:discover"\r\n' +
      'MX: 4\r\n' +
      `ST: ${target}\r\n` +
      'USER-AGENT: UDAP/2.0\r\n' +
      '\r\n',
  );
  return send(socket, query, ip, port);
};

interface SsdpResponse {
  LOCATION: string;
  SERVER: string;
  OPT: string;
  USN: string;
  ST: string;
}

interface DeviceInfo {
  address: string;
  family: string;
  port: number;
}
interface Device {
  info: DeviceInfo;
  response: SsdpResponse;
}

const parseMessage = (msg: Buffer) => {
  const msgString = msg.toString();

  const response = msgString
    .split('\n')
    .map(line => {
      const [key, ...value] = line.split(':');
      return [key, value.join(':').trim()];
    })
    .filter(([key, value]) => !!key && !!value)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as any) as SsdpResponse;

  return response;
};

export const discoverDevices = () => {
  return new Promise<Device[]>((resolve, reject) => {
    let timeoutID: number;
    const socket = dgram.createSocket({type: 'udp4', debug: true});
    socket.bind(12345);
    const devices: Device[] = [];

    socket.once('listening', () => {
      broadcastSsdp(socket, '239.255.255.250', 1900);
    });

    const closeSocketWithTimeout = () =>
      setTimeout(() => {
        socket.close();
        resolve(devices);
      }, 100);

    socket.on('message', function (msg: Buffer, info: DeviceInfo) {
      devices.push({
        info,
        response: parseMessage(msg),
      });

      clearTimeout(timeoutID);
      timeoutID = closeSocketWithTimeout() as any;
    });

    socket.on('error', error => {
      console.error(error);
      reject(error);
    });
  });
};

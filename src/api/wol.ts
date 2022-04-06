import dgram from 'react-native-udp';
import UdpSocket from 'react-native-udp/lib/types/UdpSocket';
import {Buffer} from 'buffer';
import {udpService} from './udp';
import {delay} from 'fp-ts/lib/Task';
import {NetworkInfo} from 'react-native-network-info';

function createMagicPacket(mac: string) {
  const MAC_REPEAT = 16;
  const MAC_LENGTH = 0x06;
  const PACKET_HEADER = 0x06;
  const parts = mac.match(/[0-9a-fA-F]{2}/g);
  if (!parts || parts.length !== MAC_LENGTH)
    throw new Error(`malformed MAC address "${mac}"`);
  var buffer = Buffer.alloc(PACKET_HEADER);
  var bufMac = Buffer.from(parts.map(p => parseInt(p, 16)));
  buffer.fill(0xff);
  for (var i = 0; i < MAC_REPEAT; i++) {
    buffer = Buffer.concat([buffer, bufMac]);
  }
  return buffer;
}

function createSocket() {
  return new Promise<UdpSocket>((resolve, reject) => {
    const handleSocketErrors = (err: any) => {
      socket.close();
      reject(err);
    };
    const socket = dgram
      .createSocket({type: 'udp4'})
      .on('error', handleSocketErrors)
      .once('listening', function () {
        socket.off('error', handleSocketErrors);
        resolve(socket);
      });
    socket.bind();
  });
}

export async function wake(mac: string) {
  const address = await NetworkInfo.getBroadcast().then(b =>
    b ? b : '255.255.255.255',
  );

  const ports = [7, 9];
  const magicPacket = createMagicPacket(mac);
  const socket = await createSocket();

  await ports.map(port => udpService.send(socket, magicPacket, address, port));

  await delay(1000)(() => {
    socket.close();
    return Promise.resolve();
  })();
}

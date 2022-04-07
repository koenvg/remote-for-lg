import {Buffer} from 'buffer';
import {udpService} from './udp';

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

export async function wake(mac: string) {
  const address = '255.255.255.255';
  const ports = [7, 9];

  const magicPacket = createMagicPacket(mac);
  const socket = await udpService.createSocket();

  await Promise.all(
    ports.map(port => udpService.send(socket, magicPacket, address, port)),
  );

  socket.close();
}

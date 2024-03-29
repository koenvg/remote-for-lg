import {UdpSocket} from 'react-native-udp';
import {Buffer} from 'buffer';
import {XMLParser} from 'fast-xml-parser';
import {flow, pipe} from 'fp-ts/lib/function';
import {option, readonlyNonEmptyArray, record, string} from 'fp-ts';
import {udpService} from './udp';

// ssdp:all
// urn:schemas-upnp-org:device:MediaRenderer:1
const broadcastSsdp = (
  socket: UdpSocket,
  ip: string = '239.255.255.250',
  port: number = 1900,
  target: string = 'urn:dial-multiscreen-org:service:dial:1',
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
  return udpService.send(socket, query, ip, port);
};

export interface SsdpResponse {
  location: string;
  server: string;
  usn: string;
  st: string;
  wakeup?: string;
}

export interface DeviceInfo {
  address: string;
  family: string;
  port: number;
  mac?: string;
}
export interface Service {
  info: DeviceInfo;
  response: SsdpResponse;
}

const parseMessage = (msg: Buffer) => {
  const msgString = msg.toString();

  const response = msgString
    .split('\n')
    .map(line => {
      const [key, ...value] = line.split(':');
      return [key.toLowerCase(), value.join(':').trim()];
    })
    .filter(([key, value]) => !!key && !!value)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as any) as SsdpResponse;

  return response;
};

function extractMAC(ssdp: SsdpResponse) {
  return pipe(
    option.fromNullable(ssdp.wakeup),
    option.map(
      flow(
        string.split(';'),
        readonlyNonEmptyArray.map(string.split('=')),
        readonlyNonEmptyArray.reduce(
          {} as Record<string, string>,
          (acc, [key, value]) => {
            acc[key] = value;
            return acc;
          },
        ),
      ),
    ),
    option.chain(record.lookup('MAC')),
    option.getOrElse(() => ''),
  );
}

export const discoverServices = async () => {
  const socket = await udpService.createSocket();
  return new Promise<Service[]>((resolve, reject) => {
    const services: Service[] = [];
    socket.on('message', function (msg: string, info: Omit<DeviceInfo, 'mac'>) {
      const response = parseMessage(Buffer.from(msg));
      services.push({
        info: {
          ...info,
          mac: extractMAC(response),
        },
        response,
      });
    });

    socket.on('error', error => {
      console.error(error);
      reject(error);
      socket.close();
    });

    const interval = setInterval(
      () => broadcastSsdp(socket, '239.255.255.250', 1900),
      500,
    );
    setTimeout(() => {
      resolve(services);
      clearInterval(interval);
      socket.close();
      // TODO: Don't export this as a promise to waiting becomes the responsibility of the consumer?
    }, 10000);
  });
};

export interface DeviceDescription {
  friendlyName: string;
}

export async function fetchDeviceDescription(
  deviceInfo: SsdpResponse,
): Promise<DeviceDescription> {
  const res = await fetch(deviceInfo.location);
  if (res.status >= 300) throw new Error(res.statusText);

  if (!res.headers.get('Content-Type')?.includes('text/xml'))
    throw new Error('Invalid device information response');

  const content = await res.text();

  const parser = new XMLParser();
  const obj = parser.parse(content);
  return obj.root.device;
}

export async function ping(ip: string) {
  const res = await fetch(`http://${ip}`);
  if (res.status >= 300) throw new Error(res.statusText);
}

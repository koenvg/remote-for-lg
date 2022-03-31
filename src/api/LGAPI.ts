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

interface Message {
  type: 'request';
  payload?: any;
  uri?: string;
}

interface Response<T = undefined> {
  id: string;
  type: 'registered';
  payload: T;
}

interface PointerInputSocketResponse {
  socketPath: string;
}

interface VolumeStatusResponse {
  mute: boolean;
  scenario: string;
  volume: number;
  volumeMax: number;
}

const sendRequest = <T = undefined>(
  data: Message,
  socket: WebSocket,
): Promise<Response<T>> => {
  const id = getCid();
  return new Promise<Response<T>>((resolve, reject) => {
    const handler = (response: WebSocketMessageEvent) => {
      const res = JSON.parse(response.data);
      if (res.id !== id) return;

      socket.removeEventListener('message', handler);

      if (res.type === 'error') return reject(res);
      resolve(res);
    };

    socket.addEventListener('message', handler);
    socket.send(JSON.stringify({...data, id}));
  });
};

const authorize = async (socket: WebSocket) => {
  const auth = await sendRequest(pairing as any, socket);
  return auth;
  // TODO new pairing requests
};

const createSocket = (url: string) => {
  return new Promise<WebSocket>((resolve, reject) => {
    const socket = new WebSocket(url, '', {
      headers: {
        Origin: 'null',
      },
    });

    const openHandler = () => {
      cleanup();
      resolve(socket);
    };

    const errorHandler = (err: WebSocketErrorEvent) => {
      cleanup();
      console.error(err);
      reject(err);
    };

    const cleanup = () => {
      socket.removeEventListener('error', errorHandler);
      socket.removeEventListener('open', openHandler);
    };

    socket.addEventListener('open', openHandler);
    socket.addEventListener('error', errorHandler);
  });
};

export const connect = async ({url = 'ws://192.168.68.61:3000'}: Config) => {
  const socket = await createSocket(url);
  await authorize(socket);

  return new LGAPI(socket);
};

type Button =
  | 'LEFT'
  | 'UP'
  | 'DOWN'
  | 'RIGHT'
  | 'HOME'
  | 'BACK'
  | 'ENTER'
  | 'BACK'
  | 'DASH'
  | 'INFO'
  | 'EXIT'
  | 'VOLUMEUP'
  | 'VOLUMEDOWN'
  | 'PLAY'
  | 'PAUSE'
  | 'STOP'
  | 'REWIND'
  | 'FASTFORWARD';

export class LGAPI {
  private pointerSocket: WebSocket | null = null;
  constructor(public socket: WebSocket) {}

  private async getPointerSocket() {
    if (this.pointerSocket) return this.pointerSocket;

    const {
      payload: {socketPath},
    } = await sendRequest<PointerInputSocketResponse>(
      {
        type: 'request',
        uri: 'ssap://com.webos.service.networkinput/getPointerInputSocket',
      } as any,
      this.socket,
    );

    this.pointerSocket = await createSocket(socketPath);
    return this.pointerSocket;
  }

  powerOff() {
    return sendRequest(
      {
        type: 'request',
        uri: 'ssap://system/turnOff',
      },
      this.socket,
    );
  }
  volumeUp() {
    return sendRequest(
      {
        type: 'request',
        uri: 'ssap://audio/volumeUp',
      },
      this.socket,
    );
  }

  volumeDown() {
    return sendRequest(
      {
        type: 'request',
        uri: 'ssap://audio/volumeDown',
      },
      this.socket,
    );
  }

  async getVolume() {
    const response = await sendRequest<VolumeStatusResponse>(
      {
        type: 'request',
        uri: 'ssap://audio/getStatus',
      },
      this.socket,
    );

    return response.payload;
  }

  setVolume(volume: number) {
    return sendRequest(
      {
        type: 'request',
        uri: 'ssap://audio/setVolume',
        payload: {volume},
      },
      this.socket,
    );
  }

  async click() {
    const p = await this.getPointerSocket();
    p.send('type:click\n\n\n');
  }

  async press(button: Button) {
    const p = await this.getPointerSocket();
    p.send(`type:button\nname:${button}\n\n\n`);
  }
}

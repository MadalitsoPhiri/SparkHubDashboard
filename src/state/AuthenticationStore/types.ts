import { Socket } from 'socket.io-client';

export interface ISocket extends Socket {
  _readyState?: string;
}

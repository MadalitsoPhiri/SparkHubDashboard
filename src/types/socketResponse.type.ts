export type SocketResponse<T> = {
  data: T extends Array<T> ? T[] : T | null;
  error: string | null;
};

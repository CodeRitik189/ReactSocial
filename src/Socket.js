import io from "socket.io-client";
const ENDPOINT = 'http://localhost:8001';
const socket = io(ENDPOINT);
export default socket;
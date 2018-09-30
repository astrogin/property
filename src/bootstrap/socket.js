import socketIo from 'socket.io-client';
const instance = socketIo('http://propertypanel.test/');
let currentSocketUser = '';

export default {
  instance,
  currentSocketUser,
};

import io from 'socket.io-client'

const connection = io(process.env.VUE_APP_SOCKET_SERVER_URL)

export default connection

require('dotenv').config();
const redis = require('redis');
let client;

try {
  client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: 1
  }); // crear la conexión del cliente
  // host: IP del servidor Redis
  // port: Puerto del servidor Redis

  client.on('error', function (error) {
    console.error(error);
  });
  console.log(redis);
} catch (error) {
  console.error('Error de acceso a Redis: ' + error);
}

module.exports = client;

/**
 * Graceful server termination handler
 */
export const setupGracefulShutdown = (server, mongoose) => {
  const handler = async (signal) => {
    console.log(`Received ${signal}. Closing server gracefully.`);
    server.close(() => {
      mongoose.connection.close(false, () => {
        process.exit(0);
      });
    });
  };
  process.on('SIGTERM', () => handler('SIGTERM'));
  process.on('SIGINT', () => handler('SIGINT'));
};

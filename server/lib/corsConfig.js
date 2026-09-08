/**
 * CORS configurations
 */
export const getCorsOptions = () => ({
  origin: process.env.CLIENT_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

import withPWA from 'next-pwa';

const nextConfig = withPWA({
  dest: 'public', // Where the service worker will be output
  register: true, // Automatically registers the service worker
  skipWaiting: true, // Activates the new service worker as soon as it's installed
  // reactStrictMode: true, // Optional: Enable React's strict mode
});

export default nextConfig;

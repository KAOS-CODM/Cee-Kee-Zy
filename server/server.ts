import dotenv from 'dotenv';
import dns from 'node:dns';

// Force Cloudflare DNS
dns.setServers(['1.1.1.1', '1.0.0.1']);
dotenv.config();
console.log(process.env.MONGODB_URI);

import { app } from './src/app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] listening on http://localhost:${PORT}`);
});


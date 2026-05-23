import express from 'express';
const app = express();

try {
  app.get(/.*/, (req, res) => res.send('ok'));
  console.log('/.*/ works');
} catch (e) { console.error('/.*/ error', e.message); }

try {
  app.get('/', (req, res) => res.send('ok'));
  console.log('/ works');
} catch (e) { console.error('/ error', e.message); }

try {
  app.get('/{*}', (req, res) => res.send('ok'));
  console.log('/{*} works');
} catch (e) { console.error('/{*} error', e.message); }


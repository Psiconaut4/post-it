import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.routes.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json()); // Para processar JSON via POST

app.use('/api/auth', authRoutes);

app.listen(6969, () => {
  console.log('Servidor rodando em http://localhost:6969');
});

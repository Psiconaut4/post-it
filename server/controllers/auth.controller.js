// server/controllers/auth.controller.js

// Simulação de banco (por enquanto em memória)
const users = [];

export function registerUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Campos obrigatórios' });

  const exists = users.find(user => user.username === username);
  if (exists)
    return res.status(409).json({ message: 'Usuário já existe' });

  users.push({ username, password }); // OBS: sem hash ainda
  return res.status(201).json({ message: 'Usuário registrado com sucesso' });
}

export function loginUser(req, res) {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user)
    return res.status(401).json({ message: 'Credenciais inválidas' });

  return res.status(200).json({ message: 'Login bem-sucedido', user: { username } });
}

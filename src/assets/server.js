const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/ping', (req, res) => {
  const ip = req.body.ip;

  if (!/^[a-zA-Z0-9\.\-]+$/.test(ip)) {
    return res.status(400).send('Invalid domain or IP address');
  }

  const cmd = process.platform === 'win32'
    ? `ping -n 4 ${ip}`
    : `ping -c 4 ${ip}`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr || err.message });
    }
    res.send(stdout);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Ping server running at http://localhost:${PORT}`);
});

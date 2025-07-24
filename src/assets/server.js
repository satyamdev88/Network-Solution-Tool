const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🟢 Ping Once (POST /ping-once)
app.post('/ping-once', (req, res) => {
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

// 🔁 Continuous Ping (GET /ping-continuous/:ip)
app.get('/ping-continuous/:ip', (req, res) => {
  const ip = req.params.ip;

  if (!/^[a-zA-Z0-9\.\-]+$/.test(ip)) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Invalid domain or IP address');
    return;
  }

  const cmd = process.platform === 'win32'
    ? `ping -t ${ip}`
    : `ping ${ip}`;

  const pingProcess = exec(cmd);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  pingProcess.stdout.on('data', (data) => {
    data.split('\n').forEach(line => {
      res.write(`data: ${line.trim()}\n\n`);
    });
  });

  pingProcess.stderr.on('data', (data) => {
    res.write(`data: Error: ${data.trim()}\n\n`);
  });

  pingProcess.on('close', (code) => {
    res.write(`data: Ping process exited with code ${code}\n\n`);
    res.end();
  });

  req.on('close', () => {
    pingProcess.kill();
  });
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`✅ Ping server running at http://localhost:${PORT}`);
});























// const express = require('express');
// const cors = require('cors');
// const { exec } = require('child_process');

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// app.post('/ping', (req, res) => {
//   const ip = req.body.ip;

//   if (!/^[a-zA-Z0-9\.\-]+$/.test(ip)) {
//     return res.status(400).send('Invalid domain or IP address');
//   }

//   const cmd = process.platform === 'win32'
//     ? `ping -n 4 ${ip}`
//     : `ping -c 4 ${ip}`;

//   exec(cmd, (err, stdout, stderr) => {
//     if (err) {
//       return res.status(500).json({ error: stderr || err.message });
//     }
//     res.send(stdout);
//   });
// });

// app.listen(PORT, () => {
//   console.log(`✅ Ping server running at http://localhost:${PORT}`);
// });

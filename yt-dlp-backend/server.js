const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // Mengizinkan CORS
app.use(express.json()); // Parsing JSON body

// Endpoint untuk menerima URL video dan mengunduhnya dengan yt-dlp
app.post('/download', (req, res) => {
  const videoUrl = req.body.url;

  if (!videoUrl) {
    return res.status(400).json({ message: 'URL video diperlukan' });
  }

  // Command yt-dlp untuk mengunduh video
  const command = `yt-dlp -f best --get-url "${videoUrl}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ message: 'Terjadi kesalahan saat menjalankan yt-dlp' });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).json({ message: 'Error saat mengunduh video' });
    }

    // Mengirimkan URL unduhan kembali ke client (React)
    const downloadUrl = stdout.trim(); // stdout mengandung URL unduhan
    res.json({ downloadUrl });
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
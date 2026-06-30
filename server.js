const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Point de terminaison (Proxy) pour tester n'importe quelle API sans erreur CORS
app.post('/api/proxy', async (req, res) => {
    const { url, method, body, headers } = req.body;
    try {
        const response = await axios({
            method: method || 'GET',
            url: url,
            data: body || null,
            headers: headers || {}
        });
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message, details: error.response?.data });
    }
});

// Redirection par défaut vers le Dashboard
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`⚡ [Minato] Dashboard actif sur le port ${PORT}`);
});


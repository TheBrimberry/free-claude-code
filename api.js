const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

// Implementing the Claude API-compatible server endpoint
app.post('/messages', async (req, res) => {
    try {
        const response = await axios.post(CLAUDE_API_URL, req.body, {
            headers: {
                'Authorization': `Bearer ${process.env.CLAUDE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response ? error.response.status : 500).send({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

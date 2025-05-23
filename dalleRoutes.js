import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import OpenAI from 'openai'; // ✅ Correct import for v4+
import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

// ✅ Correct configuration for OpenAI v4+
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
  res.send('Hello from DALL-E');
});

// ✅ Example route for generating an image using OpenAI DALL·E
router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    res.status(200).json({ photo: response.data[0].url });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

router.route('/').post(async(req,res) => {
  try{
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({photo: image});
  } catch(error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message)

  }
})

export default router;
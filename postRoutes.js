import express from 'express';
import * as dotenv from 'dotenv';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

// Define post-related routes here
// Example:
// router.post('/', async (req, res) => { ... });

export default router; // ✅ Add this

import express from 'express';
import Feedback from '../models/Feedback.js'; 
const router = express.Router();

router.post('/', async (req, res) => {
    const { feedback, user_id } = req.body;

    console.log(feedback, user_id);

    try {
        const newFeedback = new Feedback({
            content:feedback,
            user_id,
        });

        await newFeedback.save();

        res.status(200).json({ message: 'Feedback received successfully' });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;

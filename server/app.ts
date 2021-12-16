import express from 'express';
import cors from 'cors';
import graphRoutes from './controllers/graph';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(graphRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start()
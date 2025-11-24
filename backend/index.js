import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mime from "mime";

const app = express();

app.use(cookieParser());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
dotenv.config();



app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, filePath) => {
      const mimeType = mime.getType(filePath);
      if (mimeType) res.setHeader("Content-Type", mimeType);
    },
  })
);


connectDB();

const PORT = 5000;

app.use(cors({
  origin: [
    'http://localhost:3000',       
    'http://172.28.148.150:3000',
  ],
  credentials: true
}));
app.use(express.json());



app.use("/api", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/activity", activityRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});

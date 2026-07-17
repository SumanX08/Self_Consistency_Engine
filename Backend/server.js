import express from "express";
import cors from "cors";

import answerRoutes from "./routes/answerRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/generate", answerRoutes);


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
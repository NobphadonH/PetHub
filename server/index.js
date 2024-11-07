import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import petRoutes from "./routes/pet.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const corsOption = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOption));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/auth", authRoutes);
app.use("/api/pet", petRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

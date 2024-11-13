import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import petRoutes from "./routes/pet.route.js";
import hotelRoutes from "./routes/hotel.route.js";
import creditCardRoutes from "./routes/creditCard.route.js";
import userRoutes from "./routes/user.route.js";
import roomSearchRoutes from "./routes/roomSearch.route.js";
import bookingRoutes from "./routes/booking.route.js";
import roomRoutes from "./routes/room.route.js"

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
app.use("/api/hotel", hotelRoutes);
app.use("/api/creditCard", creditCardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/roomSearch", roomSearchRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/room", roomRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

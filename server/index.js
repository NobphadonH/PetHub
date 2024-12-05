import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import petRoutes from "./routes/pet.route.js";
import hotelRoutes from "./routes/hotel.route.js";
import userRoutes from "./routes/user.route.js";
import roomSearchRoutes from "./routes/roomSearch.route.js";
import bookingRoutes from "./routes/booking.route.js";
import roomRoutes from "./routes/room.route.js";
import getHotelProfileRoutes from "./routes/getHotelProfile.route.js";
import roomManageRoutes from "./routes/roomManage.route.js";
import paymentRoutes from "./routes/payment.route.js";
import reviewRoutes from "./routes/review.route.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: ["http://localhost:4173", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOption));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/auth", authRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/user", userRoutes);
app.use("/api/roomSearch", roomSearchRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/getHotelProfile", getHotelProfileRoutes);
app.use("/api/roomManage", roomManageRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/review", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

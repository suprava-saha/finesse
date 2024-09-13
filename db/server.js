import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import cartRouter from "./routes/cartRoute.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/userRoute.js";
import swaggerUi from 'swagger-ui-express'; // Import swagger-ui-express to serve Swagger UI
import swaggerSpec from './config/swagger.js'; // Import swaggerSpec created above
// const swaggerDocument = require('./src/configs/swagger.json');  // load swaggerSpec from file
import  categoryRoutes  from './routes/CategoryRoutes.js'; // Ensure file name matches
import rawMaterialRoutes from './routes/RawMaterialRoutes.js'; // Ensure file name matches
import notificationRoutes from './routes/NotificationRoutes.js'; // Ensure file name matches

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();


// Use routes
app.use('/api/categories', categoryRoutes);
app.use('/api/raw-materials', rawMaterialRoutes); // Uncomment if you want to use this route
app.use('/api/notifications', notificationRoutes); // Uncomment if you want to use this route


// Serve the Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// // load swagger from json file
// var options = {
//   swaggerOptions: {
//       url: "/api-docs/swagger.json",
//   },
// }
// app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
// app.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);


// Define server port
const APPLICATION_PORT = process.env.APPLICATION_PORT; // Default to 3000 if environment variable is not set

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(APPLICATION_PORT, () => {
  console.log(`Server running on port ${APPLICATION_PORT}`);
  console.log(`Swagger docs available at http://${process.env.APPLICATION_HOST}:${APPLICATION_PORT}/api-docs`);
});

import express from "express";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoutes";
import authRoute from "./routes/authRoutes";
import { verify } from "./middlewares/verify";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const prefix = "/backend/api";

app.use(prefix + "/auth", authRoute);
app.use(prefix + "/users", verify, userRoute); // Use verify middleware here

const port = 5000;

// Use backticks for template literals
app.listen(port, () => console.log(`Server running on port ${port}`));

import express from "express";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoutes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/users", userRoute);

const port = 5000;

app.listen(port, ()=>console.log("Server running on port ${port}"))
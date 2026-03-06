import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {ENV} from "./lib/env.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

const PORT = ENV.PORT || 3000;

app.use(express.json())  //req.body
app.use(cookieParser());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

server.listen(PORT, ()=>{
  console.log("server running on port " + PORT);
  connectDB();
});
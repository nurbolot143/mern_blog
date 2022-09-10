import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validations.js";
import { UserController, PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import config from "./config.js";

mongoose
  .connect(
    `mongodb+srv://Nurbolot:${config.password}@cluster0.rs7yl3c.mongodb.net/blog?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DB Ok");
  })
  .catch((e) => {
    console.log("DB error", e);
  });

const app = express();

const PORT = process.env.PORT || 4444;

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("uploads"));

//Authorization
app.get("/", (req, res) => {
  res.send("111 Hello World!");
});

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.get("/auth/me", checkAuth, UserController.getMe);
//-------

//Uploads
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
//-------

//Posts
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);

app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.delete("/posts/:id", checkAuth, PostController.remove);
//-------

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started on port ${PORT}`);
});

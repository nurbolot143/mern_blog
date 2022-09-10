import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config.js";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { email, fullName, avatarUrl, password } = req.body;

    const salt = await bcrypt.genSalt(7);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email,
      fullName,
      avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.secret,
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось зарегистрироваться" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.secret,
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось авторизоваться" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Нет доступа" });
  }
};

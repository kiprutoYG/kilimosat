// src/controllers/auth.controller.js

const authService = require("../services/auth.service");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const token = await authService.login(email, password);

    return res.status(200).json({
      success: true,
      token,
    });

  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email, name, password, role } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, name,and password are required",
      });
    }
    const user = await authService.register(email, name, password, role);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
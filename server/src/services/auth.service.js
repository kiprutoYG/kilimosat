const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (email, password) => {
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user: { id: user.id, name: user.user_name, role: user.role } };
};

exports.register = async (email, name, password, role) => {
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  //save to db
  const result = await db.query(
    "INSERT INTO users (email, user_name, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, email, user_name, role",
    [email, name, password_hash, role]
  );

  return result.rows[0];
};

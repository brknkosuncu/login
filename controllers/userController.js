import postgresClient from "../config/db.js";



// Kayıt ol
export const signUp = async (req, res) => {
  try {
    const text =
      "INSERT INTO users (email, password, fullname, user_role, about, city, degree) VALUES ($1,crypt($2, gen_salt('bf')), $3, $4, $5, $6, $7) RETURNING *";

    const values = [
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.userRole,
      req.body.about,
      req.body.city,
      req.body.degree
    ];

    const { rows } = await postgresClient.query(text, values);
    return res.status(201).json({ createdUser: rows[0] });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(400).json({ message: error.message });
  }
};

// Giriş Yap
export const signIn = async (req, res) => {
  try {
    const text =
      "SELECT * FROM users WHERE email = $1 AND password = crypt($2, password)";

    const values = [req.body.email, req.body.password];

    const { rows } = await postgresClient.query(text, values);

    if (!rows.length)
      return res.status(400).json({ message: "User not found..." });

    return res.status(200).json({ message: "Successful" });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(400).json({ message: error.message });
  }
};

// Kullanıcı Güncelle
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const text =
      "UPDATE users SET email = $1, fullname = $2 WHERE id = $3 RETURNING *";

    const values = [req.body.email, req.body.fullname, userId];

    
    const { rows } = await postgresClient.query(text, values);
    if (!rows.length)
      return res.status(400).json({ message: "User not found..." });

    
    return res.status(200).json({ updatedUser: rows[0] });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(400).json({ message: error.message });
  }
};

// Kullanıcı Sil
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const text = "DELETE FROM users WHERE id = $1 RETURNING *";

    const values = [userId];

    const { rows } = await postgresClient.query(text, values);
    if (!rows.length)
      return res.status(400).json({ message: "User not found..." });

    return res.status(200).json({ deletedUser: rows[0] });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(400).json({ message: error.message });
  }
};

// Bütün Kullanıcıları Getir
export const getAllUsers = async (req, res) => {
  try {
    const text = "SELECT * FROM users ORDER BY id ASC";

    const { rows } = await postgresClient.query(text);

    return res.status(200).json(rows);
  } catch (error) {
    console.log("Error", error.message);
    return res.status(400).json({ message: error.message });
  }
};

// Id'ye Göre Kullanıcı Getir
export const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const text = "SELECT * FROM users WHERE id = $1";

    const values = [userId];

    const { rows } = await postgresClient.query(text, values);

    return res.status(200).json({ user: rows[0] });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(400).json({ message: error.message });
  }
};

// Mentor, Mentee ya da Admin Listele
export const getMentorOrMenteeUsers = async (req, res) => {
  try {
    const { roleId } = req.params;

    const text = "SELECT * FROM users WHERE user_role=$1";
    const values = [roleId];

    const { rows } = await postgresClient.query(text, values);

    return res.status(200).json(rows);
  } catch (error) {
    console.log("Error", error.message);
    return res.status(400).json({ message: error.message });
  }
};

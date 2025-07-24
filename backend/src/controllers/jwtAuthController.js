import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import jwtGenerator from '../utils/jwtGenerator.js';

export async function register(req, res) {
    const { email, name, password } = req.body;

    try {
        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (user.rows.length > 0) {
            return res.status(401).json({ error: "User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );

        const jwtToken = jwtGenerator(newUser.rows[0].id);

        return res.json({ jwtToken });
    } catch (err) {
        res.status(500).send("Server error");
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ error: "Wrong email address" });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        if (!validPassword) {
            return res.status(401).json({ error: "Wrong Password" });
        }

        const jwtToken = jwtGenerator(user.rows[0].id);
        return res.json({ jwtToken });
    } catch (err) {
        res.status(500).send("Server error");
    }
}

export async function verify(_, res) {
    try {
        res.json(true);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function user(req, res) {
    try {
        const user = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [
        req.user.id,
        ]);
        res.json(user.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}
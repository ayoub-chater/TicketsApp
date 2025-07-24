import pool from '../config/db.js';

export async function getAllTicketsByUser(req, res) {
  const { status, priority } = req.query;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let query = "SELECT * FROM tickets WHERE user_id = $1";
  let filters = [];
  let values = [userId];

  if (status) {
    filters.push(`status = $${values.length + 1}`);
    values.push(status);
  }
  if (priority) {
    filters.push(`priority = $${values.length + 1}`);
    values.push(priority);
  }

  if (filters.length > 0) {
    query += " AND " + filters.join(" AND ");
  }

  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getTicketById(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM tickets Where id = $1",
      [req.params.id]
    );
    if (!result) return res.status(404).json({ message: "Ticket not found!" });
      res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createTicket(req, res) {
  try {
    const { title, description, status, priority, user_id } = req.body;

    const query = `
      INSERT INTO tickets (title, description, status, priority, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [title, description, status, priority, user_id];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateTicket(req, res) {
  try {
    const { id } = req.params;
    const { title, description, status, priority, user_id } = req.body;

    if (!id) return res.status(400).json({ message: "Ticket ID is required" });

    // Get existing ticket
    const { rows } = await pool.query("SELECT * FROM tickets WHERE id = $1", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Ticket not found" });

    const existing = rows[0];

    // Merge with existing
    const updated = {
      title: title ?? existing.title,
      description: description ?? existing.description,
      status: status ?? existing.status,
      priority: priority ?? existing.priority,
      user_id: user_id ?? existing.user_id,
    };

    const query = `
      UPDATE tickets SET title = $1, description = $2, status = $3, priority = $4, user_id = $5
      WHERE id = $6 RETURNING *
    `;

    const values = [
      updated.title,
      updated.description,
      updated.status,
      updated.priority,
      updated.user_id,
      id,
    ];

    const result = await pool.query(query, values);

    res.status(200).json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteTicket(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Ticket ID is required" });
    }

    const result = await pool.query(
      "DELETE FROM tickets WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket deleted successfully", ticket: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
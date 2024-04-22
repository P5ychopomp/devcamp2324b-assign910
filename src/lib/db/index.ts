import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';

const db = new Database('./database/users.db', { verbose: console.log });

export async function createUser(username: string, password: string): Promise<void> {
	const sql = `
    INSERT INTO users (id, username, password)
    SELECT COALESCE(MAX(id), 0) + 1, (?), (?) FROM users;
  `;

	const hashedPassword = await bcrypt.hash(password, 12);

	const stmt = db.prepare(sql);
	stmt.run(username, hashedPassword);
}

export async function getUsers(): Promise<Array> {
	const stmt = db.prepare('SELECT * FROM users');
	return await stmt.all();
}

export async function getUser(username: string): Promise<string> {
	const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
	return await stmt.get(username);
}

export async function setToken(token: string, id: int, username: string): Promise<void> {
	const sql = `
    UPDATE users
    SET token = ?
    WHERE id = ? AND username = ?;
  `;

	const stmt = db.prepare(sql);
	stmt.run(token, id, username);
}

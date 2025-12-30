import { jsonResponse } from '../../_utils';

export async function onRequestPost({ request, env }) {
    try {
        const { username, email, password } = await request.json();

        // Validate required fields
        if (!username || !email || !password) {
            return jsonResponse({ error: 'Username, email and password required' }, 400);
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return jsonResponse({ error: 'Invalid email format' }, 400);
        }

        // Validate password length
        if (password.length < 6) {
            return jsonResponse({ error: 'Password must be at least 6 characters' }, 400);
        }

        if (!env.DB) return jsonResponse({ error: 'DB not available' }, 500);

        // Check if username exists
        const existingUser = await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username).first();
        if (existingUser) {
            return jsonResponse({ error: 'Username already exists' }, 409);
        }

        // Check if email exists
        const existingEmail = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
        if (existingEmail) {
            return jsonResponse({ error: 'Email already registered' }, 409);
        }

        // Create user with email
        // NOTE: In production, use bcrypt or argon2 for password hashing
        await env.DB.prepare(
            'INSERT INTO users (username, email, password, trial_count, is_pro) VALUES (?, ?, ?, 0, 0)'
        ).bind(username, email, password).run();

        // Get the created user
        const user = await env.DB.prepare(
            'SELECT id, username, email, trial_count, is_pro, created_at FROM users WHERE username = ?'
        ).bind(username).first();

        return jsonResponse({ 
            success: true,
            user: user
        });

    } catch (e) {
        return jsonResponse({ error: e.message }, 500);
    }
}

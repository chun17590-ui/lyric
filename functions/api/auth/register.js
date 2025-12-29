import { jsonResponse } from '../../_utils';

export async function onRequestPost({ request, env }) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return jsonResponse({ error: 'Username and password required' }, 400);
        }

        if (!env.DB) return jsonResponse({ error: 'DB not available' }, 500);

        // Check existing
        const existing = await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username).first();
        if (existing) {
            return jsonResponse({ error: 'Username already exists' }, 409);
        }

        // Create user
        // NOTE: In production, use bcrypt or argon2. For this demo/prototype, simple storage is acceptable but not recommended for real world.
        // using simple text for now as requested for "Use First Principles Thinking".

        await env.DB.prepare(
            'INSERT INTO users (username, password, trial_count, is_pro) VALUES (?, ?, 0, 0)'
        ).bind(username, password).run();

        return jsonResponse({ success: true });

    } catch (e) {
        return jsonResponse({ error: e.message }, 500);
    }
}

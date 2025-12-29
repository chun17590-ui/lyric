import { jsonResponse } from '../../_utils';

export async function onRequestPost({ request, env }) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return jsonResponse({ error: 'Username and password required' }, 400);
        }

        if (!env.DB) return jsonResponse({ error: 'DB not available' }, 500);

        const user = await env.DB.prepare(
            'SELECT id, username, trial_count, is_pro FROM users WHERE username = ? AND password = ?'
        ).bind(username, password).first();

        if (!user) {
            return jsonResponse({ error: 'Invalid credentials' }, 401);
        }

        return jsonResponse({ success: true, user });

    } catch (e) {
        return jsonResponse({ error: e.message }, 500);
    }
}

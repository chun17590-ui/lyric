import { jsonResponse } from '../_utils';

export async function onRequestPost({ request, env }) {
    try {
        const { user_id } = await request.json();

        if (!user_id) {
            return jsonResponse({ error: 'User ID required' }, 400);
        }

        if (!env.DB) return jsonResponse({ error: 'DB not available' }, 500);

        // Get complete user information
        const user = await env.DB.prepare(
            'SELECT id, username, email, trial_count, is_pro, created_at FROM users WHERE id = ?'
        ).bind(user_id).first();

        if (!user) {
            return jsonResponse({ error: 'User not found' }, 404);
        }

        return jsonResponse({
            success: true,
            user: user
        });

    } catch (e) {
        return jsonResponse({ error: e.message }, 500);
    }
}

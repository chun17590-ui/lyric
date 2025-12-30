import { jsonResponse } from '../../_utils';

export async function onRequestPost({ request, env }) {
    try {
        const { email } = await request.json();

        if (!email) {
            return jsonResponse({ error: 'Email required' }, 400);
        }

        if (!env.DB) return jsonResponse({ error: 'DB not available' }, 500);

        // Find user by email
        const user = await env.DB.prepare(
            'SELECT id, username, email FROM users WHERE email = ?'
        ).bind(email).first();

        if (!user) {
            return jsonResponse({ error: 'No account found with this email' }, 404);
        }

        // Generate 6-digit reset token
        const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Math.floor(Date.now() / 1000) +  (15 * 60); // 15 minutes

        // Store reset token in database
        await env.DB.prepare(
            'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?'
        ).bind(resetToken, expiresAt, user.id).run();

        // In production, send email with reset token
        // For now, return it in the response (DEMO ONLY)
        return jsonResponse({
            success: true,
            message: 'Reset token generated',
            reset_token: resetToken, // DEMO ONLY - remove in production
            username: user.username
        });

    } catch (e) {
        return jsonResponse({ error: e.message }, 500);
    }
}

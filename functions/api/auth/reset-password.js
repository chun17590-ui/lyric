import { jsonResponse } from '../../_utils';

export async function onRequestPost({ request, env }) {
    try {
        const { email, reset_token, new_password } = await request.json();

        if (!email || !reset_token || !new_password) {
            return jsonResponse({ error: 'Email, reset token and new password required' }, 400);
        }

        // Validate password length
        if (new_password.length < 6) {
            return jsonResponse({ error: 'Password must be at least 6 characters' }, 400);
        }

        if (!env.DB) return jsonResponse({ error: 'DB not available' }, 500);

        // Find user with valid reset token
        const currentTime = Math.floor(Date.now() / 1000);
        const user = await env.DB.prepare(
            'SELECT id FROM users WHERE email = ? AND reset_token = ? AND reset_token_expires > ?'
        ).bind(email, reset_token, currentTime).first();

        if (!user) {
            return jsonResponse({ error: 'Invalid or expired reset token' }, 401);
        }

        // Update password and clear reset token
        await env.DB.prepare(
            'UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?'
        ).bind(new_password, user.id).run();

        return jsonResponse({
            success: true,
            message: 'Password reset successfully'
        });

    } catch (e) {
        return jsonResponse({ error: e.message }, 500);
    }
}

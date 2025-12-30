import { jsonResponse } from '../_utils';

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const body = await request.json();
        const { lyric_id, user_id } = body;

        if (!lyric_id || !user_id) {
            return jsonResponse({ error: 'Lyric ID and User ID required' }, 400);
        }

        if (!env.DB) {
            return jsonResponse({ error: 'Database not available' }, 500);
        }

        // Verify ownership before deleting
        const existing = await env.DB.prepare(
            'SELECT id FROM lyrics WHERE id = ? AND user_id = ?'
        ).bind(lyric_id, user_id).first();

        if (!existing) {
            return jsonResponse({ error: 'Lyric not found or access denied' }, 404);
        }

        // Delete lyric
        await env.DB.prepare(
            'DELETE FROM lyrics WHERE id = ? AND user_id = ?'
        ).bind(lyric_id, user_id).run();

        return jsonResponse({
            success: true,
            message: 'Lyric deleted successfully'
        });

    } catch (err) {
        return jsonResponse({ error: err.message }, 500);
    }
}

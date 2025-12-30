import { jsonResponse } from '../_utils';

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const body = await request.json();
        const { lyric_id, user_id, content, suno_tags } = body;

        if (!lyric_id || !user_id) {
            return jsonResponse({ error: 'Lyric ID and User ID required' }, 400);
        }

        if (!env.DB) {
            return jsonResponse({ error: 'Database not available' }, 500);
        }

        // Verify ownership
        const existing = await env.DB.prepare(
            'SELECT id FROM lyrics WHERE id = ? AND user_id = ?'
        ).bind(lyric_id, user_id).first();

        if (!existing) {
            return jsonResponse({ error: 'Lyric not found or access denied' }, 404);
        }

        // Update lyric
        const updated_at = Math.floor(Date.now() / 1000);
        await env.DB.prepare(`
            UPDATE lyrics 
            SET content = ?, suno_tags = ?, updated_at = ?
            WHERE id = ? AND user_id = ?
        `).bind(content || null, suno_tags || null, updated_at, lyric_id, user_id).run();

        return jsonResponse({
            success: true,
            updated_at: updated_at
        });

    } catch (err) {
        return jsonResponse({ error: err.message }, 500);
    }
}

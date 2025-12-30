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

        // Get specific lyric, verify ownership
        const lyric = await env.DB.prepare(`
            SELECT id, title, topic, content, suno_tags, prompt, created_at, updated_at
            FROM lyrics 
            WHERE id = ? AND user_id = ?
        `).bind(lyric_id, user_id).first();

        if (!lyric) {
            return jsonResponse({ error: 'Lyric not found or access denied' }, 404);
        }

        return jsonResponse({
            success: true,
            lyric: lyric
        });

    } catch (err) {
        return jsonResponse({ error: err.message }, 500);
    }
}

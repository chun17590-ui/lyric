import { jsonResponse } from '../_utils';

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const body = await request.json();
        const { user_id } = body;

        if (!user_id) {
            return jsonResponse({ error: 'User ID required' }, 400);
        }

        if (!env.DB) {
            return jsonResponse({ error: 'Database not available' }, 500);
        }

        // Get all lyrics for this user, ordered by creation date
        const lyrics = await env.DB.prepare(`
            SELECT 
                id, 
                title, 
                topic,
                created_at, 
                updated_at,
                substr(content, 1, 50) as preview
            FROM lyrics 
            WHERE user_id = ?
            ORDER BY created_at DESC
        `).bind(user_id).all();

        return jsonResponse({
            success: true,
            lyrics: lyrics.results || []
        });

    } catch (err) {
        return jsonResponse({ error: err.message }, 500);
    }
}

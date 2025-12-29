import { jsonResponse } from '../_utils';

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const body = await request.json();
        const { user_id, prompt } = body;

        if (!user_id || !prompt) {
            return jsonResponse({ error: 'User ID and Prompt are required' }, 400);
        }

        if (!env.DB) {
            return jsonResponse({ error: 'Database not available' }, 500);
        }

        // 1. Get User Status
        const user = await env.DB.prepare('SELECT id, trial_count, is_pro FROM users WHERE id = ?').bind(user_id).first();

        if (!user) {
            return jsonResponse({ error: 'User not found' }, 404);
        }

        // 2. Check Quota (Pro or Trial < 1000)
        if (!user.is_pro && user.trial_count >= 1000) {
            return jsonResponse({ error: 'Trial limit reached', code: 'PAYMENT_REQUIRED' }, 402);
        }

        // 3. Increment Trial Count (if not pro)
        if (!user.is_pro) {
            await env.DB.prepare('UPDATE users SET trial_count = trial_count + 1 WHERE id = ?').bind(user_id).run();
        }

        // 4. Call AI API
        const apiKey = env.AI_API_KEY;
        if (!apiKey) {
            return jsonResponse({ error: 'AI Service not configured' }, 500);
        }

        // Example: Call OpenAI (User specified endpoint + standard suffix)
        const aiResponse = await fetch('https://xyuapi.top/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gemini-3-pro-preview',
                messages: [
                    { role: 'system', content: 'You are a creative songwriter.' },
                    { role: 'user', content: `Write lyrics for a song about: ${prompt}` }
                ]
            })
        });

        const aiData = await aiResponse.json();

        if (aiData.error) {
            const errorMsg = typeof aiData.error === 'object' ? JSON.stringify(aiData.error) : String(aiData.error);
            console.error('Upstream API Error:', errorMsg);
            return jsonResponse({
                error: `Upstream Err: ${errorMsg} (Status: ${aiResponse.status})`,
                details: aiData.error,
                debug_url: 'https://xyuapi.top/v1'
            }, 500);
        }

        const lyricsContent = aiData.choices?.[0]?.message?.content || 'No lyrics generated.';

        // 5. Save Lyrics to D1
        await env.DB.prepare(
            'INSERT INTO lyrics (user_id, prompt, content) VALUES (?, ?, ?)'
        ).bind(user_id, prompt, lyricsContent).run();

        // Return new trial count
        const updatedUser = await env.DB.prepare('SELECT trial_count FROM users WHERE id = ?').bind(user_id).first();

        return jsonResponse({
            success: true,
            lyrics: lyricsContent,
            trial_count: updatedUser.trial_count,
            is_pro: user.is_pro
        });

    } catch (err) {
        return jsonResponse({ error: err.message }, 500);
    }
}

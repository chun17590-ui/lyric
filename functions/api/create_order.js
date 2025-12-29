import { generateSignature, jsonResponse } from '../_utils';

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const body = await request.json();
        const { amount, user_id, title = 'AI Lyric Gen' } = body;

        if (!amount) {
            return jsonResponse({ error: 'Amount is required' }, 400);
        }

        const trade_order_id = crypto.randomUUID();

        // 1. Insert into D1
        // Assuming the binding name is 'DB'
        if (env.DB) {
            await env.DB.prepare(
                'INSERT INTO orders (id, user_id, amount, title, status) VALUES (?, ?, ?, ?, ?)'
            ).bind(trade_order_id, user_id || null, amount, title, 'pending').run();
        } else {
            console.warn('DB binding not found, skipping database insert');
        }

        // 2. Call Hupijiao API
        const appId = env.HUPI_APPID;
        const appSecret = env.HUPI_APPSECRET;
        const gateway = 'https://api.xunhupay.com/payment/do.html'; // Or user specific gateway

        if (!appId || !appSecret) {
            return jsonResponse({ error: 'Server misconfiguration: Missing credentials' }, 500);
        }

        const params = {
            version: '1.1',
            appid: appId,
            trade_order_id: trade_order_id,
            total_fee: amount,
            title: title,
            time: Math.floor(Date.now() / 1000),
            notify_url: new URL(request.url).origin + '/api/notify', // Auto-detect notify URL
            nonce_str: Math.random().toString(36).substring(2, 15),
            type: 'WAP', // or 'JSAPI' if inside WeChat, or leave empty for auto-adapt
            wap_url: new URL(request.url).origin, // Return url
            modal: null // Disable modal if needed or use '1'
        };

        params.hash = generateSignature(params, appSecret);

        // Call Hupijiao to get the payment URL directly?
        // Usually Hupijiao requires a form post or redirection.
        // If we want to stay essentially SPA, we can return the signed params and let frontend construct the form.
        // However, fetching server-side allows us to hide implementation details.
        // Hupijiao doc says: POST to gateway.

        const formData = new FormData();
        for (const k in params) {
            formData.append(k, params[k]);
        }

        const hupiResponse = await fetch(gateway, {
            method: 'POST',
            body: formData
        });

        // Hupijiao might return HTML or JSON depending on headers or 'format' param? 
        // Usually it redirects. 
        // To enable "JSON fetch", Hupijiao usually has specific plugins. 
        // If not, we might need to return the 'url' to redirect to.

        // Let's assume we return the URL for the frontend to redirect or parameters to submit.
        // For simplicity and standard integration, we will return the parameters needed for the frontend to create a Form POST or standard redirection URL with query params.

        // Actually, creating a signed query string is easiest for GET redirection.
        const queryString = Object.keys(params)
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join('&');

        const paymentUrl = `${gateway}?${queryString}`;

        return jsonResponse({
            success: true,
            trade_order_id,
            payment_url: paymentUrl
        });

    } catch (err) {
        return jsonResponse({ error: err.message }, 500);
    }
}

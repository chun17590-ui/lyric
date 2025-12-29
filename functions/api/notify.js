import { generateSignature } from '../_utils';

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const formData = await request.formData();
        const data = {};
        for (const [key, value] of formData) {
            data[key] = value;
        }

        // Verify signature
        const receivedHash = data.hash;
        const appSecret = env.HUPI_APPSECRET;

        if (!appSecret) {
            return new Response('fail', { status: 500 });
        }

        const calculatedHash = generateSignature(data, appSecret);

        if (receivedHash === calculatedHash) {
            // Valid signature
            if (data.status === 'OD') { // OD means Order Done (Success)
                const trade_order_id = data.trade_order_id;
                const open_order_id = data.open_order_id; // Hupijiao ID

                // Update D1
                if (env.DB) {
                    // 1. Mark order as paid
                    await env.DB.prepare(
                        "UPDATE orders SET status = 'paid', hupi_order_id = ? WHERE id = ?"
                    ).bind(open_order_id, trade_order_id).run();

                    // 2. Find user from order and upgrade to Pro
                    // We need to fetch the user_id from the order first (or we could have done a join update if D1 supported it well, but separate is safer)
                    const order = await env.DB.prepare('SELECT user_id FROM orders WHERE id = ?').bind(trade_order_id).first();

                    if (order && order.user_id) {
                        await env.DB.prepare('UPDATE users SET is_pro = 1 WHERE id = ?').bind(order.user_id).run();
                    }
                }
            }
            return new Response('success');
        } else {
            return new Response('fail');
        }
    } catch (err) {
        return new Response('fail: ' + err.message, { status: 500 });
    }
}

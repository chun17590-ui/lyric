import { jsonResponse } from '../_utils';

export async function onRequestGet(context) {
    try {
        const { request, env } = context;
        const url = new URL(request.url);
        const order_id = url.searchParams.get('order_id');

        if (!order_id) {
            return jsonResponse({ error: 'Order ID required' }, 400);
        }

        if (!env.DB) {
            return jsonResponse({ error: 'Database error' }, 500);
        }

        const order = await env.DB.prepare('SELECT status FROM orders WHERE id = ?').bind(order_id).first();

        if (!order) {
            return jsonResponse({ error: 'Order not found' }, 404);
        }

        return jsonResponse({ status: order.status });
    } catch (err) {
        return jsonResponse({ error: err.message }, 500);
    }
}

import { onRequestPost as __api_auth_login_js_onRequestPost } from "/Users/yangchun521/Documents/lyric/functions/api/auth/login.js"
import { onRequestPost as __api_auth_register_js_onRequestPost } from "/Users/yangchun521/Documents/lyric/functions/api/auth/register.js"
import { onRequestGet as __api_check_status_js_onRequestGet } from "/Users/yangchun521/Documents/lyric/functions/api/check_status.js"
import { onRequestPost as __api_create_order_js_onRequestPost } from "/Users/yangchun521/Documents/lyric/functions/api/create_order.js"
import { onRequestPost as __api_generate_lyric_js_onRequestPost } from "/Users/yangchun521/Documents/lyric/functions/api/generate_lyric.js"
import { onRequestPost as __api_notify_js_onRequestPost } from "/Users/yangchun521/Documents/lyric/functions/api/notify.js"

export const routes = [
    {
      routePath: "/api/auth/login",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_login_js_onRequestPost],
    },
  {
      routePath: "/api/auth/register",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_register_js_onRequestPost],
    },
  {
      routePath: "/api/check_status",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_check_status_js_onRequestGet],
    },
  {
      routePath: "/api/create_order",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_create_order_js_onRequestPost],
    },
  {
      routePath: "/api/generate_lyric",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_generate_lyric_js_onRequestPost],
    },
  {
      routePath: "/api/notify",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_notify_js_onRequestPost],
    },
  ]
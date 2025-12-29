var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.wrangler/tmp/bundle-stSZua/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// _utils.js
function md5(string) {
  function RotateLeft(lValue, iShiftBits) {
    return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
  }
  __name(RotateLeft, "RotateLeft");
  function AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = lX & 2147483648;
    lY8 = lY & 2147483648;
    lX4 = lX & 1073741824;
    lY4 = lY & 1073741824;
    lResult = (lX & 1073741823) + (lY & 1073741823);
    if (lX4 & lY4) {
      return lResult ^ 2147483648 ^ lX8 ^ lY8;
    }
    if (lX4 | lY4) {
      if (lResult & 1073741824) {
        return lResult ^ 3221225472 ^ lX8 ^ lY8;
      } else {
        return lResult ^ 1073741824 ^ lX8 ^ lY8;
      }
    } else {
      return lResult ^ lX8 ^ lY8;
    }
  }
  __name(AddUnsigned, "AddUnsigned");
  function F(x2, y, z) {
    return x2 & y | ~x2 & z;
  }
  __name(F, "F");
  function G(x2, y, z) {
    return x2 & z | y & ~z;
  }
  __name(G, "G");
  function H(x2, y, z) {
    return x2 ^ y ^ z;
  }
  __name(H, "H");
  function I(x2, y, z) {
    return y ^ (x2 | ~z);
  }
  __name(I, "I");
  function FF(a2, b2, c2, d2, x2, s, ac) {
    a2 = AddUnsigned(a2, AddUnsigned(AddUnsigned(F(b2, c2, d2), x2), ac));
    return AddUnsigned(RotateLeft(a2, s), b2);
  }
  __name(FF, "FF");
  function GG(a2, b2, c2, d2, x2, s, ac) {
    a2 = AddUnsigned(a2, AddUnsigned(AddUnsigned(G(b2, c2, d2), x2), ac));
    return AddUnsigned(RotateLeft(a2, s), b2);
  }
  __name(GG, "GG");
  function HH(a2, b2, c2, d2, x2, s, ac) {
    a2 = AddUnsigned(a2, AddUnsigned(AddUnsigned(H(b2, c2, d2), x2), ac));
    return AddUnsigned(RotateLeft(a2, s), b2);
  }
  __name(HH, "HH");
  function II(a2, b2, c2, d2, x2, s, ac) {
    a2 = AddUnsigned(a2, AddUnsigned(AddUnsigned(I(b2, c2, d2), x2), ac));
    return AddUnsigned(RotateLeft(a2, s), b2);
  }
  __name(II, "II");
  function ConvertToWordArray(string2) {
    var lWordCount;
    var lMessageLength = string2.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - lByteCount % 4) / 4;
      lBytePosition = lByteCount % 4 * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | string2.charCodeAt(lByteCount) << lBytePosition;
      lByteCount++;
    }
    lWordCount = (lByteCount - lByteCount % 4) / 4;
    lBytePosition = lByteCount % 4 * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | 128 << lBytePosition;
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  __name(ConvertToWordArray, "ConvertToWordArray");
  function WordToHex(lValue) {
    var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = lValue >>> lCount * 8 & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }
  __name(WordToHex, "WordToHex");
  var x = ConvertToWordArray(string);
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
  a = 1732584193;
  b = 4023233417;
  c = 2562383102;
  d = 271733878;
  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 3614090360);
    d = FF(d, a, b, c, x[k + 1], S12, 3905402710);
    c = FF(c, d, a, b, x[k + 2], S13, 606105819);
    b = FF(b, c, d, a, x[k + 3], S14, 3250441966);
    a = FF(a, b, c, d, x[k + 4], S11, 4118548399);
    d = FF(d, a, b, c, x[k + 5], S12, 1200080426);
    c = FF(c, d, a, b, x[k + 6], S13, 2821735955);
    b = FF(b, c, d, a, x[k + 7], S14, 4249261313);
    a = FF(a, b, c, d, x[k + 8], S11, 1770035416);
    d = FF(d, a, b, c, x[k + 9], S12, 2336552879);
    c = FF(c, d, a, b, x[k + 10], S13, 4294925233);
    b = FF(b, c, d, a, x[k + 11], S14, 2304563134);
    a = FF(a, b, c, d, x[k + 12], S11, 1804603682);
    d = FF(d, a, b, c, x[k + 13], S12, 4254626195);
    c = FF(c, d, a, b, x[k + 14], S13, 2792965006);
    b = FF(b, c, d, a, x[k + 15], S14, 1236535329);
    a = GG(a, b, c, d, x[k + 1], S21, 4129170786);
    d = GG(d, a, b, c, x[k + 6], S22, 3225465664);
    c = GG(c, d, a, b, x[k + 11], S23, 643717713);
    b = GG(b, c, d, a, x[k + 0], S24, 3921069994);
    a = GG(a, b, c, d, x[k + 5], S21, 3593408605);
    d = GG(d, a, b, c, x[k + 10], S22, 38016083);
    c = GG(c, d, a, b, x[k + 15], S23, 3634488961);
    b = GG(b, c, d, a, x[k + 4], S24, 3889429448);
    a = GG(a, b, c, d, x[k + 9], S21, 568446438);
    d = GG(d, a, b, c, x[k + 14], S22, 3275163606);
    c = GG(c, d, a, b, x[k + 3], S23, 4107603335);
    b = GG(b, c, d, a, x[k + 8], S24, 1163531501);
    a = GG(a, b, c, d, x[k + 13], S21, 2850285829);
    d = GG(d, a, b, c, x[k + 2], S22, 4243563512);
    c = GG(c, d, a, b, x[k + 7], S23, 1735328473);
    b = GG(b, c, d, a, x[k + 12], S24, 2368359562);
    a = HH(a, b, c, d, x[k + 5], S31, 4294588738);
    d = HH(d, a, b, c, x[k + 8], S32, 2272392833);
    c = HH(c, d, a, b, x[k + 11], S33, 1839030562);
    b = HH(b, c, d, a, x[k + 14], S34, 4259657740);
    a = HH(a, b, c, d, x[k + 1], S31, 2763975236);
    d = HH(d, a, b, c, x[k + 4], S32, 1272893353);
    c = HH(c, d, a, b, x[k + 7], S33, 4139469664);
    b = HH(b, c, d, a, x[k + 10], S34, 3200236656);
    a = HH(a, b, c, d, x[k + 13], S31, 681279174);
    d = HH(d, a, b, c, x[k + 0], S32, 3936430074);
    c = HH(c, d, a, b, x[k + 3], S33, 3572445317);
    b = HH(b, c, d, a, x[k + 6], S34, 76029189);
    a = HH(a, b, c, d, x[k + 9], S31, 3654602809);
    d = HH(d, a, b, c, x[k + 12], S32, 3873151461);
    c = HH(c, d, a, b, x[k + 15], S33, 530742520);
    b = HH(b, c, d, a, x[k + 2], S34, 3299628645);
    a = II(a, b, c, d, x[k + 0], S41, 4096336452);
    d = II(d, a, b, c, x[k + 7], S42, 1126891415);
    c = II(c, d, a, b, x[k + 14], S43, 2878612391);
    b = II(b, c, d, a, x[k + 5], S44, 4237533241);
    a = II(a, b, c, d, x[k + 12], S41, 1700485571);
    d = II(d, a, b, c, x[k + 3], S42, 2399980690);
    c = II(c, d, a, b, x[k + 10], S43, 4293915773);
    b = II(b, c, d, a, x[k + 1], S44, 2240044497);
    a = II(a, b, c, d, x[k + 8], S41, 1873313359);
    d = II(d, a, b, c, x[k + 15], S42, 4264355552);
    c = II(c, d, a, b, x[k + 6], S43, 2734768916);
    b = II(b, c, d, a, x[k + 13], S44, 1309151649);
    a = II(a, b, c, d, x[k + 4], S41, 4149444226);
    d = II(d, a, b, c, x[k + 11], S42, 3174756917);
    c = II(c, d, a, b, x[k + 2], S43, 718787259);
    b = II(b, c, d, a, x[k + 9], S44, 3951481745);
    a = AddUnsigned(a, AA);
    b = AddUnsigned(b, BB);
    c = AddUnsigned(c, CC);
    d = AddUnsigned(d, DD);
  }
  var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
  return temp.toLowerCase();
}
__name(md5, "md5");
function generateSignature(params, appSecret) {
  const keys = Object.keys(params).filter((k) => k !== "hash" && params[k] !== void 0 && params[k] !== "");
  keys.sort();
  let str = "";
  for (const key of keys) {
    str += `${key}=${params[key]}&`;
  }
  str = str.slice(0, -1) + appSecret;
  return md5(str);
}
__name(generateSignature, "generateSignature");
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
__name(jsonResponse, "jsonResponse");

// api/auth/login.js
async function onRequestPost({ request, env }) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return jsonResponse({ error: "Username and password required" }, 400);
    }
    if (!env.DB) return jsonResponse({ error: "DB not available" }, 500);
    const user = await env.DB.prepare(
      "SELECT id, username, trial_count, is_pro FROM users WHERE username = ? AND password = ?"
    ).bind(username, password).first();
    if (!user) {
      return jsonResponse({ error: "Invalid credentials" }, 401);
    }
    return jsonResponse({ success: true, user });
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}
__name(onRequestPost, "onRequestPost");

// api/auth/register.js
async function onRequestPost2({ request, env }) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return jsonResponse({ error: "Username and password required" }, 400);
    }
    if (!env.DB) return jsonResponse({ error: "DB not available" }, 500);
    const existing = await env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(username).first();
    if (existing) {
      return jsonResponse({ error: "Username already exists" }, 409);
    }
    await env.DB.prepare(
      "INSERT INTO users (username, password, trial_count, is_pro) VALUES (?, ?, 0, 0)"
    ).bind(username, password).run();
    return jsonResponse({ success: true });
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}
__name(onRequestPost2, "onRequestPost");

// api/check_status.js
async function onRequestGet(context) {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const order_id = url.searchParams.get("order_id");
    if (!order_id) {
      return jsonResponse({ error: "Order ID required" }, 400);
    }
    if (!env.DB) {
      return jsonResponse({ error: "Database error" }, 500);
    }
    const order = await env.DB.prepare("SELECT status FROM orders WHERE id = ?").bind(order_id).first();
    if (!order) {
      return jsonResponse({ error: "Order not found" }, 404);
    }
    return jsonResponse({ status: order.status });
  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
}
__name(onRequestGet, "onRequestGet");

// api/create_order.js
async function onRequestPost3(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { amount, user_id, title = "AI Lyric Gen" } = body;
    if (!amount) {
      return jsonResponse({ error: "Amount is required" }, 400);
    }
    const trade_order_id = crypto.randomUUID();
    if (env.DB) {
      await env.DB.prepare(
        "INSERT INTO orders (id, user_id, amount, title, status) VALUES (?, ?, ?, ?, ?)"
      ).bind(trade_order_id, user_id || null, amount, title, "pending").run();
    } else {
      console.warn("DB binding not found, skipping database insert");
    }
    const appId = env.HUPI_APPID;
    const appSecret = env.HUPI_APPSECRET;
    const gateway = "https://api.xunhupay.com/payment/do.html";
    if (!appId || !appSecret) {
      return jsonResponse({ error: "Server misconfiguration: Missing credentials" }, 500);
    }
    const params = {
      version: "1.1",
      appid: appId,
      trade_order_id,
      total_fee: amount,
      title,
      time: Math.floor(Date.now() / 1e3),
      notify_url: new URL(request.url).origin + "/api/notify",
      // Auto-detect notify URL
      nonce_str: Math.random().toString(36).substring(2, 15),
      type: "WAP",
      // or 'JSAPI' if inside WeChat, or leave empty for auto-adapt
      wap_url: new URL(request.url).origin,
      // Return url
      modal: null
      // Disable modal if needed or use '1'
    };
    params.hash = generateSignature(params, appSecret);
    const formData = new FormData();
    for (const k in params) {
      formData.append(k, params[k]);
    }
    const hupiResponse = await fetch(gateway, {
      method: "POST",
      body: formData
    });
    const queryString = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join("&");
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
__name(onRequestPost3, "onRequestPost");

// api/generate_lyric.js
async function onRequestPost4(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { user_id, prompt } = body;
    if (!user_id || !prompt) {
      return jsonResponse({ error: "User ID and Prompt are required" }, 400);
    }
    if (!env.DB) {
      return jsonResponse({ error: "Database not available" }, 500);
    }
    const user = await env.DB.prepare("SELECT id, trial_count, is_pro FROM users WHERE id = ?").bind(user_id).first();
    if (!user) {
      return jsonResponse({ error: "User not found" }, 404);
    }
    if (!user.is_pro && user.trial_count >= 1e3) {
      return jsonResponse({ error: "Trial limit reached", code: "PAYMENT_REQUIRED" }, 402);
    }
    if (!user.is_pro) {
      await env.DB.prepare("UPDATE users SET trial_count = trial_count + 1 WHERE id = ?").bind(user_id).run();
    }
    const apiKey = env.AI_API_KEY;
    if (!apiKey) {
      return jsonResponse({ error: "AI Service not configured" }, 500);
    }
    const aiResponse = await fetch("https://xyuapi.top/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gemini-3-pro-preview",
        messages: [
          { role: "system", content: "You are a creative songwriter." },
          { role: "user", content: `Write lyrics for a song about: ${prompt}` }
        ]
      })
    });
    const aiData = await aiResponse.json();
    if (aiData.error) {
      const errorMsg = typeof aiData.error === "object" ? JSON.stringify(aiData.error) : String(aiData.error);
      console.error("Upstream API Error:", errorMsg);
      return jsonResponse({
        error: `Upstream Err: ${errorMsg} (Status: ${aiResponse.status})`,
        details: aiData.error,
        debug_url: "https://xyuapi.top/v1"
      }, 500);
    }
    const lyricsContent = aiData.choices?.[0]?.message?.content || "No lyrics generated.";
    await env.DB.prepare(
      "INSERT INTO lyrics (user_id, prompt, content) VALUES (?, ?, ?)"
    ).bind(user_id, prompt, lyricsContent).run();
    const updatedUser = await env.DB.prepare("SELECT trial_count FROM users WHERE id = ?").bind(user_id).first();
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
__name(onRequestPost4, "onRequestPost");

// api/notify.js
async function onRequestPost5(context) {
  try {
    const { request, env } = context;
    const formData = await request.formData();
    const data = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }
    const receivedHash = data.hash;
    const appSecret = env.HUPI_APPSECRET;
    if (!appSecret) {
      return new Response("fail", { status: 500 });
    }
    const calculatedHash = generateSignature(data, appSecret);
    if (receivedHash === calculatedHash) {
      if (data.status === "OD") {
        const trade_order_id = data.trade_order_id;
        const open_order_id = data.open_order_id;
        if (env.DB) {
          await env.DB.prepare(
            "UPDATE orders SET status = 'paid', hupi_order_id = ? WHERE id = ?"
          ).bind(open_order_id, trade_order_id).run();
          const order = await env.DB.prepare("SELECT user_id FROM orders WHERE id = ?").bind(trade_order_id).first();
          if (order && order.user_id) {
            await env.DB.prepare("UPDATE users SET is_pro = 1 WHERE id = ?").bind(order.user_id).run();
          }
        }
      }
      return new Response("success");
    } else {
      return new Response("fail");
    }
  } catch (err) {
    return new Response("fail: " + err.message, { status: 500 });
  }
}
__name(onRequestPost5, "onRequestPost");

// ../.wrangler/tmp/pages-bb3862/functionsRoutes-0.681522435874918.mjs
var routes = [
  {
    routePath: "/api/auth/login",
    mountPath: "/api/auth",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/auth/register",
    mountPath: "/api/auth",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/check_status",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/create_order",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/generate_lyric",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost4]
  },
  {
    routePath: "/api/notify",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost5]
  }
];

// ../node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-stSZua/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-stSZua/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.8454501932198794.mjs.map

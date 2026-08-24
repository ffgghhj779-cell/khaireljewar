import json, subprocess, sys, uuid, base64, urllib.request, urllib.parse, time, re

sys.stdout.reconfigure(encoding="utf-8")
wid = "KhairProdBotWF01"
project = "aP2lOxNRBLDWZgO5"
token = open("/tmp/kh_prod_bot_token.txt").read().strip()

raw = subprocess.check_output(
    ["docker","exec","n8n-postgres-1","psql","-U","n8n_user","-d","n8n_db","-t","-A","-c",
     f"SELECT encode(convert_to(nodes::text,'UTF8'),'base64') FROM workflow_entity WHERE id='{wid}';"],
    text=True).strip()
conns_raw = subprocess.check_output(
    ["docker","exec","n8n-postgres-1","psql","-U","n8n_user","-d","n8n_db","-t","-A","-c",
     f"SELECT encode(convert_to(connections::text,'UTF8'),'base64') FROM workflow_entity WHERE id='{wid}';"],
    text=True).strip()
nodes = json.loads(base64.b64decode(raw))
conns = json.loads(base64.b64decode(conns_raw))
by = {n["name"]: n for n in nodes}

WIZARD = r'''
const ALLOWED = [8929452910];
const CATEGORIES = ['Citrus','Dates','Fruits','Vegetables','Frozen'];
const CAT_AR = {Citrus:'الموالح', Dates:'التمور', Fruits:'الفواكه', Vegetables:'الخضروات', Frozen:'المجمدات'};

const staticData = $getWorkflowStaticData('global');
if (!staticData.sessions) staticData.sessions = {};

const trigger = $('Telegram Trigger').first().json;
const msg = trigger.message || {};
const chatId = String(msg.chat?.id || '');
const fromId = msg.from?.id;
const firstName = msg.from?.first_name || '';
const textRaw = String(msg.text || '').trim();
const caption = String(msg.caption || '').trim();
const text = textRaw || caption;
const cmd = (text.split(/\s+/)[0] || '').split('@')[0].toLowerCase();
const hasPhoto = Array.isArray(msg.photo) && msg.photo.length > 0;

function out(payload) {
  return [{ json: { chatId, ...payload } }];
}
function reply(t) {
  return out({ action: 'reply', text: t });
}

const listed = ALLOWED.map(String).includes(String(fromId));
if (cmd === '/id') {
  return reply(`تمام ${firstName}، الـ ID بتاعك:\n${fromId}\nChat: ${chatId}\nابعت الرقم ده للإدارة لو محتاج صلاحية.`);
}
if (!listed) {
  return reply('البوت ده لفريق خير الجوار بس يا صاحبي. لو عندك صلاحية ابعت /id للإدارة.');
}

function blankDraft() {
  return {
    step: 'idle',
    title_ar: '', title_en: '',
    category_en: '',
    desc_ar: '', desc_en: '',
    index_price: '',
    min_order: 1,
    unit: 'MT',
    packaging_ar: '', packaging_en: '',
    sizes_ar: '', sizes_en: '',
    harvest_season_ar: 'على مدار العام', harvest_season_en: 'Year-round',
    image_base64: '', image_filename: '', image_mime: '',
    image: '',
  };
}
function getSession() {
  if (!staticData.sessions[chatId]) staticData.sessions[chatId] = blankDraft();
  return staticData.sessions[chatId];
}
function clearSession() {
  delete staticData.sessions[chatId];
}
function missing(d) {
  const m = [];
  if (!(d.title_ar || d.title_en)) m.push('الاسم');
  if (!d.category_en) m.push('التصنيف');
  if (!d.index_price) m.push('السعر');
  if (!(d.image_base64 || d.image)) m.push('الصورة');
  return m;
}
function nextAsk(d) {
  const m = missing(d);
  if (!m.length) return 'المسودة جاهزة. لو ماشي الحال قول تأكيد وأرفعها على الموقع.';
  const map = {
    'الاسم': 'قولي اسم المنتج… عربي وإنجليزي لو تقدر، زي: برتقال فالنسيا | Valencia Oranges',
    'التصنيف': 'التصنيف إيه؟ موالح / تمور / فواكه / خضروات / مجمدات',
    'الوصف': 'اكتب وصف قصير للمنتج بالراحة، عربي أو إنجليزي.',
    'السعر': 'السعر الاسترشادي كام؟ مثال: $420/MT',
    'الصورة': 'ابعت صورة المنتج لما تبقى جاهز 📷',
  };
  return map[m[0]] || '';
}
function summary(d) {
  const m = missing(d);
  return [
    'دي المسودة اللي معانا دلوقتي:',
    `الاسم: ${d.title_ar || '—'} / ${d.title_en || '—'}`,
    `التصنيف: ${d.category_en ? (CAT_AR[d.category_en] + ' / ' + d.category_en) : '—'}`,
    `الوصف: ${(d.desc_ar || d.desc_en || '—').slice(0,160)}`,
    `السعر: ${d.index_price || '—'}`,
    `الحد الأدنى: ${d.min_order || 1} ${d.unit || 'MT'}`,
    `الصورة: ${(d.image_base64 || d.image) ? 'واصله' : 'لسه'}`,
    m.length ? (`ناقص: ${m.join('، ')}`) : 'كله جاهز',
  ].join('\n');
}
function normCat(t) {
  return String(t||'')
    .replace(/[\u200e\u200f\u202a-\u202e]/g,'')
    .replace(/[\u064B-\u065F\u0670]/g,'')
    .trim();
}
function parseCategory(t) {
  const raw = normCat(t);
  const s = raw.replace(/^ال/, '');
  const low = s.toLowerCase();
  const map = {
    '1':'Citrus','citrus':'Citrus','موالح':'Citrus','الموالح':'Citrus',
    '2':'Dates','dates':'Dates','تمور':'Dates','التمور':'Dates','تمر':'Dates',
    '3':'Fruits','fruits':'Fruits','فواكه':'Fruits','الفواكه':'Fruits','فاكهة':'Fruits',
    '4':'Vegetables','vegetables':'Vegetables','veg':'Vegetables',
    'خضروات':'Vegetables','الخضروات':'Vegetables','خضراوات':'Vegetables','خضار':'Vegetables','الخضار':'Vegetables',
    '5':'Frozen','frozen':'Frozen','مجمدات':'Frozen','المجمد':'Frozen','المجمدات':'Frozen','مجمد':'Frozen',
  };
  if (map[raw] || map[s] || map[low]) return map[raw] || map[s] || map[low];
  if (/موالح|citrus/.test(low) || /موالح/.test(s)) return 'Citrus';
  if (/تمر|dates/.test(low) || /تمر/.test(s)) return 'Dates';
  if (/فواك|فاكهة|fruit/.test(low) || /فواك|فاكهة/.test(s)) return 'Fruits';
  if (/خضر|veg/.test(low) || /خضر/.test(s)) return 'Vegetables';
  if (/مجمد|frozen|iqf/.test(low) || /مجمد/.test(s)) return 'Frozen';
  return CATEGORIES.find(c => c.toLowerCase() === low) || '';
}
function parseTitles(t) {
  const parts = String(t||'').split('|').map(x => x.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0], b = parts[1];
    const aAr = /[\u0600-\u06FF]/.test(a);
    return aAr ? { title_ar: a, title_en: b } : { title_en: a, title_ar: b };
  }
  if (/[\u0600-\u06FF]/.test(t)) return { title_ar: t.trim(), title_en: '' };
  return { title_en: t.trim(), title_ar: '' };
}
function parseDeleteQuery(t) {
  const raw = String(t || '').trim();
  const m = raw.match(/^(?:\/delete|delete|del|امسح|احذف|حذف)\s+(.+)$/i);
  if (!m) return '';
  return m[1].trim();
}

const HELP = `أهلاً ${firstName || ''} 👋 أنا نسرين، برفع منتجات خير الجوار على الموقع.

نتكلم عادي. لما تحب نرفع منتج قول مثلاً: عايز أرفع منتج، أو /new.

هسألك بلطف عن الاسم والتصنيف والوصف والسعر والصورة، وبعد ما نراجع سوا تقول تأكيد، وأديك لينك المنتج على الموقع.

أوامر لو حابب:
/new منتج جديد
/delete original-lemon حذف منتج بالـ slug
/status المسودة
/confirm تأكيد الرفع
/cancel إلغاء
/help المساعدة`;

if (['/start','/help'].includes(cmd)) return reply(HELP);

if (cmd === '/cancel' || /^(الغِ|الغي|كنسل|cancel)$/i.test(text)) {
  clearSession();
  return reply('تمام، لغّينا المسودة. لو حبيت نبدأ تاني قول عايز أرفع منتج.');
}

let d = getSession();
const startNew = cmd === '/new' || /^(عايز|أريد|اريد|ارفع|رفع منتج|منتج جديد|نرفع منتج)/i.test(text);
const deleteQuery = parseDeleteQuery(text);

if (startNew && (d.step === 'idle' || cmd === '/new')) {
  d = blankDraft();
  d.step = 'collecting';
  staticData.sessions[chatId] = d;
  return reply(`تمام يا ${firstName || 'حبيبي'}، نرفع منتج جديد على الموقع.\n${nextAsk(d)}`);
}

if (deleteQuery) {
  if (!deleteQuery || deleteQuery.length < 2) {
    return reply('ابعت أمر الحذف بالشكل ده:\n/delete original-lemon\nأو: امسح original-lemon');
  }
  return out({ action: 'delete', delete_body: { slug: deleteQuery } });
}

if (cmd === '/status') {
  if (d.step === 'idle') return reply('مفيش مسودة مفتوحة دلوقتي. لما تحب نبدأ قول عايز أرفع منتج.');
  return reply(summary(d) + '\n\n' + nextAsk(d));
}

const confirmIntent = cmd === '/confirm' || /^(تأكيد|تاكيد|confirm|ارفعها|انشر|موافق ارفع|ارفع دلوقتي)$/i.test(text);
if (confirmIntent && d.step !== 'idle') {
  const m = missing(d);
  if (m.length) {
    return reply(`لسه ناقص ${m.join(' و ')} قبل ما نرفع.\n${nextAsk(d)}`);
  }
  const body = {
    title_ar: d.title_ar || d.title_en,
    title_en: d.title_en || d.title_ar,
    category_en: d.category_en,
    desc_ar: d.desc_ar || d.desc_en,
    desc_en: d.desc_en || d.desc_ar,
    index_price: d.index_price,
    min_order: Number(d.min_order) || 1,
    unit: d.unit || 'MT',
    packaging_ar: d.packaging_ar || 'كراتين تصدير',
    packaging_en: d.packaging_en || 'Export cartons',
    sizes_ar: d.sizes_ar || 'قياسي',
    sizes_en: d.sizes_en || 'Standard',
    harvest_season_ar: d.harvest_season_ar || 'على مدار العام',
    harvest_season_en: d.harvest_season_en || 'Year-round',
  };
  if (d.image_base64) {
    body.image_base64 = d.image_base64;
    body.image_filename = d.image_filename || 'product.jpg';
    body.image_mime = d.image_mime || 'image/jpeg';
  } else if (d.image) body.image = d.image;
  d.step = 'uploading';
  return out({ action: 'upload', upload_body: body });
}

if (hasPhoto) {
  return out({ action: 'need_photo', caption: caption || text });
}

// If no open draft, chat naturally
if (d.step === 'idle') {
  return out({
    action: 'chat',
    user_text: text,
    firstName,
    draft: null,
    missing: [],
  });
}

// Try to extract structured fields from this message first
let extractedSomething = false;
const waiting = missing(d)[0];
const cat = parseCategory(text);
const priceMatch = /\$|\bMT\b|سعر\s*:/i.test(text) ||
  (waiting === 'السعر' && /\d/.test(text));
if (cat && !d.category_en) { d.category_en = cat; extractedSomething = true; }
if (d.step === 'collecting' || d.step === 'title') {
  if (!cat && text.length > 1 && !/^(\$|\d)/.test(text) && missing(d).includes('الاسم') && text.length < 80) {
    const titles = parseTitles(text);
    if (titles.title_ar) d.title_ar = titles.title_ar;
    if (titles.title_en) d.title_en = titles.title_en;
    extractedSomething = true;
  }
}
// Accept description at any point if it's clearly a description (long enough, no price pattern, no category)
if (text.length > 12 && !cat && !/^\$/.test(text) && !/\d/.test(text.slice(0,3)) && !(d.desc_ar||d.desc_en) && !priceMatch) {
  if (/[\u0600-\u06FF]/.test(text)) { d.desc_ar = text; d.desc_en = d.desc_en || text; }
  else { d.desc_en = text; d.desc_ar = d.desc_ar || text; }
  extractedSomething = true;
}
if (priceMatch && !d.index_price) {
  d.index_price = text.replace(/^(سعر|price)\s*:?\s*/i,'').trim();
  extractedSomething = true;
}
if (waiting === 'السعر' && !extractedSomething) {
  return reply('قولي السعر الاسترشادي. مثال: $420/MT أو 50 جنيه/كيلو');
}
const mo = text.match(/(?:حد|min|moq)\s*:?\s*(\d+(?:\.\d+)?)/i);
if (mo) { d.min_order = Number(mo[1]); extractedSomething = true; }

staticData.sessions[chatId] = d;

if (waiting === 'التصنيف' && !extractedSomething) {
  return reply('التصنيف مش واضح. اكتب واحدة: موالح / تمور / فواكه / خضروات / مجمدات');
}

if (extractedSomething) {
  const m = missing(d);
  const ack = m.length
    ? `تمام، سجّلت.\n${nextAsk(d)}`
    : `تمام، البيانات اكتملت.\n${summary(d)}\n\nلو ماشي الحال قول تأكيد وأرفعها.`;
  return reply(ack);
}

// Otherwise natural chat with context (greetings, questions, jokes)
return out({
  action: 'chat',
  user_text: text,
  firstName,
  draft: {
    title_ar: d.title_ar, title_en: d.title_en,
    category_en: d.category_en,
    desc_ar: (d.desc_ar||'').slice(0,180),
    index_price: d.index_price,
    has_image: !!(d.image_base64 || d.image),
    missing: missing(d),
  },
});
'''

CHAT_SYSTEM = """أنتِ نسرين، مساعدة خير الجوار على تليجرام. بتتكلمي مصري طبيعي ودود زي الناس، مش روبوت فورمات.

قواعد:
- لو المستخدم سلّم أو سأل إزيك فقط: ردي طبيعي (الحمد لله، إنت عامل إيه…). لو الرسالة تصنيف أو سعر أو اسم منتج، متسلّميش ومتقوليش ازيك.
- متكرريش نفس جملة "ابعت صورة كمرفق" كل رسالة. لو ناقص صورة قولي مرة بأسلوب مختلف أو استني.
- لو سأل سؤال عام جاوبِي باختصار وبعدين كمّلي الشغل لو مناسب.
- متخترعيش بيانات منتج. لو ناقص حقل اسألي عليه بلطف.
- ممنوع Markdown المعقّد. نص عادي.
- لو مفيش مسودة مفتوحة: كلميه عادي، ولو حابب يرفع منتج قولي يكتب عايز أرفع منتج أو /new.
- طول الرد قصير: 2 إلى 5 سطور غالبًا.
"""

# Update wizard router code
by["Wizard Router"]["parameters"]["jsCode"] = WIZARD

if "Chat LLM" in by:
    try:
        by["Chat LLM"]["parameters"]["responses"]["values"][0]["content"] = CHAT_SYSTEM
    except Exception:
        pass

# Add Chat LLM + format if missing
if "Chat LLM" not in by:
    chat_node = {
        "id": str(uuid.uuid4()),
        "name": "Chat LLM",
        "type": "@n8n/n8n-nodes-langchain.openAi",
        "typeVersion": 2.3,
        "position": [760, 40],
        "credentials": {"openAiApi": {"id": "xkuHGbyF7UwDpCFy", "name": "OpenAI account"}},
        "continueOnFail": True,
        "onError": "continueRegularOutput",
        "parameters": {
            "modelId": {"__rl": True, "value": "gpt-4o-mini", "mode": "list", "cachedResultName": "GPT-4O-MINI"},
            "responses": {"values": [
                {"role": "system", "content": CHAT_SYSTEM},
                {"content": "={{ 'الاسم: ' + ($json.firstName || '') + '\\nرسالة المستخدم: ' + $json.user_text + '\\nالمسودة: ' + JSON.stringify($json.draft || null) }}"}
            ]},
            "builtInTools": {},
            "options": {}
        }
    }
    nodes.append(chat_node)
    by[chat_node["name"]] = chat_node

if "Format Chat Reply" not in by:
    fmt = {
        "id": str(uuid.uuid4()),
        "name": "Format Chat Reply",
        "type": "n8n-nodes-base.code",
        "typeVersion": 2,
        "position": [1000, 40],
        "parameters": {"jsCode": r'''
const chatId = String($('Telegram Trigger').first().json.message.chat.id);
const j = $input.first().json;
function dig(v, d=0) {
  if (v==null || d>8) return '';
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) { for (const x of v) { const t=dig(x,d+1); if (t) return t; } return ''; }
  if (typeof v === 'object') {
    if (typeof v.text === 'string' && v.text.trim()) return v.text;
    if (typeof v.content === 'string') return v.content;
    if (Array.isArray(v.content)) {
      for (const c of v.content) {
        if (typeof c === 'string' && c.trim()) return c;
        if (c && typeof c.text === 'string') return c.text;
      }
    }
    for (const k of Object.keys(v)) {
      const t = dig(v[k], d+1);
      if (t) return t;
    }
  }
  return '';
}
let text = dig(j).trim();
if (!text) text = 'أيوه، معاكِ. لما تحب نكمّل المنتج قولي أو ابعت الصورة.';
text = text.replace(/\*\*/g,'').replace(/```/g,'').slice(0,3500);
return [{ json: { action: 'reply', chatId, text } }];
'''}
    }
    nodes.append(fmt)
    by[fmt["name"]] = fmt

if "DELETE Product API" not in by:
    delete_http = {
        "id": str(uuid.uuid4()),
        "name": "DELETE Product API",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 4.2,
        "position": [1000, 620],
        "continueOnFail": True,
        "onError": "continueRegularOutput",
        "parameters": {
            "method": "DELETE",
            "url": "https://khairaljewargroup.com/api/products",
            "sendHeaders": True,
            "headerParameters": {"parameters": [
                {"name": "Content-Type", "value": "application/json"},
                {"name": "x-product-bot-secret", "value": "KhairProdBot_8723339xN8n"},
            ]},
            "sendBody": True,
            "specifyBody": "json",
            "jsonBody": "={{ $json.delete_body }}",
            "options": {},
        },
    }
    nodes.append(delete_http)
    by[delete_http["name"]] = delete_http

if "Format Delete Reply" not in by:
    delete_fmt = {
        "id": str(uuid.uuid4()),
        "name": "Format Delete Reply",
        "type": "n8n-nodes-base.code",
        "typeVersion": 2,
        "position": [1220, 620],
        "parameters": {"jsCode": r'''
const chatId = String($json.chatId || $('Telegram Trigger').first().json.message.chat.id);
const j = $input.first().json;
let text = '';
if (j.error) {
  text = '❌ ماقدرتش أمسح المنتج:\n' + String(j.detail || j.error).slice(0,500) + '\n\nجرّب بالـ slug بالضبط، مثال: /delete original-lemon';
} else if (j.ok && j.deleted && j.product) {
  const p = j.product;
  text = [
    '🗑️ تم إخفاء المنتج من الموقع بنجاح',
    '',
    `• ${p.title?.ar || ''} / ${p.title?.en || ''}`,
    `• slug: ${p.slug || ''}`,
    `• التصنيف: ${p.category?.ar || p.category?.en || ''}`,
    '',
    'لو حبيت ترجعه بعدين، نقدر نفعّله تاني من الداتا.'
  ].join('\n');
} else {
  text = '⚠️ رد غير متوقع في الحذف:\n' + JSON.stringify(j).slice(0,700);
}
return [{ json: { action: 'reply', chatId, text } }];
'''},
    }
    nodes.append(delete_fmt)
    by[delete_fmt["name"]] = delete_fmt

# Switch: add delete/chat rules as extra outputs if missing
sw = by["Switch Action"]
rules = sw["parameters"]["rules"]["values"]
# existing: reply, upload, photo, delete, chat
rule_map = {r.get("outputKey"): r for r in rules}
if "delete" not in rule_map:
    rule_map["delete"] = {
        "conditions": {
            "options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict", "version": 3},
            "conditions": [{"id": "del", "leftValue": "={{ $json.action }}", "rightValue": "delete", "operator": {"type": "string", "operation": "equals"}}],
            "combinator": "and",
        },
        "renameOutput": True,
        "outputKey": "delete",
    }
if "chat" not in rule_map:
    rule_map["chat"] = {
        "conditions": {
            "options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict", "version": 3},
            "conditions": [{"id": "ch", "leftValue": "={{ $json.action }}", "rightValue": "chat", "operator": {"type": "string", "operation": "equals"}}],
            "combinator": "and",
        },
        "renameOutput": True,
        "outputKey": "chat",
    }
ordered_keys = ["reply", "upload", "photo", "delete", "chat"]
sw["parameters"]["rules"]["values"] = [rule_map[k] for k in ordered_keys if k in rule_map]

# connections Switch main follow the same rule order
main = conns["Switch Action"]["main"]
while len(main) < len(ordered_keys):
    main.append([])
main[3] = [{"node": "DELETE Product API", "type": "main", "index": 0}]
main[4] = [{"node": "Chat LLM", "type": "main", "index": 0}]
conns["Switch Action"]["main"] = main
conns["DELETE Product API"] = {"main": [[{"node": "Format Delete Reply", "type": "main", "index": 0}]]}
conns["Format Delete Reply"] = {"main": [[{"node": "Send Upload Result", "type": "main", "index": 0}]]}
conns["Chat LLM"] = {"main": [[{"node": "Format Chat Reply", "type": "main", "index": 0}]]}
conns["Format Chat Reply"] = {"main": [[{"node": "Send Reply", "type": "main", "index": 0}]]}

# Fix photo binary read (n8n 2.x stores file bytes outside JSON `.data`)
SAVE_PHOTO = r'''
const staticData = $getWorkflowStaticData('global');
if (!staticData.sessions) staticData.sessions = {};
const trigger = $('Telegram Trigger').first().json;
const msg = trigger.message || {};
const chatId = String(msg.chat?.id || '');
const caption = String(msg.caption || '').trim();
let d = staticData.sessions[chatId];
if (!d) {
  d = {
    step: 'collecting', title_ar:'', title_en:'', category_en:'', desc_ar:'', desc_en:'',
    index_price:'', min_order:1, unit:'MT', packaging_ar:'', packaging_en:'',
    sizes_ar:'', sizes_en:'', harvest_season_ar:'على مدار العام', harvest_season_en:'Year-round',
    image_base64:'', image_filename:'', image_mime:'', image:''
  };
  staticData.sessions[chatId] = d;
}

const item = $input.first();
const keys = item.binary ? Object.keys(item.binary) : [];
const binaryKey = keys.includes('data') ? 'data' : keys[0];
if (!binaryKey) {
  return [{ json: { action: 'reply', chatId, text: '❌ ما قدرتش ألاقي ملف الصورة. ابعتها تاني كصورة (مش ملف مضغوط).' } }];
}

let buf;
try {
  if (typeof this.helpers?.getBinaryDataBuffer === 'function') {
    buf = await this.helpers.getBinaryDataBuffer(0, binaryKey);
  }
} catch (e) {
  buf = null;
}
if (!buf || !Buffer.isBuffer(buf)) {
  const meta = item.binary[binaryKey] || {};
  if (meta.data && String(meta.data).length > 2000) {
    buf = Buffer.from(String(meta.data), 'base64');
  }
}
if (!buf || buf.length < 4096) {
  return [{ json: {
    action: 'reply',
    chatId,
    text: '❌ الصورة وصلتني ناقصة/فاضية. ابعتها تاني من الجاليري كصورة عادية، مش كـ file مضغوط.',
  }}];
}

const magic = buf.subarray(0, 12);
const isJpeg = magic[0] === 0xff && magic[1] === 0xd8;
const isPng = magic[0] === 0x89 && magic[1] === 0x50;
const isWebp = magic.toString('ascii', 0, 4) === 'RIFF';
if (!isJpeg && !isPng && !isWebp) {
  return [{ json: { action: 'reply', chatId, text: '❌ الملف مش صورة JPEG/PNG صالحة. ابعت صورة تانية.' } }];
}

const meta = item.binary[binaryKey] || {};
d.image_base64 = buf.toString('base64');
d.image_filename = meta.fileName || (isPng ? 'product.png' : isWebp ? 'product.webp' : 'product.jpg');
d.image_mime = meta.mimeType || (isPng ? 'image/png' : isWebp ? 'image/webp' : 'image/jpeg');
d.image = '';
d.step = d.step === 'idle' ? 'collecting' : d.step;
staticData.sessions[chatId] = d;

if (caption) {
  const lines = caption.split(/\n+/).map(s => s.trim()).filter(Boolean);
  if (!(d.title_ar || d.title_en) && lines[0]) {
    const parts = lines[0].split('|').map(x => x.trim());
    if (parts.length >= 2) {
      if (/[\u0600-\u06FF]/.test(parts[0])) { d.title_ar = parts[0]; d.title_en = parts[1]; }
      else { d.title_en = parts[0]; d.title_ar = parts[1]; }
    } else if (/[\u0600-\u06FF]/.test(lines[0])) d.title_ar = lines[0];
    else d.title_en = lines[0];
  }
}

const missing = [];
if (!(d.title_ar || d.title_en)) missing.push('الاسم');
if (!d.category_en) missing.push('التصنيف');
if (!d.index_price) missing.push('السعر');

let text = `تمام، الصورة وصلتني 👍 (${Math.round(buf.length/1024)}KB)\n`;
if (!missing.length) {
  text += 'كل البيانات الأساسية مكتملة.\nقول تأكيد عشان أرفعها على الموقع، أو /status للمراجعة.';
} else {
  text += `لسه ناقص: ${missing.join('، ')}\nكمّل الناقص وبعدين قول تأكيد.`;
}
return [{ json: { action: 'reply', chatId, text } }];
'''

if "Save Photo To Draft" in by:
    by["Save Photo To Draft"]["parameters"]["jsCode"] = SAVE_PHOTO

if "Get Photo" in by:
    gp = by["Get Photo"]["parameters"]
    gp["download"] = True
    if not isinstance(gp.get("additionalFields"), dict):
        gp["additionalFields"] = {}
    gp["additionalFields"]["download"] = True

tg = by["Telegram Trigger"]
WH = tg.get("webhookId")
tid = tg["id"]
new_ver = str(uuid.uuid4())
name = "Khair Products Upload Bot"
author = subprocess.check_output(
    ["docker","exec","n8n-postgres-1","psql","-U","n8n_user","-d","n8n_db","-t","-A","-c",
     'SELECT id FROM "user" LIMIT 1;'], text=True).strip()
nb = base64.b64encode(json.dumps(nodes, ensure_ascii=False).encode()).decode()
cb = base64.b64encode(json.dumps(conns, ensure_ascii=False).encode()).decode()
sql = f"""BEGIN;
UPDATE workflow_entity SET
  nodes=convert_from(decode('{nb}','base64'),'UTF8')::json,
  connections=convert_from(decode('{cb}','base64'),'UTF8')::json,
  "versionId"='{new_ver}',
  "activeVersionId"=NULL,
  active=false,
  "updatedAt"=CURRENT_TIMESTAMP(3)
WHERE id='{wid}';
INSERT INTO workflow_history ("versionId","workflowId",authors,nodes,connections,name,autosaved,"nodeGroups")
VALUES ('{new_ver}','{wid}','{author}',
 convert_from(decode('{nb}','base64'),'UTF8')::json,
 convert_from(decode('{cb}','base64'),'UTF8')::json,
 $n${name}$n$, false, '[]'::json);
UPDATE workflow_entity SET active=true, "activeVersionId"='{new_ver}', "updatedAt"=CURRENT_TIMESTAMP(3) WHERE id='{wid}';
INSERT INTO shared_workflow ("workflowId","projectId",role,"createdAt","updatedAt")
VALUES ('{wid}','{project}','workflow:owner',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3))
ON CONFLICT ("workflowId","projectId") DO NOTHING;
COMMIT;"""
open("/tmp/nat.sql","w").write(sql)
subprocess.check_call(["docker","cp","/tmp/nat.sql","n8n-postgres-1:/tmp/nat.sql"])
print(subprocess.check_output(["docker","exec","n8n-postgres-1","psql","-U","n8n_user","-d","n8n_db","-v","ON_ERROR_STOP=1","-f","/tmp/nat.sql"], text=True))
subprocess.check_call(["docker","restart","n8n-n8n-1"])
for i in range(40):
    time.sleep(2)
    logs = subprocess.check_output(["docker","logs","--tail","60","n8n-n8n-1"], text=True, stderr=subprocess.STDOUT)
    chunk = logs[logs.rfind("Initializing n8n process"):]
    if 'Activated workflow "Khair Products Upload Bot"' in chunk:
        print("READY_OK")
        time.sleep(8)
        break

secret = re.sub(r"[^a-zA-Z0-9_-]+", "", f"{wid}_{tid}")
webhook_url = f"https://n8n.esteemmediaa.com/webhook/{WH}/webhook"
data = urllib.parse.urlencode({"url": webhook_url, "secret_token": secret, "allowed_updates": json.dumps(["message"])}).encode()
print("setWebhook", json.loads(urllib.request.urlopen(urllib.request.Request(f"https://api.telegram.org/bot{token}/setWebhook", data=data), timeout=30).read().decode()))

# simulate name then category — must NOT re-greet
for text in ["/cancel", "عايز ارفع منتج جديد", "ليمون اصلي | original lemon", "خضروات"]:
    uid = int(time.time()*1000) % 10**9
    body = {"update_id": uid, "message": {"message_id": uid%100000, "from": {"id": 8929452910, "is_bot": False, "first_name": "T"}, "chat": {"id": 8929452910, "type": "private"}, "date": int(time.time()), "text": text}}
    req = urllib.request.Request(webhook_url, data=json.dumps(body).encode(), headers={"Content-Type":"application/json","X-Telegram-Bot-Api-Secret-Token": secret})
    try:
        print("sim", text, urllib.request.urlopen(req, timeout=90).status)
    except Exception as e:
        print("sim_fail", text, e)
    time.sleep(4)

print("LAST", subprocess.check_output(["docker","exec","n8n-postgres-1","psql","-U","n8n_user","-d","n8n_db","-t","-A","-F","|","-c",
    f'SELECT id,status FROM execution_entity WHERE "workflowId"=\'{wid}\' ORDER BY id DESC LIMIT 3;'], text=True))
print("DONE")

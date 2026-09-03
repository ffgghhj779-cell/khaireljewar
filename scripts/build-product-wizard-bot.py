import json,subprocess,sys,uuid,base64,urllib.request,urllib.parse,time,re,os
from hashlib import md5
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

sys.stdout.reconfigure(encoding="utf-8")

wid = "KhairProdBotWF01"
cred_id = "KhairProdBotTg01"
openai_id = "xkuHGbyF7UwDpCFy"
project = "aP2lOxNRBLDWZgO5"
token = open("/tmp/kh_prod_bot_token.txt").read().strip()

# Keep existing webhook id if possible
raw = subprocess.check_output(
    [
        "docker",
        "exec",
        "n8n-postgres-1",
        "psql",
        "-U",
        "n8n_user",
        "-d",
        "n8n_db",
        "-t",
        "-A",
        "-c",
        f"SELECT encode(convert_to(nodes::text,'UTF8'),'base64') FROM workflow_entity WHERE id='{wid}';",
    ],
    text=True,
).strip()
old_nodes = json.loads(base64.b64decode(raw)) if raw else []
old_tg = next((n for n in old_nodes if "telegramTrigger" in n.get("type", "")), None)
WH = (old_tg or {}).get("webhookId") or str(uuid.uuid4())
tg_node_id = (old_tg or {}).get("id") or str(uuid.uuid4())
new_ver = str(uuid.uuid4())

tg_creds = {"telegramApi": {"id": cred_id, "name": "khair_products_bot"}}
openai_creds = {"openAiApi": {"id": openai_id, "name": "OpenAI account"}}


def nid():
    return str(uuid.uuid4())


# --- Wizard controller (session in workflow static data) ---
wizard_code = r'''
const ALLOWED = [8929452910];
const CATEGORIES = ['Citrus','Dates','Fruits','Vegetables','Frozen'];
const CAT_AR = {Citrus:'الموالح', Dates:'التمور', Fruits:'الفواكه', Vegetables:'الخضروات', Frozen:'المجمدات'};

const staticData = $getWorkflowStaticData('global');
if (!staticData.sessions) staticData.sessions = {};

const trigger = $('Telegram Trigger').first().json;
const msg = trigger.message || {};
const chatId = String(msg.chat?.id || '');
const fromId = msg.from?.id;
const textRaw = String(msg.text || '').trim();
const caption = String(msg.caption || '').trim();
const text = textRaw || caption;
const cmd = (text.split(/\s+/)[0] || '').split('@')[0].toLowerCase();
const hasPhoto = Array.isArray(msg.photo) && msg.photo.length > 0;

function reply(t, extra={}) {
  return [{ json: { action: 'reply', chatId, text: t, ...extra } }];
}
function unauthorized() {
  return reply('⛔ هذا البوت مخصص لفريق خير الجوار المعتمد فقط.\nابعت /id للإدارة لإضافتك.');
}

const listed = ALLOWED.map(String).includes(String(fromId));
if (cmd === '/id') {
  return reply(`🆔 Telegram ID: ${fromId}\nChat ID: ${chatId}\nابعت الرقم ده للإدارة لإضافة صلاحية.`);
}
if (!listed) return unauthorized();

function blankDraft() {
  return {
    step: 'menu',
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
    updatedAt: Date.now()
  };
}

function getSession() {
  if (!staticData.sessions[chatId]) staticData.sessions[chatId] = blankDraft();
  return staticData.sessions[chatId];
}
function clearSession() {
  delete staticData.sessions[chatId];
}

function progress(d) {
  const checks = [
    !!(d.title_ar || d.title_en),
    !!d.category_en,
    !!(d.desc_ar || d.desc_en),
    !!d.index_price,
    !!(d.image_base64 || d.image),
  ];
  const done = checks.filter(Boolean).length;
  return `التقدم: ${done}/5`;
}

function missing(d) {
  const m = [];
  if (!(d.title_ar || d.title_en)) m.push('الاسم');
  if (!d.category_en) m.push('التصنيف');
  if (!(d.desc_ar || d.desc_en)) m.push('الوصف');
  if (!d.index_price) m.push('السعر');
  if (!(d.image_base64 || d.image)) m.push('الصورة');
  return m;
}

function summary(d) {
  return [
    '📋 ملخص المنتج قبل الرفع:',
    `• الاسم: ${d.title_ar || '—'} / ${d.title_en || '—'}`,
    `• التصنيف: ${d.category_en || '—'} (${CAT_AR[d.category_en] || '—'})`,
    `• الوصف: ${(d.desc_ar || d.desc_en || '—').slice(0,180)}`,
    `• السعر: ${d.index_price || '—'}`,
    `• الحد الأدنى: ${d.min_order || 1} ${d.unit || 'MT'}`,
    `• الصورة: ${(d.image_base64 || d.image) ? '✅ مرفقة' : '❌ ناقصة'}`,
    '',
    progress(d),
    '',
    'لو تمام ابعت: تأكيد',
    'للتعديل: اسم / تصنيف / وصف / سعر / صورة / حد',
    'للإلغاء: /cancel'
  ].join('\n');
}

function askNext(d) {
  const m = missing(d);
  if (!m.length) {
    d.step = 'confirm';
    return summary(d);
  }
  const next = m[0];
  if (next === 'الاسم') {
    d.step = 'title';
    return '① ابعت اسم المنتج\nمثال: برتقال فالنسيا | Valencia Oranges';
  }
  if (next === 'التصنيف') {
    d.step = 'category';
    return '② اختار التصنيف (اكتب رقم أو الاسم):\n1) Citrus — الموالح\n2) Dates — التمور\n3) Fruits — الفواكه\n4) Vegetables — الخضروات\n5) Frozen — المجمدات';
  }
  if (next === 'الوصف') {
    d.step = 'desc';
    return '③ ابعت وصف المنتج (عربي أو إنجليزي أو الاتنين)\nمثال: برتقال عصير درجة أولى — High Brix juicing oranges';
  }
  if (next === 'السعر') {
    d.step = 'price';
    return '④ ابعت السعر الاسترشادي\nمثال: $420/MT';
  }
  if (next === 'الصورة') {
    d.step = 'image';
    return '⑤ ابعت صورة المنتج الآن 📷';
  }
  d.step = 'confirm';
  return summary(d);
}

function parseCategory(t) {
  const s = t.trim();
  const map = {
    '1': 'Citrus', 'citrus': 'Citrus', 'موالح': 'Citrus', 'الموالح': 'Citrus',
    '2': 'Dates', 'dates': 'Dates', 'تمور': 'Dates', 'التمور': 'Dates',
    '3': 'Fruits', 'fruits': 'Fruits', 'فواكه': 'Fruits', 'الفواكه': 'Fruits',
    '4': 'Vegetables', 'vegetables': 'Vegetables', 'خضروات': 'Vegetables', 'الخضروات': 'Vegetables',
    '5': 'Frozen', 'frozen': 'Frozen', 'مجمدات': 'Frozen', 'المجمدات': 'Frozen',
  };
  const key = s.toLowerCase();
  if (map[key]) return map[key];
  if (map[s]) return map[s];
  const hit = CATEGORIES.find(c => c.toLowerCase() === key);
  return hit || '';
}

function parseTitles(t) {
  const parts = t.split('|').map(x => x.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0], b = parts[1];
    const aAr = /[\u0600-\u06FF]/.test(a);
    return aAr ? { title_ar: a, title_en: b } : { title_en: a, title_ar: b };
  }
  if (/[\u0600-\u06FF]/.test(t)) return { title_ar: t, title_en: '' };
  return { title_en: t, title_ar: '' };
}

const HELP = `أهلاً 👋 أنا بوت رفع منتجات خير الجوار — مستوى احترافي.

أقدر أرفع منتج جديد على الموقع خطوة بخطوة، وبعد التأكيد يرجع لك لينك المنتج.

الأوامر:
/start — بدء / قائمة
/new — منتج جديد
/status — حالة المسودة الحالية
/confirm — تأكيد الرفع
/cancel — إلغاء المسودة
/help — المساعدة
/id — معرف تليجرام

طريقة سريعة:
1) /new
2) جاوب على الأسئلة بالترتيب
3) ارفع الصورة
4) اكتب: تأكيد

تقدر كمان تبعت صورة في أي وقت أثناء التسجيل.`;

// commands
if (['/start','/help'].includes(cmd)) {
  return reply(cmd === '/help' ? HELP : `مرحباً بك في بوت منتجات خير الجوار ✅\n\n${HELP}`);
}
if (cmd === '/cancel') {
  clearSession();
  return reply('تم إلغاء المسودة ✅\nابدأ من جديد بـ /new');
}

let d = getSession();

if (cmd === '/new' || /^(رفع|عايز|أريد|ارفع|منتج جديد|new)/i.test(text) && d.step === 'menu') {
  d = blankDraft();
  staticData.sessions[chatId] = d;
  d.step = 'title';
  return reply('تمام — هنرفع منتج جديد على الموقع 🚀\n\n' + askNext(d));
}

if (cmd === '/status') {
  if (!staticData.sessions[chatId] || d.step === 'menu') return reply('مفيش مسودة مفتوحة.\nابدأ بـ /new');
  return reply(summary(d));
}

if (cmd === '/confirm' || /^(تأكيد|تاكيد|confirm|نعم|موافق|ارفع|انشر)$/i.test(text)) {
  const m = missing(d);
  if (m.length) return reply(`لسه ناقص: ${m.join('، ')}\n\n` + askNext(d));
  d.step = 'uploading';
  // hand off to upload pipeline
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
  } else if (d.image) {
    body.image = d.image;
  }
  return [{ json: { action: 'upload', chatId, upload_body: body, draft: d } }];
}

// photo attachment anytime
if (hasPhoto) {
  return [{ json: { action: 'need_photo', chatId, draftStep: d.step, caption: caption || text } }];
}

// if idle and free text mentions upload intent
if (d.step === 'menu') {
  if (/منتج|رفع|upload|new/i.test(text)) {
    d = blankDraft();
    staticData.sessions[chatId] = d;
    d.step = 'title';
    return reply('تمام — نبدأ تسجيل منتج جديد.\n\n' + askNext(d));
  }
  return reply('اكتب /new لبدء رفع منتج، أو /help للمساعدة.');
}

// field capture by step / keywords
const lower = text.toLowerCase();
if (d.step === 'title' || /^اسم/.test(text)) {
  const titles = parseTitles(text.replace(/^اسم\s*:?\s*/i,''));
  if (titles.title_ar) d.title_ar = titles.title_ar;
  if (titles.title_en) d.title_en = titles.title_en;
  return reply(`✅ تم حفظ الاسم\n${progress(d)}\n\n` + askNext(d));
}
if (d.step === 'category' || /^تصنيف/.test(text)) {
  const cat = parseCategory(text.replace(/^تصنيف\s*:?\s*/i,''));
  if (!cat) return reply('التصنيف غير مفهوم. ابعت رقم من 1 إلى 5 أو اسم التصنيف بالإنجليزي.');
  d.category_en = cat;
  return reply(`✅ التصنيف: ${cat} (${CAT_AR[cat]})\n${progress(d)}\n\n` + askNext(d));
}
if (d.step === 'desc' || /^وصف/.test(text)) {
  const val = text.replace(/^وصف\s*:?\s*/i,'').trim();
  if (/[\u0600-\u06FF]/.test(val)) { d.desc_ar = val; if (!d.desc_en) d.desc_en = val; }
  else { d.desc_en = val; if (!d.desc_ar) d.desc_ar = val; }
  return reply(`✅ تم حفظ الوصف\n${progress(d)}\n\n` + askNext(d));
}
if (d.step === 'price' || /^سعر|^price/i.test(text)) {
  d.index_price = text.replace(/^(سعر|price)\s*:?\s*/i,'').trim();
  // optional min order in same line
  const mo = text.match(/(?:حد|min|moq)\s*:?\s*(\d+(?:\.\d+)?)/i);
  if (mo) d.min_order = Number(mo[1]);
  return reply(`✅ السعر: ${d.index_price}\n${progress(d)}\n\n` + askNext(d));
}
if (d.step === 'image') {
  return reply('📷 ابعت صورة المنتج كمرفق (مش لينك).');
}
if (d.step === 'confirm') {
  if (/تعديل|اسم|تصنيف|وصف|سعر|صورة|حد/.test(text)) {
    if (/اسم/.test(text)) { d.step='title'; return reply('ابعت الاسم الجديد:'); }
    if (/تصنيف/.test(text)) { d.step='category'; return reply(askNext({...d, category_en:''})); }
    if (/وصف/.test(text)) { d.step='desc'; return reply('ابعت الوصف الجديد:'); }
    if (/سعر/.test(text)) { d.step='price'; return reply('ابعت السعر الجديد:'); }
    if (/صورة/.test(text)) { d.step='image'; return reply('ابعت صورة جديدة:'); }
    if (/حد/.test(text)) { return reply('ابعت الحد الأدنى للطلب رقم فقط (مثال: 24)'); }
  }
  return reply(summary(d));
}

// generic min_order capture
if (/^\d+(\.\d+)?$/.test(text) && d.step === 'confirm') {
  d.min_order = Number(text);
  return reply(`✅ الحد الأدنى: ${d.min_order}\n\n` + summary(d));
}

return reply('ما فهمتش الرسالة.\nابعت /status لعرض المسودة أو /help للمساعدة.');
'''

attach_photo_code = r'''
const staticData = $getWorkflowStaticData('global');
if (!staticData.sessions) staticData.sessions = {};
const trigger = $('Telegram Trigger').first().json;
const msg = trigger.message || {};
const chatId = String(msg.chat?.id || '');
const caption = String(msg.caption || '').trim();
let d = staticData.sessions[chatId];
if (!d) {
  d = {
    step: 'title', title_ar:'', title_en:'', category_en:'', desc_ar:'', desc_en:'',
    index_price:'', min_order:1, unit:'MT', packaging_ar:'', packaging_en:'',
    sizes_ar:'', sizes_en:'', harvest_season_ar:'على مدار العام', harvest_season_en:'Year-round',
    image_base64:'', image_filename:'', image_mime:'', image:''
  };
  staticData.sessions[chatId] = d;
}

const item = $input.first();
let binary = item.binary ? JSON.parse(JSON.stringify(item.binary)) : undefined;
if (binary && !binary.data) {
  const key = Object.keys(binary)[0];
  if (key) binary = { data: binary[key] };
}
if (!binary?.data?.data) {
  return [{ json: { action: 'reply', chatId, text: '❌ ما قدرتش أقرأ الصورة. ابعتها تاني كملف صورة.' } }];
}
d.image_base64 = binary.data.data;
d.image_filename = binary.data.fileName || 'product.jpg';
d.image_mime = binary.data.mimeType || 'image/jpeg';
d.image = '';

// soft parse caption into draft if empty fields
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
  for (const line of lines) {
    const low = line.toLowerCase();
    if (!d.category_en) {
      const cats = ['Citrus','Dates','Fruits','Vegetables','Frozen'];
      const hit = cats.find(c => low === c.toLowerCase() || line.includes(c));
      if (hit) d.category_en = hit;
      if (/موالح/.test(line)) d.category_en = 'Citrus';
      if (/تمور/.test(line)) d.category_en = 'Dates';
      if (/فواكه/.test(line)) d.category_en = 'Fruits';
      if (/خضروات/.test(line)) d.category_en = 'Vegetables';
      if (/مجمد/.test(line)) d.category_en = 'Frozen';
    }
    if (!d.index_price && /\$|\bMT\b|سعر/.test(line)) d.index_price = line.replace(/^سعر\s*:?\s*/,'');
  }
  if (!(d.desc_ar || d.desc_en) && lines.length > 1) {
    d.desc_ar = caption;
    d.desc_en = caption;
  }
}

const missing = [];
if (!(d.title_ar || d.title_en)) missing.push('الاسم');
if (!d.category_en) missing.push('التصنيف');
if (!(d.desc_ar || d.desc_en)) missing.push('الوصف');
if (!d.index_price) missing.push('السعر');

let text = '✅ تم حفظ صورة المنتج\n';
if (!missing.length) {
  d.step = 'confirm';
  text += 'كل البيانات الأساسية مكتملة.\nابعت: تأكيد للرفع، أو /status للمراجعة.';
} else {
  d.step = missing[0] === 'الاسم' ? 'title' : missing[0] === 'التصنيف' ? 'category' : missing[0] === 'الوصف' ? 'desc' : 'price';
  text += `لسه ناقص: ${missing.join('، ')}\nكمّل البيانات عشان نقدر نرفع.`;
}
return [{ json: { action: 'reply', chatId, text } }];
'''

enrich_code = r'''
// Optional: if draft incomplete and we have AI output, merge
const staticData = $getWorkflowStaticData('global');
const chatId = String($('Telegram Trigger').first().json.message.chat.id);
const d = (staticData.sessions || {})[chatId];
const j = $input.first().json;
function digText(v, depth=0) {
  if (v == null || depth > 8) return '';
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) { for (const x of v) { const t = digText(x, depth+1); if (t) return t; } return ''; }
  if (typeof v === 'object') {
    if (typeof v.text === 'string' && v.text.trim()) return v.text;
    if (typeof v.content === 'string' && v.content.trim()) return v.content;
    if (Array.isArray(v.content)) {
      for (const c of v.content) {
        if (typeof c === 'string' && c.trim()) return c;
        if (c && typeof c.text === 'string') return c.text;
      }
    }
    for (const k of Object.keys(v)) {
      const t = digText(v[k], depth+1);
      if (t && t.includes('{')) return t;
    }
  }
  return '';
}
function parseJsonLoose(text) {
  if (!text) return null;
  let t = String(text).trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');
  try { return JSON.parse(t); } catch(_){}
  const m = t.match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch(_){} }
  return null;
}
if (!d) return [{ json: { action: 'reply', chatId, text: 'ابدأ بـ /new أولاً.' } }];
const parsed = parseJsonLoose(digText(j)) || {};
for (const k of ['title_ar','title_en','category_en','desc_ar','desc_en','index_price','unit','packaging_ar','packaging_en','sizes_ar','sizes_en']) {
  if (parsed[k] && !d[k]) d[k] = parsed[k];
}
if (parsed.min_order && !d.min_order) d.min_order = parsed.min_order;
const missing = [];
if (!(d.title_ar || d.title_en)) missing.push('الاسم');
if (!d.category_en) missing.push('التصنيف');
if (!(d.desc_ar || d.desc_en)) missing.push('الوصف');
if (!d.index_price) missing.push('السعر');
if (!(d.image_base64 || d.image)) missing.push('الصورة');
let text = '🤖 حللت الصورة واقترحت بيانات أولية.\n';
if (!missing.length) {
  d.step = 'confirm';
  text += 'المسودة مكتملة. راجع ثم ابعت: تأكيد\n\n';
  text += `• ${d.title_ar} / ${d.title_en}\n• ${d.category_en}\n• ${d.index_price}`;
} else {
  text += `لسه ناقص: ${missing.join('، ')}\nكمّل الناقص ثم /status`;
  d.step = missing[0] === 'الاسم' ? 'title' : missing[0] === 'التصنيف' ? 'category' : missing[0] === 'الوصف' ? 'desc' : missing[0] === 'السعر' ? 'price' : 'image';
}
return [{ json: { action: 'reply', chatId, text } }];
'''

format_upload_reply = r'''
const staticData = $getWorkflowStaticData('global');
const chatId = String($json.chatId || $('Telegram Trigger').first().json.message.chat.id);
const j = $input.first().json;
let text = '';
if (j.error) {
  text = '❌ فشل رفع المنتج على الموقع:\n' + String(j.detail || j.error).slice(0,500) + '\n\nعدّل البيانات أو ابعت /status ثم حاول تأكيد مرة أخرى.';
} else if (j.ok && j.product) {
  const p = j.product;
  text = [
    '✅ تم رفع المنتج بنجاح على الموقع',
    '',
    `• ${p.title?.ar || ''} / ${p.title?.en || ''}`,
    `• التصنيف: ${p.category?.ar || p.category?.en || ''}`,
    `• السعر: ${p.indexPrice || '—'}`,
    `• slug: ${p.slug}`,
    '',
    'رابط عربي:',
    j.urls?.ar || '',
    '',
    'English:',
    j.urls?.en || '',
    '',
    'هتلاقيه في كروت المنتجات على الموقع بعد ثواني.',
    '',
    'لرفع منتج جديد: /new'
  ].join('\n');
  if (staticData.sessions) delete staticData.sessions[chatId];
} else {
  text = '⚠️ رد غير متوقع:\n' + JSON.stringify(j).slice(0,700);
}
return [{ json: { action: 'reply', chatId, text } }];
'''

nodes = [
  {
    "id": tg_node_id,
    "name": "Telegram Trigger",
    "type": "n8n-nodes-base.telegramTrigger",
    "typeVersion": 1.1,
    "position": [0, 400],
    "webhookId": WH,
    "credentials": tg_creds,
    "parameters": {"updates": ["message"], "additionalFields": {}},
  },
  {
    "id": nid(),
    "name": "Wizard Router",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [240, 400],
    "parameters": {"jsCode": wizard_code},
  },
  {
    "id": nid(),
    "name": "Switch Action",
    "type": "n8n-nodes-base.switch",
    "typeVersion": 3.2,
    "position": [480, 400],
    "parameters": {
      "rules": {
        "values": [
          {
            "conditions": {
              "options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict", "version": 3},
              "conditions": [{"id": "r", "leftValue": "={{ $json.action }}", "rightValue": "reply", "operator": {"type": "string", "operation": "equals"}}],
              "combinator": "and",
            },
            "renameOutput": True,
            "outputKey": "reply",
          },
          {
            "conditions": {
              "options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict", "version": 3},
              "conditions": [{"id": "u", "leftValue": "={{ $json.action }}", "rightValue": "upload", "operator": {"type": "string", "operation": "equals"}}],
              "combinator": "and",
            },
            "renameOutput": True,
            "outputKey": "upload",
          },
          {
            "conditions": {
              "options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict", "version": 3},
              "conditions": [{"id": "p", "leftValue": "={{ $json.action }}", "rightValue": "need_photo", "operator": {"type": "string", "operation": "equals"}}],
              "combinator": "and",
            },
            "renameOutput": True,
            "outputKey": "photo",
          },
        ]
      },
      "options": {"fallbackOutput": "extra"},
    },
  },
  {
    "id": nid(),
    "name": "Send Reply",
    "type": "n8n-nodes-base.telegram",
    "typeVersion": 1.2,
    "position": [760, 240],
    "credentials": tg_creds,
    "parameters": {
      "chatId": "={{ $json.chatId }}",
      "text": "={{ $json.text }}",
      "additionalFields": {"appendAttribution": False},
    },
  },
  {
    "id": nid(),
    "name": "Ack Upload",
    "type": "n8n-nodes-base.telegram",
    "typeVersion": 1.2,
    "position": [760, 420],
    "credentials": tg_creds,
    "continueOnFail": True,
    "onError": "continueRegularOutput",
    "parameters": {
      "chatId": "={{ $json.chatId }}",
      "text": "⏳ جاري رفع المنتج على الموقع الآن…",
      "additionalFields": {"appendAttribution": False},
    },
  },
  {
    "id": nid(),
    "name": "POST Product API",
    "type": "n8n-nodes-base.httpRequest",
    "typeVersion": 4.2,
    "position": [1000, 480],
    "continueOnFail": True,
    "onError": "continueRegularOutput",
    "parameters": {
      "method": "POST",
      "url": "https://khairaljewargroup.com/api/products",
      "sendHeaders": True,
      "headerParameters": {
        "parameters": [
          {"name": "Content-Type", "value": "application/json"},
          {"name": "x-product-bot-secret", "value": "KhairProdBot_8723339xN8n"},
        ]
      },
      "sendBody": True,
      "specifyBody": "json",
      "jsonBody": "={{ $json.upload_body }}",
      "options": {},
    },
  },
  {
    "id": nid(),
    "name": "Format Upload Reply",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [1220, 480],
    "parameters": {"jsCode": format_upload_reply},
  },
  {
    "id": nid(),
    "name": "Send Upload Result",
    "type": "n8n-nodes-base.telegram",
    "typeVersion": 1.2,
    "position": [1440, 480],
    "credentials": tg_creds,
    "parameters": {
      "chatId": "={{ $json.chatId }}",
      "text": "={{ $json.text }}",
      "additionalFields": {"appendAttribution": False},
    },
  },
  {
    "id": nid(),
    "name": "Get Photo",
    "type": "n8n-nodes-base.telegram",
    "typeVersion": 1.2,
    "position": [760, 680],
    "credentials": tg_creds,
    "parameters": {
      "resource": "file",
      "operation": "get",
      "fileId": "={{ $('Telegram Trigger').item.json.message.photo[$('Telegram Trigger').item.json.message.photo.length - 1].file_id }}",
      "additionalFields": {},
    },
  },
  {
    "id": nid(),
    "name": "Save Photo To Draft",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [1000, 680],
    "parameters": {"jsCode": attach_photo_code},
  },
  {
    "id": nid(),
    "name": "Maybe Analyze Photo",
    "type": "@n8n/n8n-nodes-langchain.openAi",
    "typeVersion": 2.3,
    "position": [1220, 760],
    "credentials": openai_creds,
    "continueOnFail": True,
    "onError": "continueRegularOutput",
    "parameters": {
      "resource": "image",
      "operation": "analyze",
      "modelId": {"__rl": True, "value": "gpt-4o-mini", "mode": "list", "cachedResultName": "GPT-4O-MINI"},
      "text": """استخرج بيانات منتج زراعي للتصدير من الصورة والكابشن وأرجع JSON فقط:
{"title_ar":"","title_en":"","category_en":"Citrus|Dates|Fruits|Vegetables|Frozen","desc_ar":"","desc_en":"","index_price":"","min_order":1,"unit":"MT"}
كابشن: {{ $('Telegram Trigger').item.json.message.caption || '' }}
ممنوع نص خارج JSON.""",
      "inputType": "base64",
      "binaryPropertyName": "data",
      "simplify": True,
      "options": {"detail": "high", "maxTokens": 1000},
    },
  },
  {
    "id": nid(),
    "name": "Merge AI Into Draft",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [1440, 760],
    "parameters": {"jsCode": enrich_code},
  },
]

# Connect Get Photo -> Save Photo (reply) AND also to Analyze for enrichment
# Flow: Save Photo To Draft replies immediately with status.
# Also run analyze in parallel from Get Photo then Merge AI replies with enrichment.

conns = {
  "Telegram Trigger": {"main": [[{"node": "Wizard Router", "type": "main", "index": 0}]]},
  "Wizard Router": {"main": [[{"node": "Switch Action", "type": "main", "index": 0}]]},
  "Switch Action": {
    "main": [
      [{"node": "Send Reply", "type": "main", "index": 0}],
      [{"node": "Ack Upload", "type": "main", "index": 0}, {"node": "POST Product API", "type": "main", "index": 0}],
      [{"node": "Get Photo", "type": "main", "index": 0}],
    ]
  },
  "POST Product API": {"main": [[{"node": "Format Upload Reply", "type": "main", "index": 0}]]},
  "Format Upload Reply": {"main": [[{"node": "Send Upload Result", "type": "main", "index": 0}]]},
  "Get Photo": {
    "main": [
      [
        {"node": "Save Photo To Draft", "type": "main", "index": 0},
        {"node": "Maybe Analyze Photo", "type": "main", "index": 0},
      ]
    ]
  },
  "Save Photo To Draft": {"main": [[{"node": "Send Reply", "type": "main", "index": 0}]]},
  "Maybe Analyze Photo": {"main": [[{"node": "Merge AI Into Draft", "type": "main", "index": 0}]]},
  "Merge AI Into Draft": {"main": [[{"node": "Send Reply", "type": "main", "index": 0}]]},
}

name = "Khair Products Upload Bot"
author = subprocess.check_output(
    ["docker", "exec", "n8n-postgres-1", "psql", "-U", "n8n_user", "-d", "n8n_db", "-t", "-A", "-c", 'SELECT id FROM "user" LIMIT 1;'],
    text=True,
).strip()
nb = base64.b64encode(json.dumps(nodes, ensure_ascii=False).encode()).decode()
cb = base64.b64encode(json.dumps(conns, ensure_ascii=False).encode()).decode()
settings = base64.b64encode(json.dumps({"executionOrder": "v1"}).encode()).decode()

sql = f"""BEGIN;
UPDATE workflow_entity SET
  nodes=convert_from(decode('{nb}','base64'),'UTF8')::json,
  connections=convert_from(decode('{cb}','base64'),'UTF8')::json,
  settings=convert_from(decode('{settings}','base64'),'UTF8')::json,
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
open("/tmp/wizard.sql", "w").write(sql)
subprocess.check_call(["docker", "cp", "/tmp/wizard.sql", "n8n-postgres-1:/tmp/wizard.sql"])
print(subprocess.check_output(["docker", "exec", "n8n-postgres-1", "psql", "-U", "n8n_user", "-d", "n8n_db", "-v", "ON_ERROR_STOP=1", "-f", "/tmp/wizard.sql"], text=True))

subprocess.check_call(["docker", "restart", "n8n-n8n-1"])
for i in range(45):
    time.sleep(2)
    logs = subprocess.check_output(["docker", "logs", "--tail", "80", "n8n-n8n-1"], text=True, stderr=subprocess.STDOUT)
    chunk = logs[logs.rfind("Initializing n8n process") :]
    if "Editor is now accessible" in chunk and "Khair Products Upload Bot" in chunk and "did fail" not in chunk.split("Khair Products Upload Bot")[-1][:200]:
        print("READY_OK")
        break
    if "Editor is now accessible" in chunk:
        # print activation lines
        for line in chunk.splitlines():
            if "Khair Products" in line:
                print("L", line[:220])
        if "Activated workflow \"Khair Products Upload Bot\"" in chunk:
            print("READY_OK")
            break

secret = re.sub(r"[^a-zA-Z0-9_-]+", "", f"{wid}_{tg_node_id}")
webhook_url = f"https://n8n.esteemmediaa.com/webhook/{WH}/webhook"
data = urllib.parse.urlencode({"url": webhook_url, "secret_token": secret, "allowed_updates": json.dumps(["message"])}).encode()
print("setWebhook", json.loads(urllib.request.urlopen(urllib.request.Request(f"https://api.telegram.org/bot{token}/setWebhook", data=data), timeout=30).read().decode()))

cmds = json.dumps(
    [
        {"command": "start", "description": "بدء / قائمة"},
        {"command": "new", "description": "رفع منتج جديد"},
        {"command": "status", "description": "عرض المسودة"},
        {"command": "confirm", "description": "تأكيد الرفع"},
        {"command": "cancel", "description": "إلغاء المسودة"},
        {"command": "help", "description": "المساعدة"},
        {"command": "id", "description": "Telegram ID"},
    ],
    ensure_ascii=False,
)
print(
    "setMyCommands",
    json.loads(
        urllib.request.urlopen(
            urllib.request.Request(f"https://api.telegram.org/bot{token}/setMyCommands", data=urllib.parse.urlencode({"commands": cmds}).encode()),
            timeout=30,
        ).read().decode()
    ),
)

# simulate /new then title
secret_h = secret
for text in ["/new", "مانجو تجريبي | Test Mango", "3", "وصف تجريبي لمنتج مانجو", "$1100/MT"]:
    uid = int(time.time() * 1000) % 1000000000
    body = {
        "update_id": uid,
        "message": {
            "message_id": uid % 100000,
            "from": {"id": 8929452910, "is_bot": False, "first_name": "T"},
            "chat": {"id": 8929452910, "type": "private"},
            "date": int(time.time()),
            "text": text,
        },
    }
    req = urllib.request.Request(
        webhook_url,
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json", "X-Telegram-Bot-Api-Secret-Token": secret_h},
    )
    try:
        print("sim", text, urllib.request.urlopen(req, timeout=60).status)
    except Exception as e:
        print("sim_fail", text, e)
    time.sleep(4)

print(
    "EXEC",
    subprocess.check_output(
        [
            "docker",
            "exec",
            "n8n-postgres-1",
            "psql",
            "-U",
            "n8n_user",
            "-d",
            "n8n_db",
            "-t",
            "-A",
            "-F",
            "|",
            "-c",
            f'SELECT id,status FROM execution_entity WHERE "workflowId"=\'{wid}\' ORDER BY id DESC LIMIT 5;',
        ],
        text=True,
    ),
)

msg = """تم ترقية بوت المنتجات لمسار احترافي ✅

التدفق الجديد:
1) /new
2) الاسم → التصنيف → الوصف → السعر → الصورة
3) تأكيد
4) تستلم لينك المنتج على الموقع

الأوامر: /status /confirm /cancel /help

جرب الآن: /new"""
print(
    "notify",
    json.loads(
        urllib.request.urlopen(
            urllib.request.Request(f"https://api.telegram.org/bot{token}/sendMessage", data=urllib.parse.urlencode({"chat_id": "8929452910", "text": msg}).encode()),
            timeout=30,
        ).read().decode()
    ).get("ok"),
)
print("DONE", WH)

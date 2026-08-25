#!/usr/bin/env python3
"""Upgrade Khair Products bot: list/search/edit/photo/restore + keyboards + confirm delete."""
import json, subprocess, sys, uuid, base64, urllib.request, urllib.parse, time, re

sys.stdout.reconfigure(encoding="utf-8")
wid = "KhairProdBotWF01"
project = "aP2lOxNRBLDWZgO5"
API = "https://khairaljewargroup.com/api/products"
BOT_SECRET = "KhairProdBot_8723339xN8n"
token = open("/tmp/kh_prod_bot_token.txt").read().strip()

raw = subprocess.check_output(
    ["docker", "exec", "n8n-postgres-1", "psql", "-U", "n8n_user", "-d", "n8n_db", "-t", "-A", "-c",
     f"SELECT encode(convert_to(nodes::text,'UTF8'),'base64') FROM workflow_entity WHERE id='{wid}';"],
    text=True).strip()
conns_raw = subprocess.check_output(
    ["docker", "exec", "n8n-postgres-1", "psql", "-U", "n8n_user", "-d", "n8n_db", "-t", "-A", "-c",
     f"SELECT encode(convert_to(connections::text,'UTF8'),'base64') FROM workflow_entity WHERE id='{wid}';"],
    text=True).strip()
nodes = json.loads(base64.b64decode(raw))
conns = json.loads(base64.b64decode(conns_raw))
by = {n["name"]: n for n in nodes}

def nid():
    return str(uuid.uuid4())

def switch_rule(key, action):
    return {
        "conditions": {
            "options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict", "version": 3},
            "conditions": [{"id": key, "leftValue": "={{ $json.action }}", "rightValue": action,
                           "operator": {"type": "string", "operation": "equals"}}],
            "combinator": "and",
        },
        "renameOutput": True,
        "outputKey": action,
    }

WIZARD = r'''
const ALLOWED = [8929452910];
const CATEGORIES = ['Citrus','Dates','Fruits','Vegetables','Frozen'];
const CAT_AR = {Citrus:'الموالح', Dates:'التمور', Fruits:'الفواكه', Vegetables:'الخضروات', Frozen:'المجمدات'};

const staticData = $getWorkflowStaticData('global');
if (!staticData.sessions) staticData.sessions = {};

const trigger = $('Telegram Trigger').first().json;
const cb = trigger.callback_query || null;
const msg = trigger.message || cb?.message || {};
const chatId = String(msg.chat?.id || cb?.message?.chat?.id || '');
const fromId = (cb?.from?.id) || msg.from?.id;
const firstName = (cb?.from?.first_name) || msg.from?.first_name || '';
const callbackData = cb ? String(cb.data || '').trim() : '';
const callbackQueryId = cb ? String(cb.id || '') : '';
const textRaw = String(msg.text || '').trim();
const caption = String(msg.caption || '').trim();
const text = callbackData || textRaw || caption;
const cmd = (text.split(/\s+/)[0] || '').split('@')[0].toLowerCase();
const hasPhoto = Array.isArray(msg.photo) && msg.photo.length > 0;

function out(payload) {
  const base = { chatId, callback_query_id: callbackQueryId || undefined, ...payload };
  return [{ json: base }];
}
function kb(rows) {
  return { inline_keyboard: rows };
}
function reply(t, markup) {
  const p = { action: 'reply', text: t };
  if (markup) p.reply_markup = markup;
  return out(p);
}
function catKeyboard() {
  return kb([
    [{ text: '🍊 موالح', callback_data: 'cat:Citrus' }, { text: '🌴 تمور', callback_data: 'cat:Dates' }],
    [{ text: '🥭 فواكه', callback_data: 'cat:Fruits' }, { text: '🥔 خضروات', callback_data: 'cat:Vegetables' }],
    [{ text: '🧊 مجمدات', callback_data: 'cat:Frozen' }],
  ]);
}
function confirmUploadKeyboard() {
  return kb([
    [{ text: '✅ تأكيد الرفع', callback_data: 'up:yes' }, { text: '❌ إلغاء', callback_data: 'up:no' }],
  ]);
}
function confirmDeleteKeyboard(slug) {
  return kb([
    [{ text: '🗑️ نعم، امسح', callback_data: 'del:yes:' + slug }, { text: 'إلغاء', callback_data: 'del:no' }],
  ]);
}
function editMenuKeyboard(slug) {
  return kb([
    [{ text: 'الاسم', callback_data: 'editf:title:' + slug }, { text: 'السعر', callback_data: 'editf:price:' + slug }],
    [{ text: 'التصنيف', callback_data: 'editf:category:' + slug }, { text: 'الصورة', callback_data: 'editf:photo:' + slug }],
    [{ text: 'الوصف', callback_data: 'editf:desc:' + slug }, { text: 'إلغاء', callback_data: 'editf:cancel' }],
  ]);
}

const listed = ALLOWED.map(String).includes(String(fromId));
if (cmd === '/id' && !callbackData) {
  return reply(`تمام ${firstName}، الـ ID بتاعك:\n${fromId}\nChat: ${chatId}\nابعت الرقم ده للإدارة لو محتاج صلاحية.`);
}
if (!listed) {
  return reply('البوت ده لفريق خير الجوار بس. ابعت /id للإدارة لو محتاج صلاحية.');
}

function blankDraft() {
  return {
    step: 'idle', mode: '',
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
    edit_slug: '', pending_delete_slug: '',
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
  if (!m.length) return 'المسودة جاهزة. راجعها وبعدين اضغط تأكيد الرفع.';
  const map = {
    'الاسم': 'قولي اسم المنتج… عربي وإنجليزي لو تقدر، زي: برتقال فالنسيا | Valencia Oranges',
    'التصنيف': 'اختار التصنيف من الأزرار:',
    'السعر': 'السعر الاسترشادي كام؟ مثال: $420/MT أو 40 جنيه/كيلو',
    'الصورة': 'ابعت صورة المنتج لما تبقى جاهز 📷',
  };
  return map[m[0]] || '';
}
function summary(d) {
  const m = missing(d);
  return [
    '📋 مسودة المنتج:',
    `• الاسم: ${d.title_ar || '—'} / ${d.title_en || '—'}`,
    `• التصنيف: ${d.category_en ? (CAT_AR[d.category_en] + ' / ' + d.category_en) : '—'}`,
    `• الوصف: ${(d.desc_ar || d.desc_en || '—').slice(0,140)}`,
    `• السعر: ${d.index_price || '—'}`,
    `• الحد الأدنى: ${d.min_order || 1} ${d.unit || 'MT'}`,
    `• الصورة: ${(d.image_base64 || d.image) ? 'واصله ✅' : 'لسه ❌'}`,
    m.length ? (`ناقص: ${m.join('، ')}`) : 'كله جاهز ✅',
  ].join('\n');
}
function normCat(t) {
  return String(t||'').replace(/[\u200e\u200f\u202a-\u202e]/g,'').replace(/[\u064B-\u065F\u0670]/g,'').trim();
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
  if (/خضر|veg/.test(low) || /خضر/.test(s)) return 'Vegetables';
  if (/موالح|citrus/.test(low) || /موالح/.test(s)) return 'Citrus';
  if (/تمر|dates/.test(low) || /تمر/.test(s)) return 'Dates';
  if (/فواك|فاكهة|fruit/.test(low) || /فواك|فاكهة/.test(s)) return 'Fruits';
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
function argAfter(cmdNames, raw) {
  const s = String(raw||'').trim();
  for (const c of cmdNames) {
    const re = new RegExp('^(?:' + c + ')\\s+(.+)$', 'i');
    const m = s.match(re);
    if (m) return m[1].trim();
  }
  return '';
}
function buildUploadBody(d) {
  const body = {
    title_ar: d.title_ar || d.title_en,
    title_en: d.title_en || d.title_ar,
    category_en: d.category_en,
    desc_ar: d.desc_ar || d.desc_en || ((d.title_ar || d.title_en) + ''),
    desc_en: d.desc_en || d.desc_ar || ((d.title_en || d.title_ar) + ''),
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
  return body;
}

const HELP = `أهلاً ${firstName || ''} 👋 أنا نسرين — إدارة منتجات خير الجوار.

الأوامر:
/new منتج جديد
/list عرض المنتجات
/search ليمون بحث
/edit original-lemon تعديل
/photo original-lemon تغيير صورة
/delete original-lemon حذف (بتأكيد)
/restore original-lemon إرجاع محذوف
/status المسودة
/confirm تأكيد الرفع
/cancel إلغاء
/help مساعدة`;

let d = getSession();

// ---- callbacks ----
if (callbackData) {
  if (callbackData.startsWith('cat:')) {
    const cat = callbackData.slice(4);
    if (CATEGORIES.includes(cat)) {
      if (d.mode === 'edit' && d.edit_slug && d.step === 'edit_category') {
        return out({ action: 'patch', patch_body: { slug: d.edit_slug, category_en: cat } });
      }
      d.category_en = cat;
      d.step = 'collecting';
      staticData.sessions[chatId] = d;
      const m = missing(d);
      if (!m.length) return reply(summary(d) + '\n\nجاهز للرفع؟', confirmUploadKeyboard());
      return reply(`تمام، التصنيف: ${CAT_AR[cat]}\n${nextAsk(d)}`, m[0]==='التصنيف' ? catKeyboard() : undefined);
    }
  }
  if (callbackData === 'up:yes') {
    const m = missing(d);
    if (m.length) return reply(`لسه ناقص ${m.join(' و ')}.\n${nextAsk(d)}`, missing(d)[0]==='التصنيف' ? catKeyboard() : undefined);
    d.step = 'uploading';
    staticData.sessions[chatId] = d;
    return out({ action: 'upload', upload_body: buildUploadBody(d) });
  }
  if (callbackData === 'up:no') {
    clearSession();
    return reply('تم الإلغاء. لما تحب نبدأ تاني: /new');
  }
  if (callbackData.startsWith('del:yes:')) {
    const slug = callbackData.slice('del:yes:'.length);
    d.pending_delete_slug = '';
    staticData.sessions[chatId] = d;
    return out({ action: 'delete', delete_body: { slug } });
  }
  if (callbackData === 'del:no') {
    d.pending_delete_slug = '';
    staticData.sessions[chatId] = d;
    return reply('تمام، ملغيناش حاجة.');
  }
  if (callbackData.startsWith('editf:')) {
    const parts = callbackData.split(':');
    const field = parts[1];
    const slug = parts.slice(2).join(':');
    if (field === 'cancel') {
      clearSession();
      return reply('إلغاء التعديل.');
    }
    d.mode = 'edit';
    d.edit_slug = slug;
    if (field === 'title') { d.step = 'edit_title'; staticData.sessions[chatId]=d; return reply('ابعت الاسم الجديد… عربي | English'); }
    if (field === 'price') { d.step = 'edit_price'; staticData.sessions[chatId]=d; return reply('ابعت السعر الجديد.'); }
    if (field === 'desc') { d.step = 'edit_desc'; staticData.sessions[chatId]=d; return reply('ابعت الوصف الجديد.'); }
    if (field === 'category') { d.step = 'edit_category'; staticData.sessions[chatId]=d; return reply('اختار التصنيف الجديد:', catKeyboard()); }
    if (field === 'photo') { d.step = 'photo_replace'; d.mode='photo'; staticData.sessions[chatId]=d; return reply('ابعت الصورة الجديدة للمنتج 📷'); }
  }
  if (callbackData.startsWith('restore:yes:')) {
    const slug = callbackData.slice('restore:yes:'.length);
    return out({ action: 'patch', patch_body: { slug, restore: true } });
  }
}

if (['/start','/help'].includes(cmd)) return reply(HELP);

if (cmd === '/cancel' || /^(الغِ|الغي|كنسل|cancel)$/i.test(text)) {
  clearSession();
  return reply('تمام، لغّينا. /new للرفع أو /list للمنتجات.');
}

// ---- list / search ----
if (cmd === '/list' || /^(عرض المنتجات|المنتجات|list)$/i.test(text)) {
  return out({ action: 'list', list_query: '' });
}
const searchArg = argAfter(['/search','ابحث','دور'], text);
if (cmd === '/search' || searchArg) {
  const q = searchArg || text.replace(/^\/search\s*/i,'').trim();
  if (!q) return reply('اكتب: /search ليمون');
  return out({ action: 'list', list_query: q });
}

// ---- delete with confirm ----
const deleteArg = argAfter(['/delete','delete','del','امسح','احذف','حذف'], text);
if (deleteArg || cmd === '/delete') {
  const slug = deleteArg || text.replace(/^\/delete\s*/i,'').trim();
  if (!slug) return reply('اكتب: /delete original-lemon');
  d.pending_delete_slug = slug;
  staticData.sessions[chatId] = d;
  return reply(`هتمسح/تخفي المنتج:\n${slug}\nمتأكد؟`, confirmDeleteKeyboard(slug));
}

// ---- restore ----
const restoreArg = argAfter(['/restore','restore','رجّع','رجع','ارجع'], text);
if (restoreArg || cmd === '/restore') {
  const slug = restoreArg || text.replace(/^\/restore\s*/i,'').trim();
  if (!slug) return reply('اكتب: /restore original-lemon');
  return out({ action: 'patch', patch_body: { slug, restore: true } });
}

// ---- edit ----
const editArg = argAfter(['/edit','edit','عدل','عدّل'], text);
if (editArg || cmd === '/edit') {
  const slug = editArg || text.replace(/^\/edit\s*/i,'').trim();
  if (!slug) return reply('اكتب: /edit original-lemon');
  d.mode = 'edit';
  d.edit_slug = slug;
  d.step = 'edit_menu';
  staticData.sessions[chatId] = d;
  return reply(`تعديل المنتج: ${slug}\nاختار الحقل:`, editMenuKeyboard(slug));
}

// ---- photo replace ----
const photoArg = argAfter(['/photo','photo','صورة'], text);
if (photoArg || cmd === '/photo') {
  const slug = photoArg || text.replace(/^\/photo\s*/i,'').trim();
  if (!slug) return reply('اكتب: /photo original-lemon وبعدين ابعت الصورة');
  d.mode = 'photo';
  d.edit_slug = slug;
  d.step = 'photo_replace';
  staticData.sessions[chatId] = d;
  return reply(`ابعت صورة جديدة لـ ${slug} 📷`);
}

// ---- new product ----
const startNew = cmd === '/new' || /^(عايز|أريد|اريد|ارفع|رفع منتج|منتج جديد|نرفع منتج)/i.test(text);
if (startNew && (d.step === 'idle' || cmd === '/new' || d.mode !== 'edit')) {
  d = blankDraft();
  d.step = 'collecting';
  d.mode = 'create';
  staticData.sessions[chatId] = d;
  return reply(`تمام يا ${firstName || 'حبيبي'}، نرفع منتج جديد.\n${nextAsk(d)}`);
}

if (cmd === '/status') {
  if (d.step === 'idle') return reply('مفيش مسودة مفتوحة. /new للبدء أو /list للمنتجات.');
  const m = missing(d);
  if (!m.length) return reply(summary(d), confirmUploadKeyboard());
  return reply(summary(d) + '\n\n' + nextAsk(d), m[0]==='التصنيف' ? catKeyboard() : undefined);
}

// edit field capture
if (d.mode === 'edit' && d.edit_slug) {
  if (d.step === 'edit_title' && text && !callbackData) {
    const titles = parseTitles(text);
    const body = { slug: d.edit_slug };
    if (titles.title_ar) body.title_ar = titles.title_ar;
    if (titles.title_en) body.title_en = titles.title_en;
    d.step = 'idle'; d.mode = '';
    staticData.sessions[chatId] = d;
    return out({ action: 'patch', patch_body: body });
  }
  if (d.step === 'edit_price' && text && !callbackData) {
    const body = { slug: d.edit_slug, index_price: text.replace(/^(سعر|price)\s*:?\s*/i,'').trim() };
    d.step = 'idle'; d.mode = '';
    staticData.sessions[chatId] = d;
    return out({ action: 'patch', patch_body: body });
  }
  if (d.step === 'edit_desc' && text && !callbackData) {
    const body = { slug: d.edit_slug };
    if (/[\u0600-\u06FF]/.test(text)) { body.desc_ar = text; body.desc_en = text; }
    else { body.desc_en = text; body.desc_ar = text; }
    d.step = 'idle'; d.mode = '';
    staticData.sessions[chatId] = d;
    return out({ action: 'patch', patch_body: body });
  }
}

const confirmIntent = cmd === '/confirm' || /^(تأكيد|تاكيد|confirm|ارفعها|انشر|موافق ارفع|ارفع دلوقتي)$/i.test(text);
if (confirmIntent && d.mode === 'create' && d.step !== 'idle') {
  const m = missing(d);
  if (m.length) {
    return reply(`لسه ناقص ${m.join(' و ')}.\n${nextAsk(d)}`, m[0]==='التصنيف' ? catKeyboard() : undefined);
  }
  return reply(summary(d) + '\n\nتأكد قبل الرفع:', confirmUploadKeyboard());
}

if (hasPhoto) {
  return out({ action: 'need_photo', caption: caption || text });
}

if (d.step === 'idle') {
  return out({ action: 'chat', user_text: text, firstName, draft: null, missing: [] });
}

// collect create fields
let extractedSomething = false;
const waiting = missing(d)[0];
const cat = parseCategory(text);
const priceMatch = /\$|\bMT\b|سعر\s*:/i.test(text) || (waiting === 'السعر' && /\d/.test(text));
if (cat && !d.category_en) { d.category_en = cat; extractedSomething = true; }
if (d.step === 'collecting' || d.step === 'title') {
  if (!cat && text.length > 1 && !/^(\$|\d)/.test(text) && missing(d).includes('الاسم') && text.length < 80) {
    const titles = parseTitles(text);
    if (titles.title_ar) d.title_ar = titles.title_ar;
    if (titles.title_en) d.title_en = titles.title_en;
    extractedSomething = true;
  }
}
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
  return reply('قولي السعر الاسترشادي. مثال: $420/MT أو 40 جنيه/كيلو');
}
const mo = text.match(/(?:حد|min|moq)\s*:?\s*(\d+(?:\.\d+)?)/i);
if (mo) { d.min_order = Number(mo[1]); extractedSomething = true; }

staticData.sessions[chatId] = d;

if (waiting === 'التصنيف' && !extractedSomething) {
  return reply('اختار التصنيف من الأزرار:', catKeyboard());
}

if (extractedSomething) {
  const m = missing(d);
  if (!m.length) return reply(summary(d) + '\n\nجاهز؟', confirmUploadKeyboard());
  return reply(`تمام، سجّلت.\n${nextAsk(d)}`, m[0]==='التصنيف' ? catKeyboard() : undefined);
}

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

CHAT_SYSTEM = """أنتِ نسرين، مساعدة خير الجوار على تليجرام. بتتكلمي مصري طبيعي ودود.
قواعد:
- لو سلّم فقط: ردي طبيعي. لو الرسالة بيانات منتج متسلّميش.
- لو مفيش مسودة: ذكّريه بـ /new أو /list أو /help.
- ممنوع Markdown. رد قصير 2-5 سطور.
"""

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
    step: 'collecting', mode: 'create', title_ar:'', title_en:'', category_en:'', desc_ar:'', desc_en:'',
    index_price:'', min_order:1, unit:'MT', packaging_ar:'', packaging_en:'',
    sizes_ar:'', sizes_en:'', harvest_season_ar:'على مدار العام', harvest_season_en:'Year-round',
    image_base64:'', image_filename:'', image_mime:'', image:'', edit_slug:'', pending_delete_slug:''
  };
  staticData.sessions[chatId] = d;
}

const item = $input.first();
const keys = item.binary ? Object.keys(item.binary) : [];
const binaryKey = keys.includes('data') ? 'data' : keys[0];
if (!binaryKey) {
  return [{ json: { action: 'reply', chatId, text: '❌ ما قدرتش ألاقي ملف الصورة. ابعتها تاني كصورة.' } }];
}

let buf;
try {
  if (typeof this.helpers?.getBinaryDataBuffer === 'function') {
    buf = await this.helpers.getBinaryDataBuffer(0, binaryKey);
  }
} catch (e) { buf = null; }
if (!buf || !Buffer.isBuffer(buf)) {
  const meta = item.binary[binaryKey] || {};
  if (meta.data && String(meta.data).length > 2000) buf = Buffer.from(String(meta.data), 'base64');
}
if (!buf || buf.length < 4096) {
  return [{ json: { action: 'reply', chatId, text: '❌ الصورة ناقصة/فاضية. ابعتها من الجاليري كصورة عادية.' } }];
}
const magic = buf.subarray(0, 12);
const isJpeg = magic[0] === 0xff && magic[1] === 0xd8;
const isPng = magic[0] === 0x89 && magic[1] === 0x50;
const isWebp = magic.toString('ascii', 0, 4) === 'RIFF';
if (!isJpeg && !isPng && !isWebp) {
  return [{ json: { action: 'reply', chatId, text: '❌ الملف مش صورة JPEG/PNG صالحة.' } }];
}
const meta = item.binary[binaryKey] || {};
const b64 = buf.toString('base64');
const filename = meta.fileName || (isPng ? 'product.png' : isWebp ? 'product.webp' : 'product.jpg');
const mime = meta.mimeType || (isPng ? 'image/png' : isWebp ? 'image/webp' : 'image/jpeg');

// photo replace mode -> PATCH
if ((d.mode === 'photo' || d.step === 'photo_replace') && d.edit_slug) {
  const slug = d.edit_slug;
  d.step = 'idle'; d.mode = ''; d.edit_slug = '';
  staticData.sessions[chatId] = d;
  return [{ json: {
    action: 'patch',
    chatId,
    patch_body: { slug, image_base64: b64, image_filename: filename, image_mime: mime },
  }}];
}

d.image_base64 = b64;
d.image_filename = filename;
d.image_mime = mime;
d.image = '';
if (d.step === 'idle') d.step = 'collecting';
if (!d.mode) d.mode = 'create';
staticData.sessions[chatId] = d;

if (caption && !(d.title_ar || d.title_en)) {
  const parts = caption.split('|').map(x => x.trim());
  if (parts.length >= 2) {
    if (/[\u0600-\u06FF]/.test(parts[0])) { d.title_ar = parts[0]; d.title_en = parts[1]; }
    else { d.title_en = parts[0]; d.title_ar = parts[1]; }
  }
}

const missing = [];
if (!(d.title_ar || d.title_en)) missing.push('الاسم');
if (!d.category_en) missing.push('التصنيف');
if (!d.index_price) missing.push('السعر');

let text = `تمام، الصورة وصلتني 👍 (${Math.round(buf.length/1024)}KB)\n`;
const reply_markup = missing[0] === 'التصنيف' ? {
  inline_keyboard: [
    [{ text: '🍊 موالح', callback_data: 'cat:Citrus' }, { text: '🌴 تمور', callback_data: 'cat:Dates' }],
    [{ text: '🥭 فواكه', callback_data: 'cat:Fruits' }, { text: '🥔 خضروات', callback_data: 'cat:Vegetables' }],
    [{ text: '🧊 مجمدات', callback_data: 'cat:Frozen' }],
  ]
} : (!missing.length ? {
  inline_keyboard: [[{ text: '✅ تأكيد الرفع', callback_data: 'up:yes' }, { text: '❌ إلغاء', callback_data: 'up:no' }]]
} : undefined);

if (!missing.length) {
  text += 'كل البيانات مكتملة.\nاضغط تأكيد الرفع.';
} else {
  text += `لسه ناقص: ${missing.join('، ')}`;
}
return [{ json: { action: 'reply', chatId, text, reply_markup } }];
'''

# ---- apply wizard ----
by["Wizard Router"]["parameters"]["jsCode"] = WIZARD
if "Save Photo To Draft" in by:
    by["Save Photo To Draft"]["parameters"]["jsCode"] = SAVE_PHOTO
if "Chat LLM" in by:
    try:
        by["Chat LLM"]["parameters"]["responses"]["values"][0]["content"] = CHAT_SYSTEM
    except Exception:
        pass

# Telegram trigger: allow callback_query
tg = by["Telegram Trigger"]
tg.setdefault("parameters", {})
tg["parameters"]["updates"] = ["message", "callback_query"]
# some n8n versions use additionalFields
tg["parameters"].setdefault("additionalFields", {})

# ---- ensure nodes ----
def ensure_http(name, method, url_expr, body_expr, y):
    if name in by:
        return
    node = {
        "id": nid(),
        "name": name,
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 4.2,
        "position": [1000, y],
        "continueOnFail": True,
        "onError": "continueRegularOutput",
        "parameters": {
            "method": method,
            "url": url_expr if method == "GET" else API,
            "sendHeaders": True,
            "headerParameters": {"parameters": [
                {"name": "Content-Type", "value": "application/json"},
                {"name": "x-product-bot-secret", "value": BOT_SECRET},
            ]},
            "options": {},
        },
    }
    if method != "GET":
        node["parameters"]["sendBody"] = True
        node["parameters"]["specifyBody"] = "json"
        node["parameters"]["jsonBody"] = body_expr
    else:
        node["parameters"]["url"] = url_expr
    nodes.append(node)
    by[name] = node

ensure_http("DELETE Product API", "DELETE", API, "={{ $json.delete_body }}", 620)
ensure_http("PATCH Product API", "PATCH", API, "={{ $json.patch_body }}", 780)
ensure_http(
    "LIST Products API",
    "GET",
    "={{ 'https://khairaljewargroup.com/api/products?bot=1&limit=40' + ($json.list_query ? ('&q=' + encodeURIComponent($json.list_query)) : '') + ($json.include_inactive ? '&include_inactive=1' : '') }}",
    None,
    900,
)

# LIST URL fix - encodeURIComponent may not work in n8n expression; use simpler
by["LIST Products API"]["parameters"]["url"] = (
    "={{ 'https://khairaljewargroup.com/api/products?bot=1&limit=40' + ($json.list_query ? '&q=' + $json.list_query : '') }}"
)

def ensure_code(name, code, y):
    if name in by:
        by[name]["parameters"]["jsCode"] = code
        return
    node = {
        "id": nid(),
        "name": name,
        "type": "n8n-nodes-base.code",
        "typeVersion": 2,
        "position": [1220, y],
        "parameters": {"jsCode": code},
    }
    nodes.append(node)
    by[name] = node

ensure_code("Format Delete Reply", r'''
const chatId = String($('Wizard Router').first().json.chatId || '');
const j = $input.first().json;
let text = '';
if (j.error) text = '❌ ماقدرتش أمسح المنتج:\n' + String(j.detail||j.error).slice(0,400);
else if (j.ok && j.deleted) {
  const p = j.product || {};
  text = `🗑️ تم إخفاء المنتج\n• ${p.title?.ar||''} / ${p.title?.en||''}\n• slug: ${p.slug||''}\nللإرجاع: /restore ${p.slug||''}`;
} else text = '⚠️ ' + JSON.stringify(j).slice(0,500);
return [{ json: { action:'reply', chatId, text, callback_query_id: $('Wizard Router').first().json.callback_query_id } }];
''', 620)

ensure_code("Format Patch Reply", r'''
const chatId = String($('Wizard Router').first().json.chatId || '');
const j = $input.first().json;
let text = '';
if (j.error) text = '❌ فشل التعديل:\n' + String(j.detail||j.error).slice(0,400);
else if (j.ok && j.product) {
  const p = j.product;
  text = [
    j.restored ? '♻️ تم إرجاع المنتج للموقع' : '✅ تم تحديث المنتج',
    `• ${p.title?.ar||''} / ${p.title?.en||''}`,
    `• slug: ${p.slug}`,
    j.urls?.ar ? ('رابط: ' + j.urls.ar) : '',
  ].filter(Boolean).join('\n');
} else text = '⚠️ ' + JSON.stringify(j).slice(0,500);
return [{ json: { action:'reply', chatId, text, callback_query_id: $('Wizard Router').first().json.callback_query_id } }];
''', 780)

ensure_code("Format List Reply", r'''
const wr = $('Wizard Router').first().json;
const chatId = String(wr.chatId || '');
const j = $input.first().json;
let text = '';
if (j.error) text = '❌ فشل جلب القائمة:\n' + String(j.detail||j.error).slice(0,400);
else {
  const items = j.products || [];
  if (!items.length) text = 'مفيش منتجات مطابقة.';
  else {
    const q = wr.list_query || '';
    text = (q ? `نتائج البحث عن "${q}":\n\n` : '📦 المنتجات النشطة:\n\n') +
      items.slice(0, 25).map((p,i) => `${i+1}) ${p.title?.ar||p.title?.en||p.slug}\n   slug: ${p.slug}\n   ${p.category?.ar||p.category?.en||''} | ${p.indexPrice||'—'}`).join('\n\n') +
      '\n\nتعديل: /edit slug\nمسح: /delete slug\nصورة: /photo slug';
  }
}
return [{ json: { action:'reply', chatId, text } }];
''', 900)

# Format Chat Reply - fix chatId for callbacks
if "Format Chat Reply" in by:
    by["Format Chat Reply"]["parameters"]["jsCode"] = r'''
const wr = $('Wizard Router').first().json;
const chatId = String(wr.chatId || $('Telegram Trigger').first().json.message?.chat?.id || '');
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
    for (const k of Object.keys(v)) { const t = dig(v[k], d+1); if (t) return t; }
  }
  return '';
}
let text = dig(j).trim();
if (!text) text = 'أيوه، معاكِ. جرّب /help للأوامر.';
text = text.replace(/\*\*/g,'').replace(/```/g,'').slice(0,3500);
return [{ json: { action: 'reply', chatId, text } }];
'''

# Unified Telegram sender via HTTP (supports reply_markup + answerCallbackQuery)
SEND_CODE = r'''
const j = $input.first().json;
const chatId = String(j.chatId || '');
const text = String(j.text || '').slice(0, 3900);
const token = $env.KH_PROD_BOT_TOKEN || '';
return [{ json: {
  chatId,
  text,
  reply_markup: j.reply_markup || null,
  callback_query_id: j.callback_query_id || null,
  token_present: false,
}}];
'''

# Use direct token in HTTP URL from file - embed in node
send_url = f"https://api.telegram.org/bot{token}/sendMessage"
answer_url = f"https://api.telegram.org/bot{token}/answerCallbackQuery"

if "Send Telegram HTTP" not in by:
    nodes.append({
        "id": nid(),
        "name": "Send Telegram HTTP",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 4.2,
        "position": [1600, 400],
        "continueOnFail": True,
        "onError": "continueRegularOutput",
        "parameters": {
            "method": "POST",
            "url": send_url,
            "sendHeaders": True,
            "headerParameters": {"parameters": [{"name": "Content-Type", "value": "application/json"}]},
            "sendBody": True,
            "specifyBody": "json",
            "jsonBody": "={{ JSON.stringify({ chat_id: $json.chatId, text: $json.text, reply_markup: $json.reply_markup || undefined }) }}",
            "options": {},
        },
    })
    by["Send Telegram HTTP"] = nodes[-1]
else:
    by["Send Telegram HTTP"]["parameters"]["url"] = send_url
    by["Send Telegram HTTP"]["parameters"]["jsonBody"] = "={{ JSON.stringify({ chat_id: $json.chatId, text: $json.text, reply_markup: $json.reply_markup || undefined }) }}"

if "Answer Callback HTTP" not in by:
    nodes.append({
        "id": nid(),
        "name": "Answer Callback HTTP",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 4.2,
        "position": [1600, 560],
        "continueOnFail": True,
        "onError": "continueRegularOutput",
        "parameters": {
            "method": "POST",
            "url": answer_url,
            "sendHeaders": True,
            "headerParameters": {"parameters": [{"name": "Content-Type", "value": "application/json"}]},
            "sendBody": True,
            "specifyBody": "json",
            "jsonBody": "={{ JSON.stringify({ callback_query_id: $json.callback_query_id }) }}",
            "options": {},
        },
    })
    by["Answer Callback HTTP"] = nodes[-1]
else:
    by["Answer Callback HTTP"]["parameters"]["url"] = answer_url

# IF has callback -> answer
if "Has Callback?" not in by:
    nodes.append({
        "id": nid(),
        "name": "Has Callback?",
        "type": "n8n-nodes-base.if",
        "typeVersion": 2.2,
        "position": [1440, 480],
        "parameters": {
            "conditions": {
                "options": {"caseSensitive": True, "leftValue": "", "typeValidation": "loose", "version": 2},
                "conditions": [{
                    "id": "cb",
                    "leftValue": "={{ $json.callback_query_id }}",
                    "rightValue": "",
                    "operator": {"type": "string", "operation": "notEmpty", "singleValue": True},
                }],
                "combinator": "and",
            }
        },
    })
    by["Has Callback?"] = nodes[-1]

# Switch wiring
ordered = ["reply", "upload", "photo", "delete", "patch", "list", "chat"]
sw = by["Switch Action"]
rule_map = {r.get("outputKey"): r for r in sw["parameters"]["rules"]["values"]}
for a in ordered:
    if a not in rule_map:
        rule_map[a] = switch_rule(a[:6], a)
sw["parameters"]["rules"]["values"] = [rule_map[k] for k in ordered]

main = conns.setdefault("Switch Action", {}).setdefault("main", [])
while len(main) < len(ordered):
    main.append([])

# reply -> Has Callback? + Send Telegram HTTP (parallel from a merge approach:
# reply goes to both Send and Has Callback)
main[0] = [
    {"node": "Send Telegram HTTP", "type": "main", "index": 0},
    {"node": "Has Callback?", "type": "main", "index": 0},
]
# Keep Ack Upload path for upload
main[1] = [
    {"node": "Ack Upload", "type": "main", "index": 0},
    {"node": "POST Product API", "type": "main", "index": 0},
]
main[2] = [{"node": "Get Photo", "type": "main", "index": 0}]
main[3] = [{"node": "DELETE Product API", "type": "main", "index": 0}]
main[4] = [{"node": "PATCH Product API", "type": "main", "index": 0}]
main[5] = [{"node": "LIST Products API", "type": "main", "index": 0}]
main[6] = [{"node": "Chat LLM", "type": "main", "index": 0}]
conns["Switch Action"]["main"] = main

conns["DELETE Product API"] = {"main": [[{"node": "Format Delete Reply", "type": "main", "index": 0}]]}
conns["Format Delete Reply"] = {"main": [[{"node": "Send Telegram HTTP", "type": "main", "index": 0}, {"node": "Has Callback?", "type": "main", "index": 0}]]}
conns["PATCH Product API"] = {"main": [[{"node": "Format Patch Reply", "type": "main", "index": 0}]]}
conns["Format Patch Reply"] = {"main": [[{"node": "Send Telegram HTTP", "type": "main", "index": 0}, {"node": "Has Callback?", "type": "main", "index": 0}]]}
conns["LIST Products API"] = {"main": [[{"node": "Format List Reply", "type": "main", "index": 0}]]}
conns["Format List Reply"] = {"main": [[{"node": "Send Telegram HTTP", "type": "main", "index": 0}]]}
conns["Chat LLM"] = {"main": [[{"node": "Format Chat Reply", "type": "main", "index": 0}]]}
conns["Format Chat Reply"] = {"main": [[{"node": "Send Telegram HTTP", "type": "main", "index": 0}]]}
conns["Has Callback?"] = {"main": [[{"node": "Answer Callback HTTP", "type": "main", "index": 0}], []]}

# Photo save may return patch or reply
conns["Get Photo"] = {"main": [[{"node": "Save Photo To Draft", "type": "main", "index": 0}]]}
# Save Photo To Draft currently connected to Send Reply - route via mini switch
# Add Switch Photo Result
if "Switch Photo Result" not in by:
    nodes.append({
        "id": nid(),
        "name": "Switch Photo Result",
        "type": "n8n-nodes-base.switch",
        "typeVersion": 3.2,
        "position": [1120, 680],
        "parameters": {
            "rules": {"values": [
                switch_rule("pr", "reply"),
                switch_rule("pp", "patch"),
            ]},
            "options": {"fallbackOutput": "extra"},
        },
    })
    by["Switch Photo Result"] = nodes[-1]

conns["Save Photo To Draft"] = {"main": [[{"node": "Switch Photo Result", "type": "main", "index": 0}]]}
conns["Switch Photo Result"] = {"main": [
    [{"node": "Send Telegram HTTP", "type": "main", "index": 0}],
    [{"node": "PATCH Product API", "type": "main", "index": 0}],
]}

# Format Upload Reply also to Send Telegram HTTP
if "Format Upload Reply" in by:
    conns["Format Upload Reply"] = {"main": [[{"node": "Send Telegram HTTP", "type": "main", "index": 0}]]}

# Soften upload format message already ok

# Publish
new_ver = str(uuid.uuid4())
name = "Khair Products Upload Bot"
author = subprocess.check_output(
    ["docker", "exec", "n8n-postgres-1", "psql", "-U", "n8n_user", "-d", "n8n_db", "-t", "-A", "-c",
     'SELECT id FROM "user" LIMIT 1;'], text=True).strip()
# refresh nodes list from by values unique by name
nodes = list({n["name"]: n for n in nodes}.values())
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
open("/tmp/upgrade_bot.sql", "w").write(sql)
subprocess.check_call(["docker", "cp", "/tmp/upgrade_bot.sql", "n8n-postgres-1:/tmp/upgrade_bot.sql"])
print(subprocess.check_output(
    ["docker", "exec", "n8n-postgres-1", "psql", "-U", "n8n_user", "-d", "n8n_db", "-v", "ON_ERROR_STOP=1", "-f", "/tmp/upgrade_bot.sql"],
    text=True))
subprocess.check_call(["docker", "restart", "n8n-n8n-1"])
for i in range(45):
    time.sleep(2)
    logs = subprocess.check_output(["docker", "logs", "--tail", "80", "n8n-n8n-1"], text=True, stderr=subprocess.STDOUT)
    chunk = logs[logs.rfind("Initializing n8n process"):]
    if 'Activated workflow "Khair Products Upload Bot"' in chunk:
        print("READY_OK")
        time.sleep(6)
        break
else:
    print("READY_TIMEOUT")

tid = by["Telegram Trigger"]["id"]
WH = by["Telegram Trigger"].get("webhookId")
secret = re.sub(r"[^a-zA-Z0-9_-]+", "", f"{wid}_{tid}")
webhook_url = f"https://n8n.esteemmediaa.com/webhook/{WH}/webhook"
data = urllib.parse.urlencode({
    "url": webhook_url,
    "secret_token": secret,
    "allowed_updates": json.dumps(["message", "callback_query"]),
}).encode()
print("setWebhook", json.loads(urllib.request.urlopen(
    urllib.request.Request(f"https://api.telegram.org/bot{token}/setWebhook", data=data), timeout=30
).read().decode()))

# smoke: help + list via webhook
for text in ["/help", "/list"]:
    uid = int(time.time() * 1000) % 10**9
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
        headers={"Content-Type": "application/json", "X-Telegram-Bot-Api-Secret-Token": secret},
    )
    try:
        print("sim", text, urllib.request.urlopen(req, timeout=90).status)
    except Exception as e:
        print("sim_fail", text, e)
    time.sleep(4)

print("DONE")

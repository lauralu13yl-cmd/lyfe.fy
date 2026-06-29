/* ════════════════════════════════════════════════
   Lyfe.fy i18n — shared across every page
   Usage: <span data-i18n="nav.home">Home</span>
   Toggle: <button onclick="setLanguage('zh')">中文</button>
   ════════════════════════════════════════════════ */

const TRANSLATIONS = {
  en: {
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.how': 'How It Works',
    'nav.hosts': 'For Hosts',
    'nav.partners': 'Partner with us',
    'nav.contact': 'Contact us',
    'nav.shop': 'Shop Lyfefy',
    'nav.become_host': 'Become a Host',
    'nav.host_dashboard': 'Host Dashboard',
    'nav.invite': 'Invite friends',
    'nav.account': 'Account',
    'nav.signup': 'Sign up',
    'nav.login': 'Log in',

    'games.eyebrow': 'Find a Round',
    'games.title_pre': 'Your next ',
    'games.title_em': 'round',
    'games.title_post': ' starts here',
    'games.sub': "Browse hosted golf sessions, see who's a great fit, and book your tee time in seconds.",
    'games.search_ph': 'Search title, location, host...',
    'games.filter_venue': 'Venue',
    'games.filter_vibe': 'Vibe',
    'games.venue_all': 'All',
    'games.venue_range': '🎯 Driving Range',
    'games.venue_sim': '🖥️ Sim Room',
    'games.venue_9': '⛳ 9-Hole Course',
    'games.venue_18': '⛳ 18-Hole Course',
    'games.vibe_chill': '😌 Chill',
    'games.vibe_comp': '🔥 Competitive',
    'games.vibe_funny': '😂 Funny & chaotic',
    'games.vibe_locked': '🧠 Locked-in',
    'games.vibe_social': '🥂 Social butterfly',
    'games.vibe_beginner': '🌱 Beginner-friendly',
    'games.empty_title': 'No sessions found',
    'games.empty_sub': 'Try a different filter or search term.',
    'games.book_now': 'Book Now',
    'games.full': 'Full',
    'games.signup_to_book': 'Sign up to book',
    'games.spots_left': 'spots left',
    'games.spot_left': 'spot left',
    'games.players_going': 'players going',
    'games.player_going': 'player going',
    'games.match_with_host': 'match with host',

    'login.welcome_back': 'Welcome back',
    'login.title': 'Log in.',
    'login.sub': 'Good to have you back.',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Log in',
    'login.logging_in': 'Logging in…',
    'login.no_account': "Don't have an account?",
    'login.signup_link': 'Sign up →',

    'invite.eyebrow': 'Grow the foursome',
    'invite.title': 'Invite a friend.',
    'invite.sub': "Share your link — when they join, you'll both be ready to book a round together.",
    'invite.copy': 'Copy',
    'invite.share': 'Share invite link',

    'lang.toggle': '中文'
  },
  zh: {
    'nav.home': '首页',
    'nav.dashboard': '控制台',
    'nav.how': '如何运作',
    'nav.hosts': '成为主办人',
    'nav.partners': '商务合作',
    'nav.contact': '联系我们',
    'nav.shop': '商店',
    'nav.become_host': '申请成为主办人',
    'nav.host_dashboard': '主办人后台',
    'nav.invite': '邀请好友',
    'nav.account': '账户',
    'nav.signup': '注册',
    'nav.login': '登录',

    'games.eyebrow': '寻找球局',
    'games.title_pre': '你的下一场',
    'games.title_em': '高尔夫',
    'games.title_post': '从这里开始',
    'games.sub': '浏览主办人发布的高尔夫球局，看看谁最适合你，几秒内即可预订开球时间。',
    'games.search_ph': '搜索标题、地点或主办人...',
    'games.filter_venue': '场地类型',
    'games.filter_vibe': '氛围',
    'games.venue_all': '全部',
    'games.venue_range': '🎯 练习场',
    'games.venue_sim': '🖥️ 模拟器',
    'games.venue_9': '⛳ 9洞球场',
    'games.venue_18': '⛳ 18洞球场',
    'games.vibe_chill': '😌 轻松',
    'games.vibe_comp': '🔥 竞技',
    'games.vibe_funny': '😂 搞笑活跃',
    'games.vibe_locked': '🧠 专注投入',
    'games.vibe_social': '🥂 社交达人',
    'games.vibe_beginner': '🌱 新手友好',
    'games.empty_title': '没有找到球局',
    'games.empty_sub': '请尝试更换筛选条件或搜索词。',
    'games.book_now': '立即预订',
    'games.full': '已满',
    'games.signup_to_book': '注册后预订',
    'games.spots_left': '个名额剩余',
    'games.spot_left': '个名额剩余',
    'games.players_going': '人已报名',
    'games.player_going': '人已报名',
    'games.match_with_host': '与主办人匹配度',

    'login.welcome_back': '欢迎回来',
    'login.title': '登录',
    'login.sub': '很高兴你回来了。',
    'login.email': '邮箱',
    'login.password': '密码',
    'login.submit': '登录',
    'login.logging_in': '登录中…',
    'login.no_account': '还没有账户？',
    'login.signup_link': '注册 →',

    'invite.eyebrow': '邀请球友',
    'invite.title': '邀请好友',
    'invite.sub': '分享你的专属链接 — 好友加入后，你们就能一起预订球局了。',
    'invite.copy': '复制',
    'invite.share': '分享邀请链接',

    'lang.toggle': 'EN'
  }
};

function getLanguage() {
  return localStorage.getItem('lyfe_lang') || 'en';
}

function setLanguage(lang) {
  localStorage.setItem('lyfe_lang', lang);
  applyLanguage();
}

function t(key) {
  const lang = getLanguage();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS.en[key] || key);
}

function applyLanguage() {
  const lang = getLanguage();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  // Placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });

  // Update the toggle button label itself
  document.querySelectorAll('[data-lang-toggle]').forEach(el => {
    el.textContent = dict['lang.toggle'];
  });

  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

// Auto-apply on every page load
document.addEventListener('DOMContentLoaded', applyLanguage);

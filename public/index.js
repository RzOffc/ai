<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>RzOffc AI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg:       #07070d;
      --bg1:      #0d0d18;
      --bg2:      #11111e;
      --bg3:      #181828;
      --border:   rgba(255,255,255,0.06);
      --border2:  rgba(255,255,255,0.11);
      --text:     #ededf5;
      --text2:    #9896b8;
      --text3:    #55537a;
      --red:      #ff3c5f;
      --red-g:    rgba(255,60,95,0.18);
      --red-glow: rgba(255,60,95,0.3);
      --amber:    #ffa94d;
      --purple:   #a78bfa;
      --green:    #22c55e;
    }

    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

    html, body {
      height:100%; background:var(--bg);
      color:var(--text); font-family:'DM Sans',sans-serif;
      font-size:15px; overflow:hidden;
    }

    /* ─── ANIMATED BACKGROUND ─── */
    .bg {
      position:fixed; inset:0; z-index:0; overflow:hidden; pointer-events:none;
    }
    .orb {
      position:absolute; border-radius:50%; filter:blur(100px);
    }
    .orb1 {
      width:560px; height:560px; opacity:.28;
      background:radial-gradient(#ff3c5f,transparent 65%);
      top:-220px; left:-140px;
      animation:o1 20s ease-in-out infinite alternate;
    }
    .orb2 {
      width:480px; height:480px; opacity:.22;
      background:radial-gradient(#a78bfa,transparent 65%);
      bottom:-160px; right:-100px;
      animation:o2 25s ease-in-out infinite alternate;
    }
    .orb3 {
      width:320px; height:320px; opacity:.1;
      background:radial-gradient(#ffa94d,transparent 65%);
      top:45%; left:55%;
      animation:o3 17s ease-in-out infinite alternate;
    }
    @keyframes o1 { to { transform:translate(70px,90px) scale(1.12); } }
    @keyframes o2 { to { transform:translate(-55px,-65px) scale(1.1); } }
    @keyframes o3 { to { transform:translate(-45px,50px); } }

    .grid {
      position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px);
      background-size:56px 56px;
    }

    /* ─── LAYOUT ─── */
    .app {
      position:relative; z-index:1;
      display:flex; flex-direction:column;
      height:100dvh; max-width:800px; margin:0 auto;
    }

    /* ─── HEADER ─── */
    header {
      flex-shrink:0;
      display:flex; align-items:center; gap:13px;
      padding:16px 26px;
      border-bottom:1px solid var(--border);
      background:rgba(7,7,13,0.65);
      backdrop-filter:blur(28px); -webkit-backdrop-filter:blur(28px);
    }

    .logo {
      position:relative; width:38px; height:38px; flex-shrink:0;
    }
    .logo-border {
      position:absolute; inset:0; border-radius:11px;
      background:conic-gradient(from 0deg, var(--red), var(--purple), var(--amber), var(--red));
      animation:spin 7s linear infinite;
    }
    .logo-face {
      position:absolute; inset:2px; border-radius:9px;
      background:var(--bg1);
      display:flex; align-items:center; justify-content:center;
      font-size:16px;
    }
    @keyframes spin { to { transform:rotate(360deg); } }

    .brand h1 {
      font-family:'Instrument Serif',serif;
      font-size:19px; font-weight:400; font-style:italic;
      letter-spacing:-.015em;
      background:linear-gradient(90deg,#fff 10%,var(--red) 55%,var(--amber));
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    }
    .brand p {
      font-size:10.5px; color:var(--text3);
      letter-spacing:.09em; text-transform:uppercase; margin-top:1px;
    }

    .hright { margin-left:auto; display:flex; align-items:center; gap:8px; }

    .mem-badge {
      display:none; align-items:center; gap:5px;
      padding:4px 10px; border-radius:20px;
      background:rgba(167,139,250,0.1); border:1px solid rgba(167,139,250,0.22);
      font-size:11px; color:var(--purple);
    }
    .mem-badge.show { display:flex; }

    .pill {
      display:flex; align-items:center; gap:6px;
      padding:4px 11px; border-radius:20px;
      border:1px solid var(--border);
      background:rgba(255,255,255,0.03);
      font-size:11.5px; color:var(--text3);
    }
    .dot-green {
      width:6px; height:6px; border-radius:50%;
      background:var(--green);
      box-shadow:0 0 6px var(--green),0 0 12px rgba(34,197,94,.4);
      animation:blink 2.4s ease-in-out infinite;
    }
    @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.8)} }

    .btn-reset {
      display:none; align-items:center; gap:5px;
      padding:4px 11px; border-radius:20px;
      border:1px solid var(--border);
      background:rgba(255,255,255,0.03);
      font-size:11.5px; color:var(--text3);
      cursor:pointer; font-family:'DM Sans',sans-serif;
      transition:all .2s;
    }
    .btn-reset.show { display:flex; }
    .btn-reset:hover { border-color:rgba(255,60,95,.4); color:var(--red); background:var(--red-g); }

    /* ─── MESSAGES ─── */
    #feed {
      flex:1; overflow-y:auto;
      padding:30px 26px; display:flex; flex-direction:column; gap:26px;
      scroll-behavior:smooth;
    }
    #feed::-webkit-scrollbar { width:3px; }
    #feed::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.07); border-radius:3px; }

    @keyframes up { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

    /* ─── WELCOME ─── */
    .welcome {
      flex:1; display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      text-align:center; padding:48px 20px;
      animation:up .55s cubic-bezier(.22,1,.36,1) forwards;
    }
    .w-icon {
      position:relative; width:84px; height:84px; margin-bottom:26px;
    }
    .w-ring {
      position:absolute; inset:0; border-radius:26px;
      background:conic-gradient(from 180deg,var(--red),var(--purple),var(--amber),var(--red));
      animation:spin 5s linear infinite;
    }
    .w-face {
      position:absolute; inset:3px; border-radius:23px;
      background:var(--bg1);
      display:flex; align-items:center; justify-content:center;
      font-size:34px;
    }
    .w-title {
      font-family:'Instrument Serif',serif;
      font-size:38px; font-weight:400; font-style:italic;
      letter-spacing:-.02em; line-height:1.15; margin-bottom:12px;
    }
    .w-title span {
      background:linear-gradient(90deg,var(--red),var(--amber));
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    }
    .w-sub {
      color:var(--text2); font-size:14.5px; font-weight:300;
      max-width:320px; line-height:1.7; margin-bottom:32px;
    }
    .chips {
      display:flex; flex-wrap:wrap; gap:8px; justify-content:center; max-width:480px;
    }
    .chip {
      padding:7px 17px; border-radius:100px;
      border:1px solid var(--border);
      background:rgba(255,255,255,0.03);
      font-size:12.5px; color:var(--text2);
      cursor:pointer; font-family:'DM Sans',sans-serif;
      transition:all .2s;
    }
    .chip:hover {
      border-color:var(--red); color:var(--text);
      background:var(--red-g); transform:translateY(-1px);
    }

    /* ─── ROW ─── */
    .row {
      display:flex; gap:12px; align-items:flex-start;
      animation:up .32s cubic-bezier(.22,1,.36,1) forwards; opacity:0;
    }
    .row.user { flex-direction:row-reverse; }

    .av {
      width:32px; height:32px; border-radius:9px; flex-shrink:0;
      display:flex; align-items:center; justify-content:center;
      font-size:13px; margin-top:3px;
    }
    .av.ai {
      background:linear-gradient(135deg,var(--red),var(--purple));
      box-shadow:0 0 14px var(--red-glow);
    }
    .av.user {
      background:var(--bg3); border:1px solid var(--border);
      color:var(--text2); font-size:12px; font-weight:500;
    }

    .col { max-width:calc(100% - 44px); }
    .row.user .col { display:flex; flex-direction:column; align-items:flex-end; }

    .bub {
      padding:13px 18px; border-radius:16px;
      font-size:14px; line-height:1.75;
    }
    .bub.ai {
      background:var(--bg2); border:1px solid var(--border);
      border-top-left-radius:3px;
    }
    .bub.user {
      background:linear-gradient(135deg,rgba(255,60,95,.13),rgba(167,139,250,.09));
      border:1px solid rgba(255,60,95,.18);
      border-top-right-radius:3px;
    }
    .bub strong { color:var(--amber); font-weight:500; }
    .bub em     { color:var(--text2); font-style:italic; }
    .bub code   {
      font-family:'Fira Code','DM Mono',monospace; font-size:12px;
      background:rgba(255,255,255,0.07); color:var(--purple);
      padding:2px 6px; border-radius:4px;
    }

    .meta {
      margin-top:5px; font-size:10.5px;
      color:var(--text3); letter-spacing:.03em;
    }
    .row.user .meta { text-align:right; }

    /* ─── TYPING ─── */
    .typing {
      display:flex; gap:12px; align-items:center;
      animation:up .28s cubic-bezier(.22,1,.36,1) forwards; opacity:0;
    }
    .tbub {
      padding:13px 18px;
      background:var(--bg2); border:1px solid var(--border);
      border-radius:16px; border-top-left-radius:3px;
      display:flex; gap:5px; align-items:center;
    }
    .td {
      width:6px; height:6px; border-radius:50%;
      background:var(--text3); animation:td 1.3s ease-in-out infinite;
    }
    .td:nth-child(2){animation-delay:.17s} .td:nth-child(3){animation-delay:.34s}
    @keyframes td { 0%,80%,100%{transform:translateY(0);opacity:.35} 40%{transform:translateY(-6px);opacity:1} }

    /* ─── INPUT ─── */
    .input-wrap {
      flex-shrink:0; padding:14px 26px 22px;
      border-top:1px solid var(--border);
      background:rgba(7,7,13,0.72);
      backdrop-filter:blur(28px); -webkit-backdrop-filter:blur(28px);
    }
    .ibox {
      display:flex; align-items:flex-end; gap:9px;
      background:var(--bg2); border:1px solid var(--border);
      border-radius:18px; padding:11px 11px 11px 18px;
      transition:border-color .22s, box-shadow .22s;
    }
    .ibox:focus-within {
      border-color:rgba(255,60,95,.38);
      box-shadow:0 0 0 3px rgba(255,60,95,.07),0 0 18px rgba(255,60,95,.07);
    }
    textarea {
      flex:1; background:transparent; border:none; outline:none;
      resize:none; color:var(--text);
      font-family:'DM Sans',sans-serif; font-size:14px;
      line-height:1.6; max-height:150px; overflow-y:auto; padding:2px 0;
    }
    textarea::placeholder { color:var(--text3); font-weight:300; }

    .sbtn {
      width:38px; height:38px; flex-shrink:0;
      border:none; cursor:pointer; border-radius:11px;
      background:linear-gradient(135deg,var(--red),#b8294e);
      display:flex; align-items:center; justify-content:center;
      transition:transform .14s, box-shadow .18s, opacity .18s;
      box-shadow:0 4px 14px var(--red-glow);
    }
    .sbtn:hover:not(:disabled) { transform:scale(1.07); box-shadow:0 6px 20px rgba(255,60,95,.45); }
    .sbtn:active:not(:disabled) { transform:scale(.95); }
    .sbtn:disabled { opacity:.35; cursor:not-allowed; box-shadow:none; }
    .sbtn svg { width:17px; height:17px; fill:#fff; }

    .ifooter {
      margin-top:8px; display:flex; justify-content:space-between;
      font-size:10.5px; color:var(--text3); padding:0 3px;
    }

    /* ─── RESPONSIVE ─── */
    @media(max-width:580px){
      header { padding:12px 16px; }
      #feed  { padding:22px 16px; gap:20px; }
      .input-wrap { padding:12px 16px 18px; }
      .w-title { font-size:30px; }
    }
  </style>
</head>
<body>

<div class="bg">
  <div class="orb orb1"></div>
  <div class="orb orb2"></div>
  <div class="orb orb3"></div>
  <div class="grid"></div>
</div>

<div class="app">

  <header>
    <div class="logo">
      <div class="logo-border"></div>
      <div class="logo-face">🔥</div>
    </div>
    <div class="brand">
      <h1>RzOffc AI</h1>
      <p>Powered by Milo-AI · by RzOffc</p>
    </div>
    <div class="hright">
      <div class="mem-badge" id="memBadge">🧠 <span id="memNum">0</span> pesan</div>
      <button class="btn-reset" id="btnReset" onclick="resetChat()">🗑 Reset</button>
      <div class="pill"><div class="dot-green"></div>Online</div>
    </div>
  </header>

  <div id="feed">
    <div class="welcome" id="welcome">
      <div class="w-icon">
        <div class="w-ring"></div>
        <div class="w-face">🔥</div>
      </div>
      <div class="w-title">Hai, aku <span>RzOffc AI</span></div>
      <div class="w-sub">Asisten AI dengan memori permanen — aku ingat semua percakapan kita.</div>
      <div class="chips">
        <div class="chip" onclick="useChip(this)">Siapa kamu?</div>
        <div class="chip" onclick="useChip(this)">Buatkan kode Python</div>
        <div class="chip" onclick="useChip(this)">Ceritakan hal menarik</div>
        <div class="chip" onclick="useChip(this)">Bantu belajar AI</div>
        <div class="chip" onclick="useChip(this)">Buat cerita pendek</div>
        <div class="chip" onclick="useChip(this)">Tips produktivitas</div>
      </div>
    </div>
  </div>

  <div class="input-wrap">
    <div class="ibox">
      <textarea id="inp" placeholder="Tanyakan apa saja..." rows="1" maxlength="2000"></textarea>
      <button class="sbtn" id="sbtn" onclick="send()">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div class="ifooter">
      <span>↵ Kirim · ⇧↵ Baris baru</span>
      <span id="cc">0 / 2000</span>
    </div>
  </div>

</div>

<script>
  const SESSION = 'rzoffc-default'; // bisa diubah jadi username nanti

  const feed    = document.getElementById('feed');
  const inp     = document.getElementById('inp');
  const sbtn    = document.getElementById('sbtn');
  const cc      = document.getElementById('cc');
  const memBadge = document.getElementById('memBadge');
  const memNum  = document.getElementById('memNum');
  const btnReset = document.getElementById('btnReset');
  let welcome   = document.getElementById('welcome');
  let busy      = false;

  /* ── textarea auto-resize ── */
  inp.addEventListener('input', () => {
    inp.style.height = 'auto';
    inp.style.height = Math.min(inp.scrollHeight, 150) + 'px';
    cc.textContent = inp.value.length + ' / 2000';
  });
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });

  /* ── helpers ── */
  const ts = () => new Date().toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' });

  function md(t) {
    return t
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g,     '<em>$1</em>')
      .replace(/`([^`]+)`/g,     '<code>$1</code>')
      .replace(/\n/g,            '<br>');
  }

  function setMem(n) {
    memNum.textContent = n;
    memBadge.classList.toggle('show', n > 0);
    btnReset.classList.toggle('show', n > 0);
  }

  function scrollEnd() {
    feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });
  }

  /* ── render message ── */
  function addMsg(role, text) {
    if (welcome) { welcome.remove(); welcome = null; }
    const row = document.createElement('div');
    row.className = `row ${role}`;
    row.innerHTML = `
      <div class="av ${role}">${role === 'ai' ? '🔥' : 'U'}</div>
      <div class="col">
        <div class="bub ${role}">${md(text)}</div>
        <div class="meta">${role === 'ai' ? 'RzOffc AI · ' + ts() : 'Kamu · ' + ts()}</div>
      </div>`;
    feed.appendChild(row);
    scrollEnd();
  }

  /* ── typing ── */
  function showTyping() {
    const el = document.createElement('div');
    el.id = 'typing'; el.className = 'typing';
    el.innerHTML = `
      <div class="av ai">🔥</div>
      <div class="tbub"><div class="td"></div><div class="td"></div><div class="td"></div></div>`;
    feed.appendChild(el); scrollEnd();
  }
  function hideTyping() { document.getElementById('typing')?.remove(); }

  /* ── load history on start ── */
  async function loadHistory() {
    try {
      const r = await fetch(`/api/chat?session=${SESSION}`);
      const d = await r.json();
      if (d.history?.length) {
        d.history.forEach(m => addMsg(m.role, m.text));
        setMem(d.history.length);
      }
    } catch { /* silently ignore on first load */ }
  }

  /* ── chip ── */
  function useChip(el) {
    inp.value = el.textContent;
    inp.dispatchEvent(new Event('input'));
    send();
  }

  /* ── reset ── */
  async function resetChat() {
    if (!confirm('Hapus semua riwayat? AI akan lupa percakapan ini.')) return;
    try { await fetch(`/api/chat?session=${SESSION}`, { method: 'DELETE' }); } catch {}
    feed.innerHTML = '';
    const w = makeWelcome();
    feed.appendChild(w);
    welcome = w;
    setMem(0);
  }

  function makeWelcome() {
    const w = document.createElement('div');
    w.className = 'welcome'; w.id = 'welcome';
    w.innerHTML = `
      <div class="w-icon"><div class="w-ring"></div><div class="w-face">🔥</div></div>
      <div class="w-title">Hai, aku <span>RzOffc AI</span></div>
      <div class="w-sub">Asisten AI dengan memori permanen — aku ingat semua percakapan kita.</div>
      <div class="chips">
        <div class="chip" onclick="useChip(this)">Siapa kamu?</div>
        <div class="chip" onclick="useChip(this)">Buatkan kode Python</div>
        <div class="chip" onclick="useChip(this)">Ceritakan hal menarik</div>
        <div class="chip" onclick="useChip(this)">Bantu belajar AI</div>
        <div class="chip" onclick="useChip(this)">Buat cerita pendek</div>
        <div class="chip" onclick="useChip(this)">Tips produktivitas</div>
      </div>`;
    return w;
  }

  /* ── send ── */
  async function send() {
    if (busy) return;
    const text = inp.value.trim();
    if (!text) return;

    busy = true; sbtn.disabled = true;
    inp.value = ''; inp.style.height = 'auto'; cc.textContent = '0 / 2000';

    addMsg('user', text);
    showTyping();

    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session: SESSION })
      });
      const d = await r.json();
      hideTyping();
      if (d.ok && d.reply) {
        addMsg('ai', d.reply);
        setMem(d.history_count);
      } else {
        addMsg('ai', 'Hmm, ada yang salah. Coba lagi ya! ⚡');
      }
    } catch {
      hideTyping();
      addMsg('ai', 'Koneksi bermasalah. Periksa jaringan kamu. 🌐');
    } finally {
      busy = false; sbtn.disabled = false; inp.focus();
    }
  }

  // Load riwayat saat pertama buka
  loadHistory();
</script>
</body>
</html>

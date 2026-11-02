// Ứng dụng chính: Trang chủ, Thử thách 30 ngày, Bài học (Học câu → Nói theo → Nhập vai),
// Ôn thẻ (lặp lại ngắt quãng), Luyện nghe, Nói tự do, Nói nhanh, Cài đặt.
(function () {
  const $app = document.getElementById("app");
  const TEACHER = { name: "cô Mây", avatar: "🌤️" }; // nhân vật hư cấu
  const LBY = Object.fromEntries(LESSONS.map(l => [l.id, l]));

  // ---------- Lưu tiến độ (chỉ trên máy) ----------
  const KEY = "esa.v1";
  const dstr = d => { const x = new Date(d); x.setMinutes(x.getMinutes() - x.getTimezoneOffset()); return x.toISOString().slice(0, 10); };
  const today = () => dstr(Date.now());
  const addDays = (iso, n) => dstr(new Date(iso + "T12:00:00").getTime() + n * 864e5);
  function load() {
    let s = {};
    try { s = JSON.parse(localStorage.getItem(KEY)) || {}; } catch {}
    s.settings = Object.assign({ record: true, rate: 0.95, goal: 20, hideAnswer: false }, s.settings);
    s.lessons = s.lessons || {};
    s.day = s.day || { date: today(), spoken: 0 };
    s.streak = s.streak || { last: null, days: 0 };
    s.srs = s.srs || {};                       // "l1:0" -> { box, due }
    s.plan = s.plan || { start: null, done: {}, tasks: {} };
    s.talks = s.talks || {};                   // ngày -> { words, wpm, used, date, text }
    s.listen = s.listen || { total: 0, right: 0 };
    if (s.day.date !== today()) s.day = { date: today(), spoken: 0 };
    return s;
  }
  let store = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch {} }
  function markActive() {
    const t = today();
    if (store.streak.last !== t) {
      store.streak.days = store.streak.last === addDays(t, -1) ? store.streak.days + 1 : 1;
      store.streak.last = t;
    }
  }
  function countSpoken() { store.day.spoken++; markActive(); save(); }
  function lessonState(id) { return (store.lessons[id] = store.lessons[id] || { best: {}, done: false }); }

  // ---------- Ôn thẻ: lặp lại ngắt quãng ----------
  const GAPS = [0, 1, 2, 4, 7, 15, 30]; // số ngày tới lần ôn sau, theo "hộp"
  function srsUpdate(key, score) {
    const c = store.srs[key] || { box: 0 };
    c.box = score >= 75 ? Math.min(c.box + 1, GAPS.length - 1) : score >= 40 ? Math.max(c.box, 1) : 1;
    c.due = addDays(today(), GAPS[c.box]);
    store.srs[key] = c;
    save();
  }
  function phraseByKey(k) { const [lid, i] = k.split(":"); const L = LBY[lid]; return L && L.phrases[+i] && Object.assign({ _key: k }, L.phrases[+i]); }
  function dueCards(limit = 12) {
    const t = today();
    return Object.entries(store.srs).filter(([, c]) => c.due <= t)
      .sort((a, b) => a[1].box - b[1].box || a[1].due.localeCompare(b[1].due))
      .slice(0, limit).map(([k]) => phraseByKey(k)).filter(Boolean);
  }

  // ---------- Ghi âm mốc: IndexedDB ----------
  const AudioDB = {
    db: null,
    open() {
      if (this.db) return Promise.resolve(this.db);
      return new Promise((res, rej) => {
        if (!window.indexedDB) return rej("no-idb");
        const r = indexedDB.open("noidi", 1);
        r.onupgradeneeded = () => r.result.createObjectStore("audio");
        r.onsuccess = () => res(this.db = r.result);
        r.onerror = () => rej(r.error);
      });
    },
    async put(key, blob) { try { const db = await this.open(); db.transaction("audio", "readwrite").objectStore("audio").put(blob, key); } catch {} },
    async get(key) {
      try {
        const db = await this.open();
        return await new Promise(res => { const q = db.transaction("audio").objectStore("audio").get(key); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); });
      } catch { return null; }
    }
  };

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const linkedHtml = s => esc(s).replace(/‿/g, '<span class="lk">‿</span>').replace(/·/g, '<span class="br">/</span>');
  const isStandalone = () => window.navigator.standalone || matchMedia("(display-mode: standalone)").matches;
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const $ = id => document.getElementById(id);

  function cheer(score) {
    if (score >= 85) return ["Đỉnh! Nghe tự nhiên lắm 👏", "good"];
    if (score >= 65) return ["Ổn rồi! Chú ý mấy từ màu đỏ nha 😉", "ok"];
    if (score >= 40) return ["Gần được rồi! Nghe mẫu thêm 1 lần rồi nói chậm lại nha.", "meh"];
    return ["Máy chưa nghe rõ. Nói to, rõ từng cụm thử lại nha 💪", "bad"];
  }
  function errorText(err) {
    if (err === "mic-denied" || err === "not-allowed") return "Chưa cho phép micro. Vào Cài đặt iPhone → Safari → Micro → Cho phép, rồi thử lại.";
    if (err === "service-not-allowed") return isStandalone()
      ? "Nhận diện giọng nói chưa chạy khi mở từ màn hình chính. Thử mở bằng Safari, hoặc bật Siri (Cài đặt → Siri). Bạn vẫn có thể nghe lại và tự chấm."
      : "Cần bật Siri & Đọc chính tả: Cài đặt → Siri → bật, và Cài đặt → Chung → Bàn phím → Bật Đọc chính tả.";
    if (err === "audio-capture") return "Micro đang bận. Thử tắt \"Ghi âm song song\" trong Cài đặt của app.";
    if (err === "network") return "Nhận diện giọng nói cần mạng. Kiểm tra Wi-Fi/4G rồi thử lại.";
    if (err) return "Có lỗi khi nghe (" + err + "). Thử lại nha.";
    return "";
  }

  // ---------- Khung chung ----------
  let flowBack = null; // khi mở từ "Hôm nay" thì xong việc quay về đó
  function back() { const f = flowBack; flowBack = null; f ? f() : home(); }
  let tick = null;
  function shell(title, body, { back: showBack = true } = {}) {
    clearInterval(tick);
    $app.innerHTML = `
      <header class="top">
        ${showBack ? '<button class="icon" data-go="home" aria-label="Về trang chủ">‹</button>' : '<span class="icon"></span>'}
        <h1>${esc(title)}</h1>
        <button class="icon" data-go="settings" aria-label="Cài đặt">⚙︎</button>
      </header>
      <main>${body}</main>`;
    $app.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));
    window.scrollTo(0, 0);
  }
  function go(route, arg) {
    window.speechSynthesis?.cancel();
    if (route === "home") { flowBack = null; return home(); }
    if (route === "settings") return settings();
    if (route === "lesson") return lessonIntro(arg);
    if (route === "quick") return quick();
  }

  // ---------- Thử thách 30 ngày: ngày hiện tại ----------
  function planDayNo() {
    for (const p of PLAN) if (!store.plan.done[p.d]) return p.d;
    return null; // xong cả 30 ngày
  }
  const doneDays = () => Object.keys(store.plan.done).length;

  // ---------- HOME ----------
  function home() {
    const pct = Math.min(100, Math.round(100 * store.day.spoken / store.settings.goal));
    const warn = !Speech.canRecognize
      ? `<div class="warn">Trình duyệt này chưa hỗ trợ nhận diện giọng nói — bạn vẫn luyện được bằng ghi âm rồi tự nghe lại. Trên iPhone hãy dùng Safari.</div>` : "";
    const n = planDayNo();
    const due = dueCards(99).length;
    const planCard = n
      ? `<button class="big primary plan" id="today"><small>Thử thách 30 ngày · ${doneDays()}/30</small>📅 Ngày ${n}: ${esc(PLAN[n - 1].title)}</button>`
      : `<div class="card"><b>🏆 Bạn đã xong thử thách 30 ngày!</b><p class="small">Giữ nhịp: mỗi ngày Ôn thẻ + Luyện nghe + Nói nhanh 3 phút.</p></div>`;
    const rows = ROADMAP.map((r, i) => {
      const L = LBY[r.id];
      const st = lessonState(L.id);
      return `<button class="lesson" data-lesson="${L.id}">
             <span class="em">${L.emoji}</span>
             <span class="lt"><b>${i + 1}. ${esc(L.title)}</b><small>${esc(L.subtitle)}</small></span>
             <span class="tag ${st.done ? "done" : ""}">${st.done ? "✓ Xong" : r.level}</span>
           </button>`;
    }).join("");
    shell("Nói Đi!", `
      ${warn}
      <section class="hello">
        <div class="avatar">${TEACHER.avatar}</div>
        <div class="bubble">Hello! Mình là <b>${TEACHER.name}</b> nè. ${n ? `Hôm nay là <b>ngày ${n}</b> – khoảng 20 phút thôi.` : "Giỏi quá, xong 30 ngày rồi!"} Lười cũng được, nhưng phải mở miệng nha 😄</div>
      </section>
      <section class="card stats">
        <div><b>${store.day.spoken}</b>/${store.settings.goal}<small>câu đã nói hôm nay</small></div>
        <div><b>🔥 ${store.streak.days}</b><small>ngày liên tiếp</small></div>
        <div><b>${Object.keys(store.srs).length}</b><small>câu đã thuộc dần</small></div>
      </section>
      <div class="bar"><i style="width:${pct}%"></i></div>
      ${planCard}
      <div class="grid2">
        <button class="big" id="review">🔁 Ôn thẻ<small>${due ? `${due} câu đến hạn` : "chưa có câu đến hạn"}</small></button>
        <button class="big" id="listen">🎧 Luyện nghe<small>10 câu · ~5 phút</small></button>
        <button class="big" id="quick">⚡ Nói nhanh<small>6 câu · 3 phút</small></button>
        <button class="big" id="talk">🗣 Nói tự do<small>1 phút theo đề</small></button>
      </div>
      <h2>Bài học A2 → B1</h2>
      <div class="list">${rows}</div>
      <p class="foot">Nhân vật ${TEACHER.name} là hư cấu. Giọng đọc mẫu là giọng máy của iPhone.</p>
    `, { back: false });
    if ($("today")) $("today").onclick = () => planDay(n);
    $("review").onclick = () => review();
    $("listen").onclick = () => listening();
    $("quick").onclick = () => go("quick");
    $("talk").onclick = () => freeTalk(PLAN[(n || 30) - 1], null);
    $app.querySelectorAll("[data-lesson]").forEach(b => b.onclick = () => go("lesson", b.dataset.lesson));
  }

  // ---------- Một ngày trong thử thách ----------
  function planDay(n) {
    const P = PLAN[n - 1];
    if (!store.plan.start) { store.plan.start = today(); save(); }
    const T = (store.plan.tasks[n] = store.plan.tasks[n] || {});
    const due = dueCards().length;
    const lessonTitles = P.lessons.map(id => LBY[id].title).join(" · ");
    const tasks = [
      { k: "review", icon: "🔁", name: "Ôn thẻ", sub: due ? `${due} câu đến hạn (~3 phút)` : "Chưa có câu đến hạn – bỏ qua được", optional: !due },
      { k: "listen", icon: "🎧", name: "Luyện nghe", sub: "10 câu (~5 phút)" },
      { k: "lesson", icon: P.mode === "new" ? "📘" : "🎭", name: P.mode === "new" ? "Bài mới" : "Ôn: nhập vai không nhìn gợi ý", sub: lessonTitles + " (~8 phút)" },
      { k: "talk", icon: "🗣", name: P.check ? "Nói tự do + thu âm mốc" : "Nói tự do", sub: `${P.talk.secs} giây: ${P.talk.vi}` }
    ];
    const ready = tasks.every(t => t.optional || T[t.k]);
    shell(`Ngày ${n}/30`, `
      <h2 class="dh">${esc(P.title)}</h2>
      <p class="hint">Làm theo thứ tự từ trên xuống. Xong mục nào máy tự đánh dấu.</p>
      <div class="list">${tasks.map(t => `
        <button class="lesson task ${T[t.k] ? "ok" : ""}" data-task="${t.k}">
          <span class="em">${T[t.k] ? "✅" : t.icon}</span>
          <span class="lt"><b>${t.name}</b><small>${esc(t.sub)}</small></span>
          <span class="tag">${T[t.k] ? "Xong" : t.optional ? "Tùy" : "›"}</span>
        </button>`).join("")}</div>
      <button class="big primary" id="finishDay" ${ready ? "" : "disabled"}>🎉 Hoàn thành ngày ${n}</button>
      <details class="card"><summary><b>Vì sao học như vậy?</b></summary>
        <p class="small">• <b>Nghe trước, nói sau</b>: tai quen âm thì miệng mới bắt chước được.<br>
        • <b>Nói theo (shadowing)</b> + chấm điểm: sửa phát âm, nối âm.<br>
        • <b>Ôn thẻ ngắt quãng</b>: câu nào nói tốt thì lâu mới ôn lại, câu dở ôn sớm → nhớ lâu mà không tốn thời gian.<br>
        • <b>Nói tự do</b>: luyện ghép câu thật, không chỉ đọc thuộc. Ngày mốc (1, 7, 14, 21, 28, 30) thu âm để so tiến bộ.<br>
        • Ngoài app: mỗi tuần nói thật với người (đồng nghiệp, gia sư online) 2–3 lần, 15 phút cũng được.</p>
      </details>
    `);
    const mark = k => { T[k] = true; save(); };
    const again = () => planDay(n);
    $app.querySelectorAll("[data-task]").forEach(b => b.onclick = () => {
      const k = b.dataset.task;
      flowBack = again;
      if (k === "review") return review(() => mark("review"));
      if (k === "listen") return listening(() => mark("listen"));
      if (k === "talk") return freeTalk(P, n, () => mark("talk"));
      if (k === "lesson") {
        const ids = [...P.lessons];
        const runNext = () => {
          const id = ids.shift();
          if (!id) { mark("lesson"); flowBack = null; return planDay(n); }
          flowBack = runNext;
          P.mode === "new" ? lessonIntro(id) : roleplay(LBY[id], [], { hide: true, review: true });
        };
        flowBack = null;
        runNext();
      }
    });
    $("finishDay").onclick = () => {
      store.plan.done[n] = today(); markActive(); save();
      const next = planDayNo();
      shell(`Ngày ${n}/30`, `
        <section class="hello"><div class="avatar">${TEACHER.avatar}</div>
        <div class="bubble">Xong <b>ngày ${n}</b> rồi! 🎉 ${n === 30 ? "Hết 30 ngày luôn! Nghe lại bản ngày 1 trong mục Nói tự do để thấy mình khác cỡ nào nha." : "Mai mình gặp lại nha. Đều đặn quan trọng hơn học nhiều một lúc."}</div></section>
        ${next ? `<p class="hint">Còn sức thì làm luôn ngày ${next}, không thì để mai.</p><button class="big" id="nx">📅 Ngày ${next}</button>` : ""}
        <button class="big primary" id="hm">🏠 Về trang chủ</button>`);
      if ($("nx")) $("nx").onclick = () => planDay(next);
      $("hm").onclick = () => go("home");
    };
  }

  // ---------- BÀI HỌC: bước 1 – Học câu ----------
  function lessonIntro(id) {
    const L = LBY[id];
    const cards = L.phrases.map((p, i) => `
      <article class="card phrase">
        <div class="en">${linkedHtml(p.linked)}</div>
        <div class="vi">${esc(p.vi)}</div>
        <div class="row">
          <button class="pill" data-say="${i}">▶ Nghe</button>
          <button class="pill" data-slow="${i}">🐢 Chậm</button>
        </div>
        <details><summary>${TEACHER.avatar} ${TEACHER.name} nói nhỏ…</summary><p>${esc(p.tip)}</p></details>
      </article>`).join("");
    shell(L.title, `
      <ol class="steps"><li class="on">Học câu</li><li>Nói theo</li><li>Nhập vai</li></ol>
      <p class="hint">Nghe từng câu 1–2 lần. Dấu <span class="lk">‿</span> là chỗ <b>nối âm</b>, dấu <span class="br">/</span> là chỗ ngắt hơi.</p>
      ${cards}
      <button class="big primary" id="next">🎙 Bắt đầu nói theo →</button>
    `);
    $app.querySelectorAll("[data-say]").forEach(b => b.onclick = () => Speech.speak(L.phrases[b.dataset.say].en, { rate: store.settings.rate }));
    $app.querySelectorAll("[data-slow]").forEach(b => b.onclick = () => Speech.speak(L.phrases[b.dataset.slow].en, { rate: 0.6 }));
    $("next").onclick = () => practice(L.phrases.map((p, i) => Object.assign({ _key: L.id + ":" + i }, p)), {
      title: L.title, lessonId: L.id,
      onDone: results => roleplay(L, results)
    });
  }

  // ---------- Bước 2 – Nói theo (dùng chung cho Nói nhanh, Ôn thẻ) ----------
  function practice(items, { title, lessonId, onDone, quickMode }) {
    let idx = 0;
    const results = [];
    let ctrl = null;

    function screen(autoPlay) {
      const p = items[idx];
      shell(title, `
        ${quickMode ? "" : '<ol class="steps"><li class="ok">Học câu</li><li class="on">Nói theo</li><li>Nhập vai</li></ol>'}
        <div class="count">${idx + 1} / ${items.length}</div>
        <article class="card focus">
          <div class="en big">${linkedHtml(p.linked || p.en)}</div>
          <div class="vi">${esc(p.vi)}</div>
          <div class="row">
            <button class="pill" id="play">▶ Nghe mẫu</button>
            <button class="pill" id="slow">🐢 Chậm</button>
          </div>
        </article>
        <p class="hint">Nghe mẫu → bấm micro → nói ngay theo. Nói xong bấm lại để dừng (hoặc tự dừng).</p>
        <button class="mic" id="mic" aria-label="Nói"><span>🎙</span></button>
        <div id="live" class="live"></div>
        <div id="res"></div>
        <div class="row nav">
          <button class="pill ghost" id="skip">Bỏ qua</button>
          <button class="pill primary" id="nextp" hidden>${idx + 1 < items.length ? "Câu tiếp →" : "Xong phần này →"}</button>
        </div>`);
      const say = r => Speech.speak(p.en, { rate: r });
      $("play").onclick = () => say(store.settings.rate);
      $("slow").onclick = () => say(0.6);
      $("mic").onclick = () => attempt();
      $("skip").onclick = next;
      $("nextp").onclick = next;
      if (autoPlay) say(store.settings.rate);
    }

    async function attempt() {
      const mic = $("mic");
      if (ctrl) { ctrl.stop(); return; }
      window.speechSynthesis?.cancel();
      const p = items[idx];
      const live = $("live");
      $("res").innerHTML = "";
      mic.classList.add("rec");
      live.textContent = "Đang nghe…";
      ctrl = Speech.listen({ record: store.settings.record, onInterim: t => (live.textContent = t) });
      const r = await ctrl.result;
      ctrl = null;
      mic.classList.remove("rec");
      live.textContent = "";
      countSpoken();
      showResult(p.en, r, s => {
        results[idx] = s;
        if (p._key) srsUpdate(p._key, s);
        if (lessonId) {
          const st = lessonState(lessonId);
          st.best[idx] = Math.max(st.best[idx] || 0, s);
          save();
        }
      });
      $("nextp").hidden = false;
    }

    function next() {
      if (ctrl) { ctrl.stop(); ctrl = null; }
      idx++;
      if (idx < items.length) screen(true);
      else onDone(results);
    }
    screen(false);
  }

  // Hiện kết quả chấm điểm + nghe lại giọng mình
  function showResult(targets, r, onScore) {
    const res = $("res");
    const list = Array.isArray(targets) ? targets : [targets];
    const audioBtn = r.audioUrl ? `<button class="pill" id="me">🔁 Nghe lại giọng mình</button>` : "";
    if (Speech.canRecognize && r.transcripts.length) {
      let best = null;
      list.forEach(t => { const s = Speech.score(t, r.transcripts); if (!best || s.score > best.score) best = s; });
      const [msg, cls] = cheer(best.score);
      const words = best.words.map(w => `<span class="${w.s >= 1 ? "w-ok" : w.s > 0 ? "w-near" : "w-miss"}">${esc(w.w)}</span>`).join(" ");
      res.innerHTML = `
        <div class="card result ${cls}">
          <div class="score">${best.score}<small>điểm</small></div>
          <div class="msg">${msg}</div>
          <div class="words">${words}</div>
          <div class="heard">Máy nghe được: “${esc(best.heard)}”</div>
          <div class="row">${audioBtn}<button class="pill" id="again">↺ Nói lại</button></div>
        </div>`;
      onScore(best.score);
    } else {
      const err = errorText(r.error);
      res.innerHTML = `
        <div class="card result meh">
          <div class="msg">${err || (Speech.canRecognize ? "Máy chưa nghe thấy gì. Nói to hơn chút nha!" : "Nghe lại giọng mình rồi tự chấm nha:")}</div>
          <div class="row">${audioBtn}<button class="pill" id="again">↺ Nói lại</button></div>
          ${r.audioUrl ? `<div class="row"><button class="pill" data-self="90">😎 Giống mẫu</button><button class="pill" data-self="60">🙂 Tạm</button><button class="pill" data-self="30">😅 Chưa</button></div>` : ""}
        </div>`;
      res.querySelectorAll("[data-self]").forEach(b => b.onclick = () => {
        onScore(+b.dataset.self);
        res.querySelectorAll("[data-self]").forEach(x => x.classList.toggle("primary", x === b));
      });
    }
    const me = $("me");
    if (me) me.onclick = () => { window.speechSynthesis?.cancel(); new Audio(r.audioUrl).play(); };
    $("again").onclick = () => $("mic").click();
  }

  // ---------- Bước 3 – Nhập vai ----------
  function roleplay(L, shadowResults, opts = {}) {
    const R = L.roleplay;
    let t = 0;
    const scores = [];
    let ctrl = null;
    const log = [];

    function screen() {
      const turn = R.turns[t];
      const hide = opts.hide ?? store.settings.hideAnswer;
      const chat = log.map(m => `<div class="msgb ${m.me ? "me" : "them"}"><b>${m.me ? "Bạn" : esc(R.partner)}</b>${esc(m.en)}<small>${esc(m.vi)}</small></div>`).join("");
      shell(L.title, `
        ${opts.review ? '<p class="hint">🎭 Ôn: lần này giấu câu mẫu – tự nói theo ý tiếng Việt, kẹt quá mới bấm Xem gợi ý.</p>'
          : '<ol class="steps"><li class="ok">Học câu</li><li class="ok">Nói theo</li><li class="on">Nhập vai</li></ol>'}
        <p class="hint">${esc(R.intro)}</p>
        <div class="chat">${chat}
          <div class="msgb them"><b>${esc(R.partner)}</b>${esc(turn.them)}<small>${esc(turn.them_vi)}</small>
            <button class="pill tiny" id="replay">▶</button></div>
        </div>
        <div class="card your">
          <small>Bạn trả lời (ý: ${esc(turn.you_vi)})</small>
          <div class="en ${hide ? "blur" : ""}" id="ans">${esc(turn.you)}</div>
          <div class="row"><button class="pill" id="hear">▶ Nghe câu mẫu</button>
          ${hide ? '<button class="pill" id="show">👀 Xem gợi ý</button>' : ""}</div>
        </div>
        <button class="mic" id="mic" aria-label="Nói"><span>🎙</span></button>
        <div id="live" class="live"></div>
        <div id="res"></div>
        <div class="row nav">
          <button class="pill ghost" id="skip">Bỏ qua</button>
          <button class="pill primary" id="nextp" hidden>${t + 1 < R.turns.length ? "Tiếp →" : "Hoàn thành 🎉"}</button>
        </div>`);
      const say = () => Speech.speak(turn.them, { rate: store.settings.rate, alt: true });
      $("replay").onclick = say;
      $("hear").onclick = () => { $("ans").classList.remove("blur"); Speech.speak(turn.you, { rate: store.settings.rate }); };
      const show = $("show");
      if (show) show.onclick = () => $("ans").classList.remove("blur");
      $("mic").onclick = attempt;
      $("skip").onclick = next;
      $("nextp").onclick = next;
      say();
    }
    async function attempt() {
      if (ctrl) { ctrl.stop(); return; }
      window.speechSynthesis?.cancel();
      const turn = R.turns[t];
      const mic = $("mic"), live = $("live");
      $("res").innerHTML = "";
      mic.classList.add("rec"); live.textContent = "Đang nghe…";
      ctrl = Speech.listen({ record: store.settings.record, onInterim: x => (live.textContent = x) });
      const r = await ctrl.result;
      ctrl = null; mic.classList.remove("rec"); live.textContent = "";
      countSpoken();
      showResult(turn.accept, r, s => (scores[t] = s));
      $("nextp").hidden = false;
    }
    function next() {
      if (ctrl) { ctrl.stop(); ctrl = null; }
      const turn = R.turns[t];
      log.push({ me: false, en: turn.them, vi: turn.them_vi }, { me: true, en: turn.you, vi: turn.you_vi });
      t++;
      if (t < R.turns.length) screen();
      else finish(L, shadowResults, scores, opts);
    }
    screen();
  }

  // ---------- Bước 4 – Xong ----------
  function finish(L, shadow, role, opts = {}) {
    const all = [...shadow, ...role].filter(x => typeof x === "number");
    const avg = all.length ? Math.round(all.reduce((a, b) => a + b, 0) / all.length) : 0;
    const st = lessonState(L.id);
    if (!opts.review) { st.done = true; st.avg = avg; }
    // câu chưa có thẻ ôn thì tạo (kể cả câu bỏ qua) để ngày mai ôn lại
    L.phrases.forEach((p, i) => { const k = L.id + ":" + i; if (!store.srs[k]) srsUpdate(k, shadow[i] ?? 0); });
    save();
    const weak = L.phrases.map((p, i) => Object.assign({ _key: L.id + ":" + i }, p)).filter((p, i) => !opts.review && (shadow[i] ?? 0) < 65);
    const cont = flowBack ? "Tiếp tục →" : "🏠 Về trang chủ";
    shell(L.title, `
      <section class="hello">
        <div class="avatar">${TEACHER.avatar}</div>
        <div class="bubble">Xong ${opts.review ? "phần ôn" : "bài"} rồi nè! 🎉 Điểm trung bình <b>${avg}</b>. Hôm nay bạn đã nói <b>${store.day.spoken}</b> câu. ${avg >= 75 ? "Giỏi quá trời!" : "Mấy câu này sẽ quay lại trong Ôn thẻ để nhớ lâu nha."}</div>
      </section>
      ${weak.length ? `<button class="big" id="weak">🔁 Luyện lại ${weak.length} câu điểm thấp</button>` : ""}
      <button class="big primary" id="cont">${cont}</button>
    `);
    const w = $("weak");
    if (w) w.onclick = () => practice(weak, { title: "Luyện lại", quickMode: true, onDone: () => finishBack() });
    const finishBack = () => back();
    $("cont").onclick = finishBack;
  }

  // ---------- Ôn thẻ ----------
  function review(onDone) {
    const items = dueCards();
    if (!items.length) {
      onDone && onDone();
      shell("Ôn thẻ", `
        <section class="hello"><div class="avatar">${TEACHER.avatar}</div>
        <div class="bubble">Hôm nay chưa có câu nào đến hạn ôn 👌 Học bài mới đi, câu nào học rồi máy sẽ tự hẹn ngày ôn lại.</div></section>
        <button class="big primary" id="b">${flowBack ? "Tiếp tục →" : "🏠 Về trang chủ"}</button>`);
      $("b").onclick = back;
      return;
    }
    practice(items, {
      title: `Ôn thẻ (${items.length} câu)`, quickMode: true,
      onDone: res => {
        onDone && onDone();
        const good = res.filter(x => x >= 75).length;
        shell("Ôn thẻ", `
          <section class="hello"><div class="avatar">${TEACHER.avatar}</div>
          <div class="bubble">Ôn xong ${items.length} câu, ${good} câu nói tốt 👍 Câu tốt sẽ hẹn lâu hơn mới ôn lại, câu chưa tốt mai gặp lại nha.</div></section>
          <button class="big primary" id="b">${flowBack ? "Tiếp tục →" : "🏠 Về trang chủ"}</button>`);
        $("b").onclick = back;
      }
    });
  }

  // ---------- Luyện nghe ----------
  function learnedLessons() {
    const ids = ROADMAP.map(r => r.id).filter(id => lessonState(id).done || Object.keys(store.srs).some(k => k.startsWith(id + ":")));
    return (ids.length >= 2 ? ids : ROADMAP.slice(0, 3).map(r => r.id)).map(id => LBY[id]);
  }
  const COMMON = new Set(["the", "this", "that", "with", "have", "your", "what", "about", "from", "here", "there", "they", "were", "will", "just", "some", "please", "could", "would", "thanks"]);
  function buildQuiz(n = 10) {
    const Ls = learnedLessons();
    const phrases = Ls.flatMap(L => L.phrases);
    const allVi = LESSONS.flatMap(L => L.phrases.map(p => p.vi));
    const turns = Ls.flatMap(L => L.roleplay.turns);
    const allYou = LESSONS.flatMap(L => L.roleplay.turns.map(t => t.you));
    const words = [...new Set(LESSONS.flatMap(L => L.phrases.flatMap(p => p.en.replace(/[^A-Za-z' ]/g, " ").split(/\s+/))).filter(w => w.length >= 4 && !COMMON.has(w.toLowerCase())))];
    const qs = [];
    const ph = shuffle(phrases), tu = shuffle(turns);
    for (let i = 0; i < n; i++) {
      const type = ["meaning", "gap", "reply"][i % 3];
      if (type === "meaning") {
        const p = ph.pop() || phrases[i % phrases.length];
        const opts = shuffle([p.vi, ...shuffle(allVi.filter(v => v !== p.vi)).slice(0, 3)]);
        qs.push({ type, audio: p.en, ask: "Câu bạn vừa nghe nghĩa là gì?", opts, ans: p.vi, show: p.en, vi: p.vi });
      } else if (type === "gap") {
        const p = ph.pop() || phrases[i % phrases.length];
        const cands = p.en.replace(/[^A-Za-z' ]/g, " ").split(/\s+/).filter(w => w.length >= 4 && !COMMON.has(w.toLowerCase()));
        const w = cands.length ? cands[Math.floor(Math.random() * cands.length)] : p.en.split(" ")[0];
        const gapText = p.en.replace(new RegExp("\\b" + w.replace(/'/g, "'") + "\\b"), "_____");
        const opts = shuffle([w, ...shuffle(words.filter(x => x.toLowerCase() !== w.toLowerCase())).slice(0, 3)]);
        qs.push({ type, audio: p.en, ask: "Nghe và chọn từ còn thiếu:", gap: gapText, opts, ans: w, show: p.en, vi: p.vi });
      } else {
        const t = tu.pop() || turns[i % turns.length];
        const opts = shuffle([t.you, ...shuffle(allYou.filter(y => y !== t.you)).slice(0, 2)]);
        qs.push({ type, audio: t.them, alt: true, ask: "Người kia nói vậy. Bạn đáp câu nào hợp nhất?", opts, ans: t.you, show: t.them, vi: t.them_vi });
      }
    }
    return qs;
  }
  function listening(onDone) {
    const qs = buildQuiz(10);
    let i = 0, right = 0, fast = false;
    function screen() {
      const q = qs[i];
      shell("Luyện nghe", `
        <div class="count">${i + 1} / ${qs.length}</div>
        <article class="card focus">
          <div class="ask">${esc(q.ask)}</div>
          ${q.gap ? `<div class="en">${esc(q.gap)}</div>` : ""}
          <div class="row center">
            <button class="mic small" id="play" aria-label="Nghe"><span>🔊</span></button>
          </div>
          <div class="row center">
            <button class="pill" id="slow">🐢 Chậm</button>
            <button class="pill ${fast ? "primary" : ""}" id="fast">⚡ Tốc độ thật</button>
          </div>
        </article>
        <div class="opts">${q.opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>
        <div id="fb"></div>
        <div class="row nav"><span></span><button class="pill primary" id="nextq" hidden>${i + 1 < qs.length ? "Câu tiếp →" : "Xem kết quả"}</button></div>`);
      const play = r => Speech.speak(q.audio, { rate: r, alt: q.alt });
      $("play").onclick = () => play(fast ? 1.1 : store.settings.rate);
      $("slow").onclick = () => play(0.6);
      $("fast").onclick = () => { fast = !fast; $("fast").classList.toggle("primary", fast); play(fast ? 1.1 : store.settings.rate); };
      $app.querySelectorAll(".opt").forEach(b => b.onclick = () => {
        if (!$("nextq").hidden) return;
        const ok = q.opts[+b.dataset.k] === q.ans;
        if (ok) right++;
        $app.querySelectorAll(".opt").forEach(x => {
          const c = q.opts[+x.dataset.k] === q.ans;
          x.classList.add(c ? "right" : x === b ? "wrong" : "dim");
        });
        $("fb").innerHTML = `<div class="card result ${ok ? "good" : "bad"}">
          <div class="msg">${ok ? "Chuẩn! 👏" : "Chưa đúng, nghe lại câu này nha 👂"}</div>
          <div class="en">${esc(q.show)}</div><div class="vi">${esc(q.vi)}</div>
          <div class="row"><button class="pill" id="re">▶ Nghe lại</button></div></div>`;
        $("re").onclick = () => play(store.settings.rate);
        $("nextq").hidden = false;
      });
      $("nextq").onclick = () => { i++; i < qs.length ? screen() : result(); };
      setTimeout(() => play(fast ? 1.1 : store.settings.rate), 300);
    }
    function result() {
      store.listen.total += qs.length; store.listen.right += right; markActive(); save();
      onDone && onDone();
      const pct = Math.round(100 * store.listen.right / Math.max(1, store.listen.total));
      shell("Luyện nghe", `
        <section class="hello"><div class="avatar">${TEACHER.avatar}</div>
        <div class="bubble">Đúng <b>${right}/${qs.length}</b> câu! ${right >= 8 ? "Tai bạn thính quá trời 👂✨ Lần sau bật ⚡ Tốc độ thật thử nha." : right >= 5 ? "Ổn rồi! Câu sai nghe lại vài lần là quen tai." : "Không sao, tai cần vài ngày để quen. Bấm 🐢 nghe chậm trước, rồi nghe tốc độ thật."}</div></section>
        <div class="card"><small>Tổng cộng từ trước tới giờ: đúng ${store.listen.right}/${store.listen.total} câu (${pct}%).</small></div>
        <button class="big" id="more">🎧 Thêm 10 câu</button>
        <button class="big primary" id="b">${flowBack ? "Tiếp tục →" : "🏠 Về trang chủ"}</button>`);
      $("more").onclick = () => listening();
      $("b").onclick = back;
    }
    screen();
  }

  // ---------- Nói tự do ----------
  function chunkUsed(chunk, text) {
    const toks = s => s.split(/\s+/).flatMap(w => Speech.normWord(w));
    const c = toks(chunk.replace(/…|\.\.\.|\/.*$/g, " ")).filter(Boolean);
    const t = toks(text);
    if (!c.length) return false;
    const key = c.slice(0, Math.min(3, c.length));
    for (let i = 0; i + key.length <= t.length; i++) if (key.every((w, k) => t[i + k] === w)) return true;
    return false;
  }
  function freeTalk(P, dayNo, onDone) {
    const T = P.talk;
    let ctrl = null;
    const isCheck = dayNo && P.check;
    shell(dayNo ? `Ngày ${dayNo}: Nói tự do` : "Nói tự do", `
      <article class="card focus">
        <div class="ask">🗣 ${esc(T.vi)}</div>
        <div class="vi">${esc(T.en)}</div>
        <p class="small">Nói liên tục khoảng <b>${T.secs} giây</b>. Sai cũng kệ, quan trọng là không dừng. Kẹt thì nói "um… let me think" rồi nói tiếp 😄</p>
      </article>
      <div class="card"><b>Khung câu nên dùng</b>
        ${T.chunks.map((c, k) => `<div class="chunk" id="ch${k}"><button class="pill tiny" data-c="${k}">▶</button> ${esc(c)}</div>`).join("")}
      </div>
      ${isCheck ? '<p class="hint">📼 Hôm nay là ngày mốc: bản thu sẽ được lưu để so với ngày 1.</p>' : ""}
      <div class="timer" id="timer">${T.secs}s</div>
      <button class="mic" id="mic" aria-label="Nói"><span>🎙</span></button>
      <div id="live" class="live long"></div>
      <div id="res"></div>`);
    $app.querySelectorAll("[data-c]").forEach(b => b.onclick = () => Speech.speak(T.chunks[+b.dataset.c].replace(/…/g, ""), { rate: store.settings.rate }));
    $("mic").onclick = async () => {
      if (ctrl) { ctrl.stop(); return; }
      window.speechSynthesis?.cancel();
      $("res").innerHTML = "";
      $("mic").classList.add("rec");
      const live = $("live");
      live.textContent = "Đang nghe… cứ nói thoải mái";
      const t0 = Date.now();
      tick = setInterval(() => { const left = Math.max(0, T.secs - Math.round((Date.now() - t0) / 1000)); $("timer") && ($("timer").textContent = left + "s"); }, 500);
      ctrl = Speech.listen({ record: true, long: true, maxMs: T.secs * 1000, onInterim: x => {
        live.textContent = x;
        T.chunks.forEach((c, k) => { if (chunkUsed(c, x)) $("ch" + k)?.classList.add("used"); });
      } });
      const r = await ctrl.result;
      ctrl = null; clearInterval(tick);
      $("mic").classList.remove("rec");
      const text = r.transcripts[0] || "";
      const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
      const mins = Math.max(0.25, (r.ms || T.secs * 1000) / 60000);
      const wpm = Math.round(words / mins);
      const used = T.chunks.filter(c => chunkUsed(c, text)).length;
      live.textContent = "";
      countSpoken();
      const rec = { words, wpm, used, date: today(), text: text.slice(0, 600) };
      if (dayNo) store.talks[dayNo] = rec; else store.talks.free = rec;
      save();
      if (isCheck && r.audioBlob) await AudioDB.put("day" + dayNo, r.audioBlob);
      const base = store.talks[1];
      const cmp = isCheck && dayNo > 1 && base
        ? `<div class="card compare"><b>So với ngày 1</b>
            <div class="stats"><div><b>${base.words} → ${words}</b><small>số từ</small></div><div><b>${base.wpm} → ${wpm}</b><small>từ/phút</small></div></div>
            <div class="row"><button class="pill" id="day1">▶ Nghe bản ngày 1</button></div></div>` : "";
      $("res").innerHTML = `
        <div class="card result ${words >= T.secs / 2 ? "good" : words >= T.secs / 5 ? "ok" : "meh"}">
          ${Speech.canRecognize ? `<div class="stats"><div><b>${words}</b><small>từ</small></div><div><b>${wpm}</b><small>từ/phút</small></div><div><b>${used}/${T.chunks.length}</b><small>khung câu</small></div></div>
          <div class="heard">${text ? "Máy nghe được: “" + esc(text) + "”" : errorText(r.error) || "Máy chưa nghe được gì – nghe lại bản thu rồi tự đánh giá nha."}</div>` : `<div class="msg">Máy này không chấm được, nghe lại bản thu nha.</div>`}
          <p class="small">${wpm >= 90 ? "Tốc độ ngon rồi! Giờ thử dùng thêm khung câu." : "Người mới nói 50–80 từ/phút là bình thường. Mục tiêu cuối tháng: 90+ và dùng đủ khung câu."}</p>
          <div class="row">${r.audioUrl ? '<button class="pill" id="me">🔁 Nghe lại mình</button>' : ""}<button class="pill" id="again">↺ Nói lại</button></div>
        </div>
        ${cmp}
        <button class="big primary" id="b">${flowBack ? "Tiếp tục →" : "🏠 Về trang chủ"}</button>`;
      if ($("me")) $("me").onclick = () => new Audio(r.audioUrl).play();
      if ($("day1")) $("day1").onclick = async () => { const b = await AudioDB.get("day1"); b ? new Audio(URL.createObjectURL(b)).play() : alert("Không tìm thấy bản thu ngày 1 trên máy này."); };
      $("again").onclick = () => $("mic").click();
      $("b").onclick = () => { onDone && onDone(); back(); };
      if (words > 0 || r.audioUrl) onDone && onDone();
    };
  }

  // ---------- Nói nhanh 3 phút ----------
  function quick() {
    // ưu tiên câu điểm thấp / chưa luyện, trộn ngẫu nhiên, lấy 6 câu
    const pool = [];
    learnedLessons().forEach(L => L.phrases.forEach((p, i) => pool.push({ p: Object.assign({ _key: L.id + ":" + i }, p), w: 100 - (lessonState(L.id).best[i] ?? 0) + Math.random() * 40 })));
    pool.sort((a, b) => b.w - a.w);
    const items = pool.slice(0, 6).map(x => x.p);
    practice(items, {
      title: "Nói nhanh 3 phút", quickMode: true,
      onDone: res => {
        const n = res.filter(x => typeof x === "number").length;
        shell("Nói nhanh 3 phút", `
          <section class="hello"><div class="avatar">${TEACHER.avatar}</div>
          <div class="bubble">Xong ${n} câu rồi! Nói ít mà đều mỗi ngày là lên trình nhanh lắm đó 💪</div></section>
          <button class="big primary" id="again">⚡ Thêm 6 câu nữa</button>
          <button class="big" id="home">🏠 Về trang chủ</button>`);
        $("again").onclick = quick;
        $("home").onclick = () => go("home");
      }
    });
  }

  // ---------- Cài đặt ----------
  function settings() {
    const s = store.settings;
    const env = [
      ["Giọng đọc mẫu (TTS)", Speech.canSpeak],
      ["Nhận diện giọng nói", Speech.canRecognize],
      ["Ghi âm", Speech.canRecord],
      ["Đang mở từ màn hình chính", isStandalone()]
    ].map(([k, v]) => `<li>${v ? "✅" : "⚪"} ${k}</li>`).join("");
    const talks = Object.entries(store.talks).filter(([k]) => k !== "free").sort((a, b) => +a[0] - +b[0]);
    shell("Cài đặt", `
      <div class="card">
        <label class="set">Tốc độ giọng mẫu <b id="rv">${s.rate}</b>
          <input type="range" id="rate" min="0.6" max="1.1" step="0.05" value="${s.rate}"></label>
        <label class="set">Mục tiêu mỗi ngày
          <select id="goal">${[10, 20, 30, 50].map(g => `<option ${g === s.goal ? "selected" : ""}>${g}</option>`).join("")}</select> câu</label>
        <label class="set chk"><input type="checkbox" id="rec" ${s.record ? "checked" : ""}> Ghi âm song song để nghe lại giọng mình</label>
        <label class="set chk"><input type="checkbox" id="hide" ${s.hideAnswer ? "checked" : ""}> Nhập vai: ẩn câu gợi ý (thử thách)</label>
        <button class="pill" id="test">🔊 Thử giọng đọc</button>
      </div>
      ${talks.length ? `<div class="card"><b>Nói tự do qua các ngày</b><ul class="env">${talks.map(([d, t]) => `<li>Ngày ${d}: ${t.words} từ · ${t.wpm} từ/phút · ${t.used} khung câu</li>`).join("")}</ul></div>` : ""}
      <div class="card"><b>Máy của bạn</b><ul class="env">${env}</ul>
        <p class="small">Chấm điểm dựa trên việc máy nghe ra đúng bao nhiêu từ — nói rõ, đủ âm cuối là điểm cao. Đây là chấm "nghe có hiểu không", chưa phải chấm từng âm như giáo viên.</p></div>
      <div class="card"><b>Về app</b><p class="small">Nội dung và nhân vật ${TEACHER.name} là hư cấu, lấy cảm hứng từ phong cách dạy khẩu ngữ song ngữ thân mật. Tiến độ và bản thu chỉ lưu trên điện thoại này.</p>
        <button class="pill ghost" id="reset">Xóa tiến độ</button></div>
    `);
    const rate = $("rate");
    rate.oninput = () => { s.rate = +rate.value; $("rv").textContent = s.rate; save(); };
    $("goal").onchange = e => { s.goal = +e.target.value; save(); };
    $("rec").onchange = e => { s.record = e.target.checked; save(); };
    $("hide").onchange = e => { s.hideAnswer = e.target.checked; save(); };
    $("test").onclick = () => Speech.speak("Hey! Let's grab a coffee sometime.", { rate: s.rate });
    $("reset").onclick = () => {
      if (confirm("Xóa toàn bộ tiến độ học trên máy này?")) { localStorage.removeItem(KEY); store = load(); go("home"); }
    };
  }

  home();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();

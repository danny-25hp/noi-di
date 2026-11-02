// Ứng dụng chính: màn hình Home, Bài học (Học câu → Shadowing → Nhập vai → Xong), Nói nhanh, Cài đặt.
(function () {
  const $app = document.getElementById("app");
  const TEACHER = { name: "cô Mây", avatar: "🌤️" }; // nhân vật hư cấu

  // ---------- Lưu tiến độ (chỉ trên máy) ----------
  const KEY = "esa.v1";
  const today = () => new Date().toISOString().slice(0, 10);
  function load() {
    let s = {};
    try { s = JSON.parse(localStorage.getItem(KEY)) || {}; } catch {}
    s.settings = Object.assign({ record: true, rate: 0.95, goal: 20, hideAnswer: false }, s.settings);
    s.lessons = s.lessons || {};
    s.day = s.day || { date: today(), spoken: 0 };
    s.streak = s.streak || { last: null, days: 0 };
    if (s.day.date !== today()) s.day = { date: today(), spoken: 0 };
    return s;
  }
  let store = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch {} }
  function countSpoken() {
    store.day.spoken++;
    const t = today();
    if (store.streak.last !== t) {
      const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      store.streak.days = store.streak.last === y ? store.streak.days + 1 : 1;
      store.streak.last = t;
    }
    save();
  }
  function lessonState(id) { return (store.lessons[id] = store.lessons[id] || { best: {}, done: false }); }

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const linkedHtml = s => esc(s).replace(/‿/g, '<span class="lk">‿</span>').replace(/·/g, '<span class="br">/</span>');
  const isStandalone = () => window.navigator.standalone || matchMedia("(display-mode: standalone)").matches;

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
  function shell(title, body, { back = true } = {}) {
    $app.innerHTML = `
      <header class="top">
        ${back ? '<button class="icon" data-go="home" aria-label="Về trang chủ">‹</button>' : '<span class="icon"></span>'}
        <h1>${esc(title)}</h1>
        <button class="icon" data-go="settings" aria-label="Cài đặt">⚙︎</button>
      </header>
      <main>${body}</main>`;
    $app.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));
    window.scrollTo(0, 0);
  }
  function go(route, arg) {
    window.speechSynthesis?.cancel();
    if (route === "home") return home();
    if (route === "settings") return settings();
    if (route === "lesson") return lessonIntro(arg);
    if (route === "quick") return quick();
  }

  // ---------- HOME ----------
  function home() {
    const pct = Math.min(100, Math.round(100 * store.day.spoken / store.settings.goal));
    const warn = !Speech.canRecognize
      ? `<div class="warn">Trình duyệt này chưa hỗ trợ nhận diện giọng nói — bạn vẫn luyện được bằng ghi âm rồi tự nghe lại. Trên iPhone hãy dùng Safari.</div>` : "";
    const rows = ROADMAP.map((r, i) => {
      const L = r.id && LESSONS.find(l => l.id === r.id);
      const st = L ? lessonState(L.id) : null;
      return L
        ? `<button class="lesson" data-lesson="${L.id}">
             <span class="em">${L.emoji}</span>
             <span class="lt"><b>${i + 1}. ${esc(L.title)}</b><small>${esc(L.subtitle)}</small></span>
             <span class="tag ${st.done ? "done" : ""}">${st.done ? "✓ Xong" : r.level}</span>
           </button>`
        : `<div class="lesson locked"><span class="em">🔒</span>
             <span class="lt"><b>${i + 1}. ${esc(r.title)}</b><small>Sắp có</small></span>
             <span class="tag">${r.level}</span></div>`;
    }).join("");
    shell("Nói Đi!", `
      ${warn}
      <section class="hello">
        <div class="avatar">${TEACHER.avatar}</div>
        <div class="bubble">Hello! Mình là <b>${TEACHER.name}</b> nè. Hôm nay mình nói <b>${store.settings.goal} câu</b> thôi, mỗi câu vài giây là xong. Lười cũng được, nhưng phải mở miệng nha 😄</div>
      </section>
      <section class="card stats">
        <div><b>${store.day.spoken}</b>/${store.settings.goal}<small>câu đã nói hôm nay</small></div>
        <div><b>🔥 ${store.streak.days}</b><small>ngày liên tiếp</small></div>
      </section>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <button class="big primary" id="quick">⚡ Nói nhanh 3 phút</button>
      <h2>Lộ trình A2 → B1</h2>
      <div class="list">${rows}</div>
      <p class="foot">Nhân vật ${TEACHER.name} là hư cấu. Giọng đọc mẫu là giọng máy của iPhone.</p>
    `, { back: false });
    document.getElementById("quick").onclick = () => go("quick");
    $app.querySelectorAll("[data-lesson]").forEach(b => b.onclick = () => go("lesson", b.dataset.lesson));
  }

  // ---------- BÀI HỌC: bước 1 – Học câu ----------
  function lessonIntro(id) {
    const L = LESSONS.find(l => l.id === id);
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
    document.getElementById("next").onclick = () => practice(L.phrases, {
      title: L.title, lessonId: L.id,
      onDone: results => roleplay(L, results)
    });
  }

  // ---------- Bước 2 – Shadowing (dùng chung cho Nói nhanh) ----------
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
      document.getElementById("play").onclick = () => say(store.settings.rate);
      document.getElementById("slow").onclick = () => say(0.6);
      document.getElementById("mic").onclick = () => attempt();
      document.getElementById("skip").onclick = next;
      document.getElementById("nextp").onclick = next;
      if (autoPlay) say(store.settings.rate);
    }

    async function attempt() {
      const mic = document.getElementById("mic");
      if (ctrl) { ctrl.stop(); return; }
      window.speechSynthesis?.cancel();
      const p = items[idx];
      const live = document.getElementById("live");
      document.getElementById("res").innerHTML = "";
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
        if (lessonId) {
          const st = lessonState(lessonId);
          st.best[idx] = Math.max(st.best[idx] || 0, s);
          save();
        }
      });
      document.getElementById("nextp").hidden = false;
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
    const res = document.getElementById("res");
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
    const me = document.getElementById("me");
    if (me) me.onclick = () => { window.speechSynthesis?.cancel(); new Audio(r.audioUrl).play(); };
    document.getElementById("again").onclick = () => document.getElementById("mic").click();
  }

  // ---------- Bước 3 – Nhập vai ----------
  function roleplay(L, shadowResults) {
    const R = L.roleplay;
    let t = 0;
    const scores = [];
    let ctrl = null;
    const log = [];

    function screen() {
      const turn = R.turns[t];
      const hide = store.settings.hideAnswer;
      const chat = log.map(m => `<div class="msgb ${m.me ? "me" : "them"}"><b>${m.me ? "Bạn" : esc(R.partner)}</b>${esc(m.en)}<small>${esc(m.vi)}</small></div>`).join("");
      shell(L.title, `
        <ol class="steps"><li class="ok">Học câu</li><li class="ok">Nói theo</li><li class="on">Nhập vai</li></ol>
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
      document.getElementById("replay").onclick = say;
      document.getElementById("hear").onclick = () => Speech.speak(turn.you, { rate: store.settings.rate });
      const show = document.getElementById("show");
      if (show) show.onclick = () => document.getElementById("ans").classList.remove("blur");
      document.getElementById("mic").onclick = attempt;
      document.getElementById("skip").onclick = next;
      document.getElementById("nextp").onclick = next;
      say();
    }
    async function attempt() {
      if (ctrl) { ctrl.stop(); return; }
      window.speechSynthesis?.cancel();
      const turn = R.turns[t];
      const mic = document.getElementById("mic"), live = document.getElementById("live");
      document.getElementById("res").innerHTML = "";
      mic.classList.add("rec"); live.textContent = "Đang nghe…";
      ctrl = Speech.listen({ record: store.settings.record, onInterim: x => (live.textContent = x) });
      const r = await ctrl.result;
      ctrl = null; mic.classList.remove("rec"); live.textContent = "";
      countSpoken();
      showResult(turn.accept, r, s => (scores[t] = s));
      document.getElementById("nextp").hidden = false;
    }
    function next() {
      if (ctrl) { ctrl.stop(); ctrl = null; }
      const turn = R.turns[t];
      log.push({ me: false, en: turn.them, vi: turn.them_vi }, { me: true, en: turn.you, vi: turn.you_vi });
      t++;
      if (t < R.turns.length) screen();
      else finish(L, shadowResults, scores);
    }
    screen();
  }

  // ---------- Bước 4 – Xong ----------
  function finish(L, shadow, role) {
    const all = [...shadow, ...role].filter(x => typeof x === "number");
    const avg = all.length ? Math.round(all.reduce((a, b) => a + b, 0) / all.length) : 0;
    const st = lessonState(L.id);
    st.done = true; st.avg = avg; save();
    const weak = L.phrases.filter((p, i) => (shadow[i] ?? 0) < 65);
    shell(L.title, `
      <section class="hello">
        <div class="avatar">${TEACHER.avatar}</div>
        <div class="bubble">Xong bài rồi nè! 🎉 Điểm trung bình <b>${avg}</b>. Hôm nay bạn đã nói <b>${store.day.spoken}</b> câu. ${avg >= 75 ? "Giỏi quá trời!" : "Mai mình nói lại một lượt là nhớ luôn nha."}</div>
      </section>
      ${weak.length ? `<button class="big primary" id="weak">🔁 Luyện lại ${weak.length} câu điểm thấp</button>` : ""}
      <button class="big" id="home">🏠 Về trang chủ</button>
    `);
    const w = document.getElementById("weak");
    if (w) w.onclick = () => practice(weak, { title: "Luyện lại", quickMode: true, onDone: () => go("home") });
    document.getElementById("home").onclick = () => go("home");
  }

  // ---------- Nói nhanh 3 phút ----------
  function quick() {
    // ưu tiên câu điểm thấp / chưa luyện, trộn ngẫu nhiên, lấy 6 câu
    const pool = [];
    LESSONS.forEach(L => L.phrases.forEach((p, i) => pool.push({ p, w: 100 - (lessonState(L.id).best[i] ?? 0) + Math.random() * 40 })));
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
        document.getElementById("again").onclick = quick;
        document.getElementById("home").onclick = () => go("home");
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
      <div class="card"><b>Máy của bạn</b><ul class="env">${env}</ul>
        <p class="small">Chấm điểm dựa trên việc máy nghe ra đúng bao nhiêu từ — nói rõ, đủ âm cuối là điểm cao. Đây là chấm "nghe có hiểu không", chưa phải chấm từng âm như giáo viên.</p></div>
      <div class="card"><b>Về app</b><p class="small">Nội dung và nhân vật ${TEACHER.name} là hư cấu, lấy cảm hứng từ phong cách dạy khẩu ngữ song ngữ thân mật. Tiến độ chỉ lưu trên điện thoại này.</p>
        <button class="pill ghost" id="reset">Xóa tiến độ</button></div>
    `);
    const rate = document.getElementById("rate");
    rate.oninput = () => { s.rate = +rate.value; document.getElementById("rv").textContent = s.rate; save(); };
    document.getElementById("goal").onchange = e => { s.goal = +e.target.value; save(); };
    document.getElementById("rec").onchange = e => { s.record = e.target.checked; save(); };
    document.getElementById("hide").onchange = e => { s.hideAnswer = e.target.checked; save(); };
    document.getElementById("test").onclick = () => Speech.speak("Hey! Let's grab a coffee sometime.", { rate: s.rate });
    document.getElementById("reset").onclick = () => {
      if (confirm("Xóa toàn bộ tiến độ học trên máy này?")) { localStorage.removeItem(KEY); store = load(); go("home"); }
    };
  }

  home();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();

// Giọng đọc mẫu (TTS), nhận diện giọng nói (STT), ghi âm và chấm điểm.
(function () {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  // ---------- TTS ----------
  let voices = [];
  function loadVoices() { voices = speechSynthesis.getVoices() || []; }
  if ("speechSynthesis" in window) {
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }
  const PREFERRED = ["Samantha", "Ava", "Allison", "Susan", "Nicky", "Aaron", "Alex", "Google US English"];
  function pickVoice(alt) {
    const en = voices.filter(v => /^en[-_]US/i.test(v.lang));
    const pool = en.length ? en : voices.filter(v => /^en/i.test(v.lang));
    if (!pool.length) return null;
    const ranked = [...pool].sort((a, b) => rank(a) - rank(b));
    // alt = giọng thứ hai cho nhân vật hội thoại
    return alt && ranked.length > 1 ? ranked[1] : ranked[0];
  }
  function rank(v) {
    const i = PREFERRED.findIndex(n => v.name.includes(n));
    return i === -1 ? 99 : i;
  }
  function speak(text, { rate = 0.95, alt = false } = {}) {
    return new Promise(resolve => {
      if (!("speechSynthesis" in window)) return resolve();
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      const v = pickVoice(alt);
      if (v) u.voice = v;
      u.rate = rate;
      u.pitch = alt ? 1.1 : 1;
      let done = false;
      const finish = () => { if (!done) { done = true; resolve(); } };
      u.onend = finish; u.onerror = finish;
      // phòng khi iOS không bắn onend
      setTimeout(finish, 1500 + text.length * 140 / rate);
      speechSynthesis.speak(u);
    });
  }

  // ---------- Ghi âm ----------
  async function startRecorder() {
    if (!navigator.mediaDevices || !window.MediaRecorder) return null;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const type = ["audio/mp4", "audio/webm;codecs=opus", "audio/webm"].find(t => MediaRecorder.isTypeSupported?.(t));
    const rec = new MediaRecorder(stream, type ? { mimeType: type } : undefined);
    const chunks = [];
    rec.ondataavailable = e => e.data && e.data.size && chunks.push(e.data);
    rec.start();
    return {
      stop: () => new Promise(resolve => {
        rec.onstop = () => {
          stream.getTracks().forEach(t => t.stop());
          resolve(chunks.length ? URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || type || "audio/mp4" })) : null);
        };
        try { rec.stop(); } catch { stream.getTracks().forEach(t => t.stop()); resolve(null); }
      })
    };
  }

  // ---------- Nhận diện + ghi âm cùng lúc ----------
  // Trả về controller { stop(), result: Promise<{transcripts, audioUrl, error}> }
  function listen({ record = true, onInterim } = {}) {
    let recog = null, recorder = null, stopped = false;
    let resolveOuter;
    const result = new Promise(r => (resolveOuter = r));
    const transcripts = [];
    let error = null;

    async function finish() {
      if (stopped) return; stopped = true;
      try { recog && recog.stop(); } catch {}
      const audioUrl = recorder ? await recorder.stop().catch(() => null) : null;
      resolveOuter({ transcripts, audioUrl, error });
    }

    (async () => {
      if (record) {
        try { recorder = await startRecorder(); }
        catch (e) { error = e.name === "NotAllowedError" ? "mic-denied" : "rec-failed"; }
      }
      if (SR) {
        recog = new SR();
        recog.lang = "en-US";
        recog.interimResults = true;
        recog.maxAlternatives = 3;
        recog.continuous = false;
        recog.onresult = e => {
          const last = e.results[e.results.length - 1];
          const full = Array.from(e.results).map(r => r[0].transcript).join(" ");
          onInterim && onInterim(full);
          if (last.isFinal) {
            transcripts.length = 0;
            for (let i = 0; i < last.length; i++) {
              const prefix = Array.from(e.results).slice(0, -1).map(r => r[0].transcript).join(" ");
              transcripts.push((prefix + " " + last[i].transcript).trim());
            }
          } else {
            transcripts.length = 0; transcripts.push(full);
          }
        };
        recog.onerror = e => { if (e.error !== "no-speech" && e.error !== "aborted") error = e.error; };
        recog.onend = () => finish();
        try { recog.start(); } catch (e) { error = "sr-start"; }
      }
      // An toàn: tự dừng sau 12 giây
      setTimeout(finish, 12000);
    })();

    return { stop: finish, result };
  }

  // ---------- Chấm điểm ----------
  const CONTRACTIONS = {
    "i'm": "i am", "you're": "you are", "we're": "we are", "they're": "they are", "he's": "he is",
    "she's": "she is", "it's": "it is", "that's": "that is", "what's": "what is", "how's": "how is",
    "there's": "there is", "let's": "let us", "i've": "i have", "you've": "you have", "we've": "we have",
    "i'll": "i will", "you'll": "you will", "we'll": "we will", "i'd": "i would", "don't": "do not",
    "doesn't": "does not", "didn't": "did not", "can't": "cannot", "won't": "will not", "isn't": "is not",
    "aren't": "are not", "wasn't": "was not", "couldn't": "could not", "wouldn't": "would not",
    "kinda": "kind of", "gonna": "going to", "wanna": "want to", "gotta": "got to", "yep": "yeah", "yes": "yeah",
    "ok": "okay", "can not": "cannot"
  };
  const NUM = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];
  function normWord(w) {
    w = w.toLowerCase().replace(/[’‘`]/g, "'").replace(/[^a-z0-9']/g, "");
    if (/^\d+$/.test(w) && NUM[+w]) w = NUM[+w];
    const c = CONTRACTIONS[w];
    return (c || w.replace(/'/g, "")).split(" ").filter(Boolean);
  }
  function tokenize(text) {
    // giữ chỉ số từ gốc để tô màu
    const orig = text.split(/\s+/).filter(Boolean);
    const flat = [];
    orig.forEach((w, i) => normWord(w).forEach(n => flat.push({ n, i })));
    return { orig, flat };
  }
  function lev(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
    return d[a.length][b.length];
  }
  function sim(a, b) {
    if (a === b) return 1;
    if (Math.min(a.length, b.length) >= 3 && Math.max(a.length, b.length) >= 4 && lev(a, b) <= 1) return 0.7;
    return 0;
  }
  // Căn hàng từ (giống LCS có trọng số) giữa câu mẫu và câu máy nghe được
  function scoreOne(target, heard) {
    const T = tokenize(target).flat, H0 = tokenize(heard).flat;
    // gộp "some time" → "sometime" nếu câu mẫu có từ ghép đó
    const tset = new Set(T.map(t => t.n)), H = [];
    for (let k = 0; k < H0.length; k++) {
      const joined = k + 1 < H0.length ? H0[k].n + H0[k + 1].n : null;
      if (joined && tset.has(joined) && !tset.has(H0[k].n)) { H.push({ n: joined }); k++; }
      else H.push(H0[k]);
    }
    const m = T.length, n = H.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++)
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1], dp[i-1][j-1] + sim(T[i-1].n, H[j-1].n));
    const status = new Array(m).fill(0);
    let i = m, j = n;
    while (i > 0 && j > 0) {
      const s = sim(T[i-1].n, H[j-1].n);
      if (s > 0 && Math.abs(dp[i][j] - (dp[i-1][j-1] + s)) < 1e-9) { status[i-1] = s; i--; j--; }
      else if (dp[i-1][j] >= dp[i][j-1]) i--;
      else j--;
    }
    const matched = dp[m][n];
    const extra = Math.max(0, n - m);
    const score = m ? Math.max(0, Math.round(100 * (matched - extra * 0.25) / m)) : 0;
    return { score: Math.min(100, score), status, T };
  }
  function score(target, transcripts) {
    let best = null;
    for (const h of transcripts) {
      const r = scoreOne(target, h);
      if (!best || r.score > best.score) best = { ...r, heard: h };
    }
    if (!best) best = { ...scoreOne(target, ""), heard: "" };
    // gộp trạng thái về từ gốc
    const { orig } = tokenize(target);
    const words = orig.map(w => ({ w, s: 1 }));
    best.T.forEach((t, k) => { words[t.i].s = Math.min(words[t.i].s, best.status[k]); });
    return { score: best.score, heard: best.heard, words };
  }

  window.Speech = {
    canRecognize: !!SR,
    canRecord: !!(navigator.mediaDevices && window.MediaRecorder),
    canSpeak: "speechSynthesis" in window,
    speak, listen, score
  };
})();

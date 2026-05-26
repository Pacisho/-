/* ============================================
   CHINESE QUEST - game.js
   Quiz page logic — redirects to result.html
   ============================================ */

// ─────────────────────────────────────────────
// 1. QUESTION BANK
// ─────────────────────────────────────────────
const QUESTIONS = [
  { chinese: "你好",    pinyin: "nǐ hǎo",          question: "คำนี้หมายความว่าอะไร?",      answer: "สวัสดี",             options: ["สวัสดี","ขอบคุณ","ลาก่อน","ยินดีที่รู้จัก"],    category: "คำทักทาย 👋" },
  { chinese: "早上好",  pinyin: "zǎo shang hǎo",   question: "วลีนี้ใช้ทักทายช่วงไหน?",    answer: "สวัสดีตอนเช้า",      options: ["สวัสดีตอนเช้า","สวัสดีตอนเย็น","ราตรีสวัสดิ์","สวัสดีตอนบ่าย"], category: "คำทักทาย 👋" },
  { chinese: "再见",    pinyin: "zài jiàn",         question: "คำนี้หมายความว่าอะไร?",      answer: "ลาก่อน",             options: ["พบกันใหม่","ลาก่อน","โชคดี","ดูแลตัวเองด้วย"],  category: "คำทักทาย 👋" },
  { chinese: "你叫什么名字？", pinyin: "nǐ jiào shén me míng zì?", question: "ประโยคนี้ถามเรื่องอะไร?", answer: "ถามชื่อ", options: ["ถามอายุ","ถามชื่อ","ถามที่อยู่","ถามอาชีพ"], category: "คำทักทาย 👋" },
  { chinese: "谢谢",    pinyin: "xiè xiè",          question: "คำนี้หมายความว่าอะไร?",      answer: "ขอบคุณ",             options: ["ขอโทษ","ขอบคุณ","สวัสดี","ไม่เป็นไร"],           category: "มารยาท 🙏" },
  { chinese: "对不起",  pinyin: "duì bu qǐ",        question: "คำนี้หมายความว่าอะไร?",      answer: "ขอโทษ",              options: ["ขอบคุณ","ยินดีต้อนรับ","ขอโทษ","ไม่เป็นไร"],    category: "มารยาท 🙏" },
  { chinese: "没关系",  pinyin: "méi guān xi",      question: "คำนี้ตอบสนองต่อสิ่งใด?",    answer: "ไม่เป็นไร",           options: ["ขอบคุณ","ไม่เป็นไร","ยินดี","โอเค"],             category: "มารยาท 🙏" },
  { chinese: "三",      pinyin: "sān",              question: "ตัวเลขนี้คืออะไร?",          answer: "สาม (3)",            options: ["สอง (2)","สาม (3)","สี่ (4)","ห้า (5)"],         category: "ตัวเลข 🔢" },
  { chinese: "十",      pinyin: "shí",              question: "ตัวเลขนี้คืออะไร?",          answer: "สิบ (10)",           options: ["แปด (8)","เก้า (9)","สิบ (10)","สิบเอ็ด (11)"], category: "ตัวเลข 🔢" },
  { chinese: "百",      pinyin: "bǎi",              question: "ตัวเลขนี้คืออะไร?",          answer: "ร้อย (100)",         options: ["สิบ (10)","ร้อย (100)","พัน (1000)","หมื่น (10000)"], category: "ตัวเลข 🔢" },
  { chinese: "红色",    pinyin: "hóng sè",          question: "คำนี้หมายถึงสีอะไร?",        answer: "สีแดง",              options: ["สีน้ำเงิน","สีเขียว","สีแดง","สีเหลือง"],        category: "สี 🎨" },
  { chinese: "黄色",    pinyin: "huáng sè",         question: "คำนี้หมายถึงสีอะไร?",        answer: "สีเหลือง",           options: ["สีส้ม","สีเหลือง","สีทอง","สีน้ำตาล"],           category: "สี 🎨" },
  { chinese: "蓝色",    pinyin: "lán sè",           question: "คำนี้หมายถึงสีอะไร?",        answer: "สีน้ำเงิน",          options: ["สีม่วง","สีฟ้า","สีน้ำเงิน","สีเทา"],            category: "สี 🎨" },
  { chinese: "猫",      pinyin: "māo",              question: "คำนี้หมายความว่าอะไร?",      answer: "แมว",                options: ["หมา","แมว","กระต่าย","ปลา"],                     category: "สัตว์ 🐾" },
  { chinese: "狗",      pinyin: "gǒu",              question: "คำนี้หมายความว่าอะไร?",      answer: "สุนัข",              options: ["แมว","กระต่าย","สุนัข","นก"],                    category: "สัตว์ 🐾" },
  { chinese: "鱼",      pinyin: "yú",               question: "คำนี้หมายความว่าอะไร?",      answer: "ปลา",                options: ["กุ้ง","ปู","หอย","ปลา"],                         category: "สัตว์ 🐾" },
  { chinese: "吃饭",    pinyin: "chī fàn",          question: "วลีนี้หมายความว่าอะไร?",     answer: "กินข้าว",            options: ["ดื่มน้ำ","กินข้าว","ทำอาหาร","ซื้อของ"],        category: "ชีวิตประจำวัน 🍜" },
  { chinese: "喝水",    pinyin: "hē shuǐ",          question: "วลีนี้หมายความว่าอะไร?",     answer: "ดื่มน้ำ",            options: ["กินข้าว","ดื่มน้ำ","ซื้อน้ำ","ล้างมือ"],         category: "ชีวิตประจำวัน 🍜" },
  { chinese: "睡觉",    pinyin: "shuì jiào",        question: "วลีนี้หมายความว่าอะไร?",     answer: "นอนหลับ",            options: ["ตื่นนอน","นอนหลับ","พักผ่อน","นั่งเล่น"],       category: "ชีวิตประจำวัน 🍜" },
  { chinese: "买东西",  pinyin: "mǎi dōng xi",     question: "วลีนี้หมายความว่าอะไร?",     answer: "ซื้อของ",            options: ["ขายของ","ดูของ","ซื้อของ","หาของ"],              category: "ชีวิตประจำวัน 🍜" },
  { chinese: "爱",      pinyin: "ài",               question: "คำนี้หมายความว่าอะไร?",      answer: "รัก",                options: ["เกลียด","กลัว","รัก","เศร้า"],                   category: "ความรู้สึก ❤️" },
  { chinese: "高兴",    pinyin: "gāo xìng",         question: "คำนี้หมายความว่าอะไร?",      answer: "ดีใจ / มีความสุข",  options: ["เศร้า","โกรธ","ดีใจ / มีความสุข","กังวล"],      category: "ความรู้สึก ❤️" },
  { chinese: "太好了",  pinyin: "tài hǎo le",       question: "วลีนี้แสดงความรู้สึกอะไร?",  answer: "ยอดเยี่ยมมาก!",     options: ["ไม่ดีเลย","พอใช้ได้","ยอดเยี่ยมมาก!","โอเคนะ"], category: "ความรู้สึก ❤️" },
  { chinese: "美丽",    pinyin: "měi lì",           question: "คำนี้หมายความว่าอะไร?",      answer: "สวยงาม",             options: ["แข็งแกร่ง","ฉลาด","สวยงาม","เร็ว"],              category: "คุณศัพท์ ✨" },
  { chinese: "聪明",    pinyin: "cōng míng",        question: "คำนี้หมายความว่าอะไร?",      answer: "ฉลาด",               options: ["สวย","ฉลาด","แข็งแรง","ใจดี"],                   category: "คุณศัพท์ ✨" },
  { chinese: "大",      pinyin: "dà",               question: "คำนี้หมายความว่าอะไร?",      answer: "ใหญ่",               options: ["เล็ก","ใหญ่","สูง","ต่ำ"],                       category: "คุณศัพท์ ✨" },
  { chinese: "中国",    pinyin: "Zhōng guó",        question: "คำนี้หมายถึงประเทศอะไร?",   answer: "จีน",                options: ["ญี่ปุ่น","เกาหลี","จีน","ไทย"],                  category: "ประเทศ 🌏" },
  { chinese: "朋友",    pinyin: "péng yǒu",         question: "คำนี้หมายความว่าอะไร?",      answer: "เพื่อน",             options: ["ครอบครัว","เพื่อน","ครู","เด็ก"],                 category: "ความสัมพันธ์ 👫" },
  { chinese: "老师",    pinyin: "lǎo shī",          question: "คำนี้หมายความว่าอะไร?",      answer: "ครู / อาจารย์",     options: ["นักเรียน","ผู้ปกครอง","ครู / อาจารย์","เพื่อน"],  category: "ความสัมพันธ์ 👫" },
];

// ─────────────────────────────────────────────
// 2. GAME STATE
// ─────────────────────────────────────────────
let state = {
  questions:    [],
  currentIndex: 0,
  score:        0,
  lives:        3,
  streak:       0,
  maxStreak:    0,
  correct:      0,
  wrong:        0,
  timer:        null,
  timeLeft:     15,
  answered:     false,
};

const TOTAL_QUESTIONS = 20;
const TIME_PER_Q      = 15;

// ─────────────────────────────────────────────
// 3. AUDIO
// ─────────────────────────────────────────────
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playTone(freq, type, duration, gain = 0.35) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (_) {}
}
function sfxCorrect() {
  playTone(523, 'sine', 0.12);
  setTimeout(() => playTone(659, 'sine', 0.12), 90);
  setTimeout(() => playTone(784, 'sine', 0.22), 180);
}
function sfxWrong() {
  playTone(200, 'sawtooth', 0.08, 0.28);
  setTimeout(() => playTone(160, 'sawtooth', 0.14, 0.28), 85);
}
function sfxTick() { playTone(1100, 'square', 0.04, 0.08); }

// ─────────────────────────────────────────────
// 4. TEXT-TO-SPEECH
// ─────────────────────────────────────────────
const TTS = {
  supported:   typeof window !== 'undefined' && 'speechSynthesis' in window,
  voiceReady:  false,
  zhVoice:     null,
  fallbackLang:'zh-CN',

  init() {
    if (!this.supported) return;
    const probe = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      this._pickVoice(voices);
      this.voiceReady = true;
    };
    probe();
    window.speechSynthesis.onvoiceschanged = probe;
  },

  _pickVoice(voices) {
    const preferred = [
      v => /zh[-_](TW|HK|SG)/i.test(v.lang),
      v => /zh[-_]CN/i.test(v.lang),
      v => /^zh/i.test(v.lang),
    ];
    for (const test of preferred) {
      const match = voices.find(test);
      if (match) { this.zhVoice = match; return; }
    }
    this.zhVoice = voices.find(v => /chinese/i.test(v.name)) || null;
  },

  speak(text, onStart, onEnd, onError) {
    if (!this.supported) { onError?.('not_supported'); return; }
    window.speechSynthesis.cancel();
    const utt  = new SpeechSynthesisUtterance(text);
    utt.lang   = this.zhVoice?.lang ?? this.fallbackLang;
    utt.rate   = 0.82;
    utt.pitch  = 1.05;
    utt.volume = 1;
    if (this.zhVoice) utt.voice = this.zhVoice;
    utt.onstart = () => onStart?.();
    utt.onend   = () => onEnd?.();
    utt.onerror = (e) => {
      if (e.error === 'interrupted') { onEnd?.(); return; }
      onError?.(e.error);
    };
    window.speechSynthesis.speak(utt);
  },

  stop() {
    if (this.supported) window.speechSynthesis.cancel();
  }
};

TTS.init();

function setTTSState(s) {
  const btn    = document.getElementById('speak-btn');
  const icon   = document.getElementById('speak-icon');
  const status = document.getElementById('tts-status');
  if (!btn) return;
  btn.classList.remove('speaking');
  status.className = 'tts-status';
  switch (s) {
    case 'speaking':
      btn.classList.add('speaking');
      icon.textContent   = '🔊';
      status.textContent = '⏳ กำลังอ่านออกเสียง...';
      status.classList.add('busy');
      break;
    case 'done':
      icon.textContent   = '🔊';
      status.textContent = '✅ เล่นเสร็จแล้ว';
      status.classList.add('ok');
      setTimeout(() => {
        if (status.textContent === '✅ เล่นเสร็จแล้ว') status.textContent = '';
      }, 2000);
      break;
    case 'error':
      icon.textContent   = '❌';
      status.textContent = '⚠️ ไม่รองรับเสียงภาษาจีน';
      status.classList.add('err');
      break;
    case 'unsupported':
      icon.textContent   = '🔇';
      status.textContent = '⚠️ Browser ไม่รองรับ TTS';
      status.classList.add('err');
      btn.disabled = true;
      break;
    default:
      icon.textContent   = '🔊';
      status.textContent = '';
  }
}

function speakChinese(text) {
  const chinese = text || document.getElementById('q-chinese')?.textContent || '';
  if (!chinese) return;
  if (!TTS.supported) { setTTSState('unsupported'); return; }
  setTTSState('speaking');
  TTS.speak(
    chinese,
    () => setTTSState('speaking'),
    () => setTTSState('done'),
    (err) => { console.warn('TTS error:', err); setTTSState('error'); }
  );
}

// ─────────────────────────────────────────────
// 5. DARK MODE
// ─────────────────────────────────────────────
(function () {
  if (localStorage.getItem('cq-dark') === '1') {
    document.body.classList.add('dark');
  }
})();

// ─────────────────────────────────────────────
// 6. QUIZ LOGIC
// ─────────────────────────────────────────────
function initQuiz() {
  stopTimer();
  const shuffled     = [...QUESTIONS].sort(() => Math.random() - 0.5);
  state.questions    = shuffled.slice(0, TOTAL_QUESTIONS);
  state.currentIndex = 0;
  state.score        = 0;
  state.lives        = 3;
  state.streak       = 0;
  state.maxStreak    = 0;
  state.correct      = 0;
  state.wrong        = 0;
  state.answered     = false;
  renderQuestion();
}

function renderQuestion() {
  const q = state.questions[state.currentIndex];
  if (!q) { showResult(); return; }
  state.answered = false;

  document.getElementById('score-val').textContent = state.score;
  updateLives();
  updateProgress();

  const chiEl = document.getElementById('q-chinese');
  chiEl.style.animation = 'none';
  chiEl.offsetHeight;
  chiEl.style.animation = '';

  document.getElementById('q-category').textContent = q.category;
  document.getElementById('q-chinese').textContent  = q.chinese;
  document.getElementById('q-pinyin').textContent   = q.pinyin;
  document.getElementById('q-text').textContent     = q.question;

  setTTSState('idle');
  setTimeout(() => speakChinese(q.chinese), 420);

  const opts    = [...q.options].sort(() => Math.random() - 0.5);
  const grid    = document.getElementById('options-grid');
  const letters = ['A', 'B', 'C', 'D'];
  grid.innerHTML = '';
  opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span class="option-text">${opt}</span>`;
    btn.onclick = () => handleAnswer(opt, btn);
    btn.style.animationDelay = (i * 0.07) + 's';
    grid.appendChild(btn);
  });

  updateStreakDisplay();
  startTimer();
}

function handleAnswer(chosen, btn) {
  if (state.answered) return;
  state.answered = true;
  stopTimer();

  const correct = state.questions[state.currentIndex].answer;
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);

  if (chosen === correct) {
    btn.classList.add('correct');
    const bonus = state.streak * 10;
    state.score += 100 + bonus;
    state.correct++;
    state.streak++;
    state.maxStreak = Math.max(state.maxStreak, state.streak);
    document.getElementById('score-val').textContent = state.score;
    const bonusText = bonus > 0 ? ` (+${bonus} streak)` : '';
    showFeedback('✅ ถูกต้อง! +' + (100 + bonus) + bonusText);
    sfxCorrect();
  } else {
    btn.classList.add('wrong');
    state.wrong++;
    state.streak = 0;
    state.lives  = Math.max(0, state.lives - 1);
    updateLives();
    showFeedback('❌ ผิด! คำตอบที่ถูก: ' + correct);
    sfxWrong();
    allBtns.forEach(b => {
      if (b.querySelector('.option-text')?.textContent === correct) b.classList.add('correct');
    });
  }

  updateStreakDisplay();
  nextOrEnd();
}

function nextOrEnd() {
  const delay = state.lives === 0 ? 1200 : 1600;
  setTimeout(() => {
    if (state.lives === 0) { showResult(); return; }
    state.currentIndex++;
    if (state.currentIndex >= state.questions.length) { showResult(); return; }
    renderQuestion();
  }, delay);
}

// ─── Timer ───
function startTimer() {
  state.timeLeft = TIME_PER_Q;
  updateTimerDisplay();
  state.timer = setInterval(() => {
    state.timeLeft--;
    updateTimerDisplay();
    if (state.timeLeft <= 5 && state.timeLeft > 0) sfxTick();
    if (state.timeLeft <= 0) {
      stopTimer();
      if (!state.answered) {
        state.answered = true;
        state.wrong++;
        state.streak = 0;
        state.lives  = Math.max(0, state.lives - 1);
        updateLives(); updateStreakDisplay();
        showFeedback('⏰ หมดเวลา!');
        sfxWrong();
        const allBtns = document.querySelectorAll('.option-btn');
        allBtns.forEach(b => {
          b.disabled = true;
          if (b.querySelector('.option-text')?.textContent === state.questions[state.currentIndex].answer)
            b.classList.add('correct');
        });
        nextOrEnd();
      }
    }
  }, 1000);
}
function stopTimer() { clearInterval(state.timer); }

function updateTimerDisplay() {
  const el   = document.getElementById('timer-val');
  const wrap = document.getElementById('timer-wrap');
  el.textContent = state.timeLeft;
  wrap.classList.remove('warn', 'crit');
  if (state.timeLeft <= 5)      wrap.classList.add('crit');
  else if (state.timeLeft <= 8) wrap.classList.add('warn');
}

function updateLives() {
  let d = '';
  for (let i = 0; i < 3; i++) d += i < state.lives ? '❤️' : '🖤';
  document.getElementById('lives-display').textContent = d;
}

function updateProgress() {
  const pct = (state.currentIndex / TOTAL_QUESTIONS) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent =
    (state.currentIndex + 1) + ' / ' + TOTAL_QUESTIONS;
}

function updateStreakDisplay() {
  const el = document.getElementById('streak-display');
  if (state.streak >= 3) {
    const fires = '🔥'.repeat(Math.min(state.streak, 6));
    el.innerHTML = `<span class="streak-badge">${fires} ${state.streak} Streak!</span>`;
  } else {
    el.innerHTML = '';
  }
}

// ─────────────────────────────────────────────
// 7. FEEDBACK OVERLAY
// ─────────────────────────────────────────────
function showFeedback(text) {
  const overlay = document.getElementById('feedback-overlay');
  const content = document.getElementById('feedback-content');
  overlay.classList.remove('hidden');
  content.textContent = text;
  content.style.animation = 'none';
  content.offsetHeight;
  content.style.animation = '';
  setTimeout(() => overlay.classList.add('hidden'), 800);
}

// ─────────────────────────────────────────────
// 8. SHOW RESULT — บันทึกข้อมูลแล้ว redirect ไป result.html
// ─────────────────────────────────────────────
function showResult() {
  stopTimer();
  TTS.stop();

  // บันทึกผลลัพธ์ลง sessionStorage เพื่อส่งไปหน้า result.html
  sessionStorage.setItem('cq-result', JSON.stringify({
    score:     state.score,
    correct:   state.correct,
    wrong:     state.wrong,
    maxStreak: state.maxStreak,
  }));

  window.location.href = 'result.html';
}

// ─────────────────────────────────────────────
// 9. INIT
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
});

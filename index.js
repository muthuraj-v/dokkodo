const precepts = [
  {
    jp: "世の中をあるがままに受け入れよ",
    en: "Accept everything just as it is.",
    kanji: "一",
    explain:
      "Don't fight reality or wish things were different. Meet each situation as it actually is, not as you'd prefer it to be.",
  },
  {
    jp: "楽しみのためだけに生きるな",
    en: "Do not seek pleasure for its own sake.",
    kanji: "二",
    explain:
      "Don't chase comfort or amusement as a goal in itself. Enjoy things as they come, but don't build your life around seeking them.",
  },
  {
    jp: "一時の感情に頼るな",
    en: "Do not, under any circumstance, rely on a passing feeling.",
    kanji: "三",
    explain:
      "Don't let a mood or momentary emotion decide your actions. Feelings shift quickly — base decisions on something steadier.",
  },
  {
    jp: "己を軽んじ、世を重んじよ",
    en: "Think little of yourself; think deeply of the world.",
    kanji: "四",
    explain:
      "Keep your ego small and your attention on the bigger picture — the people and world around you matter more than your own pride.",
  },
  {
    jp: "生涯、欲に囚われるな",
    en: "Remain free of longing for your whole life.",
    kanji: "五",
    explain:
      "Don't let craving — for things, status, or outcomes — take hold of you. Practice this as a lifelong discipline, not a phase.",
  },
  {
    jp: "己の行いを悔いるな",
    en: "Do not regret what you have already done.",
    kanji: "六",
    explain:
      "Once a choice is made, let it go. Dwelling in regret wastes energy that should go toward what's in front of you now.",
  },
  {
    jp: "他人の幸不幸を妬むな",
    en: "Never envy another's fortune, good or ill.",
    kanji: "七",
    explain:
      "Don't measure yourself against others' luck, success, or misfortune. Their path isn't yours to compare against.",
  },
  {
    jp: "いかなる別れも嘆くな",
    en: "Do not grieve over any parting.",
    kanji: "八",
    explain:
      "All partings — through distance, change, or death — are part of life. Face them with steadiness rather than prolonged sorrow.",
  },
  {
    jp: "己にも人にも恨み言を持つな",
    en: "Hold no resentment, toward yourself or others.",
    kanji: "九",
    explain:
      "Don't carry grudges, whether directed outward at others or inward at yourself. Resentment just weighs you down.",
  },
  {
    jp: "恋慕の情に迷うな",
    en: "Do not let love or longing steer your path.",
    kanji: "十",
    explain:
      "Romantic attachment can cloud judgment. Don't let infatuation become the compass that decides your direction in life.",
  },
  {
    jp: "何事にも執着するな",
    en: "Have no fixed attachment in any matter.",
    kanji: "十一",
    explain:
      "Hold your opinions, habits, and preferences loosely. Rigid attachment to any one way of doing things limits you.",
  },
  {
    jp: "己の住処に興味を持つな",
    en: "Be indifferent to where you happen to live.",
    kanji: "十二",
    explain:
      "Don't get attached to comfort or status tied to your home or surroundings. Be equally at ease anywhere.",
  },
  {
    jp: "美食を求めるな",
    en: "Do not chase after fine flavors.",
    kanji: "十三",
    explain:
      "Eat to live, not for indulgence. Don't let the pursuit of rich food become something you organize your life around.",
  },
  {
    jp: "不要の財を蓄えるな",
    en: "Keep no possessions beyond what you need.",
    kanji: "十四",
    explain:
      "Don't hoard belongings or wealth beyond practical use. Excess possessions become a burden, not a benefit.",
  },
  {
    jp: "世の習わしのみに従うな",
    en: "Do not act on custom or superstition alone.",
    kanji: "十五",
    explain:
      "Don't do something just because 'that's how it's always done.' Question tradition and superstition rather than following blindly.",
  },
  {
    jp: "用の外に武具を集めるな",
    en: "Gather no weapons beyond their true use.",
    kanji: "十六",
    explain:
      "Don't collect tools or weapons as trophies or for show. Keep only what genuinely serves a practical purpose.",
  },
  {
    jp: "死を恐れるな",
    en: "Do not fear death.",
    kanji: "十七",
    explain:
      "Make peace with mortality so fear of it never dictates your choices. A warrior who fears death fights differently than one who doesn't.",
  },
  {
    jp: "老後のために財を望むな",
    en: "Seek no wealth or land for the sake of old age.",
    kanji: "十八",
    explain:
      "Don't spend your life accumulating security for a future that may never come. Live fully now instead of only preparing for later.",
  },
  {
    jp: "仏神を敬い、頼みとせず",
    en: "Revere the gods and Buddha, but do not depend on them.",
    kanji: "十九",
    explain:
      "Respect faith and the sacred, but don't lean on it to solve your problems for you. The responsibility to act stays with you.",
  },
  {
    jp: "身を捨てても名を惜しめ",
    en: "You may abandon your body, but never your honor.",
    kanji: "二十",
    explain:
      "Physical survival is not the highest value — your integrity and reputation for honesty and honor matter more than staying safe.",
  },
  {
    jp: "独行の道を離れるな",
    en: "Never stray from the path you walk alone.",
    kanji: "廿一",
    explain:
      "Once you've committed to your own way of living, stay true to it — even when no one is walking beside you.",
  },
];

let idx = 0;
let autoplay = true;
let timer = null;
const DURATION = 9000;
let startedAt = 0;
let speaking = false;

const $ = (id) => document.getElementById(id);
const contentEl = $("content");
const jpText = $("jpText");
const enText = $("enText");
const explainText = $("explainText");
const countTag = $("countTag");
const kanjiWatermark = $("kanjiWatermark");
const sealEl = $("seal");
const progressFill = $("progressFill");
const rail = $("rail");
const playBtn = $("playBtn");
const speakBtn = $("speakBtn");

function buildRail() {
  if (!rail) return;
  rail.innerHTML = "";
  precepts.forEach((_, i) => {
    const t = document.createElement("div");
    t.className = "tick" + (i === idx ? " active" : "");
    t.addEventListener("click", () => goTo(i));
    rail.appendChild(t);
  });
}

function render() {
  const p = precepts[idx];
  if (contentEl) {
    contentEl.classList.remove("fade-in");
    void contentEl.offsetWidth;
  }
  if (countTag)
    countTag.textContent =
      String(idx + 1).padStart(2, "0") + " 　 " + "廿一 (21) 条";
  if (jpText) jpText.textContent = p.jp;
  if (enText) enText.textContent = p.en;
  if (explainText) explainText.textContent = p.explain;
  if (kanjiWatermark) kanjiWatermark.textContent = p.kanji;
  if (contentEl) contentEl.classList.add("fade-in");

  if (sealEl) {
    sealEl.classList.remove("stamp");
    void sealEl.offsetWidth;
    sealEl.textContent = p.kanji;
    sealEl.classList.add("stamp");
  }

  if (rail) {
    [...rail.children].forEach((t, i) =>
      t.classList.toggle("active", i === idx),
    );
  }

  if (speaking) speakCurrent();
}

function goTo(i) {
  stopSpeech();
  idx = (i + precepts.length) % precepts.length;
  render();
  resetTimer();
}
function next() {
  goTo(idx + 1);
}
function prev() {
  goTo(idx - 1);
}

// advances to the next precept once read-aloud finishes, without cancelling the read-aloud mode itself
function advanceFromSpeechEnd() {
  idx = (idx + 1) % precepts.length;
  render();
  resetTimer();
}

function tickProgress() {
  if (!progressFill) return;
  const elapsed = Date.now() - startedAt;
  const pct = Math.min(100, (elapsed / DURATION) * 100);
  progressFill.style.width = pct + "%";
  if (pct >= 100 && autoplay) {
    next();
  }
}

function resetTimer() {
  clearInterval(timer);
  if (progressFill) progressFill.style.width = "0%";
  startedAt = Date.now();
  if (autoplay && !speaking) {
    timer = setInterval(tickProgress, 60);
  }
}

function toggleAutoplay() {
  autoplay = !autoplay;
  if (playBtn) playBtn.textContent = autoplay ? "❚❚" : "▶";
  if (autoplay) {
    resetTimer();
  } else {
    clearInterval(timer);
  }
}

function pauseForInteraction() {
  autoplay = false;
  if (playBtn) playBtn.textContent = "▶";
  clearInterval(timer);
}

// --- read aloud: speaks jp line, then english line, then explanation ---
function speakCurrent() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const p = precepts[idx];
  const uJp = new SpeechSynthesisUtterance(p.jp);
  uJp.lang = "ja-JP";
  uJp.rate = 0.85;
  const uEn = new SpeechSynthesisUtterance(p.en);
  uEn.lang = "en-US";
  uEn.rate = 0.95;
  const uEx = new SpeechSynthesisUtterance(p.explain);
  uEx.lang = "en-US";
  uEx.rate = 0.98;
  uEx.onend = () => {
    if (autoplay) {
      advanceFromSpeechEnd();
    } else {
      speaking = false;
      if (speakBtn) speakBtn.classList.remove("active");
    }
  };
  window.speechSynthesis.speak(uJp);
  window.speechSynthesis.speak(uEn);
  window.speechSynthesis.speak(uEx);
}

function stopSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  speaking = false;
  if (speakBtn) speakBtn.classList.remove("active");
}

function toggleSpeech() {
  if (speaking) {
    stopSpeech();
  } else {
    speaking = true;
    if (speakBtn) speakBtn.classList.add("active");
    clearInterval(timer);
    if (progressFill) progressFill.style.width = "0%";
    speakCurrent();
  }
}

if (playBtn) playBtn.addEventListener("click", toggleAutoplay);
if (speakBtn) speakBtn.addEventListener("click", toggleSpeech);

const zoneLeft = $("zoneLeft");
const zoneRight = $("zoneRight");
if (zoneLeft)
  zoneLeft.addEventListener("click", () => {
    pauseForInteraction();
    prev();
  });
if (zoneRight)
  zoneRight.addEventListener("click", () => {
    pauseForInteraction();
    next();
  });

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    pauseForInteraction();
    next();
  }
  if (e.key === "ArrowLeft") {
    pauseForInteraction();
    prev();
  }
  if (e.key === " ") {
    e.preventDefault();
    toggleAutoplay();
  }
});

let touchX = null;
document.addEventListener("touchstart", (e) => {
  touchX = e.touches[0].clientX;
});
document.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) {
    pauseForInteraction();
    dx < 0 ? next() : prev();
  }
  touchX = null;
});

buildRail();
render();
resetTimer();

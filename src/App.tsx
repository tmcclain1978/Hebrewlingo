// ─────────────────────────────────────────────
// MAIN APP — HebrewLingo (Hebrew · Greek · Aramaic)
// ─────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import {
  lessonsFor,
  unitsFor,
  shuffle,
  type Language,
  type Exercise,
  type Feedback,
  type Progress,
} from "./lib/data";
import { stopSpeech } from "./lib/speech";
import { TopBar, Tabs, LearnTab, LeagueTab, ShopTab, ProfileTab } from "./components/tabs";
import { LangSelectScreen, LessonScreen, CompleteScreen, GameoverScreen } from "./components/screens";

type Screen = "langselect" | "home" | "lesson" | "complete" | "gameover";

export default function App() {
  const [screen, setScreen] = useState<Screen>("langselect");
  const [language, setLanguage] = useState<Language | null>(null);
  const [tab, setTab] = useState("learn");
  const [xp, setXp] = useState(0);
  const [streak] = useState(3);
  const [hearts, setHearts] = useState(5);
  const [gems, setGems] = useState(50);
  const [level, setLevel] = useState(1);
  const [dailyXP, setDailyXP] = useState(0);
  const [doubleXP, setDoubleXP] = useState(false);
  const [freezeOwned, setFreezeOwned] = useState(false);
  const [progress, setProgress] = useState<Progress>({});

  // Lesson state
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [mc, setMc] = useState<string | null>(null);
  const [tapSel, setTapSel] = useState<string | null>(null);
  const [fillSel, setFillSel] = useState<string | null>(null);
  const [wordAnswer, setWordAnswer] = useState<string[]>([]);
  const [matchLeft, setMatchLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[][]>([]);
  const [matchError, setMatchError] = useState(false);
  const [shuffledRight, setShuffledRight] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [sessionXP, setSessionXP] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [soundOn, setSoundOn] = useState<boolean>(() => {
    try {
      return localStorage.getItem("hl_sound") !== "off";
    } catch {
      return true;
    }
  });

  const toggleSound = () =>
    setSoundOn((p) => {
      const n = !p;
      try {
        localStorage.setItem("hl_sound", n ? "on" : "off");
      } catch {
        /* ignore */
      }
      if (!n) stopSpeech();
      return n;
    });

  const ALL_LESSONS = language ? lessonsFor(language) : [];
  const lesson = ALL_LESSONS.find((l) => l.id === activeLessonId);
  const unit = lesson && language ? unitsFor(language).find((u) => u.id === lesson.uid) : null;
  const exercise = lesson?.exercises[exerciseIndex];

  const initExercise = useCallback((ex?: Exercise) => {
    if (ex?.type === "match") {
      setShuffledRight(shuffle(ex.pairs.map((p) => p[1])));
      setMatchLeft(null);
      setMatched([]);
      setMatchError(false);
    }
    setMc(null);
    setTapSel(null);
    setFillSel(null);
    setWordAnswer([]);
    setFeedback(null);
  }, []);

  useEffect(() => {
    if (exercise) initExercise(exercise);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseIndex, activeLessonId]);

  const calcGain = useCallback(
    (currentCombo: number) => {
      let g = 10;
      if (currentCombo >= 4) g = 20;
      else if (currentCombo >= 2) g = 15;
      return doubleXP ? g * 2 : g;
    },
    [doubleXP]
  );

  const doFeedback = useCallback(
    (ok: boolean) => {
      if (ok) {
        const newCombo = combo + 1;
        setCombo(newCombo);
        const gain = calcGain(newCombo);
        setFeedback("ok");
        setSessionXP((p) => p + gain);
        setXp((p) => {
          const nx = p + gain;
          setLevel(Math.floor(nx / 100) + 1);
          return nx;
        });
        setDailyXP((p) => p + gain);
      } else {
        setCombo(0);
        setFeedback("no");
        setMistakes((p) => p + 1);
        setHearts((p) => {
          const nh = Math.max(0, p - 1);
          if (nh === 0) setTimeout(() => setScreen("gameover"), 1100);
          return nh;
        });
      }
    },
    [combo, calcGain]
  );

  const startLesson = (id: string) => {
    setActiveLessonId(id);
    setExerciseIndex(0);
    setSessionXP(0);
    setMistakes(0);
    setCombo(0);
    setDoubleXP(false);
    const first = ALL_LESSONS.find((l) => l.id === id)?.exercises[0];
    if (first) initExercise(first);
    setScreen("lesson");
  };

  const handleCheck = () => {
    if (!exercise || feedback) return;
    let ok = false;
    if (exercise.type === "mc") ok = mc === exercise.ans;
    else if (exercise.type === "tap") ok = tapSel === exercise.ans;
    else if (exercise.type === "fill") ok = fillSel === exercise.ans;
    else if (exercise.type === "wordBank") ok = wordAnswer.join(" ") === exercise.ans.join(" ");
    doFeedback(ok);
  };

  const handleTF = (choice: boolean) => {
    if (!exercise || feedback) return;
    if (exercise.type === "tf") doFeedback(choice === exercise.ans);
  };

  const handleNext = () => {
    const total = lesson?.exercises.length || 0;
    if (exerciseIndex + 1 >= total) {
      if (activeLessonId) {
        setProgress((p) => ({ ...p, [activeLessonId]: Math.min(5, (p[activeLessonId] || 0) + 1) }));
      }
      setGems((p) => p + 5);
      if (mistakes === 0) {
        setXp((p) => p + 20);
        setDailyXP((p) => p + 20);
        setSessionXP((p) => p + 20);
      }
      setScreen("complete");
    } else {
      const next = lesson?.exercises[exerciseIndex + 1];
      setExerciseIndex((p) => p + 1);
      initExercise(next);
    }
  };

  const handleMatchL = (v: string) => {
    if (matched.some((m) => m[0] === v) || feedback) return;
    setMatchLeft(v);
    setMatchError(false);
  };

  const handleMatchR = (v: string) => {
    if (matched.some((m) => m[1] === v) || !matchLeft || feedback) return;
    if (!exercise || exercise.type !== "match") return;
    const pair = exercise.pairs.find((p) => p[0] === matchLeft);
    if (pair && pair[1] === v) {
      const newMatched = [...matched, [matchLeft, v]];
      setMatched(newMatched);
      setMatchLeft(null);
      setMatchError(false);
      if (newMatched.length === exercise.pairs.length) {
        setTimeout(() => doFeedback(true), 250);
      }
    } else {
      setMatchError(true);
      setMistakes((p) => p + 1);
      setHearts((p) => Math.max(0, p - 1));
      setTimeout(() => {
        setMatchError(false);
        setMatchLeft(null);
      }, 600);
    }
  };

  const handleWordSel = (w: string) => {
    if (!feedback) setWordAnswer((p) => [...p, w]);
  };
  const handleWordDesel = (w: string) => {
    if (feedback) return;
    setWordAnswer((p) => {
      const a = [...p];
      const i = a.lastIndexOf(w);
      if (i !== -1) a.splice(i, 1);
      return a;
    });
  };

  const buyItem = (item: string) => {
    if (item === "hearts" && gems >= 20 && hearts < 5) {
      setGems((p) => p - 20);
      setHearts(5);
    } else if (item === "freeze" && gems >= 50 && !freezeOwned) {
      setGems((p) => p - 50);
      setFreezeOwned(true);
    } else if (item === "double" && gems >= 30 && !doubleXP) {
      setGems((p) => p - 30);
      setDoubleXP(true);
    }
  };

  const goHome = () => {
    stopSpeech();
    setScreen("home");
    setHearts((p) => Math.max(p, 1));
  };
  const retry = () => {
    setHearts(5);
    if (activeLessonId) startLesson(activeLessonId);
  };
  const handleLangSelect = (id: Language) => {
    setLanguage(id);
    setScreen("home");
  };

  // ─── RENDER ───
  return (
    <div className="font-sans w-full min-h-screen bg-white flex flex-col">
      {screen === "langselect" && <LangSelectScreen onSelect={handleLangSelect} />}

      {screen !== "langselect" && language && (
        <div className="max-w-[640px] w-full mx-auto flex-1 flex flex-col">
          {screen === "home" && (
            <>
              <TopBar
                xp={xp}
                streak={streak}
                hearts={hearts}
                gems={gems}
                doubleXP={doubleXP}
                level={level}
                language={language}
                onChangeLang={() => setScreen("langselect")}
              />
              <Tabs active={tab} onChange={setTab} />
              {tab === "learn" && <LearnTab units={unitsFor(language)} progress={progress} dailyXP={dailyXP} onStart={startLesson} />}
              {tab === "leaderboard" && <LeagueTab myXP={xp} />}
              {tab === "shop" && <ShopTab gems={gems} hearts={hearts} doubleXP={doubleXP} freezeOwned={freezeOwned} onBuy={buyItem} />}
              {tab === "profile" && <ProfileTab xp={xp} level={level} streak={streak} gems={gems} hearts={hearts} progress={progress} />}
            </>
          )}
          {screen === "lesson" && lesson && unit && (
            <LessonScreen
              lesson={lesson}
              unit={unit}
              exerciseIndex={exerciseIndex}
              language={language}
              soundOn={soundOn}
              onToggleSound={toggleSound}
              state={{ mc, tapSel, fillSel, wordAnswer, matchLeft, matched, matchError, shuffledRight, feedback, hearts, combo }}
              handlers={{
                onMC: setMc,
                onTap: setTapSel,
                onFill: setFillSel,
                onTF: handleTF,
                onWordSel: handleWordSel,
                onWordDesel: handleWordDesel,
                onMatchL: handleMatchL,
                onMatchR: handleMatchR,
                onCheck: handleCheck,
                onNext: handleNext,
                onHome: goHome,
              }}
            />
          )}
          {screen === "complete" && lesson && (
            <CompleteScreen lesson={lesson} sessionXP={sessionXP} mistakes={mistakes} streak={streak} onHome={goHome} />
          )}
          {screen === "gameover" && <GameoverScreen onRetry={retry} onHome={goHome} />}
        </div>
      )}
    </div>
  );
}

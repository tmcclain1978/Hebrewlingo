// ─────────────────────────────────────────────
// SCREENS
// ─────────────────────────────────────────────
import { useEffect } from "react";
import { CV, COURSES, starsFor, type Language, type Unit, type Lesson, type Feedback } from "../lib/data";
import { promptAudioFor, answerAudioFor, speakWord, extractTarget } from "../lib/speech";
import {
  SpeakerButton,
  MCExercise,
  TapExercise,
  FillExercise,
  TFExercise,
  WordBankExercise,
  MatchExercise,
  FeedbackBar,
  CheckButton,
} from "./exercises";

interface LangOption {
  id: Language;
  flag: string;
  name: string;
  native: string;
  learners: string;
  color: string;
  lt: string;
}

export function LangSelectScreen({ onSelect }: { onSelect: (id: Language) => void }) {
  const langs: LangOption[] = [
    { id: "hebrew", flag: "🇮🇱", name: "Hebrew", native: "עִבְרִית", learners: "9M learners", color: "#1565C0", lt: "#E3F2FD" },
    { id: "greek", flag: "🇬🇷", name: "Greek", native: "Ἑλληνική", learners: "Koine & Biblical", color: "#2E7D32", lt: "#E8F5E9" },
    { id: "aramaic", flag: "📜", name: "Aramaic", native: "אַרְמִית", learners: "Talmud & Bible", color: "#0F766E", lt: "#CCFBF1" },
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-white bg-gradient-to-br from-indigo-950 to-indigo-900">
      <div className="text-[56px] mb-3">✦</div>
      <h1 className="text-[28px] font-bold m-0 mb-2">HebrewLingo</h1>
      <p className="text-sm opacity-70 mb-10 text-center">Choose a language to start learning</p>
      <div className="flex flex-col gap-[14px] w-full max-w-[380px]">
        {langs.map((l) => (
          <button
            key={l.id}
            onClick={() => onSelect(l.id)}
            className="bg-white rounded-2xl px-5 py-[18px] flex items-center gap-4 cursor-pointer text-left transition-transform shadow-[0_4px_20px_rgba(0,0,0,.2)] hover:scale-[1.02]"
          >
            <span className="text-[42px]">{l.flag}</span>
            <div className="flex-1">
              <div className="text-[17px] font-bold text-gray-900">{l.name}</div>
              <div className="text-[13px] text-gray-500 mt-[2px]">
                {l.native} · {l.learners}
              </div>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
              style={{ background: l.lt, color: l.color }}
            >
              →
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs opacity-50 mt-8">More languages coming soon</p>
    </div>
  );
}

interface LessonState {
  mc: string | null;
  tapSel: string | null;
  fillSel: string | null;
  wordAnswer: string[];
  matchLeft: string | null;
  matched: string[][];
  matchError: boolean;
  shuffledRight: string[];
  feedback: Feedback;
  hearts: number;
  combo: number;
}

interface LessonHandlers {
  onMC: (v: string) => void;
  onTap: (v: string) => void;
  onFill: (v: string) => void;
  onTF: (v: boolean) => void;
  onWordSel: (v: string) => void;
  onWordDesel: (v: string) => void;
  onMatchL: (v: string) => void;
  onMatchR: (v: string) => void;
  onCheck: () => void;
  onNext: () => void;
  onHome: () => void;
}

export function LessonScreen({
  lesson,
  unit,
  exerciseIndex,
  state,
  handlers,
  language,
  soundOn,
  onToggleSound,
}: {
  lesson: Lesson;
  unit: Unit;
  exerciseIndex: number;
  state: LessonState;
  handlers: LessonHandlers;
  language: Language;
  soundOn: boolean;
  onToggleSound: () => void;
}) {
  const { mc, tapSel, fillSel, wordAnswer, matchLeft, matched, matchError, shuffledRight, feedback, hearts, combo } = state;
  const { onMC, onTap, onFill, onTF, onWordSel, onWordDesel, onMatchL, onMatchR, onCheck, onNext, onHome } = handlers;
  const exercise = lesson.exercises[exerciseIndex];

  // Auto-play the target word when a new exercise appears
  useEffect(() => {
    if (!soundOn) return;
    const txt = promptAudioFor(exercise, language);
    if (!txt) return;
    const t = setTimeout(() => speakWord(txt, language), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseIndex, lesson.id, soundOn]);

  // For fill-the-blank: speak the completed sentence once it's answered
  useEffect(() => {
    if (!soundOn || !feedback || exercise?.type !== "fill") return;
    const txt = answerAudioFor(exercise, language);
    if (!txt) return;
    const t = setTimeout(() => speakWord(txt, language), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedback, soundOn]);

  // Tap-to-hear: speak target-language tiles as the user selects them
  const sayThen = (fn: (v: string) => void) => (v: string) => {
    if (soundOn) {
      const h = extractTarget(v, language);
      if (h) speakWord(h, language);
    }
    fn(v);
  };
  const tapWithAudio = sayThen(onTap);
  const fillWithAudio = sayThen(onFill);
  const wordSelWithAudio = sayThen(onWordSel);
  const matchLWithAudio = sayThen(onMatchL);

  const total = lesson.exercises.length;
  const pct = (exerciseIndex / total) * 100;
  const c = CV[unit.cv];
  const comboLabel = combo >= 4 ? "🔥 4x XP!" : combo >= 2 ? `🔥 ${combo}x combo` : "";
  const typeLabels: Record<string, string> = {
    mc: "multiple choice",
    tap: "tap the image",
    fill: "fill the blank",
    tf: "true or false",
    wordBank: "arrange words",
    match: "match pairs",
  };

  const canCheck = () => {
    if (exercise.type === "mc") return !!mc;
    if (exercise.type === "tap") return !!tapSel;
    if (exercise.type === "fill") return !!fillSel;
    if (exercise.type === "wordBank") return wordAnswer.length > 0;
    return false;
  };

  const showCheckBtn = !feedback && exercise.type !== "match" && exercise.type !== "tf";
  const showFeedback = !!feedback && exercise.type !== "match" && exercise.type !== "tf";

  return (
    <div className="flex flex-col min-h-[560px]">
      {/* Header */}
      <div className="flex items-center gap-[10px] px-[14px] py-[10px] bg-white border-b-[0.5px] border-gray-200">
        <button onClick={onHome} className="text-lg p-1 text-gray-500 bg-transparent cursor-pointer">
          ✕
        </button>
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-[width] duration-[400ms]" style={{ background: c.btn, width: `${pct}%` }} />
        </div>
        {comboLabel && (
          <span className="text-[11px] font-semibold px-2 py-[3px] rounded-full bg-amber-100 text-amber-800">{comboLabel}</span>
        )}
        <button
          onClick={onToggleSound}
          title={soundOn ? "Mute audio" : "Unmute audio"}
          className="text-base p-1 bg-transparent cursor-pointer"
          style={{ opacity: soundOn ? 1 : 0.4 }}
        >
          {soundOn ? "🔊" : "🔇"}
        </button>
        <div className="flex gap-[2px] text-[13px]">
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ opacity: i < hearts ? 1 : 0.2 }}>
              ❤️
            </span>
          ))}
        </div>
      </div>

      {/* Exercise */}
      <div className="px-[14px] py-4 flex-1">
        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-[6px]">{typeLabels[exercise.type]}</div>
        <div className="text-[15px] font-semibold mb-[10px] leading-normal">{exercise.prompt}</div>

        <SpeakerButton
          text={feedback ? answerAudioFor(exercise, language) : promptAudioFor(exercise, language)}
          language={language}
          soundOn={soundOn}
        />

        {exercise.type === "mc" && <MCExercise exercise={exercise} selected={mc} feedback={feedback} onSelect={onMC} />}
        {exercise.type === "tap" && <TapExercise exercise={exercise} selected={tapSel} feedback={feedback} onSelect={tapWithAudio} />}
        {exercise.type === "fill" && <FillExercise exercise={exercise} selected={fillSel} feedback={feedback} onSelect={fillWithAudio} />}
        {exercise.type === "tf" && <TFExercise exercise={exercise} feedback={feedback} onAnswer={onTF} />}
        {exercise.type === "wordBank" && (
          <WordBankExercise exercise={exercise} wordAnswer={wordAnswer} feedback={feedback} onSelect={wordSelWithAudio} onDeselect={onWordDesel} />
        )}
        {exercise.type === "match" && (
          <MatchExercise
            exercise={exercise}
            shuffledRight={shuffledRight}
            matchLeft={matchLeft}
            matched={matched}
            matchError={matchError}
            feedback={feedback}
            onLeft={matchLWithAudio}
            onRight={onMatchR}
            onNext={onNext}
            cvBtn={c.btn}
            wordName={COURSES[language]?.wordName || "Hebrew"}
          />
        )}

        {exercise.type === "tf" && feedback && <FeedbackBar feedback={feedback} exercise={exercise} onNext={onNext} />}
        {exercise.type === "fill" && feedback && <FeedbackBar feedback={feedback} exercise={exercise} onNext={onNext} />}
      </div>

      {showFeedback && exercise.type !== "fill" && (
        <FeedbackBar feedback={feedback} exercise={exercise} onNext={onNext} />
      )}
      {showCheckBtn && <CheckButton canCheck={canCheck()} onCheck={onCheck} cvBtn={c.btn} />}
    </div>
  );
}

export function CompleteScreen({
  lesson,
  sessionXP,
  mistakes,
  streak,
  onHome,
}: {
  lesson: Lesson;
  sessionXP: number;
  mistakes: number;
  streak: number;
  onHome: () => void;
}) {
  const stars = starsFor(mistakes);
  const total = lesson.exercises.length;
  const acc = Math.round(((total - mistakes) / Math.max(total, 1)) * 100);
  return (
    <div className="min-h-[560px] bg-indigo-950 flex flex-col items-center justify-center p-7 text-center text-white">
      <div className="flex gap-[10px] justify-center mb-[14px] text-[38px]">
        {[...Array(3)].map((_, i) => (
          <span key={i} style={{ opacity: i < stars ? 1 : 0.2 }}>
            {i < stars ? "⭐" : "☆"}
          </span>
        ))}
      </div>
      <div className="text-[23px] font-semibold mb-1">Lesson Complete!</div>
      <div className="text-xs opacity-70 mb-5">
        {lesson.title} · {stars === 3 ? "Perfect!" : stars === 2 ? "Great!" : "Keep practicing!"}
      </div>
      {mistakes === 0 && (
        <div className="bg-yellow-500/[.18] border border-yellow-500/40 rounded-lg px-4 py-2 mb-4 text-[13px] font-semibold text-amber-200">
          ⭐ Perfect Score! +20 Bonus XP
        </div>
      )}
      <div className="grid grid-cols-3 gap-3 w-full max-w-[300px] bg-white/10 rounded-xl p-4 mb-4">
        {([["⚡", `+${sessionXP}`, "XP Earned"], ["🎯", `${acc}%`, "Accuracy"], ["💎", "+5", "Gems"]] as [string, string, string][]).map(
          ([ic, v, lb]) => (
            <div key={lb}>
              <div className="text-2xl">{ic}</div>
              <div className="text-[17px] font-semibold mt-[2px]">{v}</div>
              <div className="text-[10px] opacity-60">{lb}</div>
            </div>
          )
        )}
      </div>
      <div className="bg-orange-600/[.18] border border-orange-600/40 rounded-lg px-4 py-[10px] mb-5 flex items-center gap-[10px]">
        <span className="text-[22px]">🔥</span>
        <div className="text-left">
          <div className="font-semibold text-[13px]">{streak} Day Streak!</div>
          <div className="text-[11px] opacity-70">Keep it up!</div>
        </div>
      </div>
      <button onClick={onHome} className="max-w-[300px] w-full p-[13px] rounded-xl bg-white text-indigo-950 text-sm font-semibold">
        Continue Learning
      </button>
    </div>
  );
}

export function GameoverScreen({ onRetry, onHome }: { onRetry: () => void; onHome: () => void }) {
  return (
    <div className="min-h-[560px] bg-red-950 flex flex-col items-center justify-center p-7 text-center text-white">
      <div className="text-[56px] mb-3">💔</div>
      <div className="text-[22px] font-semibold mb-2">Out of Hearts!</div>
      <div className="text-[13px] opacity-70 mb-7">Don't give up — try again or buy hearts in the shop</div>
      <div className="flex flex-col gap-[10px] w-full max-w-[280px]">
        <button
          onClick={onRetry}
          className="p-[13px] rounded-xl bg-white/15 text-white border-[1.5px] border-white/30 text-sm font-semibold"
        >
          🔄 Try Again
        </button>
        <button onClick={onHome} className="p-[13px] rounded-xl bg-white text-red-950 text-sm font-semibold">
          Go Home
        </button>
      </div>
    </div>
  );
}

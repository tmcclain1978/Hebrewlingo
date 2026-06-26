// ─────────────────────────────────────────────
// EXERCISE COMPONENTS
// ─────────────────────────────────────────────
import { speakWord } from "../lib/speech";
import type {
  Language,
  Feedback,
  Exercise,
  MCExerciseData,
  TapExerciseData,
  FillExerciseData,
  TFExerciseData,
  WordBankExerciseData,
  MatchExerciseData,
} from "../lib/data";

export function SpeakerButton({ text, language, soundOn }: { text: string; language: Language; soundOn: boolean }) {
  if (!text || !soundOn) return null;
  const cls =
    "border-[1.5px] border-indigo-200 bg-indigo-50 text-indigo-600 rounded-full font-semibold cursor-pointer text-[17px] px-[14px] py-[7px]";
  return (
    <div className="flex gap-2 justify-center mb-3">
      <button onClick={() => speakWord(text, language)} className={cls} title="Hear it">
        🔊
      </button>
      <button onClick={() => speakWord(text, language, true)} className={cls} title="Hear it slowly">
        🐢
      </button>
    </div>
  );
}

export function ExImg({ img, heb }: { img: string; heb: boolean }) {
  return (
    <div
      className={`border-[0.5px] border-gray-200 rounded-xl p-4 text-center my-[6px] mb-[14px] leading-tight bg-gray-50 ${
        heb ? "text-[66px]" : "text-[58px]"
      }`}
      style={{ direction: heb ? "rtl" : "ltr", fontFamily: heb ? "Arial,sans-serif" : "inherit" }}
    >
      {img}
    </div>
  );
}

export function MCExercise({
  exercise,
  selected,
  feedback,
  onSelect,
}: {
  exercise: MCExerciseData;
  selected: string | null;
  feedback: Feedback;
  onSelect: (v: string) => void;
}) {
  return (
    <>
      <ExImg img={exercise.img} heb={exercise.heb} />
      <div className="grid grid-cols-2 gap-2">
        {exercise.opts.map((o) => {
          let variant = "bg-white border-gray-300 text-gray-900";
          if (feedback) {
            if (o === exercise.ans) variant = "bg-green-50 border-green-600 text-green-700";
            else if (o === selected) variant = "bg-red-50 border-red-500 text-red-600";
          } else if (o === selected) {
            variant = "bg-indigo-50 border-indigo-600 text-indigo-600";
          }
          return (
            <button
              key={o}
              onClick={() => !feedback && onSelect(o)}
              className={`border-[1.5px] rounded-lg px-2 py-3 text-[13px] font-semibold text-center leading-snug ${variant} ${
                feedback ? "cursor-default" : "cursor-pointer"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </>
  );
}

export function TapExercise({
  exercise,
  selected,
  feedback,
  onSelect,
}: {
  exercise: TapExerciseData;
  selected: string | null;
  feedback: Feedback;
  onSelect: (v: string) => void;
}) {
  return (
    <>
      <div
        className="bg-gray-50 border-[0.5px] border-gray-200 rounded-xl p-[14px] text-center text-xl font-semibold my-[6px] mb-[14px] leading-relaxed"
        style={{ direction: "rtl", fontFamily: "Arial,sans-serif" }}
      >
        {exercise.word}
      </div>
      <div className="grid grid-cols-2 gap-[10px] mt-1">
        {exercise.imgs.map((img, i) => {
          let variant = "border-gray-300 bg-white";
          if (feedback) {
            if (img === exercise.ans) variant = "border-green-600 bg-green-50";
            else if (img === selected) variant = "border-red-500 bg-red-50";
          } else if (img === selected) {
            variant = "border-indigo-600 bg-indigo-50";
          }
          return (
            <button
              key={img}
              onClick={() => !feedback && onSelect(img)}
              className={`border-2 rounded-xl px-2 py-[14px] text-[42px] text-center flex flex-col items-center gap-[5px] ${variant} ${
                feedback ? "cursor-default" : "cursor-pointer"
              }`}
            >
              {img}
              <span className="text-[10px] text-gray-500 font-semibold">{exercise.lbels[i]}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export function FillExercise({
  exercise,
  selected,
  feedback,
  onSelect,
}: {
  exercise: FillExerciseData;
  selected: string | null;
  feedback: Feedback;
  onSelect: (v: string) => void;
}) {
  const gap = selected ? (
    <span className="text-indigo-600 font-bold">{selected}</span>
  ) : (
    <span className="min-w-[60px] inline-block border-b-[2.5px] border-indigo-600 text-transparent">___</span>
  );
  return (
    <>
      <div
        className="bg-gray-50 border-[0.5px] border-gray-200 rounded-xl p-4 text-center my-[6px] mb-[10px] text-xl leading-loose"
        style={{ direction: "rtl", fontFamily: "Arial,sans-serif" }}
      >
        {exercise.before} {gap} {exercise.after}
      </div>
      <div className="text-xs text-gray-500 text-center mb-[14px] italic">{exercise.eng}</div>
      <div className="grid grid-cols-3 gap-2">
        {exercise.opts.map((o) => {
          let variant = "bg-white border-gray-300 text-gray-900";
          if (feedback) {
            if (o === exercise.ans) variant = "bg-green-50 border-green-600 text-green-700";
            else if (o === selected) variant = "bg-red-50 border-red-500 text-red-600";
          } else if (o === selected) {
            variant = "bg-indigo-50 border-indigo-600 text-indigo-600";
          }
          return (
            <button
              key={o}
              onClick={() => !feedback && onSelect(o)}
              className={`border-[1.5px] rounded-lg px-[6px] py-[11px] text-sm font-semibold text-center ${variant} ${
                feedback ? "cursor-default" : "cursor-pointer"
              }`}
              style={{ direction: "rtl", fontFamily: "Arial,sans-serif" }}
            >
              {o}
            </button>
          );
        })}
      </div>
    </>
  );
}

export function TFExercise({
  exercise,
  feedback,
  onAnswer,
}: {
  exercise: TFExerciseData;
  feedback: Feedback;
  onAnswer: (v: boolean) => void;
}) {
  const trueOk = !!feedback && exercise.ans === true;
  const trueNo = !!feedback && exercise.ans !== true;
  const falseOk = !!feedback && exercise.ans === false;
  const falseNo = !!feedback && exercise.ans !== false;
  const tfCls = (isOk: boolean, isNo: boolean) =>
    `border-2 rounded-xl p-4 text-sm font-semibold text-center ${
      isOk ? "border-green-600 bg-green-50 text-green-700" : isNo ? "border-red-500 bg-red-50 text-red-600" : "border-gray-300 bg-white text-gray-900"
    } ${feedback ? "cursor-default" : "cursor-pointer"}`;
  return (
    <>
      <div className="bg-gray-50 border-[0.5px] border-gray-200 rounded-xl px-[18px] py-[22px] text-center my-[6px] mb-[18px] text-[17px] font-semibold leading-relaxed">
        🤔 {exercise.stmt}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button className={tfCls(trueOk, trueNo)} onClick={() => !feedback && onAnswer(true)}>
          ✓ TRUE
        </button>
        <button className={tfCls(falseOk, falseNo)} onClick={() => !feedback && onAnswer(false)}>
          ✗ FALSE
        </button>
      </div>
    </>
  );
}

export function WordBankExercise({
  exercise,
  wordAnswer,
  feedback,
  onSelect,
  onDeselect,
}: {
  exercise: WordBankExerciseData;
  wordAnswer: string[];
  feedback: Feedback;
  onSelect: (v: string) => void;
  onDeselect: (v: string) => void;
}) {
  const getRem = () => {
    const b = [...exercise.wb];
    wordAnswer.forEach((w) => {
      const i = b.indexOf(w);
      if (i !== -1) b.splice(i, 1);
    });
    return b;
  };
  const tileCls = (variant: "ans" | "ok" | "no" | "default") => {
    const base = "border-[1.5px] rounded-lg px-[10px] py-[6px] text-[13px] font-semibold cursor-pointer";
    if (variant === "ans") return `${base} border-indigo-600 text-indigo-600 bg-indigo-50`;
    if (variant === "ok") return `${base} border-green-600 text-green-700 bg-green-50`;
    if (variant === "no") return `${base} border-red-500 text-red-600 bg-red-50`;
    return `${base} border-gray-300 text-gray-900 bg-white`;
  };
  const rtl = { direction: "rtl" as const, fontFamily: "Arial,sans-serif" };
  return (
    <>
      <ExImg img={exercise.img} heb={false} />
      <div className="min-h-[46px] bg-gray-50 border-[1.5px] border-dashed border-gray-300 rounded-lg px-[11px] py-[9px] flex flex-wrap gap-[6px] mb-[11px] items-start">
        {wordAnswer.length === 0 && <span className="text-gray-400 text-xs self-center">Tap words below to build your answer...</span>}
        {wordAnswer.map((w, i) => (
          <button
            key={`${w}-${i}`}
            onClick={() => !feedback && onDeselect(w)}
            className={tileCls(feedback === "ok" ? "ok" : feedback === "no" ? "no" : "ans")}
            style={rtl}
          >
            {w}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-[7px]">
        {getRem().map((w, i) => (
          <button key={`${w}-${i}`} onClick={() => !feedback && onSelect(w)} className={tileCls("default")} style={rtl}>
            {w}
          </button>
        ))}
      </div>
    </>
  );
}

export function MatchExercise({
  exercise,
  shuffledRight,
  matchLeft,
  matched,
  matchError,
  feedback,
  onLeft,
  onRight,
  onNext,
  cvBtn,
  wordName = "Hebrew",
}: {
  exercise: MatchExerciseData;
  shuffledRight: string[];
  matchLeft: string | null;
  matched: string[][];
  matchError: boolean;
  feedback: Feedback;
  onLeft: (v: string) => void;
  onRight: (v: string) => void;
  onNext: () => void;
  cvBtn: string;
  wordName?: string;
}) {
  const lefts = exercise.pairs.map((p) => p[0]);
  const mCls = (variant: "mat" | "lsel" | "err" | "default") => {
    const base = "border-2 rounded-lg px-2 py-[11px] text-[13px] font-semibold min-h-[46px] flex items-center justify-center leading-snug";
    if (variant === "mat") return `${base} border-green-600 text-green-700 bg-green-50 cursor-default`;
    if (variant === "lsel") return `${base} border-indigo-600 text-indigo-600 bg-indigo-50 cursor-pointer`;
    if (variant === "err") return `${base} border-red-500 text-red-600 bg-red-50 cursor-pointer`;
    return `${base} border-gray-300 text-gray-900 bg-white cursor-pointer`;
  };
  return (
    <>
      <p className="text-xs text-gray-500 mb-3">Tap a {wordName} word, then tap its match</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          {lefts.map((v) => {
            const mat = matched.some((m) => m[0] === v);
            const sel = matchLeft === v;
            const err = matchError && sel;
            return (
              <button
                key={v}
                className={mCls(mat ? "mat" : sel && err ? "err" : sel ? "lsel" : "default")}
                style={{ direction: "rtl", fontFamily: "Arial,sans-serif" }}
                onClick={() => !mat && onLeft(v)}
              >
                {mat ? "✓" : v}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          {(shuffledRight || []).map((v) => {
            const mat = matched.some((m) => m[1] === v);
            return (
              <button key={v} className={`${mCls(mat ? "mat" : "default")} text-xs`} onClick={() => !mat && onRight(v)}>
                {mat ? "✓" : v}
              </button>
            );
          })}
        </div>
      </div>
      {feedback === "ok" && (
        <div className="text-center mt-[14px]">
          <div className="text-[15px] font-semibold text-green-600 mb-3">🎉 All pairs matched!</div>
          <button
            onClick={onNext}
            className="w-full p-[13px] rounded-xl text-white text-[15px] font-semibold"
            style={{ background: cvBtn }}
          >
            Continue →
          </button>
        </div>
      )}
    </>
  );
}

export function FeedbackBar({ feedback, exercise, onNext }: { feedback: Feedback; exercise: Exercise; onNext: () => void }) {
  if (!feedback) return null;
  const ok = feedback === "ok";
  let ansText = "";
  if (!ok) {
    if (exercise.type === "mc" || exercise.type === "tap" || exercise.type === "fill") ansText = exercise.ans;
    else if (exercise.type === "tf") ansText = exercise.ans ? "TRUE" : "FALSE";
    else if (exercise.type === "wordBank") ansText = exercise.ans.join(" ");
  }
  return (
    <div
      className={`px-[14px] py-[13px] border-t-[2.5px] flex items-center justify-between animate-slideUp ${
        ok ? "border-green-600 bg-green-50" : "border-red-500 bg-red-50"
      }`}
    >
      <div>
        <div className={`text-sm font-semibold ${ok ? "text-green-700" : "text-red-600"}`}>{ok ? "🎉 Correct!" : "❌ Incorrect"}</div>
        {!ok && (
          <div className="text-[11px] text-red-600 mt-[2px]">
            Answer: <strong>{ansText}</strong>
          </div>
        )}
      </div>
      <button
        onClick={onNext}
        className={`px-4 py-[9px] rounded-lg text-white text-[13px] font-semibold ${ok ? "bg-green-600" : "bg-red-600"}`}
      >
        Continue →
      </button>
    </div>
  );
}

export function CheckButton({ canCheck, onCheck, cvBtn }: { canCheck: boolean; onCheck: () => void; cvBtn: string }) {
  return (
    <div className="px-[14px] py-3 bg-white border-t-[0.5px] border-gray-200">
      <button
        disabled={!canCheck}
        onClick={onCheck}
        className={`w-full p-[13px] rounded-xl text-[15px] font-semibold ${
          canCheck ? "text-white cursor-pointer" : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
        style={canCheck ? { background: cvBtn } : undefined}
      >
        CHECK
      </button>
    </div>
  );
}

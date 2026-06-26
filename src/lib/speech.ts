// ─────────────────────────────────────────────
// SPEECH (text-to-speech via Web Speech API)
// ─────────────────────────────────────────────
import { COURSES, type Language, type Exercise } from "./data";

// Pulls only the target-language characters out of mixed text
const SCRIPT_RE: Record<"hebrew" | "greek", RegExp> = {
  hebrew: /[\u0590-\u05FF][\u0590-\u05FF\s,.\u05F3\u05F4'’"\-]*/g,
  greek: /[\u0370-\u03FF\u1F00-\u1FFF][\u0370-\u03FF\u1F00-\u1FFF\s,.;'’"\-]*/g,
};

export function extractTarget(text: string, language: Language = "hebrew"): string {
  if (!text) return "";
  const re = language === "greek" ? SCRIPT_RE.greek : SCRIPT_RE.hebrew; // Aramaic uses Hebrew script
  const runs = String(text).match(re);
  if (!runs) return "";
  return runs.join(" ").replace(/\s+/g, " ").replace(/[\s",.;'’\-]+$/, "").trim();
}

export function extractHebrew(text: string): string {
  return extractTarget(text, "hebrew");
}

let cachedVoices: SpeechSynthesisVoice[] = [];
function loadVoices(): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  cachedVoices = window.speechSynthesis.getVoices() || [];
}
if (typeof window !== "undefined" && window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function findVoice(langPrefix: string): SpeechSynthesisVoice | null {
  loadVoices();
  return cachedVoices.find((v) => v.lang && v.lang.toLowerCase().startsWith(langPrefix)) || null;
}

function speak(text: string, { lang = "he-IL", rate = 0.9 }: { lang?: string; rate?: number } = {}): void {
  if (!text || typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // stop anything already playing
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  const v = findVoice(lang.slice(0, 2).toLowerCase());
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

export function speakWord(text: string, language: Language = "hebrew", slow = false): void {
  const ttsLang = COURSES[language]?.ttsLang || "he-IL";
  speak(text, { lang: ttsLang, rate: slow ? 0.55 : 0.9 });
}

export function stopSpeech(): void {
  if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
}

// What to say aloud BEFORE the user answers (never reveals the answer)
export function promptAudioFor(exercise: Exercise | undefined, language: Language = "hebrew"): string {
  if (!exercise) return "";
  switch (exercise.type) {
    case "mc":
      return extractTarget(exercise.img, language); // emoji imgs return ""
    case "tap":
      return extractTarget(exercise.word, language);
    case "tf":
      return extractTarget(exercise.stmt, language);
    default:
      return ""; // fill & wordBank would give the answer away
  }
}

// The full correct phrase — only spoken AFTER feedback is shown
export function answerAudioFor(exercise: Exercise | undefined, language: Language = "hebrew"): string {
  if (!exercise) return "";
  switch (exercise.type) {
    case "fill":
      return extractTarget(`${exercise.before || ""} ${exercise.ans} ${exercise.after || ""}`, language);
    case "wordBank":
      return extractTarget((exercise.ans || []).join(" "), language);
    case "mc":
      return extractTarget(exercise.img, language) || extractTarget(exercise.ans, language);
    case "tap":
      return extractTarget(exercise.ans, language);
    case "tf":
      return extractTarget(exercise.stmt, language);
    default:
      return "";
  }
}

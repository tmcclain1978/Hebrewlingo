// ─────────────────────────────────────────────
// HOME TABS
// ─────────────────────────────────────────────
import { CV, DAILY_GOAL, type Language, type Unit, type Progress } from "../lib/data";

export function TopBar({
  xp,
  streak,
  hearts,
  gems,
  doubleXP,
  level,
  language,
  onChangeLang,
}: {
  xp: number;
  streak: number;
  hearts: number;
  gems: number;
  doubleXP: boolean;
  level: number;
  language: Language | null;
  onChangeLang: () => void;
}) {
  const pct = xp % 100;
  const flags: Record<Language, string> = { hebrew: "🇮🇱", greek: "🇬🇷", aramaic: "📜" };
  return (
    <>
      <div className="sticky top-0 bg-white border-b-[0.5px] border-gray-200 px-5 py-[10px] flex items-center justify-between z-10">
        <div className="text-base font-bold flex items-center gap-2">
          <span className="text-indigo-600 text-lg">✦</span> HebrewLingo
          {language && (
            <button
              onClick={onChangeLang}
              className="bg-gray-100 rounded-full px-[10px] py-[3px] text-[13px] cursor-pointer ml-1"
            >
              {flags[language]} Change
            </button>
          )}
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-sm font-bold text-orange-600">🔥{streak}</span>
          <span className="text-sm font-bold text-red-600">❤️{hearts}</span>
          <span className="text-sm font-bold text-indigo-600">💎{gems}</span>
          {doubleXP && (
            <span className="text-[11px] font-bold text-amber-600 bg-amber-100 px-2 py-[2px] rounded-full">⚡2x</span>
          )}
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-2 flex items-center gap-[10px] border-b-[0.5px] border-gray-200">
        <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">Lv.{level}</span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-indigo-600 transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">{xp} XP</span>
      </div>
    </>
  );
}

export function Tabs({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  const tabs: [string, string][] = [
    ["learn", "📖 Learn"],
    ["leaderboard", "🏆 League"],
    ["shop", "🛒 Shop"],
    ["profile", "👤 Me"],
  ];
  return (
    <div className="flex bg-white border-b-[0.5px] border-gray-200">
      {tabs.map(([id, label]) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex-1 py-[9px] border-b-2 text-[11px] font-semibold bg-transparent cursor-pointer ${
            active === id ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

const scrollArea = "px-5 py-4 flex-1 overflow-y-auto h-[calc(100vh-130px)]";

export function LearnTab({
  units,
  progress,
  dailyXP,
  onStart,
}: {
  units: Unit[];
  progress: Progress;
  dailyXP: number;
  onStart: (id: string) => void;
}) {
  const pct = Math.min(100, Math.round((dailyXP / DAILY_GOAL) * 100));
  return (
    <div className={scrollArea}>
      <div className="bg-gray-50 border-[0.5px] border-gray-200 rounded-xl px-[14px] py-3 flex items-center gap-3 mb-[14px]">
        <span className="text-xl">🎯</span>
        <div className="flex-1">
          <div className="text-[11px] font-semibold text-gray-500 mb-1">
            Daily goal — {dailyXP}/{DAILY_GOAL} XP
          </div>
          <div className="h-[9px] bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-indigo-600 transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <span className={`text-[11px] font-semibold ${pct >= 100 ? "text-green-600" : "text-gray-500"}`}>
          {pct >= 100 ? "✓ Done!" : `${pct}%`}
        </span>
      </div>

      {units.map((u) => {
        const c = CV[u.cv];
        const prev = units.slice(0, u.id - 1).every((uu) => uu.lessons.every((l) => (progress[l.id] || 0) > 0));
        const locked = u.id > 1 && !prev;
        const done = u.lessons.filter((l) => (progress[l.id] || 0) > 0).length;
        const offsetMap = [{}, { marginLeft: 62 }, { marginRight: 62 }];

        return (
          <div key={u.id} className="mb-[26px]">
            <div
              className="rounded-xl px-[13px] py-[11px] mb-[14px] flex items-center gap-[10px] border-l-4"
              style={{ borderLeftColor: c.btn, background: c.lt }}
            >
              <span className="text-xl">{u.emoji}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold" style={{ direction: "rtl", fontFamily: "Arial,sans-serif", color: c.tx }}>
                  {u.title}
                </div>
                <div className="text-[11px] opacity-70" style={{ color: c.tx }}>
                  {u.sub}
                </div>
              </div>
              <span className="text-[11px] opacity-60" style={{ color: c.tx }}>
                {done}/{u.lessons.length}
              </span>
            </div>

            <div className="flex flex-col items-center">
              {u.lessons.map((l, i) => {
                const cr = progress[l.id] || 0;
                const isLocked = locked;
                return (
                  <div
                    key={l.id}
                    className="flex flex-col items-center gap-1 mb-3"
                    style={i % 3 === 0 ? { marginLeft: "auto", marginRight: "auto" } : offsetMap[i % 3]}
                  >
                    <button
                      disabled={isLocked}
                      onClick={() => onStart(l.id)}
                      className="w-[70px] h-[70px] rounded-full border-[2.5px] flex flex-col items-center justify-center transition-transform"
                      style={{
                        borderColor: isLocked ? "#d1d5db" : c.btn,
                        background: isLocked ? "#f3f4f6" : c.lt,
                        cursor: isLocked ? "not-allowed" : "pointer",
                        opacity: isLocked ? 0.5 : 1,
                      }}
                    >
                      <span className="text-xl">{isLocked ? "🔒" : l.emoji}</span>
                      <div className="text-[9px] mt-[2px]">
                        {[...Array(3)].map((_, j) => (j < cr ? "👑" : "○")).join("")}
                      </div>
                    </button>
                    <div
                      className="text-[10px] font-semibold text-center max-w-[78px] leading-tight"
                      style={{ color: isLocked ? "#9ca3af" : c.tx }}
                    >
                      {l.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function LeagueTab({ myXP }: { myXP: number }) {
  const players = [
    { n: "You", xp: myXP, f: "🇮🇱", you: true },
    { n: "Sarah K.", xp: 540, f: "🇺🇸" },
    { n: "David L.", xp: 480, f: "🇬🇧" },
    { n: "Miriam B.", xp: 320, f: "🇦🇺" },
    { n: "Ari S.", xp: 280, f: "🇨🇦" },
    { n: "Rachel T.", xp: 180, f: "🇺🇸" },
    { n: "Ben H.", xp: 140, f: "🇿🇦" },
    { n: "Leah M.", xp: 95, f: "🇫🇷" },
    { n: "Yosef R.", xp: 60, f: "🇧🇷" },
  ]
    .sort((a, b) => b.xp - a.xp)
    .map((p, i) => ({ ...p, rank: i + 1 }));
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className={scrollArea}>
      <div className="text-center mb-[14px]">
        <div className="text-[34px]">🏆</div>
        <div className="text-[17px] font-semibold mt-1">Weekly League</div>
        <div className="text-xs text-gray-500 mt-[2px]">Top learners this week</div>
      </div>
      {players.map((p) => (
        <div
          key={p.n}
          className={`flex items-center gap-[10px] px-3 py-[10px] border-[0.5px] rounded-lg mb-[7px] ${
            p.you ? "border-indigo-600 bg-indigo-50" : "border-gray-200 bg-white"
          }`}
        >
          <span className="text-base min-w-[26px]">{p.rank <= 3 ? medals[p.rank - 1] : `#${p.rank}`}</span>
          <span className="text-base">{p.f}</span>
          <span className={`flex-1 text-[13px] ${p.you ? "font-semibold text-indigo-600" : "text-gray-900"}`}>
            {p.n}
            {p.you ? " (You)" : ""}
          </span>
          <span className="text-xs font-semibold text-gray-500">⚡ {p.xp}</span>
        </div>
      ))}
    </div>
  );
}

export function ShopTab({
  gems,
  hearts,
  doubleXP,
  freezeOwned,
  onBuy,
}: {
  gems: number;
  hearts: number;
  doubleXP: boolean;
  freezeOwned: boolean;
  onBuy: (id: string) => void;
}) {
  const items = [
    { id: "hearts", e: "❤️", n: "Refill Hearts", d: "Restore all 5 hearts", cost: 20, avail: gems >= 20 && hearts < 5, lbl: hearts === 5 ? "Full" : "Buy" },
    { id: "freeze", e: "🧊", n: "Streak Freeze", d: "Protect your streak for 1 day", cost: 50, avail: gems >= 50 && !freezeOwned, lbl: freezeOwned ? "Owned" : "Buy" },
    { id: "double", e: "⚡", n: "2x XP Boost", d: "Double XP for your next lesson", cost: 30, avail: gems >= 30 && !doubleXP, lbl: doubleXP ? "Active" : "Buy" },
  ];
  return (
    <div className={scrollArea}>
      <div className="text-center mb-[14px]">
        <div className="text-[34px]">🛒</div>
        <div className="text-[17px] font-semibold mt-1">Gem Shop</div>
        <div className="text-xs text-gray-500 mt-[2px]">You have 💎 {gems} gems</div>
      </div>
      {items.map((it) => (
        <div key={it.id} className="bg-white border-[0.5px] border-gray-200 rounded-xl p-[14px] mb-[10px] flex items-center gap-3">
          <span className="text-[34px]">{it.e}</span>
          <div className="flex-1">
            <div className="text-[13px] font-semibold">{it.n}</div>
            <div className="text-[11px] text-gray-500 mt-[2px]">{it.d}</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-gray-500 mb-1">💎 {it.cost}</div>
            <button
              disabled={!it.avail}
              onClick={() => onBuy(it.id)}
              className={`px-[14px] py-2 rounded-lg border border-gray-300 text-xs font-semibold ${
                it.avail ? "bg-white text-gray-900 cursor-pointer" : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {it.lbl}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProfileTab({
  xp,
  level,
  streak,
  gems,
  hearts,
  progress,
}: {
  xp: number;
  level: number;
  streak: number;
  gems: number;
  hearts: number;
  progress: Progress;
}) {
  const done = Object.keys(progress).length;
  const achievements = [
    { e: "🌟", n: "First Step", d: "Complete first lesson", ok: done >= 1 },
    { e: "🔥", n: "On Fire", d: "3-day streak active", ok: streak >= 3 },
    { e: "💎", n: "Gem Collector", d: "Earn 50 gems", ok: gems >= 50 },
    { e: "🏆", n: "Champion", d: "Reach level 5", ok: level >= 5 },
    { e: "📚", n: "Scholar", d: "Complete 5 lessons", ok: done >= 5 },
    { e: "❤️", n: "Flawless", d: "Keep all 5 hearts", ok: hearts === 5 },
    { e: "⚡", n: "Combo King", d: "Build a 4x combo", ok: false },
    { e: "🌍", n: "Explorer", d: "Reach unit 5", ok: (progress["5-1"] || 0) > 0 },
    { e: "🎨", n: "Colorist", d: "Complete Colors unit", ok: (progress["7-2"] || 0) > 0 },
    { e: "🌤️", n: "Meteorologist", d: "Complete Weather unit", ok: (progress["10-2"] || 0) > 0 },
  ];
  return (
    <div className={scrollArea}>
      <div className="bg-indigo-950 rounded-xl p-5 text-center mb-[14px] text-white">
        <div className="text-[42px] mb-2">🧑‍🎓</div>
        <div className="text-lg font-semibold">Hebrew Learner</div>
        <div className="text-xs opacity-70 mt-[2px]">
          Level {level} · {xp} XP Total
        </div>
        <div className="flex justify-around mt-3 pt-3 border-t-[0.5px] border-white/20">
          {([["🔥", streak, "Streak"], ["📚", done, "Lessons"], ["💎", gems, "Gems"]] as [string, number, string][]).map(([ic, v, lb]) => (
            <div key={lb}>
              <div className="text-[19px]">{ic}</div>
              <div className="text-base font-semibold">{v}</div>
              <div className="text-[10px] opacity-60">{lb}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-[13px] font-semibold mb-[10px]">
        Achievements{" "}
        <span className="font-normal text-gray-500 text-[11px]">
          ({achievements.filter((a) => a.ok).length}/{achievements.length})
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {achievements.map((a) => (
          <div
            key={a.n}
            className={`rounded-lg p-[10px] border-[0.5px] ${a.ok ? "bg-amber-100 border-amber-600 opacity-100" : "bg-gray-50 border-gray-200 opacity-40"}`}
          >
            <div className="text-[22px]">{a.e}</div>
            <div className="text-xs font-semibold mt-1">{a.n}</div>
            <div className="text-[10px] text-gray-500 mt-[2px]">{a.d}</div>
            {a.ok && <div className="text-[10px] text-amber-600 font-semibold mt-[3px]">✓ Unlocked</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
export type Language = "hebrew" | "greek" | "aramaic";
export type CVKey = "info" | "success" | "warning" | "danger" | "pink" | "teal" | "purple";

export interface MCExerciseData    { type: "mc"; prompt: string; img: string; heb: boolean; opts: string[]; ans: string; }
export interface TapExerciseData   { type: "tap"; prompt: string; word: string; imgs: string[]; lbels: string[]; ans: string; }
export interface TFExerciseData    { type: "tf"; prompt: string; stmt: string; ans: boolean; }
export interface FillExerciseData  { type: "fill"; prompt: string; before: string; after: string; eng: string; opts: string[]; ans: string; }
export interface MatchExerciseData { type: "match"; prompt: string; pairs: string[][]; }
export interface WordBankExerciseData { type: "wordBank"; prompt: string; img: string; wb: string[]; ans: string[]; }
export type Exercise =
  | MCExerciseData | TapExerciseData | TFExerciseData
  | FillExerciseData | MatchExerciseData | WordBankExerciseData;

export interface Lesson { id: string; title: string; emoji: string; exercises: Exercise[]; }
export interface Unit   { id: number; title: string; sub: string; emoji: string; cv: CVKey; lessons: Lesson[]; }
export interface UnitWithProgress extends Lesson { uid: number; ucv: CVKey; }
export interface Course { units: Unit[]; ttsLang: string; rtl: boolean; wordName: string; }

export type Feedback = "ok" | "no" | null;
export type Progress = Record<string, number>;

export const CV: Record<CVKey, { btn: string; lt: string; tx: string }> = {
  info:    { btn: "#1565C0", lt: "#E3F2FD", tx: "#0D47A1" },
  success: { btn: "#2E7D32", lt: "#E8F5E9", tx: "#1B5E20" },
  warning: { btn: "#B45309", lt: "#FEF3C7", tx: "#92400E" },
  danger:  { btn: "#B91C1C", lt: "#FEE2E2", tx: "#991B1B" },
  pink:    { btn: "#9D174D", lt: "#FCE7F3", tx: "#831843" },
  teal:    { btn: "#0F766E", lt: "#CCFBF1", tx: "#134E4A" },
  purple:  { btn: "#5B21B6", lt: "#EDE9FE", tx: "#4C1D95" },
};


export const HEBREW_UNITS: Unit[] = [
  {
    id: 1, title: "האלפבית", sub: "The Hebrew Alphabet", emoji: "📝", cv: "info",
    lessons: [
      {
        id: "1-1", title: "Letters א–ה", emoji: "✨",
        exercises: [
          { type: "mc",   prompt: "Which letter makes the silent/A sound?", img: "א", heb: true,  opts: ["א (Aleph)", "ב (Bet)", "ג (Gimel)", "ד (Dalet)"], ans: "א (Aleph)" },
          { type: "tap",  prompt: 'Tap the letter called "Gimel"', word: "ג", imgs: ["א","ב","ג","ה"], lbels: ["Aleph","Bet","Gimel","He"], ans: "ג" },
          { type: "tf",   prompt: "True or False:", stmt: '"ב" is called Bet and makes a B sound', ans: true },
          { type: "mc",   prompt: "What sound does ד (Dalet) make?", img: "ד", heb: true, opts: ["B sound","G sound","D sound","H sound"], ans: "D sound" },
          { type: "match",prompt: "Match each letter to its name", pairs: [["א","Aleph"],["ב","Bet"],["ג","Gimel"],["ד","Dalet"]] },
        ],
      },
      {
        id: "1-2", title: "Letters ו–י", emoji: "🌟",
        exercises: [
          { type: "mc",   prompt: "Which letter makes the V/W sound?", img: "ו", heb: true, opts: ["ו (Vav)","ז (Zayin)","ח (Khet)","י (Yod)"], ans: "ו (Vav)" },
          { type: "tap",  prompt: 'Tap the letter "Yod" — the smallest letter!', word: "י", imgs: ["ו","ז","ח","י"], lbels: ["Vav","Zayin","Khet","Yod"], ans: "י" },
          { type: "tf",   prompt: "True or False:", stmt: '"ח" (Khet) sounds exactly like the K in English', ans: false },
          { type: "mc",   prompt: "What sound does ז (Zayin) make?", img: "ז", heb: true, opts: ["V sound","Z sound","Ch sound","Y sound"], ans: "Z sound" },
          { type: "match",prompt: "Match letters to names", pairs: [["ו","Vav"],["ז","Zayin"],["ח","Khet"],["י","Yod"]] },
        ],
      },
      {
        id: "1-3", title: "Letters כ–ס", emoji: "💫",
        exercises: [
          { type: "mc",   prompt: "Which letter makes the K/Ch sound?", img: "כ", heb: true, opts: ["כ (Kaf)","ל (Lamed)","מ (Mem)","נ (Nun)"], ans: "כ (Kaf)" },
          { type: "tap",  prompt: 'Tap the letter "Mem" (M sound)', word: "מ", imgs: ["כ","ל","מ","נ"], lbels: ["Kaf","Lamed","Mem","Nun"], ans: "מ" },
          { type: "tf",   prompt: "True or False:", stmt: '"ל" (Lamed) makes an L sound like in English', ans: true },
          { type: "mc",   prompt: "Which letter is 'Samech' (S sound)?", img: "🔤", heb: false, opts: ["כ","מ","נ","ס"], ans: "ס" },
          { type: "match",prompt: "Match letters to names", pairs: [["כ","Kaf"],["ל","Lamed"],["מ","Mem"],["נ","Nun"]] },
        ],
      },
    ],
  },
  {
    id: 2, title: "ברכות", sub: "Greetings & Phrases", emoji: "🤝", cv: "success",
    lessons: [
      {
        id: "2-1", title: "Basic Greetings", emoji: "👋",
        exercises: [
          { type: "mc",   prompt: "What does שָׁלוֹם (Shalom) mean?", img: "🕊️", heb: false, opts: ["Goodbye","Hello / Peace","Thank you","Please"], ans: "Hello / Peace" },
          { type: "tap",  prompt: "Tap the image for 'Good Morning' (בֹּקֶר טוֹב)", word: "בֹּקֶר טוֹב", imgs: ["🌅","🌆","🌙","☀️"], lbels: ["Morning","Evening","Night","Noon"], ans: "🌅" },
          { type: "fill", prompt: "Complete the greeting:", before: "לַיְלָה", after: "", eng: "Layla ___ (Good night)", opts: ["טוֹב","רַע","גָּדוֹל"], ans: "טוֹב" },
          { type: "tf",   prompt: "True or False:", stmt: '"תּוֹדָה" (Toda) means Thank you', ans: true },
          { type: "match",prompt: "Match the greetings", pairs: [["שָׁלוֹם","Hello / Peace"],["תּוֹדָה","Thank you"],["בֹּקֶר טוֹב","Good morning"],["לַיְלָה טוֹב","Good night"]] },
        ],
      },
      {
        id: "2-2", title: "Yes, No & Please", emoji: "💬",
        exercises: [
          { type: "tap",  prompt: "Tap the correct image for כֵּן (Yes)", word: "כֵּן", imgs: ["✅","❌","🤔","😐"], lbels: ["Yes","No","Maybe","OK"], ans: "✅" },
          { type: "mc",   prompt: "What does לֹא (Lo) mean?", img: "❌", heb: false, opts: ["Yes","Maybe","No","OK"], ans: "No" },
          { type: "fill", prompt: "Complete:", before: "סְלִיחָה,", after: "בְּבַקָּשָׁה", eng: "Slicha, ___ bevakasha (Excuse me, ___ please)", opts: ["אֲנִי","כֵּן","לֹא"], ans: "כֵּן" },
          { type: "tf",   prompt: "True or False:", stmt: '"בְּבַקָּשָׁה" means both Please and You\'re welcome', ans: true },
          { type: "match",prompt: "Match the words", pairs: [["כֵּן","Yes"],["לֹא","No"],["סְלִיחָה","Excuse me"],["בְּבַקָּשָׁה","Please"]] },
        ],
      },
      {
        id: "2-3", title: "Introductions", emoji: "🧑",
        exercises: [
          { type: "mc",   prompt: "How do you say 'My name is...' in Hebrew?", img: "🪪", heb: false, opts: ["שְׁמִי...","אֲנִי...","יֵשׁ לִי...","אֵיפֹה..."], ans: "שְׁמִי..." },
          { type: "tap",  prompt: "Tap the image for 'How are you?' (מַה שְּׁלוֹמְךָ?)", word: "מַה שְּׁלוֹמְךָ?", imgs: ["🙋","🗺️","🪪","📞"], lbels: ["How are you","Where from","Name","Phone"], ans: "🙋" },
          { type: "tf",   prompt: "True or False:", stmt: '"מֵאַיִן אַתָּה?" means Where are you from?', ans: true },
          { type: "fill", prompt: "Complete: 'Nice to ___'", before: "נָעִים", after: "", eng: "Naim ___ (Nice to meet you)", opts: ["מְאוֹד","לֹא","כֵּן"], ans: "מְאוֹד" },
          { type: "match",prompt: "Match the phrases", pairs: [["שְׁמִי","My name is"],["מֵאַיִן","Where from"],["נָעִים מְאוֹד","Nice to meet"],["כֵּן","Yes"]] },
        ],
      },
    ],
  },
  {
    id: 3, title: "מִסְפָּרִים", sub: "Numbers 1–20", emoji: "🔢", cv: "warning",
    lessons: [
      {
        id: "3-1", title: "Numbers 1–5", emoji: "1️⃣",
        exercises: [
          { type: "tap",  prompt: "Tap the image for אֶחָד (One)", word: "אֶחָד", imgs: ["1️⃣","2️⃣","3️⃣","4️⃣"], lbels: ["One","Two","Three","Four"], ans: "1️⃣" },
          { type: "mc",   prompt: "How do you say 'Three' in Hebrew?", img: "3️⃣", heb: false, opts: ["שְׁתַּיִם","שָׁלוֹשׁ","אַרְבַּע","חָמֵשׁ"], ans: "שָׁלוֹשׁ" },
          { type: "fill", prompt: "Fill in the sequence:", before: "אֶחָד, שְׁתַּיִם,", after: "", eng: "One, Two, ___", opts: ["אַרְבַּע","שָׁלוֹשׁ","חָמֵשׁ"], ans: "שָׁלוֹשׁ" },
          { type: "tf",   prompt: "True or False:", stmt: '"אַרְבַּע" (Arba) means Five', ans: false },
          { type: "match",prompt: "Match the numbers", pairs: [["אֶחָד","One"],["שְׁתַּיִם","Two"],["שָׁלוֹשׁ","Three"],["אַרְבַּע","Four"]] },
        ],
      },
      {
        id: "3-2", title: "Numbers 6–10", emoji: "🔟",
        exercises: [
          { type: "tap",  prompt: "Tap the image for שֵׁשׁ (Six)", word: "שֵׁשׁ", imgs: ["5️⃣","6️⃣","7️⃣","8️⃣"], lbels: ["Five","Six","Seven","Eight"], ans: "6️⃣" },
          { type: "mc",   prompt: "How do you say 'Eight'?", img: "8️⃣", heb: false, opts: ["שֶׁבַע","שְׁמוֹנֶה","תֵּשַׁע","עֶשֶׂר"], ans: "שְׁמוֹנֶה" },
          { type: "fill", prompt: "What comes between seven and nine?", before: "שֶׁבַע,", after: ",תֵּשַׁע", eng: "Seven, ___, Nine", opts: ["עֶשֶׂר","שְׁמוֹנֶה","חָמֵשׁ"], ans: "שְׁמוֹנֶה" },
          { type: "tf",   prompt: "True or False:", stmt: '"עֶשֶׂר" (Eser) means Ten', ans: true },
          { type: "match",prompt: "Match the numbers", pairs: [["שֵׁשׁ","Six"],["שֶׁבַע","Seven"],["שְׁמוֹנֶה","Eight"],["עֶשֶׂר","Ten"]] },
        ],
      },
      {
        id: "3-3", title: "Numbers 11–20", emoji: "🔢",
        exercises: [
          { type: "mc",   prompt: "What does אַחַד עָשָׂר mean?", img: "1️⃣1️⃣", heb: false, opts: ["Ten","Eleven","Twelve","Thirteen"], ans: "Eleven" },
          { type: "tf",   prompt: "True or False:", stmt: '"עֶשְׂרִים" (Esrim) means Twenty', ans: true },
          { type: "fill", prompt: "Fill in the number:", before: "שְׁנֵים עָשָׂר,", after: ",אַרְבָּעָה עָשָׂר", eng: "Twelve, ___, Fourteen", opts: ["אַחַד עָשָׂר","שְׁלוֹשָׁה עָשָׂר","חֲמִשָּׁה עָשָׂר"], ans: "שְׁלוֹשָׁה עָשָׂר" },
          { type: "mc",   prompt: "How do you say 'Fifteen'?", img: "🔢", heb: false, opts: ["חֲמִשָּׁה עָשָׂר","שְׁלוֹשָׁה עָשָׂר","אַרְבָּעָה עָשָׂר","שִׁשָּׁה עָשָׂר"], ans: "חֲמִשָּׁה עָשָׂר" },
          { type: "match",prompt: "Match the numbers", pairs: [["אַחַד עָשָׂר","Eleven"],["שְׁנֵים עָשָׂר","Twelve"],["חֲמִשָּׁה עָשָׂר","Fifteen"],["עֶשְׂרִים","Twenty"]] },
        ],
      },
    ],
  },
  {
    id: 4, title: "מִשְׁפָּחָה", sub: "Family Members", emoji: "👨‍👩‍👧‍👦", cv: "pink",
    lessons: [
      {
        id: "4-1", title: "Close Family", emoji: "🏠",
        exercises: [
          { type: "tap",  prompt: "Tap the image for אִמָּא (Mom)", word: "אִמָּא", imgs: ["👩","👨","👧","👦"], lbels: ["Mom","Dad","Sister","Brother"], ans: "👩" },
          { type: "mc",   prompt: "How do you say 'Father'?", img: "👨", heb: false, opts: ["אַח","אָבָא","אָחוֹת","סָבָא"], ans: "אָבָא" },
          { type: "tf",   prompt: "True or False:", stmt: '"אָחוֹת" (Achot) means Sister', ans: true },
          { type: "fill", prompt: "Complete:", before: "הָאַח", after: "שֶׁלִּי", eng: "Ha-ach ___ sheli (My ___ brother)", opts: ["הַגָּדוֹל","הַכֶּלֶב","הַיּוֹם"], ans: "הַגָּדוֹל" },
          { type: "match",prompt: "Match family members", pairs: [["אִמָּא","Mom"],["אָבָא","Dad"],["אַח","Brother"],["סָבְתָּא","Grandma"]] },
        ],
      },
      {
        id: "4-2", title: "Extended Family", emoji: "👪",
        exercises: [
          { type: "tap",  prompt: "Tap the image for דּוֹד (Uncle)", word: "דּוֹד", imgs: ["👴","👵","🧔","👩‍🦰"], lbels: ["Grandpa","Grandma","Uncle","Aunt"], ans: "🧔" },
          { type: "mc",   prompt: "What does דּוֹדָה (Doda) mean?", img: "👩‍🦰", heb: false, opts: ["Mother","Grandmother","Aunt","Cousin"], ans: "Aunt" },
          { type: "tf",   prompt: "True or False:", stmt: '"בֵּן" (Ben) means Daughter', ans: false },
          { type: "fill", prompt: "Complete:", before: "יֵשׁ לִי", after: "", eng: "Yesh li ___ (I have a sister)", opts: ["אָחוֹת","גָּדוֹל","כֵּן"], ans: "אָחוֹת" },
          { type: "match",prompt: "Match extended family", pairs: [["דּוֹד","Uncle"],["דּוֹדָה","Aunt"],["בֵּן","Son"],["בַּת","Daughter"]] },
        ],
      },
    ],
  },
  {
    id: 5, title: "חַיּוֹת", sub: "Animals", emoji: "🐾", cv: "teal",
    lessons: [
      {
        id: "5-1", title: "Pets & Common", emoji: "🐕",
        exercises: [
          { type: "tap",  prompt: "Tap the image for כֶּלֶב (Dog)", word: "כֶּלֶב", imgs: ["🐕","🐱","🐦","🐟"], lbels: ["Dog","Cat","Bird","Fish"], ans: "🐕" },
          { type: "mc",   prompt: "How do you say 'Cat'?", img: "🐱", heb: false, opts: ["כֶּלֶב","סוּס","חָתוּל","דָּג"], ans: "חָתוּל" },
          { type: "tf",   prompt: "True or False:", stmt: '"צִפּוֹר" (Tzipor) means Fish', ans: false },
          { type: "fill", prompt: "Complete:", before: "הַכֶּלֶב", after: "מַהֵר", eng: "Ha-kelev ___ maher (The dog runs fast)", opts: ["רָץ","עָף","שָׁט"], ans: "רָץ" },
          { type: "match",prompt: "Match the animals", pairs: [["כֶּלֶב","Dog 🐕"],["חָתוּל","Cat 🐱"],["צִפּוֹר","Bird 🐦"],["דָּג","Fish 🐟"]] },
        ],
      },
      {
        id: "5-2", title: "Wild Animals", emoji: "🦁",
        exercises: [
          { type: "tap",  prompt: "Tap the image for אַרְיֵה (Lion)", word: "אַרְיֵה", imgs: ["🐘","🦁","🐯","🦒"], lbels: ["Elephant","Lion","Tiger","Giraffe"], ans: "🦁" },
          { type: "mc",   prompt: "What does פִּיל (Pil) mean?", img: "🐘", heb: false, opts: ["Tiger","Giraffe","Elephant","Lion"], ans: "Elephant" },
          { type: "tf",   prompt: "True or False:", stmt: '"נָחָשׁ" (Nachash) means Snake', ans: true },
          { type: "fill", prompt: "Complete: 'A big ___'", before: "", after: "גָּדוֹל", eng: "___ gadol (Big elephant)", opts: ["פִּיל","דָּג","כֵּן"], ans: "פִּיל" },
          { type: "match",prompt: "Match wild animals", pairs: [["אַרְיֵה","Lion 🦁"],["פִּיל","Elephant 🐘"],["נָחָשׁ","Snake 🐍"],["סוּס","Horse 🐴"]] },
        ],
      },
    ],
  },
  {
    id: 6, title: "אוֹכֶל", sub: "Food & Drink", emoji: "🍎", cv: "danger",
    lessons: [
      {
        id: "6-1", title: "Fruits & Basics", emoji: "🍎",
        exercises: [
          { type: "tap",  prompt: "Tap the image for תַּפּוּחַ (Apple)", word: "תַּפּוּחַ", imgs: ["🍊","🍎","🍋","🍇"], lbels: ["Orange","Apple","Lemon","Grapes"], ans: "🍎" },
          { type: "mc",   prompt: "What does לֶחֶם (Lechem) mean?", img: "🍞", heb: false, opts: ["Water","Milk","Bread","Egg"], ans: "Bread" },
          { type: "tf",   prompt: "True or False:", stmt: '"חָלָב" (Chalav) means Water', ans: false },
          { type: "fill", prompt: "Complete:", before: "אֲנִי שׁוֹתֶה", after: "", eng: "Ani shote ___ (I drink water)", opts: ["מַיִם","לֶחֶם","תַּפּוּחַ"], ans: "מַיִם" },
          { type: "match",prompt: "Match foods & drinks", pairs: [["לֶחֶם","Bread 🍞"],["מַיִם","Water 💧"],["תַּפּוּחַ","Apple 🍎"],["חָלָב","Milk 🥛"]] },
        ],
      },
      {
        id: "6-2", title: "Israeli Cuisine", emoji: "🥙",
        exercises: [
          { type: "tap",  prompt: "Tap the image for פַּלָּאפֶל (Falafel)", word: "פַּלָּאפֶל", imgs: ["🥙","🫘","🧆","🥗"], lbels: ["Pita","Hummus","Falafel","Salad"], ans: "🧆" },
          { type: "mc",   prompt: "What does חוּמוּס mean?", img: "🫘", heb: false, opts: ["Falafel","Shawarma","Hummus","Pita"], ans: "Hummus" },
          { type: "tf",   prompt: "True or False:", stmt: '"קָפֶה" (Kafe) means Tea', ans: false },
          { type: "fill", prompt: "Complete: 'Coffee or ___'", before: "קָפֶה אוֹ", after: "", eng: "Kafe o ___ (Coffee or tea)", opts: ["תֵּה","לֶחֶם","שֶׁמֶשׁ"], ans: "תֵּה" },
          { type: "match",prompt: "Match Israeli foods", pairs: [["חוּמוּס","Hummus 🫘"],["פַּלָּאפֶל","Falafel 🧆"],["קָפֶה","Coffee ☕"],["תֵּה","Tea 🍵"]] },
        ],
      },
    ],
  },
  {
    id: 7, title: "צְבָעִים", sub: "Colors", emoji: "🎨", cv: "purple",
    lessons: [
      {
        id: "7-1", title: "Basic Colors", emoji: "🌈",
        exercises: [
          { type: "tap",  prompt: "Tap the image for אָדוֹם (Red)", word: "אָדוֹם", imgs: ["🔴","🔵","🟢","🟡"], lbels: ["Red","Blue","Green","Yellow"], ans: "🔴" },
          { type: "mc",   prompt: "What does כָּחוֹל (Kachol) mean?", img: "🔵", heb: false, opts: ["Red","Green","Blue","Yellow"], ans: "Blue" },
          { type: "tf",   prompt: "True or False:", stmt: '"צָהוֹב" (Tzahov) means Yellow', ans: true },
          { type: "fill", prompt: "Complete:", before: "הַתַּפּוּחַ", after: "", eng: "Ha-tapuach ___ (The apple is red)", opts: ["אָדוֹם","כָּחוֹל","שָׁחוֹר"], ans: "אָדוֹם" },
          { type: "match",prompt: "Match the colors", pairs: [["אָדוֹם","Red 🔴"],["כָּחוֹל","Blue 🔵"],["יָרוֹק","Green 🟢"],["צָהוֹב","Yellow 🟡"]] },
        ],
      },
      {
        id: "7-2", title: "More Colors", emoji: "🖌️",
        exercises: [
          { type: "tap",  prompt: "Tap the image for שָׁחוֹר (Black)", word: "שָׁחוֹר", imgs: ["⚫","⚪","🟤","🟣"], lbels: ["Black","White","Brown","Purple"], ans: "⚫" },
          { type: "mc",   prompt: "What does לָבָן (Lavan) mean?", img: "⚪", heb: false, opts: ["Black","Gray","White","Silver"], ans: "White" },
          { type: "tf",   prompt: "True or False:", stmt: '"כָּתֹם" (Katom) means Orange', ans: true },
          { type: "fill", prompt: "Complete:", before: "הַשָּׁמַיִם", after: "", eng: "Ha-shamayim ___ (The sky is blue)", opts: ["כָּחוֹל","אָדוֹם","יָרוֹק"], ans: "כָּחוֹל" },
          { type: "match",prompt: "Match more colors", pairs: [["שָׁחוֹר","Black ⚫"],["לָבָן","White ⚪"],["כָּתֹם","Orange 🟠"],["סָגוֹל","Purple 🟣"]] },
        ],
      },
    ],
  },
  {
    id: 8, title: "יָמִים", sub: "Days & Time", emoji: "📅", cv: "teal",
    lessons: [
      {
        id: "8-1", title: "Days of the Week", emoji: "🗓️",
        exercises: [
          { type: "mc",   prompt: "What does שַׁבָּת (Shabbat) mean?", img: "🕯️", heb: false, opts: ["Monday","Friday","Saturday / Sabbath","Holiday"], ans: "Saturday / Sabbath" },
          { type: "tap",  prompt: "Tap the image for יוֹם רִאשׁוֹן (Sunday = 1st day)", word: "יוֹם רִאשׁוֹן", imgs: ["☀️","🌙","📅","🎉"], lbels: ["Sunday","Night","Weekday","Party"], ans: "☀️" },
          { type: "tf",   prompt: "True or False:", stmt: '"יוֹם שֵׁנִי" means Tuesday (the 2nd day)', ans: false },
          { type: "fill", prompt: "Complete: 'Today is ___'", before: "הַיּוֹם", after: "", eng: "Hayom ___ (Today is Saturday)", opts: ["שַׁבָּת","לַיְלָה","בֹּקֶר"], ans: "שַׁבָּת" },
          { type: "match",prompt: "Match the days", pairs: [["יוֹם רִאשׁוֹן","Sunday"],["יוֹם שֵׁנִי","Monday"],["שַׁבָּת","Saturday"],["הַיּוֹם","Today"]] },
        ],
      },
      {
        id: "8-2", title: "Times of Day", emoji: "⏰",
        exercises: [
          { type: "tap",  prompt: "Tap the image for בֹּקֶר (Morning)", word: "בֹּקֶר", imgs: ["🌅","🌞","🌆","🌙"], lbels: ["Morning","Noon","Evening","Night"], ans: "🌅" },
          { type: "mc",   prompt: "What does לַיְלָה (Layla) mean?", img: "🌙", heb: false, opts: ["Morning","Afternoon","Evening","Night"], ans: "Night" },
          { type: "tf",   prompt: "True or False:", stmt: '"עֶרֶב" (Erev) means Evening', ans: true },
          { type: "fill", prompt: "Complete: 'Good ___!'", before: "בֹּקֶר", after: "!", eng: "Boker ___ ! (Good morning!)", opts: ["טוֹב","רַע","גָּדוֹל"], ans: "טוֹב" },
          { type: "match",prompt: "Match times of day", pairs: [["בֹּקֶר","Morning 🌅"],["צָהֳרַיִם","Noon ☀️"],["עֶרֶב","Evening 🌆"],["לַיְלָה","Night 🌙"]] },
        ],
      },
    ],
  },
  {
    id: 9, title: "מְקוֹמוֹת", sub: "Places & Directions", emoji: "🏙️", cv: "info",
    lessons: [
      {
        id: "9-1", title: "Common Places", emoji: "🏪",
        exercises: [
          { type: "tap",  prompt: "Tap the image for בֵּית סֵפֶר (School)", word: "בֵּית סֵפֶר", imgs: ["🏫","🏪","🏥","🕍"], lbels: ["School","Market","Hospital","Synagogue"], ans: "🏫" },
          { type: "mc",   prompt: "What does שׁוּק (Shuk) mean?", img: "🏪", heb: false, opts: ["Hospital","School","Market","Bank"], ans: "Market" },
          { type: "tf",   prompt: "True or False:", stmt: '"בַּיִת" (Bayit) means Home or House', ans: true },
          { type: "fill", prompt: "Complete:", before: "אֲנִי הוֹלֵךְ לַ", after: "", eng: "Ani holech la___ (I go to the market)", opts: ["שׁוּק","גָּדוֹל","מַיִם"], ans: "שׁוּק" },
          { type: "match",prompt: "Match the places", pairs: [["בַּיִת","Home 🏠"],["בֵּית סֵפֶר","School 🏫"],["שׁוּק","Market 🏪"],["בֵּית חוֹלִים","Hospital 🏥"]] },
        ],
      },
      {
        id: "9-2", title: "Directions", emoji: "🗺️",
        exercises: [
          { type: "tap",  prompt: "Tap the image for יָמִין (Right)", word: "יָמִין", imgs: ["➡️","⬅️","⬆️","⬇️"], lbels: ["Right","Left","Straight","Back"], ans: "➡️" },
          { type: "mc",   prompt: "What does שְׂמֹאל (Smol) mean?", img: "⬅️", heb: false, opts: ["Right","Straight","Left","Back"], ans: "Left" },
          { type: "tf",   prompt: "True or False:", stmt: '"יְשָׁר" (Yashar) means Straight ahead', ans: true },
          { type: "fill", prompt: "Complete: 'Turn ___'", before: "תִּסּוֹב", after: "", eng: "Tisov ___ (Turn right)", opts: ["יָמִין","גָּדוֹל","בֹּקֶר"], ans: "יָמִין" },
          { type: "match",prompt: "Match directions", pairs: [["יָמִין","Right ➡️"],["שְׂמֹאל","Left ⬅️"],["יְשָׁר","Straight ⬆️"],["אָחוֹר","Back ⬇️"]] },
        ],
      },
    ],
  },
  {
    id: 10, title: "מֶזֶג אֲוִיר", sub: "Weather & Seasons", emoji: "☀️", cv: "warning",
    lessons: [
      {
        id: "10-1", title: "Weather", emoji: "🌤️",
        exercises: [
          { type: "tap",  prompt: "Tap the image for גֶּשֶׁם (Rain)", word: "גֶּשֶׁם", imgs: ["☀️","🌧️","❄️","⛈️"], lbels: ["Sun","Rain","Snow","Storm"], ans: "🌧️" },
          { type: "mc",   prompt: "What does שֶׁלֶג (Sheleg) mean?", img: "❄️", heb: false, opts: ["Sun","Wind","Rain","Snow"], ans: "Snow" },
          { type: "tf",   prompt: "True or False:", stmt: '"חַם" (Cham) means Cold', ans: false },
          { type: "fill", prompt: "Complete: 'Today it is ___'", before: "הַיּוֹם", after: "", eng: "Hayom ___ (Today it is hot)", opts: ["חַם","גָּדוֹל","מָהֵר"], ans: "חַם" },
          { type: "match",prompt: "Match weather words", pairs: [["שֶׁמֶשׁ","Sun ☀️"],["גֶּשֶׁם","Rain 🌧️"],["שֶׁלֶג","Snow ❄️"],["רוּחַ","Wind 💨"]] },
        ],
      },
      {
        id: "10-2", title: "Seasons", emoji: "🍂",
        exercises: [
          { type: "tap",  prompt: "Tap the image for סְתָיו (Autumn)", word: "סְתָיו", imgs: ["🌸","☀️","🍂","❄️"], lbels: ["Spring","Summer","Autumn","Winter"], ans: "🍂" },
          { type: "mc",   prompt: "What does קַיִץ (Kayitz) mean?", img: "☀️", heb: false, opts: ["Spring","Summer","Autumn","Winter"], ans: "Summer" },
          { type: "tf",   prompt: "True or False:", stmt: '"חֹרֶף" (Choref) means Winter', ans: true },
          { type: "fill", prompt: "Complete: 'I love the ___'", before: "אֲנִי אוֹהֵב אֶת הַ", after: "", eng: "Ani ohev et ha___ (I love the summer)", opts: ["קַיִץ","גֶּשֶׁם","לַיְלָה"], ans: "קַיִץ" },
          { type: "match",prompt: "Match the seasons", pairs: [["אָבִיב","Spring 🌸"],["קַיִץ","Summer ☀️"],["סְתָיו","Autumn 🍂"],["חֹרֶף","Winter ❄️"]] },
        ],
      },
    ],
  },
];



export const GREEK_UNITS: Unit[] = [
  {
    id: 1, title: "Το Αλφάβητο", sub: "The Greek Alphabet", emoji: "🏛️", cv: "info",
    lessons: [
      {
        id: "g1-1", title: "Letters Α–Ε", emoji: "✨",
        exercises: [
          { type: "mc",   prompt: "Which letter is Alpha — the A sound?", img: "α", heb: false, opts: ["α (Alpha)", "β (Beta)", "γ (Gamma)", "δ (Delta)"], ans: "α (Alpha)" },
          { type: "tap",  prompt: 'Tap the letter called "Delta"', word: "δ", imgs: ["α","β","γ","δ"], lbels: ["Alpha","Beta","Gamma","Delta"], ans: "δ" },
          { type: "tf",   prompt: "True or False:", stmt: '"β" is called Beta', ans: true },
          { type: "mc",   prompt: "What sound does γ (Gamma) make?", img: "γ", heb: false, opts: ["B sound","G sound","D sound","E sound"], ans: "G sound" },
          { type: "match",prompt: "Match each letter to its name", pairs: [["α","Alpha"],["β","Beta"],["γ","Gamma"],["δ","Delta"]] },
        ],
      },
      {
        id: "g1-2", title: "Letters Ε–Κ", emoji: "🌟",
        exercises: [
          { type: "mc",   prompt: "Which letter is Theta — the TH sound?", img: "θ", heb: false, opts: ["ε (Epsilon)","ζ (Zeta)","θ (Theta)","κ (Kappa)"], ans: "θ (Theta)" },
          { type: "tap",  prompt: 'Tap the letter "Iota" — the smallest letter!', word: "ι", imgs: ["ζ","η","θ","ι"], lbels: ["Zeta","Eta","Theta","Iota"], ans: "ι" },
          { type: "tf",   prompt: "True or False:", stmt: '"κ" (Kappa) makes a K sound', ans: true },
          { type: "mc",   prompt: "What sound does ζ (Zeta) make?", img: "ζ", heb: false, opts: ["Z sound","E sound","TH sound","K sound"], ans: "Z sound" },
          { type: "match",prompt: "Match letters to names", pairs: [["ε","Epsilon"],["ζ","Zeta"],["η","Eta"],["θ","Theta"]] },
        ],
      },
    ],
  },
  {
    id: 2, title: "Χαιρετισμοί", sub: "Greetings & First Words", emoji: "🤝", cv: "success",
    lessons: [
      {
        id: "g2-1", title: "Greetings", emoji: "👋",
        exercises: [
          { type: "mc",   prompt: 'What does "χαῖρε" (chaire) mean?', img: "χαῖρε", heb: false, opts: ["Hello / Rejoice!","Goodbye","Thank you","Please"], ans: "Hello / Rejoice!" },
          { type: "tap",  prompt: 'Tap the word for "peace"', word: "εἰρήνη", imgs: ["χαῖρε","εἰρήνη","ἀγάπη","λόγος"], lbels: ["hello","peace","love","word"], ans: "εἰρήνη" },
          { type: "tf",   prompt: "True or False:", stmt: '"ἀγάπη" (agape) means love', ans: true },
          { type: "fill", prompt: "Complete the greeting:", before: "", after: "σοι", eng: "___ soi (Peace to you)", opts: ["εἰρήνη","ἄρτος","ὕδωρ"], ans: "εἰρήνη" },
          { type: "match",prompt: "Match each word to its meaning", pairs: [["χαῖρε","hello"],["εἰρήνη","peace"],["ἀγάπη","love"],["λόγος","word"]] },
        ],
      },
      {
        id: "g2-2", title: "First Nouns & Numbers", emoji: "🔢",
        exercises: [
          { type: "mc",   prompt: 'What does "ἄρτος" (artos) mean?', img: "🍞", heb: false, opts: ["Water","Bread","Dog","House"], ans: "Bread" },
          { type: "tap",  prompt: 'Tap the word for "water"', word: "ὕδωρ", imgs: ["ἄρτος","ὕδωρ","θεός","ἀγάπη"], lbels: ["bread","water","God","love"], ans: "ὕδωρ" },
          { type: "tf",   prompt: "True or False:", stmt: '"θεός" (theos) means God', ans: true },
          { type: "mc",   prompt: 'Which is the number "two"?', img: "2️⃣", heb: false, opts: ["εἷς","δύο","τρεῖς","ὕδωρ"], ans: "δύο" },
          { type: "match",prompt: "Match the numbers", pairs: [["εἷς","one"],["δύο","two"],["τρεῖς","three"]] },
        ],
      },
    ],
  },
];


export const ARAMAIC_UNITS: Unit[] = [
  {
    id: 1, title: "שְׁלָמָא", sub: "Greetings & First Words", emoji: "📜", cv: "teal",
    lessons: [
      {
        id: "a1-1", title: "Greetings", emoji: "👋",
        exercises: [
          { type: "mc",   prompt: 'What does "שְׁלָמָא" (shlama) mean?', img: "שְׁלָמָא", heb: true, opts: ["Peace / Hello","Bread","Water","Dog"], ans: "Peace / Hello" },
          { type: "tap",  prompt: 'Tap the word for "bread"', word: "לַחְמָא", imgs: ["שְׁלָמָא","לַחְמָא","מַיָּא","כַּלְבָּא"], lbels: ["peace","bread","water","dog"], ans: "לַחְמָא" },
          { type: "tf",   prompt: "True or False:", stmt: '"מַיָּא" (mayya) means water', ans: true },
          { type: "mc",   prompt: 'What does "כַּלְבָּא" (kalba) mean?', img: "🐕", heb: false, opts: ["Cat","Bread","Dog","House"], ans: "Dog" },
          { type: "match",prompt: "Match each word to its meaning", pairs: [["שְׁלָמָא","peace"],["לַחְמָא","bread"],["מַיָּא","water"],["כַּלְבָּא","dog"]] },
        ],
      },
      {
        id: "a1-2", title: "Numbers", emoji: "🔢",
        exercises: [
          { type: "mc",   prompt: 'Which is the number "one"?', img: "1️⃣", heb: false, opts: ["חַד","תְּרֵין","תְּלָתָא","מַיָּא"], ans: "חַד" },
          { type: "tap",  prompt: 'Tap the number "two"', word: "תְּרֵין", imgs: ["חַד","תְּרֵין","תְּלָתָא","לַחְמָא"], lbels: ["one","two","three","bread"], ans: "תְּרֵין" },
          { type: "tf",   prompt: "True or False:", stmt: '"תְּלָתָא" (telata) means three', ans: true },
          { type: "fill", prompt: "Complete the count:", before: "חַד, תְּרֵין,", after: "", eng: "one, two, ___", opts: ["תְּלָתָא","מַיָּא","שְׁלָמָא"], ans: "תְּלָתָא" },
          { type: "match",prompt: "Match the numbers", pairs: [["חַד","one"],["תְּרֵין","two"],["תְּלָתָא","three"]] },
        ],
      },
    ],
  },
];


export const COURSES: Record<Language, Course> = {
  hebrew:  { units: HEBREW_UNITS,  ttsLang: "he-IL", rtl: true,  wordName: "Hebrew" },
  greek:   { units: GREEK_UNITS,   ttsLang: "el-GR", rtl: false, wordName: "Greek" },
  aramaic: { units: ARAMAIC_UNITS, ttsLang: "he-IL", rtl: true,  wordName: "Aramaic" }, // Hebrew script → Hebrew voice
};


export function unitsFor(language: Language): Unit[] {
  return COURSES[language]?.units || HEBREW_UNITS;
}
export function lessonsFor(language: Language): UnitWithProgress[] {
  return unitsFor(language).flatMap((u) =>
    u.lessons.map((l) => ({ ...l, uid: u.id, ucv: u.cv }))
  );
}

export const DAILY_GOAL = 50;

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}



export function starsFor(mistakes: number): number {
  if (mistakes === 0) return 3;
  if (mistakes <= 2) return 2;
  return 1;
}



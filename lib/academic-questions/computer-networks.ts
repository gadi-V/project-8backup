import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Academic Computer Networks diagnostic bank (12Q).
 * Display name: "רשתות תקשורת מחשבים" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const COMPUTER_NETWORKS_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "net-q01-tcp-congestion-control-aimd-recovery",
    domain: "בקרת גודש ב-TCP ואלגוריתם AIMD",
    title:
      "רשתות תקשורת - בקרת גודש ב-TCP ואלגוריתם AIMD",
    context:
      "חיבור TCP Reno נמצא בשלב Congestion Avoidance עם גודל חלון גודש $cwnd = 32\\text{ MSS}$ וערך סף $ssthresh = 16\\text{ MSS}$. מתקבלים 3 אישורי הגעה כפולים (Triple Duplicate ACKs).",
    formulaLatex: "\\text{Loss via 3 Dup ACKs in TCP Reno} \\implies ssthresh = \\frac{cwnd}{2}, \\; cwnd = ssthresh + 3",
    instruction:
      "מה יהיו ערכי $ssthresh$ ו-$cwnd$ מיד לאחר זיהוי האירוע והכניסה ל-Fast Recovery?",
    options: [
      {
        id: "net-q01-opt1",
        plainText:
          "$ssthresh = 16\\text{ MSS}$, ו-$cwnd = 19\\text{ MSS}$ (ולאחר השלמת השחזור המהיר יתייצב על $16\\text{ MSS}$).",
        mathText: "ssthresh = 16\\text{ MSS}, \\quad cwnd = 16 + 3 = 19\\text{ MSS}",
        isCorrect: true,
        explanation:
          "נכון: ב-TCP Reno, קבלת 3 DUP ACKs מעידה על איבוד מקומי קל שבו חבילות אחרות עדיין זורמות ברשת ומייצרות ACKs (בניגוד ל-Timeout). האלגוריתם מבצע Fast Retransmit ו-Fast Recovery: ערך הסף מתעדכן למחצית החלון הנוכחי: $ssthresh = cwnd / 2 = 32 / 2 = 16\\text{ MSS}$. החלון הזמני מוגדר כ-$cwnd = ssthresh + 3\\text{ MSS} = 19\\text{ MSS}$ (תוספת 3 עבור 3 המקטעים שכבר עזבו את הרשת וגרמו ל-DUP ACKs). לאחר קבלת ה-ACK החדש, המעגל חוזר ל-Congestion Avoidance עם $cwnd = ssthresh = 16\\text{ MSS}$.",
      },
      {
        id: "net-q01-opt2",
        plainText:
          "$ssthresh = 16\\text{ MSS}$, ו-$cwnd = 1\\text{ MSS}$ תוך חזרה ל-Slow Start.",
        isCorrect: false,
        explanation:
          "שגוי: איפוס החלון ל-1 MSS וחזרה ל-Slow Start מתרחשים רק בעת פקיעת שעון עצר (Retransmission Timeout - RTO) או בגרסת TCP Tahoe הישנה.",
      },
      {
        id: "net-q01-opt3",
        plainText:
          "$ssthresh = 8\\text{ MSS}$, ו-$cwnd = 8\\text{ MSS}$.",
        isCorrect: false,
        explanation:
          "שגוי: ערך הסף נחתך ממחצית ה-$cwnd$ הנוכחי ($32/2=16$), ולא ממחצית ה-$ssthresh$ הישן.",
      },
      {
        id: "net-q01-opt4",
        plainText:
          "$ssthresh = 32\\text{ MSS}$, ו-$cwnd = 33\\text{ MSS}$ משום שהחיבור ממשיך בהרחבה ליניארית.",
        isCorrect: false,
        explanation:
          "שגוי: איבוד חבילה מחייב חיתוך החלון לפי עיקרון ה-Multiplicative Decrease (AIMD).",
      },
    ],
  },
  {
    id: "net-q02-distance-vector-count-to-infinity",
    domain: "ניתוב וקטור מרחק ובעיית הספירה לאינסוף",
    title:
      "רשתות תקשורת - ניתוב וקטור מרחק ובעיית הספירה לאינסוף",
    context:
      "בפרוטוקול ניתוב מסוג Distance Vector (כגון RIP המבוסס על בלמן-פורד), שלושה נתבים $A, B, C$ מחוברים בקו ישר: $A - B - C$. הקשר בין $B$ ל-$C$ מתנתק לפתע.",
    formulaLatex: "D_x(y) = \\min_v \\{ c(x, v) + D_v(y) \\}",
    instruction:
      "מה גורם לתופעת ״הספירה לאינסוף״ (Count-to-Infinity Problem), ואיזה מנגנון ממתן אותה חלקית עבור שני נתבים סמוכים?",
    options: [
      {
        id: "net-q02-opt1",
        plainText:
          "נתב $B$ חושב בטעות שלנתב $A$ יש נתיב חלופי אל $C$ בעלות 2 (שבפועל עבר דרך $B$ עצמו), ומשוב חיובי מעלה את העלות בהדרגה; מנגנון Split Horizon עם Poison Reverse פותר זאת עבור מעגלים בני 2 נתבים.",
        isCorrect: true,
        explanation:
          "נכון: כאשר הקו $B-C$ נופל, $B$ רואה ש-$A$ מפרסם מרחק 2 ל-$C$. $B$ אינו מודע לכך שהנתיב של $A$ עובר דרכו, ומעדכן את המרחק שלו ל-$1 + 2 = 3$. לאחר מכן $A$ מעדכן ל-4 וכן הלאה (ספירה לאינסוף). מנגנון Poison Reverse קובע שאם $A$ מנתב אל $C$ דרך $B$, $A$ ישקר ויפרסם ל-$B$ מרחק אינסוף ($D_A(C) = \\infty$), ובכך ימנע מ-$B$ לבחור בו חזרה.",
      },
      {
        id: "net-q02-opt2",
        plainText:
          "חבילות הניתוב נתקעות בתור אינסופי בגלל שימוש ב-TCP במקום UDP.",
        isCorrect: false,
        explanation:
          "שגוי: בעיית הספירה לאינסוף היא כשל אלגוריתמי טופולוגי בבלמן-פורד ואינה קשורה לפרוטוקול התעבורה (RIP למשל משתמש ב-UDP).",
      },
      {
        id: "net-q02-opt3",
        plainText:
          "הבעיה נוצרת עקב עומס יתר של טבלאות ה-NAT בנתבים, ונפתרת באמצעות שימוש ב-CIDR.",
        isCorrect: false,
        explanation:
          "שגוי: NAT ו-CIDR שייכים למיפוי וקיבוץ כתובות IP ואינם קשורים לעדכוני עלויות ניתוב.",
      },
      {
        id: "net-q02-opt4",
        plainText:
          "מנגנון Dijkstra Link-State מבצע ספירה לאינסוף בכל פעם שמתנתק כבל סיב אופטי.",
        isCorrect: false,
        explanation:
          "שגוי: אלגוריתם Link-State (כמו OSPF) מפיץ את הטופולוגיה המלאה לכל הנתבים, ולכן חסין לחלוטין מבעיית הספירה לאינסוף.",
      },
    ],
  },
  {
    id: "net-q03-ethernet-csma-cd-min-frame-size",
    domain: "שכבת הקו ואילוץ גודל מסגרת מינימלי ב-CSMA/CD",
    title:
      "רשתות תקשורת - שכבת הקו ואילוץ גודל מסגרת מינימלי ב-CSMA/CD",
    context:
      "ברשת אתרנט מקומית (Classic Ethernet) הפועלת בשיטת CSMA/CD בקצב העברת נתונים $R = 100\\text{ Mbps}$, אורך הכבל המקסימלי בין שתי תחנות קצה הוא $d = 1000\\text{ meters}$. מהירות התפשטות האות בכבל היא $v = 2 \\times 10^8\\text{ m/s}$.",
    formulaLatex: "t_{prop} = \\frac{d}{v}, \\quad t_{trans} \\ge 2 \\times t_{prop} \\implies \\frac{L_{min}}{R} \\ge 2 \\frac{d}{v}",
    instruction:
      "מהו האורך המינימלי $L_{\\min}$ של מסגרת (Frame) הנדרש כדי להבטיח זיהוי ודאי של התנגשויות (Collisions) על ידי התחנה המשדרת?",
    options: [
      {
        id: "net-q03-opt1",
        plainText:
          "$L_{\\min} = 1000\\text{ bits} = 125\\text{ bytes}$",
        mathText: "L_{\\min} = 2 \\times \\frac{1000}{2 \\times 10^8} \\times 100 \\times 10^6 = 1000\\text{ bits}",
        isCorrect: true,
        explanation:
          "נכון: במקרה הגרוע ביותר, התנגשות מתרחשת בקצה המרוחק ביותר של הכבל בדיוק ברגע שהאות מגיע (בזמן $t_{prop}$). אות ההתנגשות צריך לחזור כל הדרך חזרה אל התחנה המשדרת (עוד $t_{prop}$). לכן, זמן השידור של המסגרת חייב להיות ארוך לפחות מזמן הסיבוב המלא של הרשת (Round-Trip Propagation Time): $t_{trans} \\ge 2 t_{prop}$. נציב: $t_{prop} = \\frac{1000}{2 \\times 10^8} = 5\\mu\\text{s} \\implies 2 t_{prop} = 10\\mu\\text{s}$. אורך המסגרת המינימלי: $L_{\\min} = 2 t_{prop} \\times R = 10\\mu\\text{s} \\times 100\\text{ Mbps} = 1000\\text{ bits} = 125\\text{ bytes}$. אם המסגרת קצרה יותר, השידור יסתיים לפני שגל ההתנגשות יחזור, והשולח יחשוב בטעות שהמסגרת הגיעה בשלום.",
      },
      {
        id: "net-q03-opt2",
        plainText:
          "$L_{\\min} = 500\\text{ bits}$ (זמן התפשטות חד-כיווני בלבד)",
        isCorrect: false,
        explanation:
          "שגוי: התחשבות בזמן חד-כיווני מתעלמת מזמן החזרה של אות ההתנגשות חזרה לשולח.",
      },
      {
        id: "net-q03-opt3",
        plainText:
          "$L_{\\min} = 64\\text{ bytes}$ קבוע לכל רשת אתרנט ללא תלות באורך הכבל ובקצב השידור.",
        isCorrect: false,
        explanation:
          "שגוי: $64\\text{ bytes}$ (512 סיביות) הוא תקן הרשת המקורית של $10\\text{ Mbps}$ לאורך $2.5\\text{km}$; ברשת מהירה יותר או באורך שונה הנוסחה הפיזיקלית משתנה.",
      },
      {
        id: "net-q03-opt4",
        plainText:
          "$L_{\\min} = 1500\\text{ bytes}$ (כגודל ה-MTU הסטנדרטי)",
        isCorrect: false,
        explanation:
          "שגוי: 1500 בייטים הוא גודל המסגרת *המקסימלי* (MTU), ולא המינימלי.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "net-q04-tcp-flow-vs-congestion-control",
    domain: "בקרת זרימה (Flow Control) מול בקרת גודש (Congestion Control)",
    title:
      "רשתות תקשורת - בקרת זרימה (Flow Control) מול בקרת גודש (Congestion Control)",
    context:
      "בפרוטוקול TCP, המשדר מחשב את גודל חלון השידור האפקטיבי המותר ברגע נתון בהתבסס על שני משתנים נפרדים: $rwnd$ (Receive Window) ו-$cwnd$ (Congestion Window).",
    formulaLatex: "W = \\min(cwnd, \\; rwnd)",
    instruction:
      "מהו ההבדל המהותי בין תפקידו ומקורו של $rwnd$ לבין $cwnd$?",
    options: [
      {
        id: "net-q04-opt1",
        plainText:
          "$rwnd$ מנוהל על ידי הנתבים ברשת למניעת עומס במתגים, בעוד ש-$cwnd$ נקבע על ידי אפליקציית המשתמש.",
        isCorrect: false,
        explanation:
          "שגוי: נתבי IP ברשת האינטרנט אינם מנהלים חלונות TCP (עקרון End-to-End); $rwnd$ נקבע ע״י היעד בלבד.",
      },
      {
        id: "net-q04-opt2",
        plainText:
          "$rwnd$ מייצג בקרת זרימה (Flow Control) שנועדה למנוע הצפת זיכרון החוצץ (Buffer) של מקבל היעד, בעוד ש-$cwnd$ מייצג בקרת גודש (Congestion Control) המנוהלת עצמאית ע״י המשדר למניעת עומס יתר על נתבי הרשת שביניהם.",
        isCorrect: true,
        explanation:
          "נכון: $rwnd$ נמדד ומשודר באופן מפורש על ידי מקבל החבילות בכותרת ה-TCP (שדה Window Size), והוא משקף את נפח הזיכרון הפנוי בחוצץ הקליטה (Buffer) שלו, כדי שהמשדר לא יציף אותו מהר יותר מקצב קריאת האפליקציה (Flow Control). לעומת זאת, $cwnd$ אינו משודר ברשת אלא מחושב באופן דינמי וספקולטיבי על ידי המשדר בלבד (על בסיס ACKs ואיבודי חבילות), כדי להתאים את קצב השידור לקיבולת צוואר הבקבוק של הנתבים ברשת (Congestion Control).",
      },
      {
        id: "net-q04-opt3",
        plainText:
          "$rwnd$ משמש רק בחיבורי UDP, בעוד ש-$cwnd$ בלעדי ל-TCP.",
        isCorrect: false,
        explanation:
          "שגוי: ב-UDP אין מנגנוני חלונות, אין בקרת זרימה ואין בקרת גודש כלל.",
      },
      {
        id: "net-q04-opt4",
        plainText:
          "$rwnd$ נמדד תמיד במקטעים (Segments) ו-$cwnd$ נמדד במילי-שניות של RTT.",
        isCorrect: false,
        explanation:
          "שגוי: שני החלונות מייצגים כמויות נתונים (בייטים או יחידות MSS).",
      },
    ],
  },
  {
    id: "net-q05-ip-subnetting-cidr-longest-prefix",
    domain: "ניתוב IP, חלוקה לתת-רשתות (CIDR) ו-Longest Prefix Match",
    title:
      "רשתות תקשורת - ניתוב IP, חלוקה לתת-רשתות (CIDR) ו-Longest Prefix Match",
    context:
      "בטבלת ניתוב של נתב IP מופיעות ארבע הרשומות הבאות בשיטת CIDR:",
    formulaLatex: "\\begin{aligned} &R_1: 192.168.0.0/22 \\\\ &R_2: 192.168.2.0/23 \\\\ &R_3: 192.168.3.0/24 \\\\ &R_4: 0.0.0.0/0 \\text{ (Default)} \\end{aligned}",
    instruction:
      "חבילת IP מגיעה לנתב עם כתובת יעד $192.168.2.130$. לאיזו רשומה תנותב החבילה לפי עקרון Longest Prefix Match?",
    options: [
      {
        id: "net-q05-opt1",
        plainText:
          "לרשומה $R_1$, משום שהיא מכסה את טווח הכתובות הרחב ביותר.",
        isCorrect: false,
        explanation:
          "שגוי: חוק הניתוב דורש התאמה למסכה הארוכה והספציפית ביותר, ולא לטווח הרחב ביותר.",
      },
      {
        id: "net-q05-opt2",
        plainText:
          "לרשומה $R_2$ ($192.168.2.0/23$).",
        isCorrect: true,
        explanation:
          "נכון: נמיר את הבייט השלישי לבינארי: הכתובת היא $192.168.00000010_2.130$. נבדוק התאמות: 1. $R_1$ דורשת שוויון ב-22 סיביות (טווח $192.168.0.0$ עד $192.168.3.255$) - מתאים! 2. $R_2$ דורשת 23 סיביות (טווח $192.168.2.0$ עד $192.168.3.255$, תחילית $0000001_2$) - מתאים! 3. $R_3$ דורשת 24 סיביות עם בייט שלישי $3 = 00000011_2$ (טווח $192.168.3.0/24$) - לא מתאים כי הבייט הוא 2. 4. $R_4$ מתאים לכל כתובת (/0). הכלל Longest Prefix Match בוחר את המסכה הארוכה ביותר מבין ההתאמות החוקיות: $\\max(22, 23, 0) = 23$. לכן החבילה תנותב לפי $R_2$.",
      },
      {
        id: "net-q05-opt3",
        plainText:
          "לרשומה $R_3$ ($192.168.3.0/24$).",
        isCorrect: false,
        explanation:
          "שגוי: הבייט השלישי של הכתובת הוא 2 ולא 3, ולכן הכתובת אינה תואמת כלל לרשומה $R_3$.",
      },
      {
        id: "net-q05-opt4",
        plainText:
          "לרשומת ברירת המחדל $R_4$ משום שחלה התנגשות בין $R_1$ ל-$R_2$.",
        isCorrect: false,
        explanation:
          "שגוי: אין שימוש בברירת מחדל כאשר קיימת רשומה ספציפית תואמת; היררכיית האורכים פותרת כל חפיפה באופן חד-ערכי.",
      },
    ],
  },
  {
    id: "net-q06-dns-iterative-vs-recursive-queries",
    domain: "שירות שמות מתחם (DNS) ושאילתות רקורסיביות מול איטרטיביות",
    title:
      "רשתות תקשורת - שירות שמות מתחם (DNS) ושאילתות רקורסיביות מול איטרטיביות",
    context:
      "מחשב לקוח מעוניין לפענח את כתובת ה-IP של האתר `www.technion.ac.il`. שרת ה-DNS המקומי של ספק האינטרנט (Local DNS Server) פונה לרשת ה-DNS העולמית.",
    instruction:
      "כיצד מתבצע תהליך הפענוח הטיפוסי בעזרת שרתי ה-Root, TLD ו-Authoritative DNS?",
    options: [
      {
        id: "net-q06-opt1",
        plainText:
          "שרת ה-Root פונה בעצמו ישירות לשרת של הטכניון, מקבל את הכתובת ומחזיר אותה ללקוח.",
        isCorrect: false,
        explanation:
          "שגוי: שרתי ה-Root העולמיים אינם מבצעים שאילתות רקורסיביות עקב עומס; הם פועלים בשאילתות איטרטיביות ומחזירים הפניה (Referral) לשרת הבא.",
      },
      {
        id: "net-q06-opt2",
        plainText:
          "הלקוח פונה לשאילתה רקורסיבית לשרת המקומי שלו; השרת המקומי מבצע סדרת שאילתות איטרטיביות מול שרת ה-Root (שמפנה ל-`.il`), שרת ה-TLD (שמפנה ל-`ac.il`), ולבסוף מול השרת המוסמך של `technion.ac.il` שמחזיר את רשומת ה-A.",
        isCorrect: true,
        explanation:
          "נכון: זהו המודל התקני באינטרנט: הקשר בין תחנת הקצה לשרת ה-DNS המקומי הוא בדרך כלל רקורסיבי (הלקוח מבקש תשובה סופית בלבד). השרת המקומי פועל באופן איטרטיבי מול ההיררכיה: הוא פונה ל-Root Server שמחזיר את כתובת שרתי ה-TLD של סיומת המדינה (`.il`). לאחר מכן הוא פונה לשרת ה-TLD שמפנה אותו לשרת ה-Authoritative המוסמך של הדומיין `technion.ac.il`, וממנו נשלפת רשומת ה-A המכילה את כתובת ה-IP הסופית (שנשמרת ב-Cache המקומי עם ערך TTL).",
      },
      {
        id: "net-q06-opt3",
        plainText:
          "הפענוח מתבצע תמיד מעל פרוטוקול TCP בפורט 80 כדי להבטיח אבטחת מידע.",
        isCorrect: false,
        explanation:
          "שגוי: DNS רגיל משתמש ב-UDP בפורט 53 מטעמי מהירות וחיסכון בתקורה.",
      },
      {
        id: "net-q06-opt4",
        plainText:
          "המחשב הלקוח שולח הודעת שידור (Broadcast) ברשת ה-WAN המגיעה בו-זמנית לכל שרתי ה-DNS בעולם.",
        isCorrect: false,
        explanation:
          "שגוי: Broadcast מוגבל לרשת מקומית (LAN) ונחסם ע״י נתבים; ניתוב DNS באינטרנט הוא Unicast.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "net-q07-tcp-time-wait-state-msl",
    domain: "סגירת חיבור TCP ומצב TIME_WAIT",
    title:
      "רשתות תקשורת - סגירת חיבור TCP ומצב TIME_WAIT",
    context:
      "בפרוטוקול TCP, הצד שיוזם את סגירת החיבור (Active Close) שולח הודעת FIN, מקבל ACK, לאחר מכן מקבל FIN מהצד השני ושולח ACK סופי, ונכנס למצב TIME_WAIT למשך $2 \\times \\text{MSL}$ (Maximum Segment Lifetime).",
    formulaLatex: "T_{\\text{wait}} = 2 \\times \\text{MSL} \\quad (\\approx 2 \\times 60\\text{s} = 120\\text{s})",
    instruction:
      "מדוע חיוני שהיוזם ימתין במצב TIME_WAIT למשך זמן זה לפני שחרור הסוקט וסגירתו המוחלטת?",
    options: [
      {
        id: "net-q07-opt1",
        plainText:
          "כדי לאפשר למהדר למחוק את קוד התוכנית מזיכרון ה-RAM בצורה בטוחה.",
        isCorrect: false,
        explanation:
          "שגוי: מצב TIME_WAIT הוא תכונה של מחסנית הרשת במערכת ההפעלה ואינו קשור למהדר.",
      },
      {
        id: "net-q07-opt2",
        plainText:
          "כדי לאפשר להמשיך להעביר נתונים חדשים בערוץ בכיוון אחד בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: במצב TIME_WAIT החיבור סגור לחלוטין להעברת נתוני אפליקציה חדשים.",
      },
      {
        id: "net-q07-opt3",
        plainText:
          "כדי להבטיח שה-ACK הסופי יגיע ליעדו (ואם יאבד, לשלוח ACK חוזר בתגובה ל-FIN שישודר שוב), וכדי לוודא שכל המקטעים הישנים שנתקעו ברשת ידעכו וימותו לפני שייפתח חיבור חדש עם אותם פורטים (Socket Pair).",
        isCorrect: true,
        explanation:
          "נכון: שתי סיבות קריטיות לקיום $2\\text{MSL}$: 1. אמינות סגירה: אם ה-ACK האחרון שנשלח אבד ברשת, הצד השני יבצע Retransmission של ה-FIN שלו. אם היוזם היה נסגר מיד, הוא היה מגיב ב-RST במקום ב-ACK והצד השני היה נסגר בשגיאה. 2. מניעת שיבוש חיבורים עתידיים: חבילות משוטטות שהתעכבו בנתבים ברשת עלולות להגיע מאוחר יותר; המתנה של $2\\text{MSL}$ מבטיחה שכל חבילה כזו תפוג לפי ה-TTL שלה ולא תתפרש כנתון חוקי בחיבור חדש שישתמש במקרה באותם מספרי פורטים בדיוק.",
      },
      {
        id: "net-q07-opt4",
        plainText:
          "כדי לאפס את שעון החומרה של המעבד בהתאם לתקן IEEE 802.3.",
        isCorrect: false,
        explanation:
          "שגוי: תקן 802.3 מגדיר את שכבת הקו של אתרנט ולא את שכבת התעבורה TCP.",
      },
    ],
  },
  {
    id: "net-q08-ethernet-spanning-tree-protocol-loops",
    domain: "מתגי שכבה 2 ופרוטוקול עץ פורש (Spanning Tree Protocol)",
    title:
      "רשתות תקשורת - מתגי שכבה 2 ופרוטוקול עץ פורש (Spanning Tree Protocol)",
    context:
      "ברשת מקומית מרובת מתגים (Switches) המחוברים ביניהם עם מסלולים חלופיים (מעגלים פיזיים לצורך שרידות), מופעל פרוטוקול Spanning Tree (STP - IEEE 802.1D).",
    instruction:
      "מה היה מתרחש ברשת מקומית המכילה לולאה פיזית סגורה בין מתגים ללא הפעלת STP, ומדוע?",
    options: [
      {
        id: "net-q08-opt1",
        plainText:
          "המתגים היו מנתבים את כל החבילות דרך שער ברירת המחדל ללא הפרעה.",
        isCorrect: false,
        explanation:
          "שגוי: מתגי שכבה 2 אינם מכירים שערי ברירת מחדל של שכבת הרשת (IP Default Gateway).",
      },
      {
        id: "net-q08-opt2",
        plainText:
          "הרוחב-פס של הרשת היה מוכפל פי מספר המעגלים הודות למקבול אוטומטי.",
        isCorrect: false,
        explanation:
          "שגוי: מעגלים בשכבה 2 יוצרים אסון קריסה ולא מקבול תעבורה (אלא אם משתמשים בפרוטוקול אגריגציה כמו LACP).",
      },
      {
        id: "net-q08-opt3",
        plainText:
          "הודעות שידור (Broadcast) היו משוכפלות אינסופית בלולאה ויוצרות ״סופת שידור״ (Broadcast Storm) המשביתה את הרשת, משום שבכותרת מסגרת אתרנט אין שדה TTL להגבלת זמן חיים.",
        isCorrect: true,
        explanation:
          "נכון: מתגי אתרנט מציפים (Flooding) מסגרות Broadcast (וכן Unicast עם כתובת יעד לא מוכרת) לכל הפורטים פרט לפורט הכניסה. אם קיים מעגל פיזי סגור, המסגרות מוחזרות למתגים אחרים, משוכפלות שוב ושוב, ומסתובבות בלולאה אינסופית. מכיוון שבשכבה 2 (כותרת Ethernet) אין שדה TTL (בניגוד לחבילות IP בשכבה 3), חבילות אלו אינן מתות לעולם, התעבורה גדלה אקספוננציאלית תוך שניות, טבלאות ה-MAC נהרסות, והרשת קורסת לחלוטין. STP מונע זאת ע״י חסימה לוגית של פורטים עודפים ליצירת עץ נטול מעגלים.",
      },
      {
        id: "net-q08-opt4",
        plainText:
          "כתובות ה-MAC של כל המחשבים היו מומרות לכתובות IPv6.",
        isCorrect: false,
        explanation:
          "שגוי: אין כל קשר בין לולאות מיתוג לבין כתובות פרוטוקול האינטרנט IPv6.",
      },
    ],
  },
  {
    id: "net-q09-wireless-hidden-terminal-rts-cts",
    domain: "רשתות אלחוטיות (802.11) ומנגנון RTS/CTS",
    title:
      "רשתות תקשורת - רשתות אלחוטיות (802.11) ומנגנון RTS/CTS",
    context:
      "ברשת אלחוטית (Wi-Fi), שתי תחנות $A$ ו-$C$ משדרות לאותה נקודת גישה $B$. $A$ ו-$C$ נמצאות מחוץ לטווח הקליטה זו של זו (Hidden Terminal Problem), אך שתיהן בטווח של $B$.",
    formulaLatex: "A \\to B \\leftarrow C \\quad (A \\text{ and } C \\text{ cannot hear each other})",
    instruction:
      "כיצד פותר מנגנון חילופי ההודעות RTS/CTS (Request to Send / Clear to Send) את בעיית התחנה הנסתרת?",
    options: [
      {
        id: "net-q09-opt1",
        plainText:
          "תחנה $A$ מגבירה את עוצמת השידור שלה כך שתחנה $C$ תשמע אותה בהכרח.",
        isCorrect: false,
        explanation:
          "שגוי: הגברת עוצמה אינה פתרון פרוטוקולי ומוגבלת ע״י תקני קרינה וסוללה.",
      },
      {
        id: "net-q09-opt2",
        plainText:
          "נקודת הגישה $B$ פועלת כמתג תדרי ומעבירה את $C$ לתדר רדיו נפרד לחלוטין.",
        isCorrect: false,
        explanation:
          "שגוי: מנגנון CSMA/CA פועל על ערוץ תדר משותף יחיד ואינו מחייב חלוקת תדרים (FDMA).",
      },
      {
        id: "net-q09-opt3",
        plainText:
          "כאשר $A$ שולחת מסגרת RTS קצרה ל-$B$, נקודת הגישה $B$ עונה בשידור מסגרת CTS שמופצת לכל סביבתה; תחנה $C$ שומעת את ה-CTS ומעדכנת את וקטור ההקצאה (NAV) שלה לשתיקה עד לסיום שידור הנתונים של $A$.",
        isCorrect: true,
        explanation:
          "נכון: תחנה $A$ אינה יכולה להתריע ישירות ל-$C$. לכן היא שולחת ל-$B$ בקשת שידור קצרה (RTS). נקודת הגישה $B$ עונה בהודעת אישור שידור (CTS) הנשמעת על ידי כל התחנות בטווח שלה — כולל תחנה $C$ הנסתרת. הודעת ה-CTS מכילה את משך הזמן המשוער הנדרש להשלמת העברת הנתונים. תחנה $C$ שומעת את ה-CTS, מבינה שמישהו עומד לשדר ל-$B$, ומעדכנת את מד השתיקה הווירטואלי שלה (Network Allocation Vector - NAV) כדי להימנע מכל שידור בזמן זה, מה שמונע התנגשות ב-$B$.",
      },
      {
        id: "net-q09-opt4",
        plainText:
          "המנגנון מאלץ את כל התחנות לבצע זיהוי התנגשויות בחומרה מסוג CSMA/CD.",
        isCorrect: false,
        explanation:
          "שגוי: ברשת אלחוטית לא ניתן לבצע זיהוי התנגשויות (CD) תוך כדי שידור משום שעוצמת האות המשודר מעוורת לחלוטין את מקלט הרדיו העצמי; לכן משתמשים במניעת התנגשויות (CSMA/CA).",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "net-q10-sliding-window-sequence-number-constraint",
    domain: "פרוטוקולי חלון הזזה (Selective Repeat) וטווח מספרי סדרה",
    title:
      "רשתות תקשורת - פרוטוקולי חלון הזזה (Selective Repeat) וטווח מספרי סדרה",
    context:
      "בפרוטוקול העברה אמינה מסוג Selective Repeat (SR), גודל חלון המשדר הוא $W_S$ וגודל חלון המקבל הוא $W_R = W_S$. מספרי הסדרה של החבילות מקודדים בשדה בן $k$ סיביות (טווח מספרים מ-$0$ עד $2^k - 1$).",
    formulaLatex: "W_S + W_R \\le 2^k \\implies W \\le 2^{k-1}",
    instruction:
      "מהו החסם העליון המדויק על גודל החלון $W$ כדי להבטיח שלא תתרחש עמימות (Ambiguity) בין חבילות חדשות לחבילות משוכפלות ישנות עקב עטיפת מספרי הסדרה?",
    options: [
      {
        id: "net-q10-opt1",
        plainText:
          "$W \\le 2^k - 1$",
        isCorrect: false,
        explanation:
          "שגוי: חסם זה מתאים לפרוטוקול Go-Back-N שבו גודל חלון הקליטה הוא 1 ($W_S + 1 \\le 2^k$), אך ב-Selective Repeat הוא גורם לעמימות וכשל נתונים חמור.",
      },
      {
        id: "net-q10-opt2",
        plainText:
          "$W \\le 2^k$",
        isCorrect: false,
        explanation:
          "שגוי: אם $W = 2^k$, החלון עוטף את עצמו לחלוטין והמקבל אינו מסוגל להבדיל בין חבילה $0$ חדשה לחבילה $0$ ישנה.",
      },
      {
        id: "net-q10-opt3",
        plainText:
          "$W = 2^{k+1}$",
        isCorrect: false,
        explanation:
          "שגוי: גודל חלון גדול ממספר הסדרה הכולל אינו מוגדר מתמטית.",
      },
      {
        id: "net-q10-opt4",
        plainText:
          "$W \\le 2^{k-1}$ (גודל החלון המקסימלי אינו יכול לעלות על מחצית ממרחב מספרי הסדרה: $W_S \\le 2^k / 2$).",
        mathText: "W \\le 2^{k-1} = \\frac{2^k}{2}",
        isCorrect: true,
        explanation:
          "נכון: ב-Selective Repeat, המקבל מקדם את חלונו כאשר הוא מקבל חבילות בסדר. נניח שכל ה-ACKs עבור חלון מלא בגודל $W$ אובדים ברשת. המשדר ישלח שוב את חבילות החלון הישן (החל מ-0). במקביל, המקבל שכבר אישר אותן קידם את חלונו קדימה לטווח $[W, 2W-1]$. כדי שלא תהיה שום חפיפה בין מספרי הסדרה של החלון הישן לבין החלון החדש שאיפוסו עטף את המרחב, נדרש שסכום גדלי החלונות לא יעלה על גודל מרחב המספרים: $W_S + W_R \\le 2^k$. כאשר $W_S = W_R = W$, נקבל $2W \\le 2^k \\implies W \\le 2^{k-1}$.",
      },
    ],
  },
  {
    id: "net-q11-bgp-routing-policy-valley-free",
    domain: "ניתוב בין-דומיינים ופרוטוקול BGP",
    title:
      "רשתות תקשורת - ניתוב בין-דומיינים ופרוטוקול BGP",
    context:
      "פרוטוקול BGP (Border Gateway Protocol) מנהל את הניתוב בין מערכות אוטונומיות (AS) באינטרנט באמצעות מודל יחסים מסחריים: ספק-לקוח (Customer-Provider) ועמיתים (Peer-to-Peer).",
    instruction:
      "מהו עקרון הניתוב ללא עמקים (Valley-Free Routing) המיושם על ידי רוב ספקי האינטרנט ב-BGP משיקולים כלכליים?",
    options: [
      {
        id: "net-q11-opt1",
        plainText:
          "כל AS מעביר חבילות דרך הנתיב בעל מספר הנתבים הפיזיים (Hop Count) הקטן ביותר.",
        isCorrect: false,
        explanation:
          "שגוי: BGP הוא פרוטוקול מבוסס מדיניות כלכלית והסכמים מסחריים (Policy-based Routing) ולא אלגוריתם מציאת מסלול מינימלי בסיסי.",
      },
      {
        id: "net-q11-opt2",
        plainText:
          "אסור לאף נתב לשדר הודעות עדכון BGP בשעות העומס של רשת האינטרנט.",
        isCorrect: false,
        explanation:
          "שגוי: עדכוני BGP מתבצעים בזמן אמת באופן מונחה-אירועים (Event-driven) בכל שינוי נתיב.",
      },
      {
        id: "net-q11-opt3",
        plainText:
          "תעבורה מנותבת תמיד אך ורק דרך מערכות אוטונומיות ברמת Tier-1 בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: תעבורה זורמת ישירות בין לקוחות ועמיתים מקומיים בנקודות IXP כדי לחסוך תשלום ל-Tier-1.",
      },
      {
        id: "net-q11-opt4",
        plainText:
          "מערכת אוטונומית (AS) תסכים להעביר תעבורת מעבר (Transit) עבור לקוחותיה המשלמים לה, אך לעולם לא תעביר תעבורה בין שני ספקים שלה או בין שני עמיתים (Peers) שלה ללא תשלום (תעבורה נעה רק במעלה היררכיית הלקוחות ואז במורד, ללא \"עמקים\" כלכליים).",
        isCorrect: true,
        explanation:
          "נכון: כלל ה-Valley-Free קובע מפורשות: 1. מסלול חוקי מכיל רצף של קשרי Customer-to-Provider (עלייה בהיררכיה), אופציונלית קשר Peer-to-Peer בודד בשיא, ולאחריו רצף קשרי Provider-to-Customer (ירידה). 2. אם AS מקבל חבילה מספק או מעמית, הוא יעביר אותה אך ורק ללקוחות שלו (משום שהלקוח משלם לו על תעבורה). הוא לעולם לא יעביר תעבורה מספק אחד לספק אחר או בין עמיתים, משום שפעולה כזו תהפוך אותו לצינור מעבר בחינם שבו הוא משלם על משאבי רוחב פס מבלי להרוויח דבר.",
      },
    ],
  },
  {
    id: "net-q12-tls-handshake-forward-secrecy-dh",
    domain: "אבטחת רשתות, פרוטוקול TLS וסודיות מושלמת קדימה (PFS)",
    title:
      "רשתות תקשורת - אבטחת רשתות, פרוטוקול TLS וסודיות מושלמת קדימה (PFS)",
    context:
      "בפרוטוקול TLS (Transport Layer Security) המאבטח את תעבורת ה-HTTPS, משווים בין שתי שיטות להחלפת מפתחות סימטריים: הצפנת מפתח מושב באמצעות RSA, מול שימוש ב-Ephemeral Diffie-Hellman (DHE / ECDHE).",
    instruction:
      "מהו היתרון האבטחתי המכריע של שימוש ב-ECDHE המקנה תכונת ״סודיות מושלמת קדימה״ (Perfect Forward Secrecy - PFS)?",
    options: [
      {
        id: "net-q12-opt1",
        plainText:
          "ECDHE מבטל לחלוטין את הצורך בתעודות דיגיטליות (Certificates) ואינו דורש גורם מאשר (CA).",
        isCorrect: false,
        explanation:
          "שגוי: תעודה דיגיטלית חתומה על ידי CA נדרשת תמיד כדי לאמת את זהות השרת ולמנוע מתקפת אדם-באמצע (Man-in-the-Middle).",
      },
      {
        id: "net-q12-opt2",
        plainText:
          "ECDHE משתמש בהצפנה סימטרית בלבד ללא שימוש באלגוריתמים אסימטריים.",
        isCorrect: false,
        explanation:
          "שגוי: דיפי-הלמן על עקומות אליפטיות הוא פרוטוקול אסימטרי מובהק.",
      },
      {
        id: "net-q12-opt3",
        plainText:
          "ECDHE מאיץ את קצב העברת הנתונים של TCP על ידי ביטול בדיקות תקינות השגיאות (Checksum).",
        isCorrect: false,
        explanation:
          "שגוי: שכבת האבטחה אינה משנה את מנגנוני הבקרה של שכבת התעבורה TCP.",
      },
      {
        id: "net-q12-opt4",
        plainText:
          "מפתחות ההצפנה הזמניים מיוצרים מחדש ונזרקים בכל חיבור (Ephemeral), כך שגם אם תוקף יקליט את כל התעבורה המוצפנת של משתמש וישיג בעתיד את המפתח הפרטי הראשי של השרת, הוא לא יוכל לפענח את שיחות העבר.",
        isCorrect: true,
        explanation:
          "נכון: בשיטת RSA המסורתית, מפתח המושב מוצפן באמצעות המפתח הציבורי הקבוע של השרת. אם תוקף מקליט תעבורה במשך חודשים ומשיג בעתיד את המפתח הפרטי של השרת (למשל עקב פריצה פיזית או צו בית משפט), הוא יכול לפענח רטרואקטיבית את כל היסטוריית התקשורת שהוקלטה. ב-ECDHE, לכל חיבור מיוצרים מפתחות דיפי-הלמן זמניים (Ephemeral) הנמחקים מהזיכרון מיד בסיום ההתקשרות. המפתח הפרטי של השרת משמש רק לחתימה דיגיטלית על האותנטיות של חילופי ה-DH בעת ה-Handshake, ולכן חשיפתו העתידית אינה מאפשרת לחשב את מפתחות המושב הישנים (זוהי בדיוק ההגדרה של Perfect Forward Secrecy).",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_COMPUTER_NETWORKS_QUESTIONS =
  COMPUTER_NETWORKS_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from TCP AIMD / distance vector / CSMA-CD (Q1–3)
 * - 1 from flow vs congestion / CIDR / DNS (Q4–6)
 * - 1 from TIME_WAIT / STP / RTS-CTS / SR window / BGP / TLS (Q7–12)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleComputerNetworksOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = COMPUTER_NETWORKS_QUESTIONS.slice(0, 3);
  const groupB = COMPUTER_NETWORKS_QUESTIONS.slice(3, 6);
  const groupC = COMPUTER_NETWORKS_QUESTIONS.slice(6, 12);

  if (groupA.length === 0 || groupB.length === 0 || groupC.length === 0) {
    return [];
  }

  const pickedA = groupA[Math.floor(Math.random() * groupA.length)];
  const pickedB = groupB[Math.floor(Math.random() * groupB.length)];
  const pickedC = groupC[Math.floor(Math.random() * groupC.length)];

  const sampled = [pickedA, pickedB, pickedC].filter(
    (q): q is AcademicDiagnosticQuestion => Boolean(q)
  );

  if (sampled.length !== 3) return [];

  for (let i = sampled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sampled[i], sampled[j]] = [sampled[j], sampled[i]];
  }

  return sampled;
}

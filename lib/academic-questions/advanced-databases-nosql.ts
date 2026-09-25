import type { AcademicDiagnosticQuestion } from "./types";

/**
 * Advanced databases & NoSQL diagnostic bank (12Q).
 * Display name: "בסיסי נתונים מתקדמים ומערכות NoSQL" — no institutional course codes.
 * Answer-key contract (hard): Q1–3 → A, Q4–6 → B, Q7–9 → C, Q10–12 → D.
 */
export const ADVANCED_DATABASES_NOSQL_QUESTIONS: AcademicDiagnosticQuestion[] = [
  // =========================================================================
  // בלוק 1: שאלות 1–3 — תשובה 1 (אינדקס 0) נכונה
  // =========================================================================
  {
    id: "adnosql-q01-lsm-trees-write-amplification",
    domain: "מנועי אחסון מבוססי LSM-Tree",
    title:
      "בסיסי נתונים מתקדמים ומערכות NoSQL - מנועי אחסון מבוססי LSM-Tree",
    context:
      "בסיסי נתונים ממשפחת ה-Column-Family ומנועי אחסון NoSQL מודרניים משתמשים במבנה Log-Structured Merge-Tree (LSM-Tree), המורכב מ-MemTable ב-RAM ומבני SSTable בלתי-משתנים (Immutable) בדיסק המחולקים לרמות (Levels).",
    formulaLatex:
      "\\text{Write Amplification} = \\frac{\\text{Bytes Written to Storage}}{\\text{Bytes Written by Application}}",
    instruction:
      "מדוע מבנה ה-LSM-Tree עדיף באופן דרמטי על פני B+ Tree עבור עומסי כתיבה כבדים (Write-Intensive Workloads), ומהו המחיר שמשלמים על כך (Compaction Overhead)?",
    options: [
      {
        id: "adnosql-q01-opt1",
        plainText:
          "LSM-Tree ממיר כתיבות אקראיות לכתיבות סדרתיות רציפות בדיסק ($O(1)$ ל-MemTable ו-Append-Only ב-Commit Log), מה שממקסם את קצב הכתיבה בחומרה; המחיר הוא הגדלת פקטור הגברת הכתיבה (Write Amplification) ותקורת I/O בזמן מיזוג ודחיסה (Compaction) של קובצי ה-SSTable ברקע.",
        isCorrect: true,
        explanation:
          "נכון: 1. יתרון הכתיבה: ב-B+ Tree מסורתי, עדכון שורה דורש איתור הדף בדיסק וביצוע כתיבה אקראית (Random I/O), פעולה איטית ביותר. ב-LSM-Tree, כל כתיבה נכנסת מיידית לזיכרון RAM למבנה ממוין (MemTable, לרוב Skip-List) ונרשמת סדרתית בקובץ יומן (WAL). כאשר ה-MemTable מתמלא, הוא נשפך לדיסק כקובץ SSTable רציף ברצף בלוקים סדרתי (Sequential I/O), המנצל $100\\%$ מרוחב הפס של המדיה. 2. מחיר ה-Compaction: מכיוון ש-SSTables אינם ניתנים לשינוי (Immutable), עדכונים ומחיקות מצטברים כרשומות חדשות. תהליך ה-Compaction חייב לקרוא ברקע קבצים ברמות שונות, למזג אותם, להסיר גרסאות ישנות ולכתוב קבצים חדשים. פעולה זו גורמת ל-Write/Read Amplification משמעותי ועומסי I/O תקופתיים.",
      },
      {
        id: "adnosql-q01-opt2",
        plainText:
          "LSM-Tree מבטל לחלוטין את הצורך בשימוש בזיכרון RAM ושומר נתונים ישירות בדיסק אופטי.",
        isCorrect: false,
        explanation:
          "שגוי: ה-MemTable ב-RAM הוא לב המערכת של LSM-Tree, שבלעדיו לא ניתן למיין נתונים מראש.",
      },
      {
        id: "adnosql-q01-opt3",
        plainText:
          "LSM-Tree מבצע חיפושי קריאה נקודתיים ב-$O(1)$ ללא צורך במסנני בלום.",
        isCorrect: false,
        explanation:
          "שגוי: קריאות ב-LSM-Tree הן איטיות יותר מ-B+ Tree (עשויות לדרוש סריקת מספר קובצי SSTable שונים), ולכן חובה להשתמש במסנני בלום כדי להימנע מקריאות דיסק מיותרות.",
      },
      {
        id: "adnosql-q01-opt4",
        plainText:
          "ב-LSM-Tree אין תהליך דחיסה (Compaction) משום שהנתונים נמחקים מעצמם לאחר שבוע.",
        isCorrect: false,
        explanation:
          "שגוי: ללא Compaction דיסק המערכת יתמלא עד אפס מקום תוך שעות עקב הצטברות גרסאות כפולות.",
      },
    ],
  },
  {
    id: "adnosql-q02-distributed-transactions-2pc-blocking",
    domain: "טרנזקציות מבוזרות ופרוטוקול 2PC",
    title:
      "בסיסי נתונים מתקדמים ומערכות NoSQL - טרנזקציות מבוזרות ופרוטוקול 2PC",
    context:
      "בביצוע טרנזקציה מבוזרת המשתרעת על פני מספר מסדי נתונים עצמאיים, מפעילים פרוטוקול נעילה דו-שלבי אטומי (Two-Phase Commit, 2PC) המנוהל ע״י מתאם (Coordinator) מול משתתפים (Participants/Cohorts).",
    formulaLatex:
      "\\text{Phase 1: Prepare (Vote Commit / Abort)}, \\quad \\text{Phase 2: Commit / Abort}",
    instruction:
      "מהו הכשל הארכיטקטוני החמור ביותר של פרוטוקול 2PC הגורם לו להיחשב לפרוטוקול חוסם (Blocking Protocol)?",
    options: [
      {
        id: "adnosql-q02-opt1",
        plainText:
          "אם המתאם (Coordinator) קורס בדיוק לאחר שכל המשתתפים הצביעו VOTE_COMMIT בשלב 1 ולפני ששידר את פקודת ההכרעה של שלב 2, המשתתפים נותרים במצב אי-ודאות (In-Doubt State), מנועים מלהחליט עצמאית ומחזיקים את כל מנעולי הנתונים נעולים לזמן בלתי מוגבל, מה שמשתק את המערכת כולה.",
        isCorrect: true,
        explanation:
          "נכון: זוהי חולשת היסוד של 2PC הקלאסי: לאחר שמשתתף מצביע YES / VOTE_COMMIT, הוא מוותר על האוטונומיה שלו; הוא התחייב לבצע Commit אם יידרש, אך אינו יודע האם משתתף אחר הצביע ABORT. אם המתאם קורס באותו חלון זמן קריטי, המשתתפים אינם יכולים לבצע Commit (כי אולי מישהו אחר ביטל) ואינם יכולים לבצע Abort (כי אולי המתאם שידר Commit לחלקם). המשתתפים תקועים (Blocked) ונאלצים להחזיק מנעולי כתיבה בלעדיים על הנתונים עד להתאוששות המתאם. פרוטוקול 3PC או אלגוריתמי קונצנזוס מבוססי Paxos/Raft נועדו למנוע חסימה זו.",
      },
      {
        id: "adnosql-q02-opt2",
        plainText:
          "הפרוטוקול דורש שכל השרתים יהיו בעלי אותו מספר IP ומותקנים באותו ארון תקשורת.",
        isCorrect: false,
        explanation:
          "שגוי: 2PC פותח עבור מערכות מבוזרות גאוגרפית ברשתות WAN.",
      },
      {
        id: "adnosql-q02-opt3",
        plainText:
          "2PC אינו תומך בהצבעת Abort של משתתפים ומאלץ Commit תמיד.",
        isCorrect: false,
        explanation:
          "שגוי: אם משתתף אחד מצביע Abort, הטרנזקציה מתבטלת גלובלית באופן מיידי.",
      },
      {
        id: "adnosql-q02-opt4",
        plainText: "הפרוטוקול פועל אך ורק מעל חיבורי Bluetooth מוצפנים.",
        isCorrect: false,
        explanation:
          "שגוי: הפרוטוקול הוא אלגוריתם ברמת האפליקציה/מסד הנתונים ואינו תלוי בפרוטוקול חומרה ספציפי.",
      },
    ],
  },
  {
    id: "adnosql-q03-document-stores-mongodb-write-concern-j",
    domain: "Write Concern במסדי מסמכים",
    title:
      "בסיסי נתונים מתקדמים ומערכות NoSQL - מסדי מסמכים ומדיניות כתיבה",
    context:
      'באשכול MongoDB מבוסס Replica Set (הכולל Primary ושני Secondaries), מבצעים פעולת כתיבה עם הגדרת האמינות: db.collection.insertOne(doc, { writeConcern: { w: "majority", j: true, wtimeout: 5000 } }).',
    formulaLatex: 'w: \\text{"majority"}, \\quad j: \\text{true}',
    instruction:
      "מה מבטיחה במדויק קונפיגורציה זו למשתמש בטרם יוחזר אישור הצלחה (Acknowledgment)?",
    options: [
      {
        id: "adnosql-q03-opt1",
        plainText:
          "הכתיבה שוכפלה בהצלחה לרוב צמתי האשכול (לפחות $2$ מתוך $3$ שרתים), ונרשמה באופן פיזי בקובץ היומן (Journal) בדיסק הקשיח של ה-Primary, מה שמבטיח שרידות מלאה מפני קריסת חשמל וחסינות מוחלטת מאובדן נתונים במקרה של החלפת שרת ראשי (Failover).",
        isCorrect: true,
        explanation:
          'נכון: 1. $w: \\text{"majority"}$ מחייב שהפעולה תאושר ע״י רוב מוחלט של הצמתים בעלי זכות הצבעה באשכול (במקרה של $3$ צמתים: $1 + \\lfloor 3/2 \\rfloor = 2$ צמתים, ה-Primary ועוד Secondary אחד לפחות). הדבר מבטיח שהנתון לא יאבד גם אם ה-Primary קורס מיד לאחר מכן (מונע Rollbacks של נתונים מאושרים). 2. $j: \\text{true}$ (Journaling) מחייב שה-Primary ימתין עד שהרשומה תיכתב פיזית לדיסק (Sync ל-On-Disk Journal) ולא תישאר רק בחוצצי זיכרון נדיפים. צירוף שני המאפיינים מספק את רמת האמינות הגבוהה ביותר בעולם ה-NoSQL.',
      },
      {
        id: "adnosql-q03-opt2",
        plainText:
          "הכתיבה נשמרת בזיכרון ה-RAM של ה-Primary בלבד ללא שום שכפול לרשת.",
        isCorrect: false,
        explanation:
          'שגוי: מצב זה מתאים ל-$w: 1,\\ j: \\text{false}$ (Unacknowledged / In-Memory), בעוד ש-majority כופה שכפול לרשת.',
      },
      {
        id: "adnosql-q03-opt3",
        plainText:
          "הפעולה נחסמת עד שכל $100\\%$ מהשרתים בעולם יקבלו עותק של המסמך.",
        isCorrect: false,
        explanation:
          'שגוי: נדרש רוב בלבד ($\\text{majority}$), ולא קונצנזוס פה אחד ($w: \\text{all}$) שעלול לתקוע את המערכת אם שרת אחד מושבת.',
      },
      {
        id: "adnosql-q03-opt4",
        plainText:
          "המסמך מומר אוטומטית למבנה טבלאי של SQL עם מפתחות זרים.",
        isCorrect: false,
        explanation:
          "שגוי: MongoDB שומר מסמכים במבנה BSON היררכי גמיש ללא מודל טבלאי.",
      },
    ],
  },

  // =========================================================================
  // בלוק 2: שאלות 4–6 — תשובה 2 (אינדקס 1) נכונה
  // =========================================================================
  {
    id: "adnosql-q04-graph-databases-index-free-adjacency",
    domain: "מסדי גרף ו-Index-Free Adjacency",
    title:
      "בסיסי נתונים מתקדמים ומערכות NoSQL - מסדי גרף ו-Index-Free Adjacency",
    context:
      "במסדי נתונים גרפיים ממשפחת Property Graph (כגון Neo4j), משווים בין ביצועי שאילתות קשרים עמוקות (Multi-hop traversals) לבין ביצוע אותן שאילתות ב-RDBMS באמצעות סדרת פעולות JOIN.",
    formulaLatex:
      "\\text{RDBMS JOIN: } O(k^d \\log N) \\quad \\text{vs.} \\quad \\text{Graph Traversal: } O(k^d)",
    instruction:
      "מהו עקרון ה-Index-Free Adjacency, ומדוע הוא מאפשר לגרף לשמור על זמני שאילתה קבועים גם כאשר מאגר הנתונים הכללי גדל למיליארדי רשומות?",
    options: [
      {
        id: "adnosql-q04-opt1",
        plainText:
          "הגרף שומר את כל הצמתים בטבלת גיבוב ענקית בזיכרון ה-RAM ומבטל את השימוש במצביעים.",
        isCorrect: false,
        explanation:
          "שגוי: השיטה מבוססת במפורש על מצביעים ישירים ברמת הרשומה ולא על טבלת גיבוב גלובלית.",
      },
      {
        id: "adnosql-q04-opt2",
        plainText:
          "כל צומת בגרף מחזיק מצביעי זיכרון/דיסק פיזיים ישירים (Direct Pointers) לשכניו ולקשתות המחוברות אליו ברמת הרשומה עצמה; בעת מעבר (Traversal), המנוע עוקב ישירות אחר המצביעים ב-$O(1)$ לצעד ללא צורך בחיפוש באינדקס מרכזי (Global Index Lookup), כך שזמן הריצה תלוי אך ורק בגודל תת-הגרף הנחקר ואינו מושפע מגודל הדאטה-בייס הכולל ($N$).",
        isCorrect: true,
        explanation:
          "נכון: 1. כשל ה-RDBMS: בבסיס נתונים טבלאי, קשר בין טבלאות מתבצע ע״י Foreign Key. כדי לעבור מקודקוד לשכניו, חובה לפנות לאינדקס B+ Tree של טבלת הקשרים בעלות של $O(\\log N)$. בשאילתה עמוקה של $5$ קפיצות ($5$-hop), העלות נוסקת ומכפילה את הגורם הלוגריתמי בכל צעד ביחס לגודל כלל המאגר $N$. 2. יתרון ה-Index-Free Adjacency: ב-Neo4j, רשומת הצומת בדיסק מכילה מצביע ישיר לרשימה מקושרת כפולה של הקשתות שלו. מעבר מצומת לשכניו הוא פשוט מעקב אחר כתובת זיכרון פיזית ב-$O(1)$. זמן חישוב המסלול תלוי אך ורק במספר השכנים הרלוונטיים שנבדקו בפועל (גודל התוצאה המקומית), ונשאר מהיר בדיוק באותה מידה בין אם בבסיס הנתונים יש אלף צמתים או $10$ מיליארד צמתים.",
      },
      {
        id: "adnosql-q04-opt3",
        plainText:
          "הגרף ממיר את כל השאילתות לחישובי מטריצות לפלסיאן ומריץ אותן ב-GPU.",
        isCorrect: false,
        explanation:
          "שגוי: גישה זו מאפיינת אלגוריתמי Graph Analytics כבדים, אך מנועי גרף תפעוליים (OLTP Graph DBs) מבוססי מצביעים.",
      },
      {
        id: "adnosql-q04-opt4",
        plainText:
          "Index-Free Adjacency מאפשרת לוותר לחלוטין על מודל עקביות ACID.",
        isCorrect: false,
        explanation:
          "שגוי: Neo4j הוא מסד נתונים בעל תמיכת ACID מלאה לחלוטין.",
      },
    ],
  },
  {
    id: "adnosql-q05-crdt-eventual-consistency-pn-counter",
    domain: "CRDT ועקביות בסופו של דבר",
    title:
      "בסיסי נתונים מתקדמים ומערכות NoSQL - עקביות בסופו של דבר וטיפוסי CRDT",
    context:
      "במערכות מבוזרות הפועלות ללא נעילה מרכזית במודל עקביות בסופו של דבר (Eventual Consistency), משתמשים בטיפוסי נתונים משוכפלים חופשיי-קונפליקטים (Conflict-free Replicated Data Types, CRDTs), כגון מונה חיובי-שלילי (PN-Counter).",
    formulaLatex:
      "\\text{State-based CRDT: } s_A \\sqcup s_B = \\sup(s_A, s_B), \\quad (S, \\sqcup) \\text{ is a Join-Semilattice}",
    instruction:
      "מהן התכונות האלגבריות של אופרטור המיזוג ($\\sqcup$) המבטיחות שכל הצמתים יתכנסו בהכרח לאותו מצב מדויק ללא תלות בסדר הגעת העדכונים וללא צורך במנגנון נעילה?",
    options: [
      {
        id: "adnosql-q05-opt1",
        plainText:
          "האופרטור חייב להיות דיפרנציאלי וליפשיצי במרחב הילברט.",
        isCorrect: false,
        explanation:
          "שגוי: CRDTs מושתתים על תורת הסריגים והאלגברה הבדידה, ולא על אנליזה פונקציונלית רציפה.",
      },
      {
        id: "adnosql-q05-opt2",
        plainText:
          "אופרטור המיזוג חייב להוות חצי-סריג (Join-Semilattice) המקיים שלוש תכונות: קומוטטיביות ($x \\sqcup y = y \\sqcup x$, סדר הגעת ההודעות אינו משנה), אסוציאטיביות ($(x \\sqcup y) \\sqcup z = x \\sqcup (y \\sqcup z)$, קיבוץ מנות שרירותי), ואידמפוטנטיות ($x \\sqcup x = x$, שכפול הודעות ברשת אינו משפיע).",
        isCorrect: true,
        explanation:
          "נכון: מאמרי היסוד של שפירו (Shapiro et al., 2011) מגדירים State-based CRDTs (CvRDT): כדי להבטיח עקביות חזקה בסופו של דבר (Strong Eventual Consistency) ברשת מבוזרת עם ניתוקים, איבודי חבילות ושינויי סדר: 1. קומוטטיביות מבטיחה שאם עדכון משרת $A$ הגיע לפני שרת $B$ או להפך, התוצאה זהה. 2. אסוציאטיביות מאפשרת למזג הודעות בכל מבנה היררכי ברשת. 3. אידמפוטנטיות מבטיחה שאם פרוטוקול התקשורת שולח שוב את אותו עדכון עקב שידור חוזר (Duplicate delivery), המצב הפנימי אינו נפגע ($x \\sqcup x = x$). ב-PN-Counter, כל צומת מחזיק וקטור של העלאות $P$ והורדות $N$, ומיזוג מתבצע ע״י לקיחת המקסימום איבר-איבר: $\\max(P_A[k], P_B[k])$, פעולה שהיא קומוטטיבית, אסוציאטיבית ואידמפוטנטית מובהקת.",
      },
      {
        id: "adnosql-q05-opt3",
        plainText:
          "האופרטור מבוסס על הצפנה אסימטרית באמצעות מפתחות ציבוריים של שרת ה-Master.",
        isCorrect: false,
        explanation:
          "שגוי: CRDT פועל במודל Masterless עמית-לעמית ואינו נשען על קריפטוגרפיה אסימטרית ליישוב קונפליקטים.",
      },
      {
        id: "adnosql-q05-opt4",
        plainText:
          "CRDT פותר קונפליקטים ע״י מחיקת כל הנתונים של השרת בעל השעון האיטי ביותר.",
        isCorrect: false,
        explanation:
          "שגוי: גישה זו (Last-Write-Wins נאיבי מבוסס שעון קיר) מאבדת מידע בצורה הרסנית ואינה נחשבת ל-CRDT מתמטי טהור.",
      },
    ],
  },
  {
    id: "adnosql-q06-data-warehousing-olap-star-vs-snowflake",
    domain: "מחסני נתונים, סכמת כוכב ואחסון טורי",
    title:
      "בסיסי נתונים מתקדמים ומערכות NoSQL - מחסני נתונים, סכמת כוכב ואחסון טורי",
    context:
      "בתכנון מחסן נתונים אנליטי (OLAP), משווים בין מודל סכמת כוכב (Star Schema) לבין סכמת פתית-שלג (Snowflake Schema), ובין אחסון שורתי מסורתי לאחסון טורי (Columnar Storage כגון Parquet).",
    formulaLatex:
      "\\text{Columnar I/O} \\propto \\frac{\\text{projected columns}}{\\text{table width}}, \\quad \\text{Star: } F \\bowtie D_i",
    instruction:
      "מהו המאפיין המבני של סכמת כוכב לעומת פתית-שלג, ומדוע אחסון טורי משיג ביצועי שאילתות אגרגציה הגבוהים במאות אחוזים לעומת אחסון שורתי?",
    options: [
      {
        id: "adnosql-q06-opt1",
        plainText:
          "סכמת כוכב מנרמלת את כל טבלאות הממדים ל-$3\\mathrm{NF}$ מלא, ואחסון טורי מבטל את הצורך באינדקסים.",
        isCorrect: false,
        explanation:
          "שגוי: סכמת כוכב היא מכוונת דה-נרמול (Denormalized); סכמת פתית-שלג היא זו שמנרמלת את הממדים ל-$3\\mathrm{NF}$.",
      },
      {
        id: "adnosql-q06-opt2",
        plainText:
          "בסכמת כוכב טבלאות הממדים הן דה-מנורמלות במתכוון (מכילות יתירות לטובת פישוט שאילתות וצמצום JOINs), בעוד שבפתית-שלג הממדים מנורמלים היררכית; אחסון טורי קורא מהדיסק אך ורק את העמודות הספציפיות המשתתפות בשאילתה (חוסך כ-$90\\%$ מנפח ה-I/O) ומאפשר דחיסה מעולה של נתונים מאותו טיפוס (Run-Length / Dictionary Encoding).",
        isCorrect: true,
        explanation:
          "נכון: 1. סכמת כוכב מול פתית שלג: בסכמת כוכב, טבלת העובדות (Fact Table) מוקפת ישירות ע״י טבלאות ממדים (Dimensions) דה-מנורמלות (Denormalized). כל ממד נשמר בטבלה יחידה, מה שמפשט שאילתות SQL ומצמצם משמעותית את מספר ה-JOINs הנדרשים. בסכמת פתית-שלג, טבלאות הממדים מנורמלות לרמות משנה (למשל פירוק ממד מוצר למחלקה, קטגוריה ויצרן), מה שחוסך מעט מקום אך מסבך שאילתות ומאט ביצועים. 2. יתרון האחסון הטורי (Columnar Storage): שאילתות OLAP טיפוסיות מבצעות אגרגציות כבדות ($\\mathrm{SUM}$, $\\mathrm{AVG}$) על $3$–$4$ עמודות מתוך טבלה של $100$ עמודות. במודל שורתי, חובה לקרוא את כל השורות במלואן מהדיסק. במודל טורי, הנתונים של כל עמודה שמורים ברצף; המנוע שולף מהדיסק אך ורק את העמודות הדרושות. בנוסף, נתונים מאותו טיפוס הנדחסים יחד משיגים יחסי דחיסה עצומים של פי $5$ עד $10$, ומאפשרים סריקות וקטוריות מהירות ב-SIMD.",
      },
      {
        id: "adnosql-q06-opt3",
        plainText:
          "אחסון טורי מיועד לעסקאות OLTP מהירות הדורשות הוספת שורות בודדות בכל מיקרו-שנייה.",
        isCorrect: false,
        explanation:
          "שגוי: אחסון טורי גרוע מאוד ב-OLTP משום שהכנסת שורה בודדת מחייבת כתיבה ל-$100$ קבצים טוריים נפרדים; הוא מיועד ל-OLAP ואגרגציות עתק בלבד.",
      },
      {
        id: "adnosql-q06-opt4",
        plainText:
          "בסכמת כוכב אין טבלת עובדות וכל המידע מיוצג כמסמכי JSON בלתי-תלויים.",
        isCorrect: false,
        explanation:
          "שגוי: סכמת כוכב נשענת על טבלת עובדות מרכזית מובהקת המקושרת לממדים.",
      },
    ],
  },

  // =========================================================================
  // בלוק 3: שאלות 7–9 — תשובה 3 (אינדקס 2) נכונה
  // =========================================================================
  {
    id: "adnosql-q07-google-spanner-truetime-external-consistency",
    domain: "TrueTime ועקביות חיצונית",
    title:
      "בסיסי נתונים מתקדמים ומערכות NoSQL - מערכות NewSQL ו-TrueTime",
    context:
      "בסיס הנתונים הגלובלי Google Spanner (Corbett et al., 2012) מספק טרנזקציות מבוזרות עם עקביות חיצונית חמורה (External Consistency / Strict Serializability) בקנה מידה עולמי.",
    formulaLatex:
      "\\text{TrueTime.now}() = [t_{\\text{earliest}}, t_{\\text{latest}}], \\quad \\epsilon = \\frac{t_{\\text{latest}} - t_{\\text{earliest}}}{2} \\approx 1\\text{--}7\\,\\text{ms}",
    instruction:
      "כיצד מאפשרת טכנולוגיית TrueTime של Spanner לסדר טרנזקציות בציר זמן גלובלי ללא צורך בתקשורת סנכרון ישירה בין כל מרכזי הנתונים בעולם?",
    options: [
      {
        id: "adnosql-q07-opt1",
        plainText:
          "Spanner משתמש בשרת שעון מרכזי יחיד הממוקם במטה גוגל שאליו פונים כל השרתים בעולם.",
        isCorrect: false,
        explanation:
          "שגוי: שרת יחיד הוא צוואר בקבוק בלתי-אפשרי עקב זמני השהיית רשת (RTT) בינלאומיים של מאות מילי-שניות.",
      },
      {
        id: "adnosql-q07-opt2",
        plainText:
          "TrueTime מבוססת על שעוני מחשב תוכנתיים רגילים ללא שום חומרה ייעודית.",
        isCorrect: false,
        explanation:
          "שגוי: שעוני מחשב רגילים סובלים מסחיפת זמן (Drift) חמורה של שניות, שאינה מאפשרת עקביות קפדנית ללא חומרה.",
      },
      {
        id: "adnosql-q07-opt3",
        plainText:
          "ה-API של TrueTime מייצג את הזמן לא כמספר בודד אלא כאינטרוול אי-ודאות מובטח $[t - \\epsilon, t + \\epsilon]$ הנתמך ע״י חומרת מקלטי GPS ושעונים אטומיים (רובידיום) בכל מרכז נתונים; וכדי להבטיח שטרנזקציה $T_2$ שהחלה לאחר סיום $T_1$ תקבל חותמת זמן מאוחרת יותר בוודאות ($s_2 > s_1$), השרת המבצע את $T_1$ ממתין בהשהיה מכוונת (Commit Wait) למשך זמן אי-הוודאות $2\\epsilon$ לפני אישור הטרנזקציה.",
        isCorrect: true,
        explanation:
          "נכון: 1. ארכיטקטורת TrueTime: בכל מרכז נתונים הותקנו שעוני רובידיום אטומיים ומקלטי GPS בעלי אפיקי כשל בלתי תלויים. ה-API מחזיר טווח זמנים מובטח $[t_{\\min}, t_{\\max}]$ עם שגיאת אי-ודאות חסומה $\\epsilon$ (בדרך כלל פחות מ-$7$ מילי-שניות). 2. חוק ה-Commit Wait: כדי להבטיח Linearizability מלאה (אם טרנזקציה $T_2$ מתחילה אחרי ש-$T_1$ הסתיימה לפי זמן אבסולוטי, חובה שחותמת הזמן שלה תהיה גדולה יותר: $s_2 > s_1$), השרת שמבצע את $T_1$ בוחר כחותמת זמן את $s_1 = t_{\\max}$. לאחר מכן, השרת עוצר וממתין (Wait out the uncertainty) עד אשר $\\mathrm{TrueTime.now}().\\mathrm{earliest} > s_1$. המתנה פיזית קצרה זו מבטיחה שכל טרנזקציה עתידית שתתחיל בעולם תקבל בהכרח חותמת זמן גדולה יותר, ומאפשרת קריאות עקביות לחלוטין ללא מנעולים בכל רחבי הגלובוס.",
      },
      {
        id: "adnosql-q07-opt4",
        plainText:
          "Spanner אינו מבטיח עקביות חזקה אלא פועל בעקביות בסופו של דבר בלבד.",
        isCorrect: false,
        explanation:
          "שגוי: Spanner הוכיח לעולם שניתן לבנות מערכת שהיא בעלת Strict Serializability מלאה לצד שרידות חלוקת רשת (CP מעשי).",
      },
    ],
  },
  {
    id: "adnosql-q08-cassandra-tunable-consistency-quorums",
    domain: "עקביות מתכווננת וקוורום",
    title:
      "בסיסי נתונים מתקדמים ומערכות NoSQL - עקביות מתכווננת וקוורום",
    context:
      "באשכול Apache Cassandra מבוסס טבעת גיבוב עקבי (Ring), פקטור השכפול מוגדר כ-$N = 3$ (כל שורה נשמרת ב-$3$ שרתים שונים). הקליינט מבצע כתיבה ברמת עקביות $W$ וקריאה ברמת עקביות $R$.",
    formulaLatex: "R + W > N \\implies \\text{Strong Consistency (Quorum)}",
    instruction:
      "מהו התנאי המתמטי המבטיח שהקריאה תחזיר תמיד את הנתון העדכני ביותר שנכתב (Strong Consistency), ואיזה שילוב נפוץ מממש זאת עם עמידות לנפילת שרת בודד?",
    options: [
      {
        id: "adnosql-q08-opt1",
        plainText: "$R + W < N$; שימוש ב-$R = 1$ ו-$W = 1$.",
        isCorrect: false,
        explanation:
          "שגוי: אם $R+W < N$, קבוצת הקריאה וקבוצת הכתיבה עשויות להיות זרות לחלוטין, והקריאה תחזיר נתון ישן (Eventual Consistency).",
      },
      {
        id: "adnosql-q08-opt2",
        plainText: "$R = N$ ו-$W = N$ בלבד; כל שילוב אחר מפר אטומיות.",
        isCorrect: false,
        explanation:
          "שגוי: דרישת $N$ לכל פעולה היא שבירה ביותר ואינה מאפשרת זמינות אם שרת בודד נופל.",
      },
      {
        id: "adnosql-q08-opt3",
        plainText:
          "לפי עקרון שובך היונים, נדרש שחפיפת הקבוצות תקיים $R + W > N$; עבור $N = 3$, בחירה של $W = \\mathrm{QUORUM} = 2$ ו-$R = \\mathrm{QUORUM} = 2$ מבטיחה שמתקיים $2 + 2 = 4 > 3$, מה שמבטיח שלפחות שרת אחד בקבוצת הקריאה השתתף בכתיבה האחרונה, ומאפשר המשך עבודה תקין בעקביות חזקה גם אם שרת אחד באשכול קורס לחלוטין.",
        isCorrect: true,
        explanation:
          "נכון: זהו מודל ה-Quorum הקלאסי (Gifford, 1979). אם $R + W > N$, קבוצת $W$ השרתים שאישרו את הכתיבה וקבוצת $R$ השרתים שמהם נדגם הנתון בקריאה חייבות להכיל לפחות צומת אחד משותף לפי עקרון שובך היונים (Intersection). הצומת המשותף מחזיק את הגרסה העדכנית ביותר (המזוהה לפי חותמת הזמן שלה). המנוע משווה את הגרסאות, מחזיר את המידע העדכני לקליינט, ומפעיל תיקון קריאה (Read Repair) לעדכון השרתים המפגרים. עבור $N=3$, $\\mathrm{QUORUM} = \\lfloor N/2 \\rfloor + 1 = 2$. שילוב $W=2, R=2$ נותן $R+W = 4 > 3$. המערכת חסינה לנפילה של $3 - 2 = 1$ שרתים תוך שמירה על עקביות חזקה וזמינות גבוהה.",
      },
      {
        id: "adnosql-q08-opt4",
        plainText:
          "עקביות חזקה ב-Cassandra אפשרית אך ורק אם מפעילים מנוע MapReduce ברקע.",
        isCorrect: false,
        explanation:
          "שגוי: קוורום הוא מנגנון תקשורת מובנה ברמת ה-Storage Proxy של Cassandra ואינו דורש שום מנוע חיצוני.",
      },
    ],
  },
  {
    id: "adnosql-q09-distributed-saga-pattern-microservices",
    domain: "תבנית סאגה במיקרו-שירותים",
    title:
      "בסיסי נתונים מתקדמים ומערכות NoSQL - מיקרו-שירותים ותבנית סאגה",
    context:
      "במערכת מבוזרת המורכבת מעשרות מיקרו-שירותים שבהם לכל שירות בסיס נתונים עצמאי משלו (Database-per-Service), ביצוע טרנזקציית 2PC מסורתית אינו מתאים עקב תלויות נעילה, השהיות רשת וצימוד הדוק. במקומו מיישמים את תבנית הסאגה (Saga Pattern).",
    formulaLatex:
      "T_1, T_2, \\dots, T_n \\quad \\text{with compensating transactions } C_1, C_2, \\dots, C_{n-1}",
    instruction:
      "כיצד מבטיחה תבנית הסאגה עקביות בסופו של דבר בעת כישלון באחד השלבים המאוחרים (למשל כישלון ב-$T_k$)?",
    options: [
      {
        id: "adnosql-q09-opt1",
        plainText:
          "היא מפעילה פקודת $\\mathrm{ROLLBACK}$ גלובלית שמחזירה את כל השרתים לגיבוי הלילי.",
        isCorrect: false,
        explanation:
          "שגוי: במיקרו-שירותים לכל שירות בסיס נתונים נפרד שביצע Commit מקומי, ולא ניתן לבצע עליהם Rollback גלובלי משותף.",
      },
      {
        id: "adnosql-q09-opt2",
        plainText: "היא מוחקת את כל השירותים שנכשלו ומעלה מופעי Docker חדשים.",
        isCorrect: false,
        explanation:
          "שגוי: הבעיה עסקית/לוגית (למשל חוסר במסגרת אשראי) ולא קריסת חומרה.",
      },
      {
        id: "adnosql-q09-opt3",
        plainText:
          "סאגה מפרקת את הפעולה לסדרת טרנזקציות מקומיות ($T_1, \\dots, T_n$) שכל אחת מבצעת Commit מיידי בבסיס הנתונים שלה; אם שלב $T_k$ נכשל, מתבצע תהליך ביטול מובנה המריץ בסדר הפוך סדרת פעולות מפצות (Compensating Transactions $C_{k-1}, \\dots, C_1$) המבטלות סמנטית את השפעת השלבים שהושלמו (למשל זיכוי כספי במקום ביטול חיוב), ובכך מחזירות את המערכת למצב עסקי עקבי.",
        isCorrect: true,
        explanation:
          "נכון: תבנית הסאגה (גרסיה-מולינה וסאלם, 1987) מחליפה את ה-ACID ההדוק במודל BASE בעל עקביות בסופו של דבר: 1. כל שלב בתהליך (למשל הזמנה, חיוב אשראי, שריון מלאי, משלוח) מתבצע כטרנזקציית ACID מקומית ועצמאית בשירות שלו ומאשר שינויים מיידית. 2. אין החזקת מנעולים מבוזרים ארוכי-טווח בין שרתים שונים. 3. אם שלב כלשהו נכשל (למשל שריון מלאי נכשל כי המוצר אזל), הסאגה מפעילה מנגנון נסיגה סמנטי: הרצת עסקאות מפצות (Compensating Transactions) בסדר הפוך: ביטול החיוב באשראי ע״י פעולת זיכוי ($C_{\\mathrm{payment}}$), עדכון סטטוס ההזמנה למבוטל וכו׳. הסאגה מנוהלת באחת משתי דרכים: כוריאוגרפיה (אירועים א-סינכרוניים בין השירותים) או אורקסטרציה (מתאם סאגה מרכזי שמנהל מכונת מצבים).",
      },
      {
        id: "adnosql-q09-opt4",
        plainText: "סאגה דורשת שכל הנתונים יישמרו כטבלת Excel משותפת בענן.",
        isCorrect: false,
        explanation:
          "שגוי: זוהי תשובה אבסורדית לחלוטין שאינה קשורה לארכיטקטורת תוכנה.",
      },
    ],
  },

  // =========================================================================
  // בלוק 4: שאלות 10–12 — תשובה 4 (אינדקס 3) נכונה
  // =========================================================================
  {
    id: "adnosql-q10-sharding-rebalancing-hotspots",
    domain: "שארדינג: טווח מול גיבוב",
    title:
      "בסיסי נתונים מתקדמים ומערכות NoSQL - שארדינג, טווח מול גיבוב ונקודות חמות",
    context:
      "בחלוקה אופקית (Sharding) של טבלה ענקית לרוחב עשרות שרתים, משווים בין שתי שיטות לקביעת מפתח החלוקה (Shard Key): חלוקה מבוססת טווח (Range-Based Sharding) וחלוקה מבוססת גיבוב (Hash-Based Sharding).",
    formulaLatex:
      "h(\\mathrm{key}) \\bmod S \\quad \\text{vs.} \\quad \\mathrm{range}(k) \\mapsto \\mathrm{shard}",
    instruction:
      "מהו החיסרון הקריטי של חלוקה מבוססת טווח כאשר מפתח החלוקה מונוטוני עולה (כגון Timestamp או Auto-increment ID), וכיצד פותרת זאת חלוקת גיבוב?",
    options: [
      {
        id: "adnosql-q10-opt1",
        plainText:
          "בחלוקת טווח כל המידע נמחק כאשר התאריך משתנה; חלוקת גיבוב שומרת את הנתונים בדיסק נפרד.",
        isCorrect: false,
        explanation:
          "שגוי: שום מידע אינו נמחק; הבעיה היא חוסר איזון בעומסי הכתיבה.",
      },
      {
        id: "adnosql-q10-opt2",
        plainText:
          "חלוקת גיבוב מאפשרת הרצת שאילתות טווח ($\\mathrm{BETWEEN}$) במהירות כפולה לעומת חלוקת טווח.",
        isCorrect: false,
        explanation:
          "שגוי: ההפך הוא הנכון; חלוקת גיבוב מפזרת נתונים סמוכים בין שרתים שונים ולכן הופכת שאילתות טווח ליקרות מאוד (דורשת פנייה לכל השרתים במקביל — Scatter/Gather).",
      },
      {
        id: "adnosql-q10-opt3",
        plainText: "מפתח מונוטוני גורם לשגיאת חלוקה באפס במעבד הראשי של הנתב.",
        isCorrect: false,
        explanation:
          "שגוי: הנתב מנתב את הבקשות לפי טווחים ידועים ואינו נתקל בחלוקה באפס.",
      },
      {
        id: "adnosql-q10-opt4",
        plainText:
          'בחלוקת טווח עם מפתח מונוטוני, כל פעולות הכתיבה החדשות מופנות בו-זמנית לאותו שארד אחרון בודד המייצג את סוף הטווח ויוצרות בו "נקודה חמה" (Hotspot / Write Bottleneck) המשביתה את יתרון הביזור; חלוקת גיבוב (Hash-Based) מעבירה את המפתח דרך פונקציית גיבוב ומפזרת תצפיות עוקבות באופן פסאודו-אקראי ואחיד לרוחב כל השרתים באשכול.',
        isCorrect: true,
        explanation:
          "נכון: 1. כשל ה-Range-based בערכים עולים: אם השארדינג מבוסס על שדות תאריך/זמן (Timestamp) או מזהה רץ, כל תצפית חדשה גדולה מקודמותיה. עקב כך, $100\\%$ מפעולות ה-$\\mathrm{INSERT}$ החדשות נוחתות תמיד על השארד האחרון בטווח. שרת בודד זה נחנק מעומס, בעוד שאר השרתים במערכת עומדים חסרי מעש. יתרון ה-Scale של המערכת מתבטל. 2. הפתרון של Hash-based Sharding: פונקציית הגיבוב $h(\\mathrm{key})$ משבשת את הסדר הליניארי ומפזרת ערכים בעלי מזהים עוקבים באופן אחיד בין כל השרתים באשכול. כל השרתים משתתפים בכתיבה במקביל והעומס מאוזן לחלוטין. (המחיר: שאילתות טווח מאבדות יעילות ומחייבות שליחה לכלל השארדים).",
      },
    ],
  },
  {
    id: "adnosql-q11-caching-strategies-stampede-write-through",
    domain: "אסטרטגיות מטמון ו-Cache Stampede",
    title:
      "בסיסי נתונים מתקדמים ומערכות NoSQL - מטמון ותופעת Cache Stampede",
    context:
      "בארכיטקטורת שכבת זיכרון מטמון מבוזרת (In-Memory Caching), משווים בין תבניות: Cache-Aside (Lazy Loading), Write-Through, ו-Write-Behind (Write-Back).",
    formulaLatex:
      "\\text{Cache Stampede: } TTL \\to 0 \\implies M \\text{ concurrent DB queries}",
    instruction:
      "מהי תופעת ה-Cache Stampede (המכונה גם Thundering Herd) המתרחשת בעת פקיעת תוקף ($TTL$) של ערך פופולרי, ואיזה מנגנון מונע אותה?",
    options: [
      {
        id: "adnosql-q11-opt1",
        plainText:
          "היא מתרחשת כאשר ה-Cache מתמלא במידע מיותר; הפתרון הוא הגדלת ה-$TTL$ לאינסוף.",
        isCorrect: false,
        explanation:
          "שגוי: הגדלת ה-$TTL$ לאינסוף תמנע עדכון נתונים ותגרום למשתמשים לראות מידע לא עדכני לעד (Stale Data).",
      },
      {
        id: "adnosql-q11-opt2",
        plainText: "היא מתרחשת כאשר זיכרון ה-RAM קורס פיזית ממתח חשמלי גבוה.",
        isCorrect: false,
        explanation: "שגוי: זוהי תופעת עומס תוכנתית בלוגיקת השאילתות ולא כשל חומרה.",
      },
      {
        id: "adnosql-q11-opt3",
        plainText: "היא נובעת מאי-התאמת גרסאות של פרוטוקול TCP ונפתרת ע״י שימוש ב-UDP.",
        isCorrect: false,
        explanation: "שגוי: אין קשר לפרוטוקול התעבורה ברשת.",
      },
      {
        id: "adnosql-q11-opt4",
        plainText:
          "כאשר פריט מידע פופולרי במיוחד (Hot Key) פוקע במטמון ($TTL=0$), אלפי בקשות משתמשים מקבילות מגלות בו-זמנית החטאת מטמון (Cache Miss) ורצות כולן בבת אחת לשאול את מסד הנתונים הראשי, מה שגורם להצפה מיידית וקריסה של מסד הנתונים; מניעה מושגת ע״י שימוש בנעילה מבוזרת מוקדמת (Mutex/Locking), טעינה מוקדמת אסינכרונית (Early Refresh), או חישוב מחדש הסתברותי (Probabilistic Early Expiration / XFetch).",
        isCorrect: true,
        explanation:
          "נכון: 1. מנגנון ה-Cache Stampede (או Thundering Herd): בשיטת Cache-Aside רגילה, האפליקציה פונה למטמון. אם המידע אינו קיים, היא פונה למסד הנתונים, מחשבת את התוצאה ומכניסה אותה למטמון. עבור ערך חם במיוחד הנקרא אלפי פעמים בשנייה (למשל דף בית של אתר חדשות או תוצאות משחק חי), ברגע שה-$TTL$ של הערך מסתיים, אלפי תהליכים מקבילים חווים Cache Miss באותו שבריר אלפית-שנייה. כולם מדלגים על המטמון ושולחים את אותה שאילתה כבדה אל מסד הנתונים הראשי במקביל. מסד הנתונים נחנק מקריאות כפולות, תורי החיבורים מתמלאים והוא קורס. 2. פתרונות מודרניים: שימוש במנעול מבוזר (רק הבקשה הראשונה שמגלה Miss מקבלת מנעול ומחשבת, בעוד שאר הבקשות ממתינות לתשובתה או מקבלות ערך ישן זמנית), או אלגוריתם XFetch המחשב הסתברותית רענון מוקדם ברקע עוד לפני שה-$TTL$ הגיע לאפס ממשי.",
      },
    ],
  },
  {
    id: "adnosql-q12-bloom-filters-cassandra-read-path",
    domain: "נתיב הקריאה ומסנני בלום",
    title:
      "בסיסי נתונים מתקדמים ומערכות NoSQL - נתיב הקריאה ומסנני בלום",
    context:
      "בנתיב הקריאה של Apache Cassandra (Read Path), המנוע נדרש לאתר את הגרסה העדכנית ביותר של שורה בהינתן Partition Key, כאשר הנתונים מפוזרים בין ה-MemTable לעשרות קובצי SSTable בדיסק.",
    formulaLatex:
      "\\mathrm{BF}(k)=0 \\implies k \\notin S, \\quad P(\\mathrm{FP}) \\approx \\bigl(1-e^{-kn/m}\\bigr)^k",
    instruction:
      "מהו הסדר המדויק של שלבי בדיקת הנתונים שמבצע צומת ה-Cassandra כדי למזער גישות יקרות לדיסק?",
    options: [
      {
        id: "adnosql-q12-opt1",
        plainText:
          "סריקה מלאה של כל קובצי ה-SSTable בדיסק, ולאחר מכן בדיקת ה-MemTable ב-RAM.",
        isCorrect: false,
        explanation:
          "שגוי: סריקת דיסק ראשונה היא הפוכה לחלוטין מכל עקרון יעילות; הזיכרון המהיר נבדק תמיד קודם.",
      },
      {
        id: "adnosql-q12-opt2",
        plainText: "הפעלת פקודת רשת אל שאר הצמתים בלבד ללא בדיקה מקומית.",
        isCorrect: false,
        explanation:
          "שגוי: הצומת המקומי בודק את המידע השמור אצלו בדיסק ובזיכרון.",
      },
      {
        id: "adnosql-q12-opt3",
        plainText:
          "חיפוש סדרתי מה-SSTable הישן ביותר אל החדש ביותר ללא שימוש במסנני בלום.",
        isCorrect: false,
        explanation:
          "שגוי: סריקה כזו תדרוש קריאת כל הקבצים בדיסק ותוביל לביצועים גרועים ביותר.",
      },
      {
        id: "adnosql-q12-opt4",
        plainText:
          "הבדיקה מתחילה ב-MemTable המהיר ב-RAM; עבור קובצי ה-SSTable בדיסק נבדק תחילה מסנן בלום (Bloom Filter) השמור בזיכרון — אם המסנן מחזיר שלילי מדלגים מיידית על הקובץ ללא שום גישת דיסק; אם הוא מחזיר חיובי בודקים את ה-Key Cache, ולאחר מכן פונים ל-Partition Summary ואינדקס הדיסק לשליפת הנתון.",
        isCorrect: true,
        explanation:
          "נכון: נתיב הקריאה ב-Cassandra מהונדס למזעור פניות דיסק: 1. בדיקת ה-MemTable (ו-Row Cache אם מופעל): אם השורה עודכנה לאחרונה, היא נמצאת ישירות ב-RAM. 2. סינון קובצי SSTables: עלולים להיות עשרות קבצים בדיסק. לכל SSTable מוצמד Bloom Filter השמור כולו בזיכרון ה-RAM. אם מסנן בלום מחזיר שאינו קיים (Negative), מובטח בוודאות של $100\\%$ שהשורה אינה קיימת בקובץ זה, והמנוע מדלג עליו מיד מבלי לבצע אף קריאת I/O מדיסק. 3. רק עבור קבצים שמסנן בלום אישר (עם שיעור שגיאת חיובי-שגוי מזערי של כ-$1\\%$), המנוע פונה ל-Key Cache ב-RAM, ואז ל-Partition Summary כדי למצוא את המיקום המדויק של המפתח בקובץ ה-SSTable בדיסק, ממזג את הגרסאות לפי חותמת הזמן, ומחזיר את הרשומה העדכנית ביותר.",
      },
    ],
  },
];

/** Alias used by academic course registry / re-exports. */
export const ACADEMIC_ADVANCED_DATABASES_NOSQL_QUESTIONS =
  ADVANCED_DATABASES_NOSQL_QUESTIONS;

/**
 * Stratified onboarding sample:
 * - 1 from LSM / 2PC / Write Concern (Q1–3, key A)
 * - 1 from graph / CRDT / OLAP (Q4–6, key B)
 * - 1 from Spanner / quorum / saga / sharding / cache / Bloom (Q7–12, keys C–D)
 * then Fisher–Yates shuffle. Fail-closed if any stratum empty.
 */
export function sampleAdvancedDatabasesNoSQLOnboardingQuestions(): AcademicDiagnosticQuestion[] {
  const groupA = ADVANCED_DATABASES_NOSQL_QUESTIONS.slice(0, 3);
  const groupB = ADVANCED_DATABASES_NOSQL_QUESTIONS.slice(3, 6);
  const groupC = ADVANCED_DATABASES_NOSQL_QUESTIONS.slice(6, 12);

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

"use client";

const TESTIMONIALS = [
  {
    name: "עדי לוי",
    role: "סטודנטית להנדסה, אוניברסיטת תל אביב",
    text: "הגעתי ל-Project8 שבוע לפני מבחן במועד ב' בחדו''א כשאני מיואשת לחלוטין. המורה עבר איתי על חומרי הלימוד בצורה שלא ראיתי באף הרצאה באוניברסיטה. פירקנו הכל לחלקים קטנים וסיימתי עם 92! שווה כל שקל.",
    rating: 5,
    avatar: "👩‍🎓"
  },
  {
    name: "רוני ואילן כהן",
    role: "הורים של תומר (תלמיד כיתה י' - 5 יחידות)",
    text: "תומר היה מתוסכל, הכיתה הייתה עמוסה והוא פשוט איבד את הביטחון. הליווי האישי כאן שינה לו את הגישה לחלוטין. הוא כבר לא מפחד מהמבחנים והציון האחרון שלו היה 95. המענה בוואטסאפ בין השיעורים הוא פשוט הצלת חיים.",
    rating: 5,
    avatar: "👪"
  },
  {
    name: "ניר גלעד",
    role: "סטודנט במכינה קדם-אקדמית",
    text: "היקף החומרים במכינה הלחיץ אותי בטירוף. כאן בנו לי תוכנית דינמית שהתעדכנה יחד עם קצב ההתקדמות שלי. בזכות מבחני הסימולציה והטיפים המנטליים הגעתי למבחן רגוע, בלי בלאקאאוטים. מומלץ בחום!",
    rating: 5,
    avatar: "👨‍🎓"
  }
];

export default function Testimonials() {
  return (
    <section className="mb-28 border-t border-slate-800 pt-16" id="testimonials">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-white mb-3">כשהמספרים מסתדרים – הסטודנטים וההורים מדברים</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          הצלחה היא לא מקרה, היא תוצאה של מעטפת נכונה. הנה כמה מהסיפורים של מי שלמדו איתנו הסמסטר:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {TESTIMONIALS.map((item, index) => (
          <div 
            key={index} 
            className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              {/* כוכבי דירוג */}
              <div className="flex gap-1 mb-4 text-amber-400 text-sm">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              {/* תוכן ההמלצה */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                "{item.text}"
              </p>
            </div>

            {/* פרטי הממליץ */}
            <div className="flex items-center gap-3 border-t border-slate-800/60 pt-4">
              <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center text-lg">
                {item.avatar}
              </div>
              <div className="text-right">
                <h4 className="font-bold text-white text-sm">{item.name}</h4>
                <p className="text-slate-400 text-xs mt-0.5">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
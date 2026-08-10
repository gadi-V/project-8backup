"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Testimonials from "../../components/Testimonials";

const PACKAGES = [
  {
    id: "SINGLE",
    name: "שיעור בודד",
    price: 180,
    perLesson: 180,
    description: "פתרון ממוקד לפני מבחן, הגשת עבודה או לחיזוק נושא ספציפי בכל מקצוע",
    features: ["שיעור מלא של 50 דקות", "מורה מותאם אישית (לפי מקצוע/קורס)", "חומרי לימוד וסיכומים מותאמים", "ביטול חינם עד 24 שעות לפני"],
    popular: false,
  },
  {
    id: "TRIO",
    name: "חבילת שלשייה (TRIO)",
    price: 510,
    perLesson: 170,
    description: "המסלול המומלץ לסגירת פערים, הכנה לבגרויות או למבחני סמסטר באקדמיה",
    features: ["3 שיעורים במערכת", "עזרה אונליין בין המפגשים", "מעקב התקדמות אישי", "חיסכון של 30 ₪"],
    popular: true,
  },
  {
    id: "MULTI",
    name: "נבחרת חמישייה",
    price: 800,
    perLesson: 160,
    description: "ליווי רציף להצלחה מוכחת לאורך הסמסטר או שנת הלימודים בכל חומרי הלימוד",
    features: ["5 שיעורים (לשימוש בכל המקצועות)", "תעדוף בבחירת השעות והמרצים/מורים", "הכנה מקיפה למרתונים ומבחנים", "חיסכון של 100 ₪"],
    popular: false,
  },
];

const FAQS = [
  {
    question: "לאיזה מקצועות ורמות השיעורים מתאימים?",
    answer:
      "לכל המקצועות והחומרים! אנחנו מכסים את כל חומרי הלימוד: ממקצועות בית הספר ועד לקורסים אקדמיים מורכבים.",
  },
  {
    question: "האם צריך להתחייב למסלול ארוך?",
    answer:
      "ממש לא. אין אצלנו התחייבויות לטווח ארוך או דמי מנוי. אתם רוכשים חבילת קרדיטים גמישה שמתאימה בדיוק לצרכים שלכם.",
  },
  {
    question: "איך עובדת מעטפת התמיכה בין השיעורים?",
    answer:
      "אם נתקעתם עם תרגיל או מטלה – אתם לא לבד. המערכת כוללת מענה בוואטסאפ לקבלת הכוונה מהירה מהצוות.",
  },
  {
    question: "איך מתבצעת התאמת המורה או המרצה?",
    answer:
      "לפני שמתחילים, אנחנו עושים מיפוי קצר של הצרכים שלכם. המערכת מתאימה את איש המקצוע המדויק ביותר מתוך הנבחרת.",
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handlePurchase = async (packageId: string) => {
    setLoading(packageId);
    const purchaseToast = toast.loading("בודק הרשאות ומעבד רכישה...");

    try {
      const meResponse = await fetch("/api/me");
      if (!meResponse.ok) {
        toast.error("יש להתחבר לפני רכישת חבילה", { id: purchaseToast });
        router.replace("/login?from=/pricing");
        return;
      }

      const meData = await meResponse.json();
      if (meData.user.role !== "STUDENT") {
        toast.error("רכישת חבילות זמינה לתלמידים בלבד", { id: purchaseToast });
        return;
      }

      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageType: packageId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "הרכישה נכשלה");

      toast.success(`החבילה נטענה! יתרה: ${data.newCredits} שיעורים`, { id: purchaseToast });
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "שגיאה ברכישה";
      toast.error(message, { id: purchaseToast });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-16 px-4 sm:px-6 relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/2 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent mb-4">
            כל המקצועות. כל החומרים. הבנה מלאה.
          </h1>
          <p className="text-xl text-slate-400">
            מתלמידי חטיבה ותיכון ועד לסטודנטים באקדמיה. חבילות קרדיטים גמישות ללא התחייבות.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-28">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-slate-800/80 border rounded-2xl p-8 flex flex-col justify-between relative backdrop-blur-md transition-all duration-300 hover:translate-y-[-4px] ${
                pkg.popular
                  ? "border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500"
                  : "border-slate-700 hover:border-slate-500"
              }`}
            >
              {pkg.popular && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold py-1 px-4 rounded-full shadow-md tracking-wider">
                  הכי פופולרי
                </span>
              )}

              <div>
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-slate-400 text-sm mb-6 min-h-[40px]">{pkg.description}</p>

                <div className="mb-6 border-b border-slate-700 pb-6">
                  <span className="text-5xl font-black text-white">₪{pkg.price}</span>
                  <span className="text-slate-400 text-sm mr-2">/ חבילה</span>
                  <div className="text-blue-400 text-sm font-semibold mt-2">({pkg.perLesson} ₪ בלבד למפגש)</div>
                </div>

                <ul className="space-y-4 mb-8 text-right">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-300">
                      <span className="text-blue-500 font-bold">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePurchase(pkg.id)}
                disabled={loading !== null}
                className={`w-full py-3.5 px-4 rounded-xl font-bold transition-all ${
                  pkg.popular
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                    : "bg-slate-700 hover:bg-slate-600 text-white"
                }`}
              >
                {loading === pkg.id ? "מעבד..." : "רכישה מאובטחת"}
              </button>
            </div>
          ))}
        </div>

        <div className="mb-28 border-t border-slate-800 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">למידה חכמה. תוצאות מוכחות.</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              בין אם אתם מתכוננים לבגרות ובין אם אתם סטודנטים שנאבקים עם קורס אקדמי – הנה ההבדל:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/30 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <span>✕</span> הלמידה הישנה והמסורבלת
              </h3>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex gap-2">• <span>ללכת לאיבוד בכיתה או בהרצאה המונית.</span></li>
                <li className="flex gap-2">• <span>מורים פרטיים שמרגישים כמו פלסטר זמני.</span></li>
                <li className="flex gap-2">• <span>תסכול ולחץ מול חומר לא ברור.</span></li>
              </ul>
            </div>

            <div className="bg-blue-950/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm shadow-lg shadow-blue-500/5">
              <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                <span>✓</span> המעטפת החכמה של Project8
              </h3>
              <ul className="space-y-4 text-slate-200 text-sm">
                <li className="flex gap-2"><span className="text-blue-500 font-bold">✓</span> <span><strong>מיפוי מדויק</strong> לפני המפגש הראשון.</span></li>
                <li className="flex gap-2"><span className="text-blue-500 font-bold">✓</span> <span><strong>תוכנית דינמית</strong> בקצב האישי שלכם.</span></li>
                <li className="flex gap-2"><span className="text-blue-500 font-bold">✓</span> <span><strong>תמיכה בוואטסאפ</strong> בין השיעורים.</span></li>
              </ul>
            </div>
          </div>
        </div>

        <Testimonials />

        <div className="max-w-3xl mx-auto border-t border-slate-800 pt-16" id="faq">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2">שאלות נפוצות</h2>
            <p className="text-slate-400 text-sm">כל מה שחשוב לדעת על החבילות והמעטפת</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden transition-colors duration-200 hover:border-slate-700"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-right font-bold text-slate-200 hover:text-white transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className={`text-xl text-blue-500 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>＋</span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-48 border-t border-slate-800/60 p-5 text-slate-300 bg-slate-900/30" : "max-h-0 overflow-hidden"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

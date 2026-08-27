"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type StudentFormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
  path: "" | "school" | "academia";
  schoolGrade: string;
  schoolUnits: string;
  schoolSubject: string;
  academicInstitution: string;
  academicDegree: string;
  academicCourse: string;
  bottleneck: string;
  goalType: string;
  selectedCard: string;
};

const BOTTLENECK_LABELS: Record<string, string> = {
  gaps: "פערי עבר קשים בבסיס של חומר הלימוד",
  anxiety: 'חרדת בחינות, לחץ מנטלי בלייב או "בלקאאוט" במבחן',
  discipline: "קושי בניהול זמן, חוסר משמעת עצמית או קושי בתרגול עצמאי",
};

const GOAL_LABELS: Record<string, string> = {
  marathon: "מרתון ממוקד בטווח הקצר",
  semester: "ליווי סמסטריאלי / שנתי שוטף",
};

function buildDiagnosticPayload(formData: StudentFormData) {
  const sharedMeta = {
    path: formData.path,
    bottleneck: formData.bottleneck,
    bottleneckLabel: BOTTLENECK_LABELS[formData.bottleneck] ?? formData.bottleneck,
    goalType: formData.goalType,
    goalLabel: GOAL_LABELS[formData.goalType] ?? formData.goalType,
    selectedCard: formData.selectedCard,
  };

  if (formData.path === "school") {
    return {
      ageGroup: `בית ספר - ${formData.schoolGrade || "לא צוין"}`,
      subject: formData.schoolSubject || "לא צוין",
      challenge: JSON.stringify({
        ...sharedMeta,
        schoolGrade: formData.schoolGrade,
        schoolUnits: formData.schoolUnits,
      }),
    };
  }

  return {
    ageGroup: "אקדמיה / סטודנט",
    subject: formData.academicCourse || "לא צוין",
    challenge: JSON.stringify({
      ...sharedMeta,
      academicInstitution: formData.academicInstitution,
      academicDegree: formData.academicDegree,
    }),
  };
}

function clearQuizLocalStorageRemnants() {
  if (typeof window === "undefined") return;
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("quiz_done_")) {
      localStorage.removeItem(key);
    }
  });
}

export default function StudentRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    path: "",
    schoolGrade: "",
    schoolUnits: "",
    schoolSubject: "",
    academicInstitution: "",
    academicDegree: "",
    academicCourse: "",
    bottleneck: "",
    goalType: "",
    selectedCard: "",
  });

  const handleNextStep = () => {
    if (step === 1 && !formData.path) {
      toast.error("אנא בחרו את מסלול הלימודים שלכם כדי להמשיך");
      return;
    }
    if (step === 2) {
      if (formData.path === "school" && !formData.schoolGrade.trim()) {
        toast.error("אנא מלאו את כיתת הלימוד");
        return;
      }
      if (formData.path === "academia" && !formData.academicCourse.trim()) {
        toast.error("אנא מלאו את שם הקורס");
        return;
      }
    }
    if (step === 3 && (!formData.bottleneck || !formData.goalType)) {
      toast.error("אנא השלימו את שדות האתגר ויעד הלימודים");
      return;
    }
    setSubmitError("");
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setSubmitError("");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setSubmitError("");

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("אנא מלאו שם מלא ומספר טלפון");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      toast.error("יש לבחור סיסמה של לפחות 6 תווים");
      return;
    }
    if (!formData.path || !formData.bottleneck || !formData.goalType) {
      toast.error("יש להשלים את שלבי האבחון לפני הרישום");
      return;
    }

    setLoading(true);
    const progressToast = toast.loading("יוצר חשבון תלמיד ושומר את האבחון...");

    try {
      const registerResponse = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          password: formData.password,
          role: "STUDENT",
        }),
      });

      const registerData = await registerResponse.json();
      if (!registerResponse.ok) {
        throw new Error(registerData.error || "שגיאה ביצירת החשבון");
      }

      clearQuizLocalStorageRemnants();

      const diagnosticResponse = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildDiagnosticPayload(formData)),
      });

      if (!diagnosticResponse.ok) {
        const diagnosticData = await diagnosticResponse.json();
        toast.error(
          diagnosticData.error || "שמירת האבחון נכשלה — ניתן להשלים בדאשבורד",
          { id: progressToast }
        );
        router.push("/dashboard");
        return;
      }

      const cardToPackage: Record<string, "SINGLE" | "TRIO" | "MULTI"> = {
        single: "SINGLE",
        triple: "TRIO",
        five: "MULTI",
      };
      const packageType = formData.selectedCard
        ? cardToPackage[formData.selectedCard]
        : undefined;

      if (packageType) {
        const paymentResponse = await fetch("/api/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ packageType }),
        });

        const paymentData = (await paymentResponse.json()) as {
          error?: string;
          checkoutUrl?: string;
        };

        if (!paymentResponse.ok) {
          toast.error(
            paymentData.error ||
              "החשבון נוצר אך טעינת החבילה נכשלה — ניתן לרכוש בדאשבורד",
            { id: progressToast }
          );
          router.push("/dashboard");
          return;
        }

        if (paymentData.checkoutUrl) {
          toast.success("מעבירים לתשלום מאובטח...", { id: progressToast });
          window.location.href = paymentData.checkoutUrl;
          return;
        }
      }

      toast.success(
        `ברוך הבא, ${registerData.user.name}! הפרופיל נשמר בהצלחה.`,
        { id: progressToast }
      );
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "שגיאה בלתי צפויה במהלך הרישום";
      setSubmitError(message);
      toast.error(message, { id: progressToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans antialiased py-16 px-6"
      dir="rtl"
    >
      <div className="max-w-xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <Link
            href="/register"
            className="text-xs font-black tracking-widest text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
          >
            ← חזרה לבחירת סוג הרשמה
          </Link>
          <h1 className="text-4xl font-black text-[#1d1d1f] tracking-tight pt-4">
            הרשמת תלמיד / הורה
          </h1>
          <p className="text-xs font-bold text-[#6e6e73]">
            אבחון לימודי קצר ואז פתיחת חשבון STUDENT
          </p>
        </div>

        <div className="w-full bg-[#e5e5e7] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#0071e3] h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="bg-white border border-[#e5e5e7] p-8 rounded-3xl shadow-sm space-y-8">
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-xl font-black text-[#1d1d1f] text-right">
                בחר את מסלול הלימודים הנוכחי שלך:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, path: "school" })}
                  className={`p-6 rounded-2xl border text-right transition-all ${
                    formData.path === "school"
                      ? "border-[#0071e3] bg-[#0071e3]/5 shadow-sm"
                      : "border-[#e5e5e7] hover:border-slate-400"
                  }`}
                >
                  <div className="text-md font-black text-[#1d1d1f]">חטיבה ותיכון</div>
                  <div className="text-xs font-bold text-[#6e6e73] mt-1">
                    הכנה לבגרויות, סגירת פערים וליווי שוטף בכל מקצועות הלימוד.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, path: "academia" })}
                  className={`p-6 rounded-2xl border text-right transition-all ${
                    formData.path === "academia"
                      ? "border-[#0071e3] bg-[#0071e3]/5 shadow-sm"
                      : "border-[#e5e5e7] hover:border-slate-400"
                  }`}
                >
                  <div className="text-md font-black text-[#1d1d1f]">השכלה גבוהה / אקדמיה</div>
                  <div className="text-xs font-bold text-[#6e6e73] mt-1">
                    קורסים מורכבים ותארים אקדמיים, בדגש על הנדסה ומדעים מדויקים.
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn text-right">
              <h3 className="text-xl font-black text-[#1d1d1f]">פרטי הרקע הלימודי שלך:</h3>

              {formData.path === "school" ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-[#6e6e73]">מהי כיתת הלימוד שלך?</label>
                    <input
                      type="text"
                      value={formData.schoolGrade}
                      onChange={(e) =>
                        setFormData({ ...formData, schoolGrade: e.target.value })
                      }
                      placeholder="למשל: כיתה י' או כיתה יב'"
                      className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-[#6e6e73]">
                      רמת יחידות לימוד (אם רלוונטי)
                    </label>
                    <select
                      value={formData.schoolUnits}
                      onChange={(e) =>
                        setFormData({ ...formData, schoolUnits: e.target.value })
                      }
                      className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">בחרו מספר יחידות</option>
                      <option value="3">3 יחידות לימוד</option>
                      <option value="4">4 יחידות לימוד</option>
                      <option value="5">5 יחידות לימוד</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-[#6e6e73]">
                      מהו המקצוע המבוקש?
                    </label>
                    <input
                      type="text"
                      value={formData.schoolSubject}
                      onChange={(e) =>
                        setFormData({ ...formData, schoolSubject: e.target.value })
                      }
                      placeholder="למשל: מתמטיקה, פיזיקה, אנגלית"
                      className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-[#6e6e73]">מוסד הלימודים האקדמי</label>
                    <input
                      type="text"
                      value={formData.academicInstitution}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          academicInstitution: e.target.value,
                        })
                      }
                      placeholder="למשל: אוניברסיטת תל אביב, הטכניון"
                      className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-[#6e6e73]">מהו מסלול התואר שלך?</label>
                    <input
                      type="text"
                      value={formData.academicDegree}
                      onChange={(e) =>
                        setFormData({ ...formData, academicDegree: e.target.value })
                      }
                      placeholder="למשל: הנדסת מכונות, מדעי המחשב"
                      className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-[#6e6e73]">
                      שם הקורס הספציפי שבו נדרש חיזוק
                    </label>
                    <input
                      type="text"
                      value={formData.academicCourse}
                      onChange={(e) =>
                        setFormData({ ...formData, academicCourse: e.target.value })
                      }
                      placeholder="למשל: אינפי 1, אלגברה ליניארית"
                      className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn text-right">
              <h3 className="text-xl font-black text-[#1d1d1f]">
                מהו האתגר המרכזי ויעד הלימודים שלך?
              </h3>

              <div className="space-y-2">
                <label className="text-xs font-black text-[#6e6e73]">
                  מהו החסם המרכזי שמונע ממך להצליח כרגע?
                </label>
                <select
                  value={formData.bottleneck}
                  onChange={(e) =>
                    setFormData({ ...formData, bottleneck: e.target.value })
                  }
                  className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">בחרו את החסם המרכזי</option>
                  <option value="gaps">פערי עבר קשים בבסיס של חומר הלימוד</option>
                  <option value="anxiety">
                    חרדת בחינות, לחץ מנטלי בלייב או &quot;בלקאאוט&quot; במבחן
                  </option>
                  <option value="discipline">
                    קושי בניהול זמן, חוסר משמעת עצמית או קושי בתרגול עצמאי
                  </option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-[#6e6e73]">
                  מהי מסגרת הליווי המבוקשת?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, goalType: "marathon" })}
                    className={`p-4 rounded-xl border text-right transition-all ${
                      formData.goalType === "marathon"
                        ? "border-[#0071e3] bg-[#0071e3]/5 font-black"
                        : "border-[#e5e5e7]"
                    }`}
                  >
                    <div className="text-xs font-black text-[#1d1d1f]">
                      מרתון ממוקד בטווח הקצר
                    </div>
                    <div className="text-[11px] text-[#6e6e73] mt-0.5">
                      הכנה אינטנסיבית לקראת מבחן קרוב.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, goalType: "semester" })}
                    className={`p-4 rounded-xl border text-right transition-all ${
                      formData.goalType === "semester"
                        ? "border-[#0071e3] bg-[#0071e3]/5 font-black"
                        : "border-[#e5e5e7]"
                    }`}
                  >
                    <div className="text-xs font-black text-[#1d1d1f]">
                      ליווי סמסטריאלי / שנתי שוטף
                    </div>
                    <div className="text-[11px] text-[#6e6e73] mt-0.5">
                      סגירת פערים עקבית ובניית ביטחון ארוך טווח.
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fadeIn text-right">
              <h3 className="text-xl font-black text-[#1d1d1f]">
                סיום רישום ובחירת חבילה (אופציונלי):
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "single",
                    title: "שיעור מיפוי בודד",
                    desc: "מפגש ראשוני לאיתור פערים.",
                  },
                  {
                    id: "triple",
                    title: "כרטיסיית 3 מפגשים",
                    desc: "חבילה ממוקדת לנושא או מבחן.",
                  },
                  {
                    id: "five",
                    title: "כרטיסיית 5 מפגשים",
                    desc: "ליווי שוטף ויצירת עצמאות.",
                  },
                ].map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, selectedCard: card.id })
                    }
                    className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between ${
                      formData.selectedCard === card.id
                        ? "border-[#0071e3] bg-[#0071e3]/5 font-black"
                        : "border-[#e5e5e7]"
                    }`}
                  >
                    <div className="text-xs font-black text-[#1d1d1f]">{card.title}</div>
                    <div className="text-[11px] text-[#6e6e73] mt-1">{card.desc}</div>
                  </button>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="שם מלא *"
                  className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="מספר טלפון *"
                  className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none text-right"
                  dir="ltr"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="אימייל (אופציונלי)"
                  className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none text-right"
                  dir="ltr"
                />
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#6e6e73]">סיסמה לכניסה *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="לפחות 6 תווים"
                    className="w-full bg-[#f5f5f7] border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-[#1d1d1f] focus:bg-white focus:border-blue-500 focus:outline-none text-right"
                    dir="ltr"
                  />
                </div>
                <p className="text-[11px] font-bold text-[#6e6e73] bg-[#f5f5f7] p-3 rounded-xl border border-slate-200">
                  החשבון ייפתח כתלמיד/ה (STUDENT) ויועבר לדאשבורד התלמיד.
                </p>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-3 rounded-xl text-right">
                  {submitError}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e7]">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={loading}
                className="text-xs font-black text-[#6e6e73] hover:text-[#1d1d1f] transition-colors disabled:opacity-50"
              >
                חזור אחורה
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-black text-xs py-3 px-6 rounded-full transition-all shadow-md"
              >
                המשך לשלב הבא ←
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#1d1d1f] hover:bg-[#2d2d2f] text-white font-black text-xs py-3 px-8 rounded-full transition-all shadow-md disabled:opacity-50"
              >
                {loading ? "יוצר חשבון..." : "פתיחת חשבון תלמיד"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

export default function FallbackForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", grade: "", notes: "" });
  const [submitted, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // שליחה אמיתית ל-API המקומי של project8 שמחובר ל-PostgreSQL
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus(true); // מעביר למסך הודעת ההצלחה
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'אופס, חלה שגיאה בשליחת הטופס. נסו שוב.');
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert('שגיאת תקשורת מול השרת. ודאו ששרת הפיתוח שלכם רץ.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-900/40 border border-green-500 text-green-200 p-6 rounded-xl text-center backdrop-blur-sm">
        <h3 className="text-xl font-bold">הפרטים נקלטו בהצלחה!</h3>
        <p className="mt-2 text-sm">אנחנו בודקים מול צוות המורים את השעות שביקשתם, ונחזור אליכם לשיבוץ מהיר תוך שעות בודדות.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 p-6 rounded-xl text-right backdrop-blur-md shadow-xl">
      <h3 className="text-xl font-bold mb-4 text-center text-blue-400">שאלון התאמה ושיבוץ ידני</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">שם מלא (הורה/תלמיד)</label>
          <input 
            type="text" required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">טלפון ליצירת קשר</label>
          <input 
            type="tel" required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none text-left transition-all" dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">באיזו כיתה התלמיד/ה?</label>
          <select 
            value={formData.grade}
            onChange={(e) => setFormData({...formData, grade: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            <option value="">בחרו כיתה</option>
            <option value="חטיבה">חטיבת ביניים (ז'-ט')</option>
            <option value="תיכון-3">תיכון - 3 יחידות</option>
            <option value="תיכון-4">תיכון - 4 יחידות</option>
            <option value="תיכון-5">תיכון - 5 יחידות</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">מהן השעות והימים המועדפים עליכם לשיעור?</label>
          <textarea 
            rows={3}
            value={formData.notes}
            placeholder="למשל: ימי שלישי ורביעי החל משעה 16:00..."
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <button 
        type="submit"
        disabled={loading}
        className={`mt-6 w-full text-white font-bold py-3 px-4 rounded-lg transition-all ${
          loading 
          ? 'bg-slate-600 cursor-not-allowed animate-pulse' 
          : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20'
        }`}>
        {loading ? 'שומר נתונים...' : 'שלחו בקשת שיבוץ מנוהלת'}
      </button>
    </form>
  );
}
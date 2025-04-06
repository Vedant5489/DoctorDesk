import { useState } from "react";

export default function GeminiHealthSearch() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const healthKeywords = [
    "fever", "cough", "cold", "headache", "migraine", "nausea", "vomiting", "dizziness", "fatigue", "sore throat",
    "runny nose", "sneezing", "congestion", "diarrhea", "constipation", "bloating", "chest pain", "shortness of breath",
    "palpitations", "rash", "back pain", "joint pain", "neck pain", "shoulder pain", "muscle cramps", "stiffness",
    "swelling", "numbness", "tingling", "burning sensation", "asthma", "diabetes", "hypertension", "heart disease",
    "cancer", "stroke", "epilepsy", "anemia", "thyroid issues", "obesity", "sinus infection", "earache", "hearing loss",
    "tinnitus", "nosebleed", "wheezing", "laryngitis", "tonsillitis", "allergies", "bronchitis", "stomach ache",
    "heartburn", "indigestion", "acid reflux", "IBS", "gastritis", "ulcers", "gallstones", "liver pain", "appendicitis",
    "anxiety", "depression", "stress", "insomnia", "panic attack", "brain fog", "seizures", "memory loss", "mood swings",
    "ADHD", "infection", "inflammation", "flu", "COVID", "viral fever", "bacterial infection", "fungal infection", "STDs",
    "UTI", "hepatitis", "blood pressure", "blood sugar", "heart rate", "BMI", "sleep", "hydration", "exercise", "nutrition",
    "vaccination", "medical checkup", "head", "eyes", "ears", "nose", "throat", "chest", "stomach", "back", "legs", "arms"
  ];

  const isHealthQuery = (text) => {
    return healthKeywords.some((keyword) =>
      text.toLowerCase().includes(keyword)
    );
  };

  const handleSearch = async () => {
    setResponse("");

    if (!query.trim()) return;
    if (!isHealthQuery(query)) {
      setResponse("\u26A0\uFE0F This tool only provides information for symptom-related health queries.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBixEZF41qp9WwoMKF9C8HCUiqJnAyJJ7w",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a brief, accurate AI health assistant. The user has reported these symptoms: "${query}". Respond in 5 sentences or less, and avoid overdiagnosing. If unsure, suggest seeing a doctor.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setResponse(aiText || "\u26A0\uFE0F No clear response from AI.");
    } catch (err) {
      console.error(err);
      setResponse("\u26A0\uFE0F Error contacting AI.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl mt-8 space-y-6">
      <h1 className="text-2xl font-bold text-[#023047]">Symptom Checker (AI)</h1>

      <input
        type="text"
        className="w-full border px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
        placeholder="Describe your symptoms (e.g. sore throat, chills, nausea...)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="w-full bg-[#34A0A4] text-white py-2 rounded-md hover:bg-[#2a878a] transition"
      >
        {loading ? "Analyzing..." : "Ask AI"}
      </button>

      <div className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 p-4 rounded-md min-h-[80px]">
        {response}
      </div>
    </div>
  );
}

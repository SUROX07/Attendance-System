import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getAttendanceSuggestion } from '@/services/Student/Dashboard/ai';

export const SubjectCard = ({ subject }) => {
  const [suggestion, setSuggestion] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const percentage = ((subject.days_present / 30) * 100).toFixed(2);

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const res = await getAttendanceSuggestion({
          subjectCode: subject.subjectCode,
          days_present: subject.days_present,
        });
        setSuggestion(res);
      } catch (error) {
        setSuggestion('Failed to fetch suggestion.');
        console.error(error);
      }
    };

    fetchSuggestion();
  }, [subject.subjectCode, subject.days_present]);

  return (
    <Card
      className={`bg-white/10 backdrop-blur-md border shadow-md rounded-2xl p-4 text-white transition 
        ${
          parseInt(percentage) > 60
            ? "border-white hover:shadow-[0px_0px_15px_5px_rgba(255,255,255,0.5)]"
            : "border-red-500 hover:shadow-[0px_0px_15px_5px_rgba(255,0,0,0.5)]"
        }`}
    >
      <CardContent>
        <h2 className="text-xl font-semibold">{subject.subjectName} ({subject.subjectCode})</h2>
        <p>Days Present: {subject.days_present}</p>
        <p>Attendance: {percentage}%</p>

        <button
          onClick={() => setShowSuggestion(!showSuggestion)}
          className="mt-4 px-4 py-1 text-sm rounded bg-[rgba(54,171,214,0.8)] hover:bg-[rgba(54,171,214,1)]"
        >
          Suggestion
        </button>

        {showSuggestion && (
          <div className="mt-2 p-2 text-sm rounded shadow-inner border">
            {suggestion || "Loading suggestion..."}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

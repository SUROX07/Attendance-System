import { SUBJECT_API } from '@/api/endpoints';
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = "AIzaSyAFPsT5_YVgs1pW2mQD8c4okMx921RcsF8";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });


export async function getAttendanceSuggestion({subjectCode, days_present}: {subjectCode: string, days_present:number}){

  try{
    const api = `${SUBJECT_API.GET_SUBJECT}/${subjectCode}`;
    const response = await fetch(api);
    const subjectDetails = await response.json();
    console.log(subjectDetails);


    const prompt = `
 You are an AI assistant helping students manage their class attendance.

    Provide a suggestion for the subject "${subjectCode}" based on this data:
    - Total classes planned for semester: ${subjectDetails.total_days}
    - Classes conducted so far: ${subjectDetails.concluded_days}
    - Classes attended by student: ${days_present}

    Given the data for each subject, calculate the current attendance percentage and provide actionable suggestions.

    Your task:
    - Compute the current attendance percentage .
    - Consider the number of total planned classes, classes concluded so far, and classes the student has attended.
    - Must Give a clear suggestion for how many upcoming classes must be attended to reach or mantain a minimum 60% attendance .
    - If they don't need anymore classes to achieve a more than 60% attendance after the all the scheduled classes are concluded then still encourage them to attend classes for being on the safe side
    
    Example outputs:
	  -Great you have 70% attendance and need 0 attendance more to keep your attendance above 60% but it is better to keep attending classes to be safe.
	  -You have 60% attendance and need to attend atleast 10 more classes to keep your attendance above 60%.	

    Output your response strictly as a JSON object. Each key should be the subject code, and each value should be a plain English suggestion string.
    `;

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: prompt,
    });
    const res = await result.text;
    const cleaned = await res.replace(/```json|```/g, '').trim();
    const parsed = await JSON.parse(cleaned);
    const suggestion = parsed[subjectCode];
    console.log('this is res: ', suggestion);
    return suggestion;
  } catch (err) {
    console.error('Failed to generate AI suggestion:', err);
    throw new Error('Error generating attendance suggestion');
  }
}

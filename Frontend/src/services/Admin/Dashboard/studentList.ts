import { ADMIN_API } from "@/api/endpoints";

export const getStudentsBySubject = async (subjectCode: string) => {
    const api=ADMIN_API.GET_STUDENTS
    console.log("subject: ",subjectCode);
    const res = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subjectCode:subjectCode,
        })
      });
    if (!res.ok) alert("Failed to fetch data");
    const result = await res.json()
    console.log(result)
    return result;
  };
  
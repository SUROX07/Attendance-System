import { STUDENT_API } from "@/api/endpoints"

export const getStudentData = async (id:string)=>{
    const api = `${STUDENT_API.GET_STUDENT}/${id}`;
    const student = await fetch(api)
    return student.json();
}
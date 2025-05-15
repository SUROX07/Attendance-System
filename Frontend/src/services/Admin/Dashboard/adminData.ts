import { ADMIN_API} from "@/api/endpoints"

export const getAdminData = async (id:string)=>{
    const api = `${ADMIN_API.GET_ADMIN}/${id}`;
    const student = await fetch(api)
    return student.json();
}
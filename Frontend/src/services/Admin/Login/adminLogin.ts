import { ADMIN_API } from "@/api/endpoints"

type data = {
    id:string,
    password:string
}
export const adminLog = async (data:data)=>{
    try {
        const response = await fetch(ADMIN_API.LOGIN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id:data.id,
            password:data.password
          })
        });
    
        if (!response.ok) {
            const result = await response.json()
          throw new Error(`${result.message}`);
        }
        return response;
      } catch (error) {
        alert(`Registration failed: ${error}`);
      }
}   
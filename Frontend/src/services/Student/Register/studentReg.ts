import { STUDENT_API } from "@/api/endpoints"
type RegisterFormData = {
    name: string;
    student_id: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

export const studentReg = async (data:RegisterFormData)=>{
    try {
        const response = await fetch(STUDENT_API.REGISTER, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
    
        if (!response.ok) {
            const result = await response.json()
          throw new Error(`${result.message}`);
        }
        return response;
        const result = await response.json();
        console.log("Registration successful:", result.message);
      } catch (error) {
        alert(`Registration failed: ${error}`);
      }
}
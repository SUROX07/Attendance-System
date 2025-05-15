const BASE_URL = 'http://localhost:7777/api';

export const ADMIN_API = {
  LOGIN: `${BASE_URL}/admin/login`,
  GET_ADMIN: `${BASE_URL}/admin`,
  GET_STUDENTS:`${BASE_URL}/admin/students`
};

export const STUDENT_API = {
  LOGIN: `${BASE_URL}/students/login`,
  REGISTER: `${BASE_URL}/students/register`,
  GET_ALL: `${BASE_URL}/students`,
  GET_STUDENT: `${BASE_URL}/students`
};
export const SUBJECT_API = {
  GET_SUBJECT: `${BASE_URL}/subject`
}

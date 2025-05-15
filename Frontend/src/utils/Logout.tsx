import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition absolute right-[50px]"
    >
      Logout
    </button>
  );
};

export default Logout;

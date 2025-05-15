import React from "react";

const Copyright: React.FC = () => {
  return (
    <footer className="bg-black text-white text-center py-4 border-t-2 border-white">
      <p>&copy; {new Date().getFullYear()} All rights reserved to Surajit.</p>
    </footer>
  );
};

export default Copyright;

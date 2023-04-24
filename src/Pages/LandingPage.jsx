import { useState } from "react";
import { Login, Register } from "../Components/Pages/LandingPage";

export const LandingPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const changeLogRegister = () => setIsRegistering(!isRegistering);
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[url('../../src/assets/images/LandBgImage.png')] bg-cover bg-center">
      {isRegistering ? (
        <Register changeLogRegister={changeLogRegister} />
      ) : (
        <Login changeLogRegister={changeLogRegister} />
      )}
    </div>
  );
};

export default LandingPage;
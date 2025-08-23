import { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Renta | Register",
};

const RegisterPage = async () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-lg p-2">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;

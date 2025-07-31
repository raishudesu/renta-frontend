import RegisterForm from "./register-form";

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

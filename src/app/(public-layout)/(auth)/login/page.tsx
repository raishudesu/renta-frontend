import LoginForm from "./login-form";

const LoginPage = async () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-lg p-2">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

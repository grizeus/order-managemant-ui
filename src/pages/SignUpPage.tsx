import { SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const SignUpPage = () => {
  return (
    <div className="flex justify-center">
      <SignUp
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
};

export default SignUpPage;

import { SignIn } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const SignInPage = () => {
  return (
    <div className="flex justify-center">
      <SignIn
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
};

export default SignInPage;

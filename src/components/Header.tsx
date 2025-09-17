import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const Header = () => {
  return (
    <header className="px-5 pt-5 pb-2.5">
      <div className="bg-charcoal-black flex min-w-84 items-center justify-between rounded-2xl px-5 py-3">
        <span className="text-base text-sand">
          Orders Management
        </span>
        <>
          <SignedOut>
            <SignInButton>
              <button className="text-charcoal-black cursor-pointer rounded-md bg-gray-300 p-1 px-4 leading-loose">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              showName
              appearance={{
                baseTheme: dark,
              }}
            />
          </SignedIn>
        </>
      </div>
    </header>
  );
};

export default Header;

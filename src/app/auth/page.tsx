import React from "react";
import OAuth from "./oauth";

const LoginPage = () => {
  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-4 border p-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-xl">Please login to continue</p>
        <OAuth />
      </div>
    </section>
  );
};

export default LoginPage;

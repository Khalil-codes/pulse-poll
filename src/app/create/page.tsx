import React from "react";
import PollCreationForm from "./form";

export const dynamic = "force-static";

const CreatePoll = () => {
  return (
    <section className="mx-auto mt-10 flex w-full max-w-screen-md flex-1 justify-center">
      <PollCreationForm />
    </section>
  );
};

export default CreatePoll;

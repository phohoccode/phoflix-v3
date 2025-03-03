"use client";

import { useActionState } from "react";

const TestHook = () => {
  const [data, submitAction, isPending] = useActionState(
    (prevState, formData) => {
      console.log("data", formData);
      return formData;
    },
    null
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>
        Update
      </button>
    </form>
  );
};

export default TestHook;

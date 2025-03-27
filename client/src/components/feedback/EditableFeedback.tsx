"use client";

import { Editable, EditableInput } from "@chakra-ui/react";
import { useState } from "react";

interface EditableFeedbackProps {
  children: React.ReactNode;
  readonly: boolean;
  defaultValue?: string;
}

const EditableFeedback = ({
  children,
  defaultValue,
  readonly = false,
}: EditableFeedbackProps) => {
  const [value, setValue] = useState(defaultValue || "");

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  const handleSubmit = () => {
    console.log("Submit", value);
    alert("Submit");
  };

  return (
    <Editable.Root
      value={value}
      onValueCommit={handleSubmit}
      onChange={handleChange}
      readOnly={readonly}
    >
      <Editable.Preview
        className={`${!readonly ? "hover:bg-[#ffffff10]" : "bg-transparent"} min-h-6`}
      >
        {children}
      </Editable.Preview>
      <EditableInput className="focus-visible:outline-gray-400 min-h-6 text-gray-400 text-xs bg-transparent" />
    </Editable.Root>
  );
};

export default EditableFeedback;

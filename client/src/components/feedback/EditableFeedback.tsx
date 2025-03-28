"use client";

import { Editable, EditableInput } from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "../ui/toaster";
import { updateContentFeedback } from "@/lib/actions/userActionClient";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useParams } from "next/navigation";
import {
  getFeedbacks,
  getReplyListFeedback,
} from "@/store/asyncThunks/feedbackAsyncThunk";

const EditableFeedback = ({
  children,
  defaultValue,
  feedbackId,
  parentId,
  readonly = false,
}: EditableFeedbackProps) => {
  const [value, setValue] = useState(defaultValue || "");
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const { feedbackType } = useSelector((state: RootState) => state.feedback);

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  const updateFeedback = async () => {
    if (value?.trim() === "" || value === defaultValue) {
      setValue(defaultValue || "");
      return;
    }

    const response = await updateContentFeedback({
      feedbackId,
      content: value,
      userId: session?.user?.id as string,
    });

    if (response.status) {
      toaster.create({ type: "success", description: response.message });

      !parentId &&
        dispatch(
          getFeedbacks({
            movieSlug: params.slug as string,
            type: feedbackType,
            limit: 10,
          })
        );

      parentId &&
        dispatch(
          getReplyListFeedback({
            parentId: parentId as string,
            type: feedbackType,
            limit: 10,
          })
        );
    } else {
      toaster.create({ type: "error", description: response.message });
    }
  };

  return (
    <Editable.Root
      value={value}
      onValueCommit={updateFeedback}
      onChange={handleChange}
      readOnly={readonly}
    >
      <Editable.Preview
        className={`${
          !readonly ? "hover:bg-[#ffffff10]" : "bg-transparent"
        } min-h-6`}
      >
        {children}
      </Editable.Preview>
      <EditableInput className="focus-visible:outline-gray-400 min-h-6 text-gray-400 text-xs bg-transparent" />
    </Editable.Root>
  );
};

export default EditableFeedback;

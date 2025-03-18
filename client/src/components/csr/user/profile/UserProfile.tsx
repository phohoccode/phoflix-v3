"use client";

import {
  Box,
  Button,
  Field,
  HStack,
  Input,
  RadioGroup,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import UserAvatar from "./UserAvatar";
import { toaster } from "@/components/ui/toaster";
import { updateUserProfile } from "@/lib/actions/userAction";
import ResetPassword from "./ResetPassword";

type Values = {
  username: string | undefined;
  gender: "other" | "male" | "female" | undefined;
};

const UserProfile = () => {
  const { data: sesstion, update }: any = useSession();
  const [values, setValues] = useState<Values | null>(null);
  const [isPending, startTransition] = useTransition();

  const optionGender = [
    { label: "Nam", value: "male" },
    { label: "Nữ", value: "female" },
    { label: "Khác", value: "other" },
  ];

  useEffect(() => {
    if (sesstion) {
      setValues({
        username: sesstion.user?.username,
        gender: sesstion.user?.gender,
      });
    }
  }, [sesstion]);

  const handleUpdateUserProfile = () => {
    if (values?.username?.trim() === "") {
      toaster.error({
        description: "Tên hiển thị không được để trống!",
        type: "error",
        duration: 2000,
      });

      return;
    }

    startTransition(async () => {
      const response = await updateUserProfile({
        userId: sesstion.user?.id,
        username: values?.username as string,
        gender: values?.gender as any,
        avatar: sesstion.user?.image,
        typeAccount: sesstion.user?.typeAccount,
      });

      if (!response?.status) {
        toaster.error({
          description: response?.message,
          type: "error",
          duration: 2000,
        });
      } else {
        toaster.success({
          description: response?.message,
          type: "success",
          duration: 2000,
        });

        await update();
      }
    });
  };

  if (!sesstion) return null;

  return (
    <Box className="flex flex-col gap-2 lg:p-10 lg:max-w-[35vw] md:max-w-[30vw] max-w-[560px] lg:mx-0 mx-auto">
      <Box className="flex-1 mb-3">
        <h3 className="text-lg text-gray-50">Tài khoản</h3>
        <span className="text-sm text-gray-300">
          Cập nhật thông tin tài khoản
        </span>
      </Box>
      <Box className="flex gap-8 md:items-start items-center md:flex-row flex-col">
        <UserAvatar />
        <form
          className="flex w-full flex-col gap-6 mt-3 flex-1"
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") {
          //     e.preventDefault();
          //     handleUpdateUserProfile();
          //   }
          // }}
        >
          <Field.Root required className="text-gray-50">
            <Field.Label>Email</Field.Label>
            <Input
              _disabled={{
                backgroundColor: "#ffffff05 !important",
              }}
              disabled
              value={sesstion.user?.email ?? ""}
              variant="outline"
            />
          </Field.Root>
          <Field.Root required className="text-gray-50">
            <Field.Label>Tên hiển thị</Field.Label>
            <Input
              onChange={(e) =>
                setValues({
                  gender: values?.gender ?? "other",
                  username: e.target.value,
                })
              }
              className="border border-[#2e313a] focus:border-gray-50"
              value={values?.username ?? ""}
              variant="outline"
            />
          </Field.Root>
          <Field.Root required className="text-gray-50" gap={4}>
            <Field.Label>Giới tính</Field.Label>
            <RadioGroup.Root
              variant="solid"
              colorPalette="yellow"
              value={values?.gender ?? "other"}
              onChange={(e: any) => {
                setValues({
                  username: values?.username ?? "",
                  gender: e.target.value,
                });
              }}
            >
              <HStack gap="6">
                {optionGender.map((item) => (
                  <RadioGroup.Item key={item.value} value={item.value}>
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                  </RadioGroup.Item>
                ))}
              </HStack>
            </RadioGroup.Root>
          </Field.Root>
          <Box className="md:max-w-24 max-w-full mt-6">
            <Button
              onClick={handleUpdateUserProfile}
              className="w-full"
              size="sm"
              loading={isPending}
              variant="solid"
              colorPalette="yellow"
            >
              Cập nhật
            </Button>
          </Box>

          {sesstion.user?.typeAccount === "credentials" && (
            <Box className="mt-6 text-gray-50 text-sm">
              <span>Đổi mật khẩu nhấn vào</span> <ResetPassword />
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default UserProfile;

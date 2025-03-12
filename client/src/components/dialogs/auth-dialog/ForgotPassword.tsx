"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { PinInput } from "@/components/ui/pin-input";
import { isValidEmail } from "@/lib/utils";
import { setTypeAuth } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { Box, Button, Field, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = () => {
    if (!email.trim()) {
      setInvalid(true);
      setError("Email không được để trống");
      return;
    }

    if (!isValidEmail(email)) {
      setInvalid(true);
      setError("Email không hợp lệ");
      return;
    }
  };

  return (
    <Box className="flex flex-col gap-2">
      <h3 className="text-lg text-gray-50">Quên mật khẩu</h3>
      <p className="text-xs text-gray-400">
        Nếu bạn đã có tài khoản,{" "}
        <span
          onClick={() => dispatch(setTypeAuth("signin"))}
          className="text-[#f1c40f] hover:underline cursor-pointer"
        >
          đăng nhập
        </span>
      </p>
      <form className="flex flex-col gap-4 mt-4">
        <Field.Root invalid={invalid}>
          <Input
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
              setInvalid(false);
              setError("");
            }}
            value={email}
            type="email"
            name="email"
            className={`border text-gray-50 ${
              !invalid
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Email đăng ký"
          />
          <Field.ErrorText>{error}</Field.ErrorText>
        </Field.Root>

        <Button
          onClick={handleResetPassword}
          size="sm"
          colorPalette="yellow"
          variant="solid"
          className="hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
        >
          Gửi yêu cầu
        </Button>
      </form>
    </Box>
  );
};

export default ForgotPassword;

import { BASE_URL } from "./config.js";
import { isValidEmail } from "@/helper/validators.js";

export async function login(email, password) {
  const emailValue = email.trim();
  const passwordValue = password.trim();

  const res = await fetch(`${BASE_URL}/users`);

  if (!res.ok) {
    throw new Error("Đăng nhập không thành công");
  }

  const users = await res.json();

  const user = users.find(
    (u) => u.email === emailValue && u.password === passwordValue
  );

  if (!user) {
    throw new Error("Email hoặc mật khẩu không đúng");
  }

  if (!user.isActive) {
    throw new Error("Tài khoản của bạn đã bị khóa");
  }

  return user;
}

export async function DangKy(userData) {
  const emailValue = userData.email.trim();
  const passwordValue = userData.password.trim();
  const fullNameValue = userData.fullName.trim();

  if (!isValidEmail(emailValue)) {
    throw new Error("Email không đúng định dạng");
  }

  const checkRes = await fetch(`${BASE_URL}/users`);

  if (!checkRes.ok) {
    throw new Error("Không thể kiểm tra email");
  }

  const existingUsers = await checkRes.json();
  const emailExists = existingUsers.some((u) => u.email === emailValue);

  if (emailExists) {
    throw new Error("Email đã được sử dụng");
  }

  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: fullNameValue,
      email: emailValue,
      password: passwordValue,
      role: "customer",
      isActive: true,
    }),
  });

  if (!res.ok) {
    throw new Error("Không thể đăng ký tài khoản");
  }

  return await res.json();
}
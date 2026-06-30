<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { DangKy } from "@/api/authApi";

const router = useRouter();

const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const loading = ref(false);

async function handleRegister() {
  try {
    error.value = "";

    if (!fullName.value.trim()) {
      throw new Error("Vui lòng nhập họ tên");
    }

    if (!email.value.trim()) {
      throw new Error("Vui lòng nhập email");
    }

    if (!password.value.trim()) {
      throw new Error("Vui lòng nhập mật khẩu");
    }

    if (password.value !== confirmPassword.value) {
      throw new Error("Mật khẩu nhập lại không khớp");
    }

    loading.value = true;

    await DangKy({
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      password: password.value,
    });

    alert("Đăng ký thành công");
    router.push("/login");
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="auth-page">
    <form class="auth-box" @submit.prevent="handleRegister">
      <h1>Đăng ký tài khoản</h1>

      <p v-if="error" class="error">{{ error }}</p>

      <input v-model="fullName" placeholder="Họ và tên" />

      <input v-model="email" type="email" placeholder="Email" />

      <input v-model="password" type="password" placeholder="Mật khẩu" />

      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Nhập lại mật khẩu"
      />

      <button :disabled="loading">
        {{ loading ? "Đang đăng ký..." : "Đăng ký" }}
      </button>

      <p>
        Đã có tài khoản?
        <RouterLink to="/login">Đăng nhập</RouterLink>
      </p>
    </form>
  </section>
</template>

<style scoped>
.auth-page {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-box {
  width: 380px;
  background: white;
  padding: 28px;
  border-radius: 12px;
  border: 1px solid #e8ddd0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.auth-box h1 {
  color: #2c1f0f;
}

.auth-box input {
  padding: 11px 12px;
  border: 1px solid #d8c8b8;
  border-radius: 6px;
}

.auth-box button {
  background: #6b4c2a;
  color: white;
  border: none;
  padding: 11px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.error {
  color: #b00020;
  font-weight: 600;
}
</style>
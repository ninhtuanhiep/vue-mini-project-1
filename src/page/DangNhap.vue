<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { login } from "@/api/authApi";
import { setCurrentUser } from "@/helper/auth";

const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

async function handleLogin() {
  try {
    error.value = "";

    if (!email.value.trim() || !password.value.trim()) {
      throw new Error("Vui lòng nhập email và mật khẩu");
    }

    loading.value = true;

    const user = await login(email.value.trim(), password.value);

    setCurrentUser(user);

    const redirectPath = route.query.redirect;

    if (redirectPath) {
      router.push(redirectPath);
      return;
    }

    if (user.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="auth-page">
    <form class="auth-box" @submit.prevent="handleLogin">
      <h1>Đăng nhập</h1>

      <p v-if="error" class="error">{{ error }}</p>

      <input v-model="email" type="email" placeholder="Email" />

      <input v-model="password" type="password" placeholder="Mật khẩu" />

      <button :disabled="loading">
        {{ loading ? "Đang đăng nhập..." : "Đăng nhập" }}
      </button>

      <p>
        Chưa có tài khoản?
        <RouterLink to="/register">Đăng ký</RouterLink>
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
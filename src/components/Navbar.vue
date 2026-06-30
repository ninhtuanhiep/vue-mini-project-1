<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { currentUser, logout } from '@/helper/auth'

const router = useRouter()

function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
     <RouterLink to="/"><span class="brand-name">Đồ Gỗ Tuấn Hạnh</span></RouterLink> 
    </div>
    <div class="navbar-links">
      <RouterLink to="/">Trang chủ</RouterLink>
      <RouterLink to="/products">Sản phẩm</RouterLink>
      <RouterLink to="/cart">Giỏ hàng</RouterLink>
      <RouterLink to="/about">Giới thiệu</RouterLink>

      <RouterLink v-if="currentUser?.role === 'admin'" to="/admin/dashboard">Quản trị</RouterLink>

      <template v-if="currentUser">
        <span class="navbar-user">Xin chào, {{ currentUser.fullName }}</span>
        <button class="navbar-logout" @click="handleLogout">Đăng xuất</button>
      </template>
      <template v-else>
        <RouterLink to="/login">Đăng nhập</RouterLink>
        <RouterLink to="/register">Đăng ký</RouterLink>
      </template>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 68px;
  background-color: #2C1F0F;
  box-shadow: 0 2px 12px rgba(0,0,0,0.25);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  font-size: 22px;
}

.brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 700;
  color: #C8976A;
  letter-spacing: 0.01em;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 36px;
}

.navbar-links a {
  color: #D4C4B0;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  padding-bottom: 3px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.navbar-links a:hover {
  color: #C8976A;
}

.navbar-links a.router-link-active {
  color: #C8976A;
  border-bottom-color: #C8976A;
}

.navbar-user {
  color: #C8976A;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.navbar-logout {
  background: transparent;
  border: 1px solid #6B4C2A;
  color: #D4C4B0;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.navbar-logout:hover {
  background: #6B4C2A;
  color: #fff;
}
</style>

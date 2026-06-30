<script setup>
import { useRouter } from "vue-router";
import { logout, currentUser } from "@/helper/auth";

const router = useRouter();

function handleLogout() {
  logout();
  router.push("/login");
}
</script>

<template>
  <aside class="admin-sidebar">
    <div>
      <h2>Admin</h2>

      <p v-if="currentUser" class="admin-name">
        {{ currentUser.fullName }}
      </p>

      <nav>
        <RouterLink to="/admin/dashboard">Dashboard</RouterLink>
        <RouterLink to="/admin/products">Sản phẩm</RouterLink>
        <RouterLink to="/admin/users">Người dùng</RouterLink>
        <!-- Bỏ comment khi đã thêm route /admin/orders và /admin/settings -->
        <!-- <RouterLink to="/admin/orders">Đơn hàng</RouterLink> -->
        <!-- <RouterLink to="/admin/settings">Cài đặt</RouterLink> -->
      </nav>
    </div>

    <button @click="handleLogout">Đăng xuất</button>
  </aside>
</template>

<style scoped>
.admin-sidebar {
  width: 240px;
  min-height: 100vh;
  background: #2c1f0f;
  color: white;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.admin-sidebar h2 {
  margin-bottom: 8px;
  color: #c8976a;
}

.admin-name {
  font-size: 14px;
  color: #f7f2eb;
  margin-bottom: 28px;
}

.admin-sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.admin-sidebar a {
  color: #f7f2eb;
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 6px;
}

.admin-sidebar a.router-link-active {
  background: #6b4c2a;
  color: white;
}

button {
  background: #b00020;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
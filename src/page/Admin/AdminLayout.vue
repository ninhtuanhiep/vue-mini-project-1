<script setup>
import SidebarAdmin from "@/page/Admin/SidebarAdmin.vue";
</script>

<template>
  <div class="admin-layout">
    <SidebarAdmin />

    <main class="admin-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f7f2eb;
}

.admin-content {
  flex: 1;
  padding: 24px;
}
</style>
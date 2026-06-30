<template>
  <section>
    <p class="page-eyebrow">Admin</p>
    <h1>Dashboard</h1>

    <div class="dashboard-grid">
      <div class="card">
        <h3>Sản phẩm</h3>
        <p>Quản lý danh sách sản phẩm</p>
      </div>

      <div class="card">
        <h3>Người dùng</h3>
        <p>Quản lý tài khoản và phân quyền</p>
      </div>

      <div class="card">
        <h3>Đơn hàng</h3>
        <p>Chức năng sẽ phát triển sau</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #a0683a;
  margin-bottom: 8px;
}

h1 {
  color: #2c1f0f;
  margin-bottom: 24px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  border: 1px solid #e8ddd0;
  border-radius: 10px;
  padding: 20px;
}

.card h3 {
  color: #6b4c2a;
  margin-bottom: 8px;
}
</style>
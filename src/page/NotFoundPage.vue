<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <section class="not-found">
    <div class="nf-content">
      <span class="nf-icon">🪵</span>
      <h1 class="nf-code">404</h1>
      <p class="nf-title">Trang không tồn tại</p>
      <div class="divider"></div>
      <p class="nf-desc">Trang bạn tìm kiếm đã bị di chuyển hoặc không còn tồn tại.</p>
      <button @click="router.push('/')">Quay về trang chủ</button>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.nf-content {
  text-align: center;
  max-width: 400px;
}

.nf-icon { font-size: 56px; display: block; margin-bottom: 16px; }

.nf-code {
  font-size: 80px;
  font-weight: 700;
  color: #DDD3C4;
  line-height: 1;
  margin-bottom: 8px;
}

.nf-title {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  color: #2C1F0F;
  margin-bottom: 4px;
}

.divider {
  width: 40px; height: 3px;
  background: linear-gradient(90deg, #A0683A, #C8976A);
  border-radius: 2px;
  margin: 16px auto 20px;
}

.nf-desc {
  font-size: 15px;
  color: #7A6652;
  margin-bottom: 32px;
  line-height: 1.7;
}

button {
  background: #6B4C2A;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

button:hover {
  background: #3B2A1A;
  transform: translateY(-1px);
}
</style>

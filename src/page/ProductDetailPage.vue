<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { products } from "@/data/products";

const route = useRoute();
const router = useRouter();

const product = computed(() =>
  products.find(item => item.id === Number(route.params.id))
);

const toast = ref('')
let toastTimer = null

function showToast(msg) {
  toast.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.value = '', 2200)
}

function addToCart() {
  if (!product.value) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === product.value.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.unshift({ ...product.value, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("Đã thêm vào giỏ hàng!");
}
</script>

<template>
  <section>
    <button class="back-btn" @click="router.push('/products')">← Quay lại</button>

    <div v-if="product" class="detail-layout">
      <div class="detail-visual">
        <span class="detail-emoji">{{ product.emoji }}</span>
      </div>
      <div class="detail-info">
        <p class="detail-eyebrow">Sản phẩm đồ gỗ</p>
        <h1 class="detail-name">{{ product.name }}</h1>
        <div class="divider"></div>
        <p class="detail-desc">{{ product.description }}</p>
        <div class="detail-price-row">
          <span class="detail-price">{{ product.price.toLocaleString() }}</span>
          <span class="price-unit">VNĐ</span>
        </div>
        <button class="btn-add" @click="addToCart">🛒 Thêm vào giỏ hàng</button>
      </div>
    </div>

    <div v-else class="not-found">
      <span class="not-found-icon">🔍</span>
      <h1>Không tìm thấy sản phẩm</h1>
      <p>Sản phẩm bạn tìm không tồn tại hoặc đã bị xóa.</p>
      <RouterLink to="/products" class="back-link">← Quay lại danh sách sản phẩm</RouterLink>
    </div>
  </section>

  <transition name="toast">
    <div v-if="toast" class="toast">{{ toast }}</div>
  </transition>
</template>

<style scoped>
.back-btn {
  background: transparent;
  border: none;
  color: #7A6652;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0 0 32px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s;
}
.back-btn:hover { color: #3B2A1A; }

/* Layout */
.detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.detail-visual {
  background: linear-gradient(135deg, #EDE5D8 0%, #D4C4B0 100%);
  border-radius: 12px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #DDD3C4;
}

.detail-emoji {
  font-size: 120px;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.15));
}

/* Info */
.detail-eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #A0683A;
  margin-bottom: 12px;
}

.detail-name {
  font-size: 36px;
  color: #2C1F0F;
  line-height: 1.15;
}

.divider {
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #A0683A, #C8976A);
  border-radius: 2px;
  margin: 18px 0 22px;
}

.detail-desc {
  font-size: 15px;
  color: #7A6652;
  line-height: 1.8;
  margin-bottom: 28px;
}

.detail-price-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 32px;
}

.detail-price {
  font-size: 36px;
  font-weight: 700;
  color: #6B4C2A;
  font-family: 'Inter', sans-serif;
}

.price-unit {
  font-size: 16px;
  color: #A0683A;
  font-weight: 500;
}

.btn-add {
  background: #6B4C2A;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 15px 36px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  letter-spacing: 0.02em;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.btn-add:hover {
  background: #3B2A1A;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(59,42,26,0.28);
}

/* Not found */
.not-found {
  text-align: center;
  padding: 80px 0;
}

.not-found-icon { font-size: 56px; display: block; margin-bottom: 20px; }
.not-found h1 { font-size: 28px; color: #2C1F0F; margin-bottom: 12px; }
.not-found p { color: #7A6652; margin-bottom: 28px; }

.back-link {
  color: #6B4C2A;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: #2C1F0F;
  color: #C8976A;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 28px;
  border-radius: 100px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
  z-index: 999;
  white-space: nowrap;
}
.toast-enter-active, .toast-leave-active { transition: opacity 0.3s, transform 0.3s; }
.toast-enter-from { opacity: 0; transform: translateX(-50%) translateY(12px); }
.toast-leave-to  { opacity: 0; transform: translateX(-50%) translateY(12px); }

@media (max-width: 700px) {
  .detail-layout { grid-template-columns: 1fr; gap: 32px; }
}
</style>

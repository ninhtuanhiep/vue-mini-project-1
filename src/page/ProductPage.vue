<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getProducts } from "@/api/productApi";

const router = useRouter();

const products = ref([]);
const loading = ref(false);
const error = ref("");
const toast = ref("");

let toastTimer = null;

const productEmojis = ["🪵", "🪑", "📚"];

async function loadProducts() {
  try {
    loading.value = true;
    error.value = "";

    products.value = await getProducts();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

function goToProductDetail(id) {
  router.push(`/products/${id}`);
}

function addToCart(item) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((c) => c.id === item.id);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.unshift({
      ...item,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  showToast("Đã thêm vào giỏ hàng!");
}

function showToast(msg) {
  toast.value = msg;

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.value = "";
  }, 2200);
}

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <section>
    <p class="page-eyebrow">Bộ sưu tập</p>
    <h1 class="page-title">Danh sách sản phẩm</h1>
    <div class="divider"></div>

    <p v-if="loading">Đang tải danh sách sản phẩm...</p>

    <p v-else-if="error" class="error">{{ error }}</p>

    <div v-else class="product-list">
      <div
        v-for="(product, i) in products"
        :key="product.id"
        class="product-card"
      >
        <div class="card-visual">
          <span class="card-emoji">
            {{ productEmojis[i % productEmojis.length] }}
          </span>
        </div>

        <div class="card-body">
          <h3 class="card-name">{{ product.name }}</h3>

          <p class="card-desc">{{ product.description }}</p>

          <p class="card-price">
            {{ product.price.toLocaleString() }}
            <span class="price-unit"> VNĐ</span>
          </p>
        </div>

        <div class="card-actions">
          <button class="btn-outline" @click="goToProductDetail(product.id)">
            Xem chi tiết
          </button>

          <button class="btn-fill" @click="addToCart(product)">
            + Giỏ hàng
          </button>
        </div>
      </div>
    </div>
  </section>

  <transition name="toast">
    <div v-if="toast" class="toast">{{ toast }}</div>
  </transition>
</template>

<style scoped>
.page-eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #a0683a;
  margin-bottom: 10px;
}

.page-title {
  font-size: 36px;
  color: #2c1f0f;
}

.divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #a0683a, #c8976a);
  border-radius: 2px;
  margin: 14px 0 40px;
}

/* Grid */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
}

/* Card */
.product-card {
  background: #fff;
  border: 1px solid #e8ddd0;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.22s,
    box-shadow 0.22s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(59, 42, 26, 0.13);
}

.card-visual {
  background: linear-gradient(135deg, #ede5d8 0%, #d4c4b0 100%);
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-emoji {
  font-size: 64px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
}

.card-body {
  padding: 20px 20px 0;
  flex: 1;
}

.card-name {
  font-size: 18px;
  color: #2c1f0f;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 13.5px;
  color: #7a6652;
  line-height: 1.6;
  margin-bottom: 14px;
}

.card-price {
  font-size: 20px;
  font-weight: 700;
  color: #6b4c2a;
  font-family: "Inter", sans-serif;
}

.price-unit {
  font-size: 13px;
  font-weight: 500;
  color: #a0683a;
}

.card-actions {
  display: flex;
  gap: 10px;
  padding: 16px 20px 20px;
}

.btn-outline {
  flex: 1;
  background: transparent;
  border: 1.5px solid #c8976a;
  color: #6b4c2a;
  font-size: 13px;
  font-weight: 500;
  padding: 9px 0;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}

.btn-outline:hover {
  background: #f7f2eb;
}

.btn-fill {
  flex: 1;
  background: #6b4c2a;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  padding: 9px 0;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;
}

.btn-fill:hover {
  background: #3b2a1a;
  transform: translateY(-1px);
}

/* Toast */
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: #2c1f0f;
  color: #c8976a;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 28px;
  border-radius: 100px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  z-index: 999;
  white-space: nowrap;
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(12px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(12px);
}
</style>  
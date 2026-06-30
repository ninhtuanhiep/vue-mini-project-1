<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { currentUser } from '@/helper/auth'

const router = useRouter()
const cart = ref([])

function loadCart() {
  cart.value = JSON.parse(localStorage.getItem('cart')) || []
}

function removeItem(index) {
  cart.value.splice(index, 1)
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

function clearAllItem() {
  if (!confirm('Bạn có muốn xóa toàn bộ giỏ hàng không?')) return
  cart.value = []
  localStorage.removeItem('cart')
}

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
)

function TangSl(index){
  cart.value[index].quantity++
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

function GiamSl(index){
  if(cart.value[index].quantity > 1){
    cart.value[index].quantity--
  }else{
    cart.value.splice(index, 1)
  }

  localStorage.setItem('cart', JSON.stringify(cart.value))
}

function handleCheckout() {
  if (!currentUser.value) {
    router.push({ path: '/login', query: { redirect: '/cart' } })
    return
  }

  // TODO: phát triển flow tạo đơn hàng thực sự ở bước sau
  alert('Chức năng thanh toán sẽ được phát triển ở bước tiếp theo')
}

onMounted(loadCart)
</script>

<template>
  <section>
    <p class="page-eyebrow">Của bạn</p>
    <h1 class="page-title">Giỏ hàng</h1>
    <div class="divider"></div>

    <div v-if="cart.length === 0" class="empty-cart">
      <span class="empty-icon">🛒</span>
      <h2>Giỏ hàng đang trống</h2>
      <p>Thêm sản phẩm yêu thích vào giỏ hàng của bạn nhé.</p>
      <button @click="router.push('/products')">Xem sản phẩm</button>
    </div>

    <div v-else class="cart-layout">
      <!-- Items list -->
      <div class="cart-items">
        <div
          v-for="(item, index) in cart"
          :key="item.id"
          class="cart-item"
        >
          <div class="item-visual">{{ ['🪵','🪑','📚'][item.id - 1] || '📦' }}</div>
          <div class="item-info">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-qty">Số lượng: <strong>{{ item.quantity || 1 }}</strong></p>
            <button @click="TangSl(index)">+</button>
            <button @click="GiamSl(index)">-</button>
            <p class="item-unit-price">{{ item.price.toLocaleString() }} VNĐ / sản phẩm</p>
          </div>
          <div class="item-right">
            <p class="item-subtotal">{{ (item.price * (item.quantity || 1)).toLocaleString() }} VNĐ</p>
            <button class="btn-remove" @click="removeItem(index)">Xóa</button>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="cart-summary">
        <h2 class="summary-title">Tổng đơn hàng</h2>
        <div class="summary-row">
          <span>Số sản phẩm</span>
          <span>{{ cart.length }} loại</span>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-total-row">
          <span>Tổng tiền</span>
          <span class="summary-total">{{ total.toLocaleString() }} VNĐ</span>
        </div>
        <button class="btn-checkout" @click="handleCheckout">Thanh toán →</button>
        <button class="btn-clear" @click="clearAllItem">Xóa toàn bộ</button>
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
  color: #A0683A;
  margin-bottom: 10px;
}
.page-title { font-size: 36px; color: #2C1F0F; }
.divider {
  width: 60px; height: 3px;
  background: linear-gradient(90deg, #A0683A, #C8976A);
  border-radius: 2px;
  margin: 14px 0 40px;
}

/* Empty */
.empty-cart {
  text-align: center;
  padding: 80px 0;
}
.empty-icon { font-size: 64px; display: block; margin-bottom: 20px; }
.empty-cart h2 { font-size: 24px; color: #2C1F0F; margin-bottom: 10px; }
.empty-cart p { color: #7A6652; margin-bottom: 28px; }
.empty-cart button {
  background: #6B4C2A;
  color: #fff;
  padding: 12px 28px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.empty-cart button:hover { background: #3B2A1A; }

/* Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 40px;
  align-items: start;
}

/* Items */
.cart-items { display: flex; flex-direction: column; gap: 16px; }

.cart-item {
  background: #fff;
  border: 1px solid #E8DDD0;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: box-shadow 0.2s;
}
.cart-item:hover { box-shadow: 0 4px 16px rgba(59,42,26,0.08); }

.item-visual {
  font-size: 40px;
  background: linear-gradient(135deg, #EDE5D8, #D4C4B0);
  width: 72px;
  height: 72px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-info { flex: 1; }
.item-name { font-size: 16px; color: #2C1F0F; margin-bottom: 6px; }
.item-qty { font-size: 13px; color: #7A6652; margin-bottom: 4px; }
.item-unit-price { font-size: 13px; color: #A0683A; }

.item-right {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.item-subtotal {
  font-size: 16px;
  font-weight: 700;
  color: #6B4C2A;
  white-space: nowrap;
}

.btn-remove {
  background: transparent;
  border: 1px solid #E8DDD0;
  color: #c0392b;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.btn-remove:hover { background: #fdf0ef; border-color: #c0392b; }

/* Summary */
.cart-summary {
  background: #fff;
  border: 1px solid #E8DDD0;
  border-radius: 10px;
  padding: 28px 24px;
  position: sticky;
  top: 90px;
}

.summary-title {
  font-size: 20px;
  color: #2C1F0F;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #7A6652;
  margin-bottom: 16px;
}

.summary-divider {
  height: 1px;
  background: #E8DDD0;
  margin: 8px 0 16px;
}

.summary-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 15px;
  font-weight: 600;
  color: #2C1F0F;
}

.summary-total {
  font-size: 20px;
  color: #6B4C2A;
}

.btn-checkout {
  width: 100%;
  background: #6B4C2A;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background 0.2s, transform 0.2s;
  letter-spacing: 0.02em;
}
.btn-checkout:hover { background: #3B2A1A; transform: translateY(-1px); }

.btn-clear {
  width: 100%;
  background: transparent;
  color: #7A6652;
  font-size: 13px;
  font-weight: 500;
  padding: 10px;
  border: 1px solid #E8DDD0;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.btn-clear:hover { border-color: #c0392b; color: #c0392b; }

@media (max-width: 768px) {
  .cart-layout { grid-template-columns: 1fr; }
  .cart-item { flex-wrap: wrap; }
}
</style>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

function goToProduct() {
  router.push('/products')
}
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <p class="hero-eyebrow">Thủ công · Bền vững · Tự nhiên</p>
      <h1 class="hero-title">Đồ Gỗ<br><span class="hero-highlight">Tuấn Hạnh</span></h1>
      <div class="divider"></div>
      <p class="hero-desc">
        Chuyên cung cấp các sản phẩm đồ gỗ chất lượng cao —
        từ gỗ tự nhiên chọn lọc, chế tác tỉ mỉ cho không gian sống của bạn.
      </p>
      <button class="hero-btn" @click="goToProduct">Khám phá sản phẩm →</button>
    </div>
    <div class="hero-visual">
      <div class="wood-rings">
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="ring ring-3"></div>
        <div class="ring-center">🪵</div>
      </div>
    </div>
  </section>

  <section class="features">
    <div class="feature">
      <span class="feature-icon">🌳</span>
      <h3>Gỗ tự nhiên</h3>
      <p>Nguồn gỗ chọn lọc kỹ càng, đảm bảo độ bền và vẻ đẹp tự nhiên.</p>
    </div>
    <div class="feature">
      <span class="feature-icon">🔨</span>
      <h3>Thủ công tinh xảo</h3>
      <p>Từng sản phẩm được chế tác bởi những người thợ lành nghề.</p>
    </div>
    <div class="feature">
      <span class="feature-icon">🏠</span>
      <h3>Phù hợp mọi không gian</h3>
      <p>Thiết kế đa dạng, hài hòa với nhiều phong cách nội thất.</p>
    </div>
  </section>
</template>

<style scoped>
/* Hero */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 64px 0 72px;
  border-bottom: 1px solid #DDD3C4;
}

.hero-content {
  flex: 1;
  max-width: 520px;
}

.hero-eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #A0683A;
  margin-bottom: 16px;
}

.hero-title {
  font-size: clamp(42px, 6vw, 64px);
  font-weight: 700;
  color: #2C1F0F;
  line-height: 1.1;
  margin-bottom: 4px;
}

.hero-highlight {
  color: #6B4C2A;
}

.divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #A0683A, #C8976A);
  border-radius: 2px;
  margin: 20px 0 24px;
}

.hero-desc {
  font-size: 16px;
  line-height: 1.75;
  color: #7A6652;
  margin-bottom: 36px;
  max-width: 420px;
}

.hero-btn {
  background-color: #6B4C2A;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 32px;
  border-radius: 6px;
  letter-spacing: 0.03em;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.hero-btn:hover {
  background-color: #3B2A1A;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(59,42,26,0.28);
}

/* Wood rings visual */
.hero-visual {
  flex-shrink: 0;
}

.wood-rings {
  position: relative;
  width: 260px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  border-color: transparent;
}

.ring-1 {
  width: 260px;
  height: 260px;
  border-width: 18px;
  border-color: #DDD3C4;
}

.ring-2 {
  width: 200px;
  height: 200px;
  border-width: 14px;
  border-color: #C8976A44;
}

.ring-3 {
  width: 148px;
  height: 148px;
  border-width: 10px;
  border-color: #A0683A33;
}

.ring-center {
  font-size: 52px;
  z-index: 1;
}

/* Features */
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding: 56px 0 0;
}

.feature {
  background: #fff;
  border: 1px solid #E8DDD0;
  border-radius: 8px;
  padding: 32px 28px;
  transition: box-shadow 0.2s, transform 0.2s;
}

.feature:hover {
  box-shadow: 0 6px 24px rgba(59,42,26,0.10);
  transform: translateY(-3px);
}

.feature-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 16px;
}

.feature h3 {
  font-size: 18px;
  color: #3B2A1A;
  margin-bottom: 10px;
}

.feature p {
  font-size: 14px;
  color: #7A6652;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .hero { flex-direction: column; text-align: center; }
  .divider { margin-left: auto; margin-right: auto; }
  .hero-visual { display: none; }
  .features { grid-template-columns: 1fr; }
}
</style>

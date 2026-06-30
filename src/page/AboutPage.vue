<template>
  <section class="about">
    <p class="page-eyebrow">Câu chuyện của chúng tôi</p>
    <h1 class="page-title">Giới thiệu</h1>
    <div class="divider"></div>

    <div class="about-layout">
      <div class="about-text">
        <p class="about-lead">
          Đồ Gỗ Tuấn Hạnh là cửa hàng chuyên cung cấp sản phẩm đồ gỗ gia đình chất lượng cao,
          được chế tác từ gỗ tự nhiên chọn lọc bởi những người thợ lành nghề.
        </p>
        <p class="about-body">
          Với nhiều năm kinh nghiệm trong ngành nội thất gỗ, chúng tôi cam kết mang đến
          những sản phẩm bền đẹp, thân thiện với môi trường và phù hợp với đa dạng
          không gian sống của người Việt.
        </p>
      </div>
      <div class="about-stats">
        <div class="stat">
          <span class="stat-num">10+</span>
          <span class="stat-label">Năm kinh nghiệm</span>
        </div>
        <div class="stat">
          <span class="stat-num">500+</span>
          <span class="stat-label">Khách hàng hài lòng</span>
        </div>
        <div class="stat">
          <span class="stat-num">100%</span>
          <span class="stat-label">Gỗ tự nhiên</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about { max-width: 800px; }

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

.about-layout { display: flex; flex-direction: column; gap: 40px; }

.about-lead {
  font-size: 18px;
  line-height: 1.8;
  color: #3B2A1A;
  margin-bottom: 18px;
  font-family: 'Playfair Display', serif;
}

.about-body {
  font-size: 15px;
  line-height: 1.9;
  color: #7A6652;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stat {
  background: #fff;
  border: 1px solid #E8DDD0;
  border-radius: 10px;
  padding: 28px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-weight: 700;
  color: #6B4C2A;
}

.stat-label {
  font-size: 13px;
  color: #7A6652;
}

@media (max-width: 600px) {
  .about-stats { grid-template-columns: 1fr; }
}
</style>

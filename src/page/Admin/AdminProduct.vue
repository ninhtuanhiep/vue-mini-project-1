<script setup>
import { ref, onMounted } from "vue";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/api/productApi";

const products = ref([]);
const loading = ref(false);
const error = ref("");
const message = ref("");

const showForm = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const form = ref({
  name: "",
  price: "",
  description: "",
});

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

function openCreateForm() {
  showForm.value = true;
  isEditing.value = false;
  editingId.value = null;

  form.value = {
    name: "",
    price: "",
    description: "",
  };
}

function openEditForm(product) {
  showForm.value = true;
  isEditing.value = true;
  editingId.value = product.id;

  form.value = {
    name: product.name,
    price: product.price,
    description: product.description,
  };
}

function closeForm() {
  showForm.value = false;
  isEditing.value = false;
  editingId.value = null;

  form.value = {
    name: "",
    price: "",
    description: "",
  };
}

async function handleSubmit() {
  try {
    error.value = "";
    message.value = "";

    if (!form.value.name.trim()) {
      throw new Error("Vui lòng nhập tên sản phẩm");
    }

    if (!form.value.price || Number(form.value.price) <= 0) {
      throw new Error("Vui lòng nhập giá sản phẩm hợp lệ");
    }

    if (!form.value.description.trim()) {
      throw new Error("Vui lòng nhập mô tả sản phẩm");
    }

    const productData = {
      name: form.value.name.trim(),
      price: Number(form.value.price),
      description: form.value.description.trim(),
    };

    if (isEditing.value) {
      await updateProduct(editingId.value, productData);
      message.value = "Cập nhật sản phẩm thành công";
    } else {
      await createProduct(productData);
      message.value = "Thêm sản phẩm thành công";
    }

    closeForm();
    await loadProducts();
  } catch (err) {
    error.value = err.message;
  }
}

async function handleDelete(id) {
  const confirmDelete = confirm("Bạn có chắc muốn xóa sản phẩm này không?");

  if (!confirmDelete) return;

  try {
    error.value = "";
    message.value = "";

    await deleteProduct(id);

    message.value = "Xóa sản phẩm thành công";

    await loadProducts();
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <section class="admin-page">
    <div class="admin-header">
      <div>
        <p class="page-eyebrow">Admin</p>
        <h1>Quản lý sản phẩm</h1>
      </div>

      <button class="btn-add" @click="openCreateForm">+ Thêm sản phẩm</button>
    </div>

    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>

    <form v-if="showForm" class="product-form" @submit.prevent="handleSubmit">
      <h2>{{ isEditing ? "Sửa sản phẩm" : "Thêm sản phẩm mới" }}</h2>

      <div class="form-group">
        <label>Tên sản phẩm</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Nhập tên sản phẩm"
        />
      </div>

      <div class="form-group">
        <label>Giá sản phẩm</label>
        <input
          v-model="form.price"
          type="number"
          placeholder="Nhập giá sản phẩm"
        />
      </div>

      <div class="form-group">
        <label>Mô tả</label>
        <textarea
          v-model="form.description"
          placeholder="Nhập mô tả sản phẩm"
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-save">
          {{ isEditing ? "Lưu thay đổi" : "Thêm sản phẩm" }}
        </button>

        <button type="button" class="btn-cancel" @click="closeForm">Hủy</button>
      </div>
    </form>

    <p v-if="loading">Đang tải danh sách sản phẩm...</p>

    <table v-else class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Mô tả</th>
          <th>Hành động</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ index + 1 }}</td>

          <td>{{ product.name }}</td>

          <td>{{ product.price.toLocaleString() }} VNĐ</td>

          <td>{{ product.description }}</td>

          <td class="action-cell">
            <button class="btn-edit" @click="openEditForm(product)">Sửa</button>

            <button class="btn-delete" @click="handleDelete(product.id)">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.admin-page {
  padding: 24px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

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
}

.btn-add,
.btn-save {
  background: #6b4c2a;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.product-form {
  max-width: 520px;
  background: #fff;
  border: 1px solid #e8ddd0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 28px;
}

.product-form h2 {
  margin-bottom: 16px;
  color: #2c1f0f;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.form-group label {
  font-weight: 600;
  color: #6b4c2a;
}

.form-group input,
.form-group textarea {
  padding: 10px 12px;
  border: 1px solid #d8c8b8;
  border-radius: 6px;
}

.form-group textarea {
  min-height: 90px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 12px;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #c8976a;
  color: #6b4c2a;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.product-table th,
.product-table td {
  border: 1px solid #e8ddd0;
  padding: 12px;
  text-align: left;
}

.product-table th {
  background: #f7f2eb;
  color: #2c1f0f;
}

.action-cell {
  display: flex;
  gap: 8px;
}

.btn-edit {
  background: #c8976a;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-delete {
  background: #b00020;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.message {
  color: green;
  font-weight: 600;
  margin-bottom: 12px;
}

.error {
  color: #b00020;
  font-weight: 600;
  margin-bottom: 12px;
}
</style>

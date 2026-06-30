<script setup>
import { ref } from "vue";
import { createProduct } from "@/api/productApi";

const name = ref(""),
  price = ref(""),
  description = ref(""),
  loading = ref(false),
  error = ref('');

const emit = defineEmits(['close', 'created'])

async function handleSubmit() {
  try {
    error.value = "";

    if (!name.value.trim()) {
      throw new Error("Vui lòng nhập tên sản phẩm");
    }

    if (!price.value || Number(price.value) <= 0) {
      throw new Error("Vui lòng nhập giá sản phẩm hợp lệ");
    }

    if (!description.value.trim()) {
      throw new Error("Vui lòng nhập mô tả sản phẩm");
    }

    loading.value = true;

    const newProduct = {
      name: name.value.trim(),
      price: Number(price.value),
      description: description.value.trim(),
    };

    await createProduct(newProduct);

    name.value = "";
    price.value = "";
    description.value = "";

    emit("created");
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

defineProps({
    isOpen: Boolean
})



</script>

<template>
  <form v-if="isOpen" @submit.prevent="handleSubmit">
    <h2>Thêm sản phẩm mới</h2>

    <p v-if="error" style="color: red">
      {{ error }}
    </p>

    <input v-model="name" placeholder="Tên sản phẩm" />

    <input v-model="price" type="number" placeholder="Giá sản phẩm" />

    <input v-model="description" placeholder="Mô tả" />

    <button type="submit" :disabled="loading">
      {{ loading ? "Đang thêm..." : "Thêm sản phẩm" }}
    </button>

    <button type="button" @click="emit('close')">
      Đóng
    </button>
  </form>
</template>

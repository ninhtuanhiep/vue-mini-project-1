<script setup>
import { ref, onMounted} from 'vue';
import { getUsers, updateUser, deleteUser } from '@/api/userApi';
import { currentUser } from '@/helper/auth';

const users = ref([]);
const loading = ref(false);
const error = ref("");
const message = ref("");

async function loadUsers() {
  try {
    loading.value = true;
    error.value = "";

    users.value = await getUsers();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

async function changeRole(user, role) {
  try {
    error.value = "";
    message.value = "";

    if (user.id === currentUser.value.id) {
      throw new Error("Bạn không thể tự đổi role của chính mình");
    }

    await updateUser(user.id, {
      role,
    });

    message.value = "Cập nhật role thành công";
    await loadUsers();
  } catch (err) {
    error.value = err.message;
  }
}

async function toggleActive(user) {
  try {
    error.value = "";
    message.value = "";

    if (user.id === currentUser.value.id) {
      throw new Error("Bạn không thể tự khóa tài khoản của chính mình");
    }

    await updateUser(user.id, {
      isActive: !user.isActive,
    });

    message.value = user.isActive
      ? "Đã khóa tài khoản"
      : "Đã mở khóa tài khoản";

    await loadUsers();
  } catch (err) {
    error.value = err.message;
  }
}

async function handleDelete(id) {
  try {
    error.value = "";
    message.value = "";

    if (id === currentUser.value.id) {
      throw new Error("Bạn không thể tự xóa tài khoản của chính mình");
    }

    if (!confirm("Bạn có chắc muốn xóa người dùng này không?")) {
      return;
    }

    await deleteUser(id);

    message.value = "Xóa người dùng thành công";
    await loadUsers();
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(() => {
  loadUsers();
});
</script>

<template>
  <section>
    <p class="page-eyebrow">Admin</p>
    <h1>Quản lý người dùng</h1>

    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>

    <p v-if="loading">Đang tải danh sách người dùng...</p>

    <table v-else class="user-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Role</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>

          <td>{{ user.fullName }}</td>

          <td>{{ user.email }}</td>

          <td>
            <select
              :value="user.role"
              @change="changeRole(user, $event.target.value)"
              :disabled="user.id === currentUser.id"
            >
              <option value="customer">customer</option>
              <option value="admin">admin</option>
            </select>
          </td>

          <td>
            <span :class="user.isActive ? 'active' : 'locked'">
              {{ user.isActive ? "Hoạt động" : "Đã khóa" }}
            </span>
          </td>

          <td class="actions">
            <button
              @click="toggleActive(user)"
              :disabled="user.id === currentUser.id"
            >
              {{ user.isActive ? "Khóa" : "Mở khóa" }}
            </button>

            <button
              class="delete"
              @click="handleDelete(user.id)"
              :disabled="user.id === currentUser.id"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
  margin-bottom: 20px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.user-table th,
.user-table td {
  border: 1px solid #e8ddd0;
  padding: 12px;
  text-align: left;
}

.user-table th {
  background: #f7f2eb;
}

select {
  padding: 7px 10px;
  border: 1px solid #d8c8b8;
  border-radius: 6px;
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  background: #6b4c2a;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button.delete {
  background: #b00020;
}

.active {
  color: green;
  font-weight: 600;
}

.locked {
  color: #b00020;
  font-weight: 600;
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
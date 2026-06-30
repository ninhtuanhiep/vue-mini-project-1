import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../page/HomePage.vue";
import ProductPage from "../page/ProductPage.vue";
import ProductDetailPage from "../page/ProductDetailPage.vue";
import CartPage from "../page/CartPage.vue";
import AboutPage from "../page/AboutPage.vue";
import NotFoundPage from "../page/NotFoundPage.vue";

import DangKy from "@/page/DangKy.vue";
import DangNhap from "@/page/DangNhap.vue";

import AdminLayout from "@/page/Admin/AdminLayout.vue";
import AdminDashBoard from "@/page/Admin/AdminDashBoard.vue";
import AdminProduct from "@/page/Admin/AdminProduct.vue";
import AdminUser from "@/page/Admin/AdminUser.vue";

import { currentUser } from "@/helper/auth.js";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/products",
    component: ProductPage,
  },
  {
    path: "/products/:id",
    component: ProductDetailPage,
  },
  {
    path: "/cart",
    component: CartPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/login",
    component: DangNhap,
  },
  {
    path: "/register",
    component: DangKy,
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      roles: ["admin"],
    },
    children: [
      {
        path: "",
        redirect: "/admin/dashboard",
      },
      {
        path: "dashboard",
        component: AdminDashBoard,
      },
      {
        path: "products",
        component: AdminProduct,
      },
      {
        path: "users",
        component: AdminUser,
      },
    //   {
    //     path: "orders",
    //     component: AdminOrder,
    //   },
    //   {
    //     path: "settings",
    //     component: AdminSetting,
    //   },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Đọc trực tiếp currentUser.value (ref) thay vì gọi getCurrentUser(),
  // để chắc chắn route guard luôn thấy giá trị mới nhất tại đúng thời điểm điều hướng.
  const user = currentUser.value;

  const requiresAuth = to.matched.some((record) => {
    return record.meta.requiresAuth;
  });

  const requiredRoles = to.matched.flatMap((record) => {
    return record.meta.roles || [];
  });

  if (requiresAuth && !user) {
    next({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
    return;
  }

  if (
    requiredRoles.length > 0 &&
    (!user || !requiredRoles.includes(user.role))
  ) {
    next("/");
    return;
  }

  if ((to.path === "/login" || to.path === "/register") && user) {
    if (user.role === "admin") {
      next("/admin/dashboard");
    } else {
      next("/");
    }
    return;
  }

  next();
});

export default router;

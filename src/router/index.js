import { createRouter, createWebHashHistory } from "vue-router";
import ShoppingCart from "../components/ShoppingCart.vue"
import MainPage from "../components/MainPage.vue"
import ShippingInfo from "../components/ShippingInfo.vue"

const routes = [
  {
    path: "/shopping-cart",
    name: ShoppingCart,
    component: ShoppingCart
  },
  {
    path: "/",
    name: MainPage,
    component: MainPage
  },
  {
    path: "/shipping-info",
    name: ShippingInfo,
    component: ShippingInfo
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

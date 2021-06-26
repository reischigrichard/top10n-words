<template>
  <div class="main-content">
    <div class="main-content_nav-bar">
      <div class="main-content_nav-bar_links">
        <router-link to="/"><p>Home</p></router-link>
        <p>About</p>
        <p>Contacts</p>
      </div>
      <div class="main-content_nav-bar_line" />
      <router-link
        to="/shopping-cart"
        class="main-content_nav-bar_shopping-cart"
      >
        <div
          v-if="cartItems.length !== 0"
          class="main-content_nav-bar_shopping-cart_counter"
        >
          <p>{{ cartItems.length }}</p>
        </div>
      </router-link>
    </div>
    <div class="main-content_items">
      <div
        class="main-content_items_item"
        v-for="{ price, url, title, id, description} in items"
        :key="id"
      >
        <img :src="getImgUrl(url)" class="main-content_items_item_image" />
        <h3>{{ title }}</h3>
        <p>${{ price }}</p>
        <div @click="addItem(price, id, title, url, description)" class="main-content_items_item_add">
          <p>ADD</p>
        </div>
      </div>
    </div>
    <div class="main-content_footer">
      <p>© SSPŠ Student's project: E-shop 2021/2022</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { items } from "./ItemsObject";

export default {
  data() {
    return {
      items,
    };
  },
  computed: {
    ...mapState(["cartItems"])
  },
  methods: {
    ...mapMutations(["updateCartItems"]),
    getImgUrl(name) {
      return name ? require(`../images/${name}`) : "";
    },
    addItem(price, id, title, url, description) {
      const itemInCart = this.cartItems.find(({ id: itemId }) => id === itemId);
      const updatedItem = {
        id,
        quantity: (itemInCart ? itemInCart.quantity : 0) + 1,
        price,
        title,
        url,
        description
      }

      this.updateCartItems(
        itemInCart
          ? this.cartItems.map((item) => (item.id === id ? updatedItem : item))
          : [...this.cartItems, updatedItem]
      );
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

.main-content {
  position: relative;

  &_nav-bar {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 60px;
    background: white;
    display: inline-block;
    text-align: right;
    border-bottom: black 2px solid;

    &_links {
      display: inline-block;
      vertical-align: middle;
    }

    &_links p {
      display: inline;
      font-size: 18px;
      font-weight: bold;
      margin: 10%;
    }

    &_line {
      height: 30px;
      width: 2px;
      border-radius: 2px;
      background-color: black;
      display: inline-block;
      vertical-align: middle;
      margin: 0 1% 0 130px;
    }

    &_shopping-cart {
      display: inline-block;
      vertical-align: middle;
      height: 37px;
      width: 50px;
      background-image: url("../images/shopping-cart.svg");
      background-size: 38px;
      background-repeat: no-repeat;
      margin: 0 2%;

      &_counter {
        padding: 0 5px;
        line-height: 20px;
        width: fit-content;
        background-color: red;
        display: inline-block;
        vertical-align: top;
        border-radius: 15px;
        color: whitesmoke;

        & p {
          line-height: 20px;
          font-weight: bold;
          margin: 0;
        }
      }
    }
  }

  &_items {
    display: grid;
    width: 60%;
    margin: 50px auto;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px;

    &_item {
      height: 400px;
      box-shadow: 0px 10px 15px #dddddd;
      display: inline-block;
      margin: 10% 3%;
      border-radius: 10px;
      border-bottom: black 3px solid;

      &_image {
        height: 300px;
        width: 100%;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      & h3 {
        text-align: center;
        margin: 5% 0;
      }

      & p {
        text-align: left;
        width: 80px;
        display: inline-block;
        vertical-align: middle;
        margin: 1% 14%;
        color: #4aa96c;
        font-weight: bold;
      }

      &_add {
        width: 60px;
        height: 25px;
        margin: 0 auto;
        border: 2px black solid;
        border-radius: 10px;
        display: inline-block;
        vertical-align: middle;

        & p {
          margin: 2px 12px;
          font-weight: bold;
          color: black;
        }

        &:hover {
          cursor: pointer;
          box-shadow: 0px 5px 10px #dddddd;
          border: 2px #4aa96c solid;
          opacity: 0.8;
        }
      }
    }
  }

  &_footer p {
    font-size: 20px;
    text-align: center;
    height: 25px;
    padding: 1% 0;
    background-color: black;
    margin: 20px 0 -10px 0;
    font-weight: bold;
    color: white;
  }
}

a{
  text-decoration: none;
  color: black;
}
</style>

<template>
    <div class="main-content">
      <div class="main-content_nav-bar">
        <div class="main-content_nav-bar_links">
          <router-link to="/"><p>Home</p></router-link>
          <p>About</p>
          <p>Contacts</p>
        </div>
        <div class="main-content_nav-bar_line" />
        <router-link to="/shopping-cart" class="main-content_nav-bar_shopping-cart"/>
      </div>
      <div v-if="totalPrice !== 0" class="checkout-info">
        <div class="checkout-info_item-list">
          <div v-for="({ price, id, title, quantity }) in cartItems" :key="id" class="checkout-info_item-list_item">
            <h3>{{title}}</h3>
            <p class="checkout-info_item-list_item_price">${{price}}</p>
            <p class="checkout-info_item-list_item_quantity">{{quantity}}</p>
            <div class="checkout-info_item-list_item_line" />
          </div>
        </div>
        <div class="checkout-info_bottom-bar">
          <div class="checkout-info_bottom-bar_price-info">
          <h4>Total price: ${{totalPrice}}</h4>
      </div>
      <router-link to="/shipping-info"><div class="checkout-info_bottom-bar_proceed"><p>PROCEED</p></div></router-link>
        </div>
      </div>
      <div class="cart-items">
        <div v-for="({ price, id, title, url, description, quantity }) in cartItems" :key="id" class="cart-items_item">
          <img :src="getImgUrl(url)" class="cart-items_item_image"/>
          <div class="cart-items_item_info">
            <h6 @click="removeItem(id)" >×</h6>
            <h2>{{title}}</h2>
            <div class="cart-items_item_info_quantity"> 
              <div @click="decreaseQuantity(id)" class="cart-items_item_info_quantity_operator-minus"><p>-</p></div>
                <h4 @click="showUpdate">{{quantity}}</h4> 
              <div @click="increaseQuantity(id)" class="cart-items_item_info_quantity_operator-plus"><p>+</p></div>
            </div>
            <div class="cart-items_item_info_line"/>
            <h4>${{price}}</h4>
            <p>{{description}}</p>
          </div>
        </div>
      </div>
      <div v-if="cartItems.length === 0" class="no-items"><p>You have no items in your shopping cart.</p></div>
    </div>
</template>
<script>

import {items} from "./ItemsObject"
import { mapState, mapMutations } from "vuex";

export default {
  data(){
    return{
      items
    }
  },
  methods: {
    ...mapMutations(["updateCartItems"]),
    getImgUrl(name) {
      return name ? require(`../images/${name}`) : "";
    },
    increaseQuantity(id){
      this.updateCartItems(this.cartItems.map((item) => ({
        ...item,
        quantity: id === item.id ? item.quantity + 1 : item.quantity
      })))
    },
    decreaseQuantity(id){
      this.updateCartItems(this.cartItems.map((item) => ({
        ...item,
        quantity: id === item.id ?
          (item.quantity - 1 < 1) ? 1 : item.quantity - 1 :
          item.quantity
      })))
    },
    removeItem(itemId){
      this.updateCartItems(this.cartItems.filter(({ id }) => id !== itemId))
    }
  },
  computed: {
    ...mapState(["cartItems"]),
    totalPrice(){
      return this.cartItems.reduce((total, item) => total + item.quantity * Number(item.price), 0)
    }
  }
}
</script>

<style lang="scss">

.checkout-info{
  position: fixed;
  right: 0;
  width: 240px;
  height: 100vh;
  border-left: black 2px solid;
  overflow: auto;
  background-color: white;

  & h4{
    text-align: center;
    color: grey;
  }

  &_item-list{ 
    height: calc(100% - 170px);
    overflow: auto;

    &_item{
      width: 100%;
      margin: 0 auto;
      padding: 5px 25px;
      box-sizing: border-box;

      &_price{
        float: left;
        margin: 0;
        font-weight: bold;
        color:#4aa96c;
      }

      &_quantity{
        float: right;
        margin: 0;
        opacity: 0.7;
      }

      &_line{
        width: 30px;
        height: 2px;
        background-color: black;
        margin: 60px auto 0;
        opacity: 0.2;
      }
    }
  }

  &_bottom-bar{
    bottom: 0;
    width: 240px;
    height: 110px;
    position: fixed;
    border-top: 2px black solid;
    background-color: white;
    box-shadow: 0px -5px 10px #d1d9d9;

    &_price-info h4{
      color: black !important;
    }

    &_proceed{
      text-align: center;
      width: 100px;
      height: 25px;
      margin: 0 auto;
      border: 2px black solid;
      border-radius: 10px;
      margin: 0 auto;

      & p {
          margin: 2px 0;
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

.bottom-checkout{
  position: fixed;
  right: 0;
  bottom: 0;
  width: 160px;
  border-top: 2px black solid;
  height: 200px;
  text-align: center;
}

.cart-items{
  width: calc(100% - 200px);
  margin: 60px 200px 20px 0;

  &_item{
    height: fit-content;
    width: 90%;
    margin: 0 auto 60px;

    &_image{
      height: 300px;
      width: 220px;
      display: inline-block;
      border-radius: 10px;
      margin: 20px 0;
    }

    &_info{
      text-align: left;
      display: inline-block;
      vertical-align: top;
      margin: 0 5%;
      width: 50vw;

      & h6{
        font-size: 30px;
        color: red;
        margin: -15px 0;
        width: 20px;
        float: right;

        &:hover{
          opacity: 0.6;
          cursor: pointer;
        }
      }

      &_line{
        width: 100%;
        height: 2px;
        background-color: black;
      }

      & h2{
        font-size: 34px;
        display: inline-block;
        vertical-align: middle;
      }

      & h4{
        font-size: 22px;
        color: #4aa96c;
        margin: 1.33em 0 0 0;
      }

      & p{
        color: gray;
      }

      &_quantity{
        margin: 35px;
        float: right;

        & h4{
        display: inline-block;
        vertical-align: middle;
        font-size: 28px;
        margin: 0 20px;
        }

        &_operator-plus{
          display: inline-block;
          vertical-align: middle;
          border: 2px gray solid;
          height: 22px;
          width: 22px;
          border-radius: 15px;
          cursor: pointer;

            &:hover{
              opacity: 0.6;
            }

            & p{
            margin: -4px 3.5px;
            color: gray;
            font-weight: bold;
            font-size: 22px;
          }
        }

        &_operator-minus{
          display: inline-block;
          vertical-align: middle;
          border: 2px gray solid;
          height: 22px;
          width: 22px;
          border-radius: 15px;
          cursor: pointer;

          &:hover{
            opacity: 0.6;
          }

            & p{
            margin: -8px 7.5px;
            color: gray;
            font-weight: bold;
            font-size: 26px;
          }
        }
      }
    }
  }
}

.no-items{
  text-align: center;
  margin: 80px 0;
  color: gray;
  font-size: 26px;
}
</style>
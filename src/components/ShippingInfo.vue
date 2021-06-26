<template>
  <div>
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
     </div>
    <div v-if="!proceedCheck" class="shopping-info">
        <div class="shopping-info_user-info">
          <input type="text" placeholder="First Name" v-model="firstName" class="shopping-info_user-info_first-name">
          <input type="text" placeholder="Last Name" v-model="lastName" class="shopping-info_user-info_last-name">
          <input type="text" placeholder="Country" v-model="countryName" class="shopping-info_user-info_country">
          <input type="text" placeholder="City" v-model="cityName" class="shopping-info_user-info_city">
          <input type="text" placeholder="Street" v-model="streetName" class="shopping-info_user-info_street">
          <input type="text" placeholder="Post Number" v-model="postNumber" class="shopping-info_user-info_post-number">
          <input type="number" placeholder="Phone Number" v-model="phoneNumber" class="shopping-info_user-info_number"> 
          <input type="text" placeholder="Email Address" v-model="email" class="shopping-info_user-info_email">
        </div>
        <div class="shopping-info_line" />
        <div class="shopping-info_card-info">
          <img @click="e => e.target.classList.toggle('border')" src="../images/cardLogos/mastercard.png" class="shopping-info_card-info_mastercard card-logo" /> 
          <img @click="e => e.target.classList.toggle('border')" src="../images/cardLogos/visa.png" class="shopping-info_card-info_visa card-logo" /> 
          <img @click="e => e.target.classList.toggle('border')" src="../images/cardLogos/american.png" class="shopping-info_card-info_american-express card-logo" /> 
          <input type="number" placeholder="Card Number" v-model="cardNumber" class="shopping-info_card-info_number">
          <input type="number" placeholder="Expiration Date" v-model="cardDate" class="shopping-info_card-date">
          <input type="number" placeholder="Security Number" v-model="cardCode" class="shopping-info_card-info_code">
          <div @click="proceed" class="shopping-info_proceed">
          <h4>PROCEED</h4>
        </div>
        </div>
        <p v-if="errorMessage" class="error-message">You forgot to fill something!</p>
    </div>
    <div v-if="proceedCheck" class="proceed-text">
      <p>Thank you for your purchase!</p>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      proceedCheck: false,
      errorMessage: false,
      firstName: "",
      lastName: "",
      countryName: "",
      cityName: "",
      streetName: "",
      postNumber: "",
      phoneNumber: "",
      email:"",
      cardNumber: "",
      cardDate: "",
      cardCode: ""
    }
  },
  methods:{
    proceed(){
      if(this.firstName != "" && this.lastName != "" && this.countryName != "" && this.cityName != "" &&
         this.streetName != "" && this.postNumber != "" && this.phoneNumber != "" && this.email != "" &&
         this.cardNumber != "" && this.cardDate != "" && this.cardCode != "" ){
           this.proceedCheck = true
           this.errorMessage = false
         }
      else{
        this.errorMessage = true
        this.proceedCheck = false
      }
    }
  }
}
</script>

<style lang="scss">
  .shopping-info{
    width: 500px;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &_user-info{
      & input{
        height: 30px;
        font-size: 18px;
        margin: 8px 5px;
        padding: 0 10px;
      }
      &_street{
        width: 263px;
      }
      &_post-number{
        width: 110px;
      }
    }
    &_line{
      width: 50px;
      height: 4px;
      background-color: gray;
      margin: 20px auto;
    }

    &_card-info{
      & input{
        height: 30px;
        font-size: 18px;
        margin: 8px 5px;
        padding: 0 10px;
      }
      &_number{
        width: 410px;
      }
    }

    &_proceed{
      width: 100px;
      height: 40px;
      background-color: #4aa96c;
      color: white;
      cursor: pointer;
      border-radius: 10px;
      float: right;
      margin: 20px 60px;

      & h4{
        margin: 10px 12px;
      }

      &:hover{
        box-shadow: 0px 5px 10px #dddddd;
      }
    }
  }

  .card-logo{
    width: 78px;
    margin: 20px 32px;
    border-radius: 5px;
    height: 40px;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    padding: 2px;
  }

  .border{
    border: 1px black solid
  }

  .proceed-text{
    text-align: center;
    color: #4aa96c;
    font-weight: bold;
    margin: 100px 0;
    font-size: 30px;
  }

  .error-message{
    color: red;
    text-align: center;
    margin: 30px 0;
  }
</style>
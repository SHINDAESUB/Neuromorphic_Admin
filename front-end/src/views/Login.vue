<template>
    <v-container  class="login d-flex align-center justify-center" fluid >
      <transition appear name="start">
        <article>
            <v-card color="transparent" min-width="400" width="500"   class="d-flex justify-center align-center flex-column elevation-0">
                <v-card-title class="text-center text-h2 white--text font-weight-black text mb-3" style="text-shadow: 3px 3px 3px #689f38;" >Neuromorphic</v-card-title>
                <v-card-text>
                    <v-text-field v-model="id" color="white" dark label="ID" class="text-h5"></v-text-field>
                    <v-text-field v-model="password" color="white" dark  label="PASSSWORD" class="text-h5"></v-text-field>
                    <v-btn elevation="0" rounded large block  class="gradient-btn title mt-4 login-btn" @click="login()" >LOGIN</v-btn>
                </v-card-text>
            </v-card>
        </article>
      </transition>
    </v-container>
</template>

<script>
import { EventBus } from '@/event-bus'

export default {
  name: 'Login', //Do not use built-in or reserved HTML elements as component id:  엘리먼트에 있는 ID를 입력하면 문제가 생긴다.

  data () {
    return{
      id:'',
      password:''
    }
  },

  computed: {

  },

  methods: {
    login(){
      if(this.id !== 'emnex' || this.password !== 'emnex') return EventBus.$emit('openAlert',`ID : emnex 와 Password: emnex 를 입력하세요  ` , 'error')
      this.$router.push('/list')
    }
  },

}
</script>

<style lang="scss" scoped>

.login{
  background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1) ), url("../../public/login_bg.jpg");
  height: 100vh;

  .login-btn:hover{
    color: green;
  }
}

.start-enter, .start-leave-to{
  opacity: 0;
}

.start-enter-active, .start-leave-active {
  animation: slide-in 1s ease-out;
  transition: opacity .3s ease-in-out;
}

@keyframes slide-in {
    from {
        transform: translateY(-80px);
    }
    to {
        transform: translateY(0);
    }
}

</style>



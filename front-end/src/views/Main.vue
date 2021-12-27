<template>
    <v-container  class="login d-flex align-center justify-center" fluid >
        <v-card  width="400" height="300" class="d-flex justify-center align-center flex-column ">
            <v-card-title >로그인</v-card-title>
            <v-card-text>
                <v-text-field v-model="id" label="ID"></v-text-field>
                <v-text-field v-model="password" label="PASSWORD"></v-text-field>
                <v-btn elevation="0" outlined block color="primary" @click="login()" >로그인</v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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

<style scoped>
.login{
    height: 100vh;
}
</style>

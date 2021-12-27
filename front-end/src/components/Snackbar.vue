<template>
    <v-snackbar
      v-model="open"
      :value="true"
      :color="color"
      right
      bottom
      text
    >
      {{ message }}
    </v-snackbar>
</template>

<script>
import { EventBus } from '@/event-bus'

export default {
    props: {
        open:Boolean,
        message:String,
        color:String,
    },
    watch: {
        open(newVal) {
            if (newVal) {
                setTimeout(() => {
                    this.closeSnackbar()
                }, 5000);
            }
        },
    },
    computed: {
        openAlert: {
            get() {
                return this.open;
            },
            set() {
               this.closeSnackbar()
            },
        },
    },
    methods:{
        closeSnackbar(){
            EventBus.$emit("closeSnackbar");
        }
    }
};
</script>
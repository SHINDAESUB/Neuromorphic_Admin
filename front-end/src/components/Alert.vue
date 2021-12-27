<template>
  <v-overlay 
    :value="openAlert"
    :z-index="20"
    >
        <v-alert 
            :type="type"
            dismissible
            @click="closeAlert()"
        >
            {{ message }}
        </v-alert>
  </v-overlay>


</template>

<script>
import { EventBus } from '@/event-bus'

export default {

    props: {
        open:Boolean,
        message:String,
        type:String,
    },
    watch: {
        open(newVal) {
            if (newVal) {
                setTimeout(() => {
                    this.closeAlert()
                }, 200000);
            }
        },
    },
    computed: {
        openAlert: {
            get() {
                return this.open;
            },
            set() {
               this.closeAlert()
            },
        },
    },
    methods:{
        closeAlert(){
            EventBus.$emit("closeAlert");
        }
    }
};
</script>
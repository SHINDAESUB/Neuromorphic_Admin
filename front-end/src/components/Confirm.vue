<template>
  <v-overlay 
    :value="open"
    :z-index="20"
    >
        <v-card width="400" light class="d-flex flex-column">
            <v-card-title class="justify-space-between"><span class="display-0 text--darken-1" >{{title}}</span></v-card-title>
            <v-card-text >
                {{message}}
            </v-card-text>
            <v-spacer/>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    text
                    @click="close()"
                >
                    닫기
                </v-btn>
                <v-btn
                    text
                    class="font-weight-bold"
                    color="primary"
                    @click="projectTeaching()"
                >
                    진행
                </v-btn>
            </v-card-actions>
        </v-card>
  </v-overlay>


</template>

<script>
import { EventBus } from '@/event-bus'

export default {

    props: {
        open:Boolean,
        title:String,
        message:String,
        type:String,
        info:Object,
    },

    methods:{
        projectTeaching(){
            EventBus.$emit("teachingModalOpen",this.info);
            this.close()
        },

        close(){
            EventBus.$emit("closeConfirm");
        }


    }
};
</script>
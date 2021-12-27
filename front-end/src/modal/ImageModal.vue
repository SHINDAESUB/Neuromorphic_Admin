<template>
    <v-overlay v-if="modal" :z-index="16">
        <v-card max-width="800" min-width="1200" height="" color="blue-grey lighten-5" light  class="d-flex flex-column">
            <v-toolbar
                color="blue-grey  "
                class="elevation-0"
            >
                <v-toolbar-title class="font-weight-bold white--text" >
                  검수 결과 
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon  @click="close()" ><v-icon color="white" >mdi-close-outline</v-icon></v-btn>
            </v-toolbar>
            <v-card-text>
              <v-subheader
               v-if="this.mode === 0 || this.mode === 3"
               class="title ">정상 보드</v-subheader>
              <v-sheet
                v-if="this.mode === 0 || this.mode === 3"
                class="mx-auto"
                elevation="8"
                max-width="1200"
                color="blue-grey lighten-5"
              >
                <v-slide-group
                  class="pa-4"
                  show-arrows
                >
                
                  <v-slide-item
                   v-for="(rect , index) in info"
                    :key="index"
                    v-slot="{ active, toggle }"
                  >
                    <v-card
                      :color="active ? 'primary' : 'grey lighten-4'"
                      class="ma-4"
                      height="270"
                      width="250"
                      @click="toggle"
                    >

                      <v-img
                        :contain="true"
                        height="100%"
                        width="100%"
                        max-height="220"
                        max-width="250"
                        :src="'data:image/gif;base64,'+ rect.goodImage"
                        @click="toggle"
                        class="grey darken-4 mr-1"
                      >
                      </v-img>
                      <v-card-title class="subtitle-2">
                        <span v-if="active" class="white--text"> {{rect.order}}</span>   
                        <span v-else class="black--text">{{rect.order}}</span>   
                      </v-card-title>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
               <v-subheader 
                v-if="this.mode === 1 || this.mode === 3" 
               class="title ">불량 보드</v-subheader>
              <v-sheet
                v-if="this.mode === 1 || this.mode === 3"
                class="mx-auto"
                elevation="8"
                max-width="1200"
                color="blue-grey lighten-5"
              >
                <v-slide-group
                  class="pa-4"
                  show-arrows
                >
                
                  <v-slide-item
                   v-for="(rect , index) in info"
                    :key="index"
                    v-slot="{ active, toggle }"
                  >
                    <v-card
                      :color="active ? 'primary' : 'grey lighten-4'"
                      class="ma-4"
                      height="270"
                      width="250"
                      @click="toggle"
                    >

                      <v-img
                        :contain="true"
                        height="100%"
                        width="100%"
                        max-height="220"
                        max-width="250"
                        :src="'data:image/gif;base64,'+ rect.missingImage"
                        @click="toggle"
                        class="grey darken-4 mr-1"
                      >
                      </v-img>
                      <v-card-title class="subtitle-2">
                        <span v-if="active" class="white--text"> {{rect.order}}</span>   
                        <span v-else class="black--text">{{rect.order}}</span>   
                      </v-card-title>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-card-text>
            <v-spacer/>
        </v-card>
    </v-overlay>    
</template>

<script>
import { EventBus } from '@/event-bus'

export default {
    props:{
        modal:Boolean,
        info:Array,
        mode:Number,
    },

    data(){
        return{
        }
    },

    methods:{
        dataInit(){
        },

        close(){
            EventBus.$emit('imageModalClose')
        }
    },
}
</script>

<style>

</style>
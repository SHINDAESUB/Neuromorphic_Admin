<template>
    <v-overlay v-if="modal" :z-index="10">
        <v-card max-width="800" min-width="800" color="blue-grey lighten-5" light  class="d-flex flex-column">
            <v-toolbar
                color="teal"
                flat
            >
                <v-toolbar-title class="font-weight-bold white--text" >
                    생성
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="close()" ><v-icon  >mdi-close-outline</v-icon></v-btn>
            </v-toolbar>
            <v-card-text class="px-12 mt-12" >
                <v-row >
                    <v-col cols="3">
                        <v-subheader class="subtitle-2">이름</v-subheader>
                    </v-col>
                    <v-col cols="9">          
                        <v-text-field
                            color="teal"
                            v-model="aoi.name"
                            placeholder="이름"
                            outlined
                            flat
                        />
                    </v-col>
                </v-row>
                <v-row >
                    <v-col cols="3">
                        <v-subheader class="subtitle-2">S/N</v-subheader>
                    </v-col>
                    <v-col cols="9">          
                        <v-text-field
                            color="teal"
                            v-model="aoi.serial"
                            placeholder="시리얼 넘버"
                            outlined
                            flat
                            hint="AOI 장비 적혀 있습니다. "
                        />
                    </v-col>
                </v-row>
                <v-row >
                    <v-col cols="3">
                        <v-subheader class="subtitle-2">생성 일자</v-subheader>
                    </v-col>
                    <v-col cols="9">          
                        <v-text-field
                            color="teal"
                            v-model="aoi.createDate"
                            placeholder="이름"
                            type="date"
                            outlined
                            flat
                        />
                    </v-col>
                </v-row>
                <v-row >
                    <v-col cols="3">
                        <v-subheader class="subtitle-2">기타 정보</v-subheader>
                    </v-col>
                    <v-col cols="9">          
                        <v-textarea
                            color="teal"
                            v-model="aoi.etc"
                            rows="5"
                            row-height="30"
                            placeholder="기타 정보"
                            outlined
                            flat
                        />
                    </v-col>
                </v-row>            
            </v-card-text>
            <v-spacer/>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    outlined
                    class="font-weight-bold"
                    dark
                     color="teal"
                    @click="save()"
                >
                    <v-icon left>mdi-plus</v-icon>
                    생성
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-overlay>    
</template>

<script>
import { EventBus } from '@/event-bus'
import { mapActions } from 'vuex'

import aoiGQL from '@/gql/aois'

export default {
    props:{
        modal:Boolean,
    },
    data(){
        return{
            init:{
                name:'',                
                state:false,               
                serial:'',            
                etc:'',                  
                createDate:'',            
            },

            aoi : {
                name:'',                
                state:false,               
                serial:'',            
                etc:'',                  
                createDate:'',  
            }
        }
    },

    computed: {
        aois() {
            return this.$store.state.aoi.aois
        },
    },


    methods:{
        ...mapActions({
            createWPOClient:'createWPOClient'
        }),


        dataInit(){
            this.aoi = Object.assign({},this.init)
        },

        async save(){
            if(this.aoi.name === '') return  EventBus.$emit('openAlert','AOI 이름을 입력해주세요' , 'warning') 
            if(this.aoi.createDate === '') return  EventBus.$emit('openAlert','생성 일자를 입력해주세요' , 'warning') 
            if(this.aoi.serial === '') return  EventBus.$emit('openAlert','S/N을 입력해주세요' , 'warning') 
          
            let duplication =  this.aois.some(aoi => aoi.serial === this.aoi.serial )

            if(duplication) return  EventBus.$emit('openAlert',`S/N ${this.aoi.serial} 가 존재 합니다.` , 'warning') 

            aoiGQL.create(this.aoi)
            
            this.close()
        },

        close(){
            EventBus.$emit('closeAoiAddModal')
        }
    },

    watch:{
        modal(){
            this.dataInit()
        }
    }    
}
</script>

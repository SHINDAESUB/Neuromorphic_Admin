<template>
    <v-overlay v-if="modal" :z-index="10">
        <v-card max-width="1500" min-width="1500" color="blue-grey lighten-5" light  class="d-flex flex-column">
            <v-toolbar
                color="teal"
                class="elevation-0"
            >
                <v-toolbar-title class="white--text">{{aoi.name}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon  @click="close()" ><v-icon color="white" >mdi-close-outline</v-icon></v-btn>
            </v-toolbar>
            <v-stepper alt-labels flat class="blue-grey lighten-5" >
                <v-stepper-header >
                    <v-stepper-step 
                        color="teal"
                        complete
                        step="1">
                        AOI 생성
                    </v-stepper-step>

                    <v-divider></v-divider>
                    <v-stepper-step 
                        color="teal"
                        :complete="info.state"
                        step="2"
                    >
                        PROJECT 연결
                    </v-stepper-step>
                </v-stepper-header>
            </v-stepper>
            <v-row no-gutters class="my-3 " >
                <v-col cols="6" class="pr-4" >
                    <v-row >
                        <v-col cols="3">
                            <v-subheader class="subtitle-2">프로젝트 이름</v-subheader>
                        </v-col>
                        <v-col cols="9">          
                            <v-text-field
                                color="teal"
                                v-model="info.name"
                                placeholder="프로젝트 이름"
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
                                v-model="info.serial"
                                placeholder="시리얼 넘버"
                                outlined
                                flat
                            />
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col cols="3">
                            <v-subheader class="subtitle-2">생성일</v-subheader>
                        </v-col>
                        <v-col cols="9">          
                            <v-text-field
                                color="teal"
                                v-model="info.createDate"
                                placeholder="프로젝트 생성일자"
                                type="date"
                                outlined
                                flat
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col cols="3">
                            <v-subheader class="subtitle-2">기타 정보</v-subheader>
                        </v-col>
                        <v-col cols="9">          
                            <v-textarea
                                color="teal"
                                v-model="info.etc"
                                rows="5"
                                row-height="30"
                                placeholder="기타 정보"
                                outlined
                                flat
                            />
                        </v-col>
                    </v-row>
                </v-col>
                <v-divider inset vertical/>
                <v-col class="px-3 overflow-y-auto" cols="6"  style="height:482px ">
                    <v-list three-line color="blue-grey lighten-5" class="ma-0 my-1 elevation-2 " width="100%">
                        <v-list-item-group
                            v-model="selectedProject"
                            active-class="teal--text"
                        >
                        <template v-for="(project, index) in projects">
                            <v-list-item :key="project.uid">
                                <v-list-item-icon>
                                    <v-icon  v-if="project.state" color="indigo">
                                        mdi-check
                                    </v-icon>
                                    <v-icon  v-else color="red">
                                        mdi-circle-small
                                    </v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="project.name"></v-list-item-title>

                                    <v-list-item-subtitle class="text--primary">{{project.createDate}} - {{project.successDate}}  </v-list-item-subtitle>

                                    <v-list-item-subtitle > 작업자 : {{project.user}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider
                                v-if="index < projects.length - 1"
                                :key="index"
                            ></v-divider>
                        </template>
                        </v-list-item-group>
                    </v-list>
                </v-col>    
            </v-row>

            <v-card-actions>
                <v-spacer/>
                <v-btn
                    outlined
                    color="teal"
                    @click="update()"
                >
                    수정<v-icon right>mdi-draw-pen</v-icon>
                </v-btn>
                <v-btn
                    outlined
                    color="red"
                    @click="remove(aoi.uid)"
                >
                    삭제<v-icon right>mdi-delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-overlay>    
</template>

<script>
import { EventBus } from '@/event-bus'

import {  mapActions } from 'vuex'

export default {
    props:{
        modal:Boolean,
        aoi:Object,
    },
    data(){
        return{
            init:{             
                name:"",                
                state:false,                
                serial:"",               
                etc:"",                  
                createDate:"",            
            },

            info: {
                name:"",                
                state:false,                
                serial:"",               
                etc:"",                  
                createDate:"",       
            },

            projects:[],
            selectedProject:null
        }
    },

    


    methods:{
        ...mapActions({
            aoiDelete:'deleteAoi',
            aoiUpdate:'updateAoi',
        }),

        dataInit(){
            this.info = Object.assign({},this.init)
        },

        async update(){
            if(this.info.name === '') return  EventBus.$emit('openAlert','프로젝트 이름을 입력해주세요' , 'warning') 
            if(this.info.admin === '') return  EventBus.$emit('openAlert','관리자를 입력해주세요' , 'warning') 

            this.aoiUpdate(this.info)
            this.close()
        },

        async remove(uid){
            this.aoiDelete(uid)
            this.close()
        },

        close(){
            EventBus.$emit('closeAoiSelectModal')
        }
    },

    watch:{
        modal(current){
            this.projects = this.$store.getters.idleProjects

            current ? this.info = Object.assign({},this.aoi) :  this.dataInit()
        }
    }

    
}
</script>

<style>
.dashboard{
    height: 100vh;
}
</style>
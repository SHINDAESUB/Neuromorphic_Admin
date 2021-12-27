<template>
    <v-overlay v-if="modal" :z-index="10">
        <v-card max-width="1000" min-width="1000" color="blue-grey lighten-5" light  class="d-flex flex-column">
            <v-toolbar
                color="indigo"
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
                    <v-col cols="2">
                        <v-subheader class="subtitle-2">프로젝트</v-subheader>
                    </v-col>
                    <v-col cols="4">          
                        <v-text-field
                            v-model="project.name"
                            placeholder="프로젝트 명"
                            outlined
                            flat
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-subheader>생성일</v-subheader>
                    </v-col>
                    <v-col cols="4">          
                        <v-text-field
                            v-model="project.createDate"
                            placeholder="프로젝트 생성일자"
                            type="date"
                            outlined
                            flat
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col cols="2">
                        <v-subheader class="subtitle-2">관리자</v-subheader>
                    </v-col>
                    <v-col cols="4">          
                        <v-text-field
                            v-model="project.admin"
                            placeholder="관리자 이름"
                            outlined
                            flat
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-subheader class="subtitle-2">완료 일자</v-subheader>
                    </v-col>
                    <v-col cols="4">  
                        <v-text-field
                            v-model="project.successDate"
                            placeholder="완료 일자"
                            type="date"
                            outlined
                            flat
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col cols="2">
                        <v-subheader class="subtitle-2">작업자</v-subheader>
                    </v-col>
                    <v-col cols="4">    
                        <v-text-field
                            v-model="project.user"
                            placeholder="작업자 이름"
                            outlined
                            flat
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-subheader class="subtitle-2">검수 갯수</v-subheader>
                    </v-col>
                    <v-col cols="4">    
                        <v-text-field
                            v-model.number="project.counter"
                            placeholder="검수 갯수"
                            type="number"
                            min="0"
                            outlined
                            flat
                        ></v-text-field>
                    </v-col>
                </v-row>                
            </v-card-text>
            <v-spacer/>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    class="font-weight-bold"
                    outlined
                    dark
                    color="indigo"
                    @click="save()"
                >
                     <v-icon >mdi-plus</v-icon>
                    생성
                </v-btn>

            </v-card-actions>
        </v-card>
    </v-overlay>    
</template>

<script>
import { EventBus } from '@/event-bus'

import projectGql from '@/gql/projects'

export default {
    props:{
        modal:Boolean,
    },
    data(){
        return{
            init:{
                name:"",
                admin:"",
                user:"",
                createDate:"",
                successDate:"",
                counter:0,
                aoiUid:0,
                state:false
            },

            project : {
                name:"",
                admin:"",
                user:"",
                createDate:"",
                successDate:"",
                counter:0,
                aoiUid:0,
                state:false
            }
        }
    },

    methods:{
        dataInit(){
            this.project = Object.assign({},this.init)
        },

        async save(){
            if(this.project.name === '') return  EventBus.$emit('openAlert','프로젝트 이름을 입력해주세요' , 'warning') 
            if(this.project.admin === '') return  EventBus.$emit('openAlert','관리자를 입력해주세요' , 'warning') 
            if(this.project.user === '') return  EventBus.$emit('openAlert','작업자를 입력해주세요' , 'warning') 
            if(this.project.createDate === '') return  EventBus.$emit('openAlert','생성 일자를 입력해주세요' , 'warning') 
            if(this.project.successDate === '') return  EventBus.$emit('openAlert','완료 일자를 입력해주세요' , 'warning') 
            if(this.project.counter <= 0) return  EventBus.$emit('openAlert','검수 갯수는 0 보다 커야합니다' , 'warning') 

            await projectGql.create(this.project)

            this.close()
        },

        close(){
            EventBus.$emit('closeProjectAddModal')
        }
    },

    watch:{
        modal(){
            this.dataInit()
        }
    }    
}
</script>

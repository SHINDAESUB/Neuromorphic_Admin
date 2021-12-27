<template>
    <v-overlay v-if="modal" :z-index="10">
        <v-card max-width="1500" min-width="1500" color="blue-grey lighten-5" light  class="d-flex flex-column">
            <v-toolbar
                color="indigo  "
                class="elevation-0"
            >
                <v-toolbar-title class="white--text">{{project.name}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon  @click="close()" ><v-icon color="white" >mdi-close-outline</v-icon></v-btn>
            </v-toolbar>
            
            <v-row no-gutters class="my-3 " >
                <v-col cols="6" class="px-4" >
                    <v-subheader v-if="project.state">검수 현황</v-subheader>
                        <v-col cols="12">
                            <v-checkbox
                                v-model="project.result"
                                :label="project.result ? '검수 완료' : '검수 진행중'"
                                class="ma-0 pa-0"
                                readonly
                            ></v-checkbox>
                        </v-col>
                    <v-row dense v-if="project.result" class="pl-4">
                        <v-col cols="3">
                            <v-text-field
                                v-model="project.counter"
                                label="검수 횟수"
                                outlined
                                dense
                                flat
                                readonly
                            />
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                v-model="project.total"
                                label="진행 횟수"
                                outlined
                                dense
                                flat
                                readonly
                            />
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                v-model="project.success"
                                label="성공 횟수"
                                outlined
                                dense
                                flat
                                readonly
                            />
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                v-model="project.fail"
                                label="실패 횟수"
                                outlined
                                dense
                                flat
                                readonly
                            />
                        </v-col>
                    </v-row>
                    
                    <v-divider v-if="project.state" />
                    <v-subheader>입력정보</v-subheader>
                    <v-row :dense="project.state" class="pl-4">
                        <v-col cols="3">
                            <v-subheader class="subtitle-2">프로젝트 이름</v-subheader>
                        </v-col>
                        <v-col cols="9">          
                            <v-text-field
                                v-model="info.name"
                                placeholder="프로젝트 이름"
                                outlined
                                dense
                                flat
                            />
                        </v-col>
                    </v-row>
                    <v-row :dense="project.state" class="pl-4">
                        <v-col cols="3">
                            <v-subheader class="subtitle-2">관리자</v-subheader>
                        </v-col>
                        <v-col cols="9">          
                            <v-text-field
                                v-model="info.admin"
                                placeholder="관리자 이름"
                                outlined
                                dense
                                flat
                            />
                        </v-col>
                    </v-row>
                    <v-row :dense="project.state" class="pl-4">
                        <v-col cols="3">
                            <v-subheader class="subtitle-2">작업자</v-subheader>
                        </v-col>
                        <v-col cols="9">          
                            <v-text-field
                                v-model="info.user"
                                placeholder="작업자 이름"
                                outlined     
                                dense                          
                                flat
                            />
                        </v-col>
                    </v-row>
                    <v-row :dense="project.state" class="pl-4">
                        <v-col cols="3">
                            <v-subheader class="subtitle-2">생성일</v-subheader>
                        </v-col>
                        <v-col cols="9">          
                            <v-text-field
                                v-model="info.createDate"
                                placeholder="프로젝트 생성일자"
                                type="date"
                                outlined
                                dense
                                flat
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row :dense="project.state" class="pl-4">
                        <v-col cols="3">
                            <v-subheader class="subtitle-2">생성일</v-subheader>
                        </v-col>
                        <v-col cols="9">          
                            <v-text-field
                                v-model="info.successDate"
                                placeholder="프로젝트 생성일자"
                                type="date"
                                outlined
                                dense
                                flat
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row :dense="project.state" class="pl-4">
                        <v-col cols="3">
                            <v-subheader class="subtitle-2">검수 횟수</v-subheader>
                        </v-col>
                        <v-col cols="9">          
                            <v-text-field
                                v-model.number="info.counter"
                                placeholder="프로젝트 생성일자"
                                type="number"
                                min="0"
                                dense
                                outlined
                                flat
                            ></v-text-field>
                        </v-col>
                    </v-row>


                </v-col>
                <v-divider inset vertical/>
                <v-col cols="6" class="text-center px-3 ">
                    <div v-if="!project.state">
                        <v-subheader>AOI</v-subheader>
                        <v-data-table
                            v-model="selectedAoi"
                            class="blue-grey lighten-5"
                            height="580px"
                            item-key="uid"
                            single-select
                            show-select
                            :headers="headers"
                            :items="selectAois"
                        >
                            <template  v-slot:[`item.aoiUid`]="{ item }">
                                <v-chip disabled v-if="item.aoiUid !== 0" color="grey" class="white--text" >OFF</v-chip> 
                                <v-chip disabled v-else class="white--text" color="success" >ON</v-chip>            

                            </template>
                            <template  v-slot:[`item.actions`]="{ item }">
                                <v-chip  color="success" @click="projectSelect(item)" >조회</v-chip>
                            </template>
                        </v-data-table>
                    </div>
                    <div v-else>
                        <v-subheader>학습 정보</v-subheader>
                        <v-subheader class="ml-4">양품 보드</v-subheader>
                        <v-sheet
                            class="mx-auto"
                            elevation="1"
                            max-width="800"
                            color="success lighten-1"
                        >
                            <v-slide-group
                                class="pa-1"
                                active-class="success"
                            >
                                <v-slide-item
                                    v-for="(rect , index) in learning"
                                    :key="index"
                                    v-slot="{ active, toggle }"
                                >
                                    <v-card
                                        :color="active ? undefined : 'grey lighten-1'"
                                        class="ma-4"
                                        height="270"
                                        width="250"
                                        @click="toggle"
                                    >
                                        <v-img
                                            :contain="true"
                                            height="100%"
                                            width="100%"
                                            max-height="270"
                                            max-width="250"
                                            :src="'data:image/gif;base64,'+ rect.goodImage"
                                            @click="toggle"
                                            class="grey darken-4 mr-1"
                                        >
                                        </v-img>
                                    </v-card>
                                </v-slide-item>
                            </v-slide-group>
                        </v-sheet>
                        <v-subheader  class="ml-4 mt-4">불량 보드</v-subheader>
                        <v-sheet
                            class="mx-auto"
                            elevation="1"
                            max-width="800"
                            color="red lighten-1"
                        >
                            <v-slide-group
                                class="pa-1"
                                active-class="success"
                            >
                                <v-slide-item
                                    v-for="(rect , index) in learning"
                                    :key="index"
                                    v-slot="{ active, toggle }"
                                >
                                    <v-card
                                        :color="active ? undefined : 'grey lighten-1'"
                                        class="ma-4"
                                        height="270"
                                        width="250"
                                        @click="toggle"
                                    >
                                        <v-img
                                            :contain="true"
                                            height="100%"
                                            width="100%"
                                            max-height="270"
                                            max-width="250"
                                            :src="'data:image/gif;base64,'+ rect.missingImage"
                                            @click="toggle"
                                            class="grey darken-4 mr-1"
                                        >
                                        </v-img>
                                    </v-card>
                                </v-slide-item>
                            </v-slide-group>
                        </v-sheet>
                    </div>

                </v-col>    
                
            </v-row>

            <v-card-actions>
                <v-spacer/>
                <v-btn
                    outlined
                    color="red"
                    @click="remove()"
                >
                    삭제<v-icon right>mdi-delete</v-icon>
                </v-btn>
               <v-btn
                    outlined
                    color="indigo"
                    @click="update()"
                >
                    수정<v-icon right>mdi-draw-pen</v-icon>
                </v-btn>
               <v-btn
                    v-if="!project.state"
                    :disabled="selectedAoi.length === 0 "
                    outlined
                    color="green"
                    @click="connect()"
                >
                    학습<v-icon right>mdi-check</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-overlay>    
</template>

<script>
import { EventBus } from '@/event-bus'

import { mapActions } from 'vuex'

import aoiGql from '@/gql/aois'
import projectGql from '@/gql/projects'
import learningGql from '@/gql/learning'

export default {
    props:{
        modal:Boolean,
        project:Object,        
        learning:Array,
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

            info: {
                name:"",
                admin:"",
                user:"",
                createDate:"",
                successDate:"",
                counter:0,
                aoiUid:0,
                state:false
            },
            headers: [
                {
                    text: '이름',
                    align: 'start',
                    value: 'name',
                },
                { text: '시리얼', value: 'serial' },
                { text: '완료일자', value: 'createDate' },
            ],

            selectedAoi:[]
        }
    },
    computed: {
        selectAois(){
            return this.$store.state.aoi.aois.filter(aoi => {return aoi.projectUid === 0} )
        },

        aois(){
            return this.$store.state.aoi.aois
        }
    },

    methods:{
        ...mapActions({
            createWPOClient:'createWPOClient',
        }),

        dataInit(){
            this.info = Object.assign({},this.init)
            this.selectedAoi = []
        },

        async update(){
            if(this.info.name === '') return  EventBus.$emit('openAlert','프로젝트 이름을 입력해주세요' , 'warning') 
            if(this.info.admin === '') return  EventBus.$emit('openAlert','관리자를 입력해주세요' , 'warning') 
            if(this.info.user === '') return  EventBus.$emit('openAlert','작업자를 입력해주세요' , 'warning') 
            if(this.info.createDate === '') return  EventBus.$emit('openAlert','생성 일자를 입력해주세요' , 'warning') 
            if(this.info.successDate === '') return  EventBus.$emit('openAlert','완료 일자를 입력해주세요' , 'warning') 
            if(this.info.counter <= 0) return  EventBus.$emit('openAlert','검수 갯수는 0 보다 커야합니다' , 'warning') 

            projectGql.update(this.info)

            this.close()
        },

        async remove(){
            await projectGql.delete(this.project.uid)
            
            if(this.project.aoiUid !== 0 ){
                let aoi = this.aois.filter(aoi => { return aoi.uid === this.project.aoiUid } )
                aoi[0].projectUid = 0 
                aoiGql.update(aoi[0])
                learningGql.delete(this.project.uid)
            } 
            
            this.close()
        },
        
        async connect(){
            this.createWPOClient(this.selectedAoi[0].serial)
            EventBus.$emit('openConnection' , this.selectedAoi[0].serial)
            
            let delay = 100; 
            let waitingTime = 0 
            let timer = await setInterval(()=> {
                if(this.$store.state.neuro.isLinked){
                    clearInterval(timer)

                    EventBus.$emit('teachingModalOpen' , this.selectedAoi[0] , this.project )
                    EventBus.$emit('closeConnection')
                    this.close()

                }else if(waitingTime === 30000){
                    clearInterval(timer)

                    EventBus.$emit('closeConnection')
                    EventBus.$emit('openAlert',`AOI 연결 실패 `, 'error')
                }else{
                    waitingTime = waitingTime + delay
                }
            },delay)
        },

        close(){
            EventBus.$emit('closeProjectSelectModal')
        }
    },

    watch:{
        modal(current){
            current ? this.info = Object.assign({},this.project) :  this.dataInit()
        },


    }
}
</script>

<style lang="scss">
</style>










<template>
    <v-container class="grey lighten-3 d-flex justify-center" fluid style="min-height:100%" >
        <v-row>
            <v-col cols="3">
                <v-card height="100%" >
                    <v-card-title class="indigo white--text font-weight-black" >
                        메뉴얼
                    </v-card-title>
                    <v-card-text class="py-0">
                        <v-timeline
                            align-top
                            dense
                        >
                        <v-timeline-item
                            fill-dot
                                color="indigo lighten-3"
                        >
                            <v-card
                                color="indigo lighten-3"
                            >
                            <v-card-title class="text-h6 font-weight-bold white--text">프로젝트 생성 및 학습</v-card-title>
                            <v-card-text class="white text--primary pt-5">
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-numeric-1-box-outline</v-icon>프로젝트를 생성합니다.</p>
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-numeric-2-box-outline</v-icon>AOI 장비를 선택합니다.</p>
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-numeric-3-box-outline</v-icon>학습을 진행합니다.</p>
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-numeric-4-box-outline</v-icon>학습을 마치고 저장하면 AOI 장비에 <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;프로젝트가 부여 됩니다.</p> 
                            </v-card-text>
                            </v-card>
                        </v-timeline-item>

                        <v-timeline-item
                            fill-dot
                                color="indigo lighten-2"
                        >
                            <v-card
                                 color="indigo lighten-2"
                            >
                            <v-card-title class="text-h6 font-weight-bold white--text">
                                프로젝트 완료
                            </v-card-title>
                            <v-card-text class="white text--primary  pt-5">
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-numeric-1-box-outline</v-icon>AOI 장비에서 검수완료 후 네트워크 연결</p>
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-numeric-2-box-outline</v-icon>프로젝트 연동 단계에서 연동완료</p>
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-numeric-3-box-outline</v-icon>완료 리스트에 이동됨</p>
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-circle-small</v-icon><span class="indigo lighten-3 white--text font-weight-bold">위 과정을 거친 프로젝트의 연결된 AOI 장비는 자동으로 해제</span></p>
                            </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item
                            fill-dot
                            
                            color="indigo lighten-1"
                        >
                            <v-card
                            color="indigo lighten-1"
                            >
                            <v-card-title class="text-h6 font-weight-bold white--text">주의 사항</v-card-title>
                            <v-card-text class="white text--primary  pt-5">
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-circle-small</v-icon>입력한 AOI 장비의 <strong>'S/N'</strong> 으로 네트워크 연결합니다.</p>
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-circle-small</v-icon>AOI 장비는 하나의 프로젝트를 가질 수 있습니다.</p>

                            </v-card-text>
                            </v-card>
                        </v-timeline-item>

                        </v-timeline> 
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="5">
                <v-card style="border:1px solid indigo darken-2;">
                    <v-card-title class="indigo--text font-weight-bold">
                        프로젝트
                        <v-spacer/>
                        <v-icon color="indigo" @click="projectAddModalOpen()">mdi-plus</v-icon>
                    </v-card-title>

                    <v-container fluid>
                        <v-row no-gutters class="mb-4">
                            <v-text-field
                                v-model="preparationSearch"
                                append-icon="mdi-magnify"
                                label="검색"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-row>
                        <v-data-table
                            height="770px"
                            min-height="770px"
                            key="uid"
                            :headers="preparationHeaders"
                            :items="preparation"
                            :search="preparationSearch"
                            :footer-props="{
                                'items-per-page-options': [20, 40, 60 ,-1]
                            }"
                        >
                            <template  v-slot:[`item.aoiUid`]="{ item }">
                                <v-icon v-if="item.aoiUid === 0" color="grey" >mdi-lan-disconnect</v-icon> 
                                <v-icon v-else color="success" >mdi-lan-connect</v-icon>            
                            </template>
                            <template  v-slot:[`item.state`]="{ item }">
                                <v-icon v-if="!item.state" color="grey" >mdi-image-search-outline</v-icon> 
                                <v-icon v-else color="success" >mdi-image-search-outline</v-icon>            
                            </template>
                            <template  v-slot:[`item.actions`]="{ item }">
                                <v-chip  color="indigo" dark @click="projectSelect(item)" >조회</v-chip>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card style="border:1px solid indigo darken-2;">
                    <v-card-title class="indigo--text font-weight-bold">
                        완료
                        <v-spacer/>
                    </v-card-title>

                    <v-container fluid>
                        <v-row no-gutters class="mb-4">
                            <v-text-field
                                v-model="successSearch"
                                append-icon="mdi-magnify"
                                label="검색"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-row>
                        <v-data-table
                            height="770px"
                            min-height="770px"
                            key="uid"
                            :headers="successHeaders"
                            :items="success"
                            :search="successSearch"
                            :footer-props="{
                                'items-per-page-options': [20, 40, 60 ,-1]
                            }"
                        >
                            <template  v-slot:[`item.aoiUid`]="{ item }">
                                <v-icon v-if="item.aoiUid === 0" color="grey" >mdi-lan-disconnect</v-icon> 
                                <v-icon v-else color="success" >mdi-lan-connect</v-icon>            
                            </template>
                            <template  v-slot:[`item.state`]="{ item }">
                                <v-icon v-if="!item.state" color="grey" >mdi-image-search-outline</v-icon> 
                                <v-icon v-else color="success" >mdi-image-search-outline</v-icon>            
                            </template>
                            <template  v-slot:[`item.actions`]="{ item }">
                                <v-chip  color="indigo" dark @click="projectSelect(item)" >조회</v-chip>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import { EventBus } from '@/event-bus'
import learningGql from '@/gql/learning'



export default {
    data () {
      return {
        preparationSearch: '',
        preparationHeaders: [
          {
            text: '이름',
            value: 'name',
           
          },
          { text: '관리자', value: 'admin' },
          { text: '작업자', value: 'user' },
          { text: 'AOI 연동', value: 'aoiUid' },
          { text: '학습', value: 'state' },
          { text: '', value: 'actions' },
        ],

        successSearch: '',
        successHeaders: [
          {
            text: '이름',
            align: 'start',
            value: 'name',
            width: '50px'
          },
          { text: '관리자', value: 'admin' },
          { text: '작업자', value: 'user' },
          { text: 'AOI 연동', value: 'aoiUid' },
          { text: '업데이트', value: 'updateDate' },
          { text: '', value: 'actions' },
        ],

      }
    },
  

    computed: {
        preparation() {
            console.log('준비 리스트', this.$store.getters.preparation)

            return [...this.$store.getters.preparation]
        },

        success() {
            console.log('성공 리스트 ', this.$store.getters.success)

            return [...this.$store.getters.success]
        },
    },

    methods: {

        

        async projectSelect(project){            
            if(project.state){
                let learning = await learningGql.get(project.uid)
                EventBus.$emit('openProjectSelectModal' , project ,learning)
            }else{
                EventBus.$emit('openProjectSelectModal' , project , [])
            }
        },


        projectAddModalOpen(){
            EventBus.$emit('openProjectAddModal')
        },
    },

}

</script>

<style scoped>


</style>
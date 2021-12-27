<template>
    <v-container class="grey lighten-3 d-flex justify-center" fluid style="min-height:100%" >
        <v-row>
            <v-col cols="4">
                <v-card height="100%" >
                    <v-card-title class="teal white--text font-weight-black" >
                        메뉴얼
                    </v-card-title>
                    <v-card-text class="py-0">
                        <v-timeline
                            align-top
                            dense
                        >
                        <v-timeline-item
                            fill-dot
                                color="teal lighten-3"
                        >
                            <v-card
                                color="teal lighten-3"
                            >
                            <v-card-title class="text-h6 font-weight-bold white--text">AOI 장비 등록</v-card-title>
                            <v-card-text class="white text--primary pt-5">
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-numeric-1-box-outline</v-icon>AOI 장비의 전원을 컨다.</p>
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-numeric-2-box-outline</v-icon>AOI 장비의 안내의 따라 네트워크를 연결</p>
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-numeric-3-box-outline</v-icon>'<v-icon small color="teal" @click="aoiAddModalOpen()">mdi-plus</v-icon>' 누른뒤 AOI 장비의 정보를 입력합니다.</p>
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-numeric-4-box-outline</v-icon>정상적으로 등록 되면 리스트에 추가 됩니다.</p> 
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-numeric-5-box-outline</v-icon>'프로젝트' 탭을 눌러 다음 작업을 진행합니다.</p>                                
                            </v-card-text>
                            </v-card>
                        </v-timeline-item>

                        <v-timeline-item
                            fill-dot
                                color="teal lighten-2"
                        >
                            <v-card
                                 color="teal lighten-2"
                            >
                            <v-card-title class="text-h6 font-weight-bold white--text">
                                기능 설명
                            </v-card-title>
                            <v-card-text class="white text--primary  pt-5">
                                <p class="font-weight-medium"><v-icon color="teal" @click="aoiAddModalOpen()" class="mr-3">mdi-plus</v-icon>AOI 장비 등록</p>
                                <p class="font-weight-medium"><v-icon color="red" class="mr-3">mdi-delete</v-icon>AOI 장비 삭제</p>
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-lan-disconnect</v-icon>프로젝트 안됨</p>
                                <p class="font-weight-medium"><v-icon color="success" class="mr-3">mdi-lan-connect</v-icon>프로젝트 연결</p>
                                <p class="font-weight-medium"><v-icon color="primary" class="mr-3">mdi-check</v-icon>프로젝트 완료</p>

                            </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item
                            fill-dot
                            
                            color="teal lighten-1"
                        >
                            <v-card
                            color="teal lighten-1"
                            >
                            <v-card-title class="text-h6 font-weight-bold white--text">주의 사항</v-card-title>
                            <v-card-text class="white text--primary  pt-5">
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-circle-small</v-icon><span class="teal lighten-3 white--text font-weight-bold"> 등록된 AOI 장비가 하나 이상일 경우 프로젝트 생성가능 합니다. </span></p>
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-circle-small</v-icon>입력한 AOI 장비의 <strong>'S/N'</strong> 으로 네트워크 연결합니다.</p>
                                <p class="font-weight-medium"><v-icon class="mr-3">mdi-circle-small</v-icon>AOI 장비는 하나의 프로젝트를 가질 수 있습니다.</p>

                            </v-card-text>
                            </v-card>
                        </v-timeline-item>

                        </v-timeline> 
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card height="100%">
                    <v-card-title class="teal--text">
                        AOI 
                        <v-spacer/>
                        <v-btn small icon @click="aoiAddModalOpen()"><v-icon color="teal" >mdi-plus</v-icon></v-btn>
                    </v-card-title>
                    <v-toolbar
                        tile
                        flat
                    >
                        <v-text-field
                            v-model="search" 
                            color="teal"
                            label="검색"
                            outliend
                            append-icon="mdi-text-box-search-outline"
                        />
                    </v-toolbar>
                    <v-list 
                        two-line
                        max-height="844px"
                        class="overflow-y-auto"
                    >
                        <v-subheader>리스트</v-subheader>
                        <v-list-item-group
                            v-model="selected"
                            active-class="teal--text"
                            
                        >
                            <template v-for="(item, index) in filteredItems">
                            <v-list-item :key="item.uid">
                                <template v-slot:default="{ active }">
                                <v-list-item-action>
                                    <v-checkbox color="teal" :input-value="active"></v-checkbox>
                                </v-list-item-action>

                                <v-list-item-content>
                                    <v-list-item-title v-text="item.name"></v-list-item-title>

                                    <v-list-item-subtitle
                                        class="text--primary"
                                        v-text="item.serial"
                                    ></v-list-item-subtitle>

                                    <v-list-item-subtitle v-text="item.etc"></v-list-item-subtitle>
                                </v-list-item-content>

                                    <v-list-item-action>
                                        <v-icon
                                            v-if="item.projectUid === 0"
                                            color="grey lighten-1"
                                        >
                                            mdi-lan-disconnect
                                        </v-icon>
                                        <v-icon
                                            v-else
                                            color="success"
                                        >
                                            mdi-lan-connect
                                        </v-icon>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                            <v-divider
                                v-if="index < aois.length - 1"
                                :key="index"
                            ></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols="5">
                <v-card height="100%" v-if="typeof(selected) === 'number' " >
                    <v-card-title class="teal--text">
                        상세 정보
                        <v-spacer/>
                        <v-btn icon small @click="update(selected)"><v-icon color="teal">mdi-draw-pen</v-icon></v-btn>
                        <v-btn icon small @click="remove(selected)"><v-icon color="red">mdi-delete</v-icon></v-btn>
                    </v-card-title>
                    <v-card-text>
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
                                rows="18"
                                row-height="30"
                                placeholder="기타 정보"
                                outlined
                                flat
                            />
                        </v-col>
                    </v-row>
                    </v-card-text>
                </v-card>
                <v-card height="100%" color="grey lighten-4" v-else class="d-flex justify-center align-center flex-column " >
                    AOI 장비를 선택해주세요
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { EventBus } from '@/event-bus'

import aoiGql from '@/gql/aois'

export default {

    data(){
        return{
            search: '',
            selected: null,
            searchItem: [],
            
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
        }
    },

    created(){
        EventBus.$on('aoiUpdate',() => { this.dataInit() });
        this.dataInit()
    },

    computed: {
        aois() {
            return this.$store.state.aoi.aois
        },

        filteredItems() {
            return this.searchItem.filter((item) =>{
                return item.name.toLowerCase().match(this.search)  || 
                        item.etc.toLowerCase().match(this.search) || 
                        item.serial.toLowerCase().match(this.search) 
            })
        },

        projects(){
            return this.$store.state.project.projects
        }

    },


    methods: {
        async update(index){
            if(this.info.name === '') return  EventBus.$emit('openAlert','프로젝트 이름을 입력해주세요' , 'warning') 
            if(this.info.admin === '') return  EventBus.$emit('openAlert','관리자를 입력해주세요' , 'warning') 

            await aoiGql.update(this.info)
            this.filteredItems.splice( index ,1 ,this.info )
        },

        async remove(){
            if(this.info.projectUid !== 0){
                let result = this.projects.filter(project => project.uid === this.info.projectUid)                 
                return  EventBus.$emit('openAlert',`연동 된 프로젝트 : "${result[0].name}" 를 먼저 삭제해주세요` , 'warning')
            } 
            
            await aoiGql.delete(this.info.uid)
            this.dataInit()
        },

        dataInit(){
            this.searchItem = this.aois
        },

        aoiAddModalOpen(){ EventBus.$emit('openAoiAddModal')},
    },

    watch:{
        selected(current){
            if(typeof(current) === 'number'){
                this.info = Object.assign({},this.filteredItems[current])
            }else{
                this.info =  Object.assign({},this.init)
            }
        },
    },

    beforeDestroy(){
        EventBus.$off('aoiUpdate');
        EventBus.$off('aoiModify');
    },

}

</script>

<style scoped>


</style>
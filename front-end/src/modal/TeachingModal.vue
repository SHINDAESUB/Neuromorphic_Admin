<template>
    <v-overlay v-if="modal" :z-index="15">
        <v-card max-width="1850" min-width="1850" height="" color="blue-grey lighten-5" light  class="d-flex flex-column">
            <v-toolbar
                color="blue-grey  "
                class="elevation-0"
            >
                <v-toolbar-title class="font-weight-bold white--text" >
                    학습
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon  @click="close()" ><v-icon color="white" >mdi-close-outline</v-icon></v-btn>
            </v-toolbar>
            <v-card-text>
                <v-row >
                    <v-col cols="1" class="d-flex justify-content-space-between flex-column" >
                        <v-row>
                            <v-col>
                                <v-btn block tile large :disabled="mode === 0 ? false : true "  color="success" class="mb-1 title">양산 보드</v-btn>
                                <v-btn block tile large :disabled="mode === 1 ? false : true " color="error" class="title">불량 보드</v-btn>
                            </v-col>       
                        </v-row>
                        <v-row class="d-flex align-end ">
                            <v-col>
                                <v-menu
                                    top
                                    offset-y
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn 
                                            tile 
                                            block 
                                            large 
                                            class="title "  
                                            outlined 
                                            :disabled="step === 2 ? false : true"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                            <v-icon left>mdi-draw</v-icon>설정
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-color-picker
                                            v-model="drwingColor"
                                            hide-inputs
                                            flat
                                        ></v-color-picker>
                                        <v-slider
                                           class="px-3 mt-12"
                                           label="굵기"
                                             v-model.number="thickness"
                                            thumb-label="always"
                                            min ="1"
                                            max ="10"
                                        />
                                    </v-card>
                                </v-menu>
                                <v-btn v-if="captureImage !== null" :disabled="step === 2 ? false : true "  tile block large class="title mt-1"   @click="imageInit()"><v-icon left>mdi-camera</v-icon>재촬영</v-btn>
                            </v-col>       
                        </v-row>
                    </v-col>
                    <v-col cols=" " >
                        <v-card
                            v-if="step < 2"
                            color="grey lighten-2"
                            width="1280"
                            height="720"
                            max-width="1280" 
                            max-height="720"
                            class="elevation-0 d-flex justify-center align-center flex-column"
                        >
                            <v-container style="height: 400px;">
                                <v-row
                                    class="fill-height"
                                    align-content="center"
                                    justify="center"
                                >
                                    <v-col
                                        class="text-h3 text-center"
                                        cols="12"
                                    >
                                        <span v-if="step === 1">보드 사진 촬영 중입니다.</span>                                        
                                        <span v-else><strong :class="mode === 0 ? 'success':'red'" class="white--text">{{mode === 0 ? '양산 보드' : '불량 보드' }}</strong>를 삽입해주세요</span>
                                    </v-col>
                                    <v-col cols="6">
                                    <v-progress-linear
                                        color="blue-grey"
                                        indeterminate
                                        rounded
                                        height="6"
                                    ></v-progress-linear>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>

                        <v-stage
                            v-else
                            class="ma-0 pa-0 flicker-1"
                            :class="teachingResult === false ? 'drawContainer' : '' "
                            ref="stage"
                            :config="stageSize"
                            @mousemove="teachingResult === false ? handleMouseMove() : ''"
                            @mouseDown="teachingResult === false ? handleMouseDown()  : ''"
                            @mouseUp="teachingResult === false ? handleMouseUp()  : ''"
                            @mouseleave="teachingResult === false ? handleMouseLeave()  : ''"
                        >
                            <v-layer ref="layer" 
                                :config="stageSize"
                            >
                                <v-image 
                                    :config="{
                                    image: captureImage,
                                    width: 1280, 
                                    height: 720,
                                }"/>    

                                    <v-rect
                                        v-for="(rec, index) in drawingRect"
                                        :key="index"
                                        :config="{
                                            x: Math.min(rec.startX, rec.startX + rec.width),
                                            y: Math.min(rec.startY, rec.startY + rec.height),
                                            width: Math.abs(rec.width),
                                            height: Math.abs(rec.height),
                                            fill: rec.fill,
                                            stroke: rec.stroke,
                                            dash:rec.dash,    
                                            strokeWidth: rec.thickness,
                                        }"
                                    >
                                    </v-rect>
                            </v-layer>
                        </v-stage>
                    </v-col>
                    <v-col >
                        <v-data-table 
                            tile
                            height="660"
                            min-height="660" 
                            width="360"
                            :calculate-widths="true"
                            :headers="drawingHeaders"
                            :items="drawingRect"
                            no-data-text="검수 영역이 없습니다."
                            :footer-props="{
                                'items-per-page-options': [-1, 15, 30, 45 ],
                                'items-per-page-text':''
                            }"
                        >
                            <template  v-slot:[`item.order`]="{ item }">
                                <span > {{item.order}} </span>
                            </template>
                            <template  v-slot:[`item.height`]="{ item }">
                                {{Math.abs(item.height)}} 
                            </template>
                            <template  v-slot:[`item.width`]="{ item }">
                                {{Math.abs(item.width)}} 
                            </template>
                            <template  v-slot:[`item.actions`]="{ item }">
                                <v-icon :color="selectedRect !==  item.order ? 'grey' : 'primary'"  @click="selectRect(item)">mdi-select-search</v-icon>
                                <v-icon v-if="mode === 0 " color="red"  @click="removeRect(item.order)">mdi-delete</v-icon>
                            </template>
                        </v-data-table>

                        <!-- <v-tooltip v-if="teachingResult === false"  color="blue" top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" tile block large class="title mt-1" :disabled="drawingRect.length === 0 || captureImage === null ? true : false" color="primary" @click="teaching()">검수</v-btn>
                            </template>
                            <span>지정한 부품을 검수 합니다.</span>
                        </v-tooltip>

                        <v-row v-else class="mt-1 px-3">
                            <v-col class="ma-0 pa-0 " >
                                <v-btn tile block large class="title" @click="reteaching()" >재검수</v-btn>
                            </v-col>
                            <v-col v-if="mode !== 1" class="ma-0 pa-0 title">
                                <v-btn tile block large class="title" color="primary" @click="modeChange()">다음</v-btn>
                            </v-col>
                        </v-row> -->
                    </v-col>
                </v-row>
                <v-snackbar
                    v-if="step === 2"
                    v-model="snackbar"
                    :multi-line="multiLine"
                    :timeout="-1"
                    
                >
                    <p v-if="drawingRect.length === 0" class="text-center subtitle-1">
                        <span  class="font-weight-black">검수할 부품을 이미지위에 드래그 해주세요</span>                   
                    </p>
                    <div  v-else-if="mode === 0 &&  !this.teachingResult" class="text-center subtitle-1">
                        <p> <v-icon right small>mdi-camera</v-icon>&nbsp;<strong >재촬영</strong>&nbsp;  버튼을 누르면 보드를 다시 촬영합니다. </p>           
                        <p> <v-icon color="blue" small right>mdi-magnify-expand</v-icon>&nbsp;<strong class=" blue--text" >검수</strong>&nbsp;  버튼을 누르면 지정한 양산 부품을 학습합니다. </p>   
                    </div>
                    <div  v-else-if="mode === 0 &&  this.teachingResult" class="text-center subtitle-1">
                        <p> <v-icon right small>mdi-magnify-expand</v-icon>&nbsp;<strong >재검수</strong>&nbsp; 버튼을 누르면 보드의 학습 영역을 편집이 가능합니다. </p>           
                        <p> <v-icon right small color="success" >mdi-chevron-right</v-icon>&nbsp;<strong class=" success--text" >다음</strong>&nbsp;  버튼을 누르면 불량 보드를 촬영합니다. </p>   
                    </div>  
                    <div  v-else-if="mode === 1 &&  !this.teachingResult" class="text-center subtitle-1">
                        <p> <v-icon right small>mdi-camera</v-icon>&nbsp;<strong >재촬영</strong>&nbsp;  버튼을 누르면 보드를 다시 촬영합니다. </p>           
                        <p> <v-icon color="blue" small right>mdi-magnify-expand</v-icon>&nbsp;<strong class=" blue--text" >검수</strong>&nbsp;  버튼을 누르면 지정된 불량 보드를 학습합니다. </p>   
                    </div>
                    <div  v-else-if="mode === 1 &&  this.teachingResult" class="text-center subtitle-1">
                        <p> <v-icon right small>mdi-magnify-expand</v-icon>&nbsp;<strong >재검수</strong>&nbsp; 버튼을 누르면 보드의 다시 학습을 시킵니다. </p>           
                        <p> <v-icon color="success" right small>mdi-check</v-icon>&nbsp;<strong class=" success--text" >저장</strong>&nbsp;  버튼을 누르면 학습내용을 저장합니다. </p>   
                    </div>
                </v-snackbar>
            </v-card-text>
            <v-spacer/>
            <v-card-actions>
                <v-spacer/>
                <v-btn v-if="step === 2 && mode === 1" 
                    outlined
                    color="error" 
                    @click="dataInit()">
                    초기화 <v-icon right>mdi-arrow-left</v-icon> 
                </v-btn>
                <v-btn
                    v-if="captureImage !== null &&  !this.teachingResult"
                    outlined
                    :disabled="drawingRect.length !== 0 ? false : true "
                    color="primary" @click="teaching()">
                    검수 <v-icon right>mdi-magnify-expand</v-icon> 
                </v-btn>
                <v-btn
                    v-if="mode === 0 &&  captureImage !== null && this.teachingResult"
                    outlined
                    :disabled="drawingRect.length !== 0 ? false : true "
                    color="primary" @click="reteaching()">
                    재검수 <v-icon right>mdi-magnify-expand</v-icon> 
                </v-btn>
                <v-btn
                    v-if="mode === 1 &&  captureImage !== null && this.teachingResult"
                    outlined
                    :disabled="drawingRect.length !== 0 ? false : true "
                    color="primary" @click="teaching()">
                    재검수 <v-icon right>mdi-magnify-expand</v-icon> 
                </v-btn>
                <v-btn v-if="step === 2 && mode === 0 && this.teachingResult" 
                    outlined
                    color="success" 
                    @click="modeChange()">
                    다음 <v-icon right>mdi-chevron-right</v-icon>
                </v-btn>

                <v-btn v-if="step === 2 && mode === 1 && this.teachingResult" 
                    outlined
                    color="success" 
                    @click="save()">
                    저장 <v-icon right>mdi-check</v-icon> 
                </v-btn>
            </v-card-actions>


        </v-card>
    </v-overlay>    
</template>

<script>
import { EventBus } from '@/event-bus'

import aoiGql from '@/gql/aois'
import projectGql from '@/gql/projects'
import learningGql from '../gql/learning'

let curRect={}

export default {
    props:{
        modal:Boolean,
        project:Object,
        aoi:Object,
    },

    data(){
        return{
            step:0, 

            test:false,
            /**
             *  step = AOI 기준
             *  0 : 보드 삽입 기다림
             *  1 : 이미지 촬영 기다림
             * 
             */

            multiLine: true,
            snackbar: true,
            text: `보드 사진에 검수 부품을 드래그 해주세요`,

            
            drawingHeaders: [
                { text: '순서', value: 'order' },
                { text: '넓이', value: 'width' },
                { text: '높이', value: 'height' },
                { text: '액션', value: 'actions' },
            ],

            selectedRect: -1,
            orederRect: 0,

            teachingResult:false,

            captureImage:null,

            saved:false,
        
            mode:0 , //0 이면 good , 1 이면 missing

            stageSize: {
                width: 1280,
                height: 720,
            },

            isDrawing: false, //드로잉 시작 

            drawingRect: [],

            drwingColor: '#2196F3', // 선 색
            thickness: 3, //선 굵기
            
        }
    },

    methods:{
        dataInit(){
            this.teachingResult =false
            this.captureImage = null
            this.saved = false
            this.mode = 0
            this.isDrawing = false
            this.drawingRect = []
            this.drwingColor ='#2196F3' // 선 색
            this.thickness = 3 //선 굵기
            this.step = 0
        },

        modeChange(){
            this.captureImage = null
            this.teachingResult = false
            this.mode = 1
            this.step = 0
        },

        imageInit(){
            this.step = 0
            this.captureImage = null
            // this.drawingRect = []
        },

        reteaching(){
            this.$store.state.neuro.wpoClient.wpoClient.call('teaching:clean',`{"project_num":${this.project.uid} ,"type":${this.mode}}`,1000)
            this.teachingResult = false
            this.saved = false
        },

        async imageCapture(){
            const boardOn =  await this.$store.state.neuro.wpoClient.wpoClient.call('teaching:state','{}',500000)

            console.log("boardOn :", boardOn)

            if(boardOn === 'success'){
                this.step = 1
                await this.$store.state.neuro.wpoClient.wpoClient.call('teaching:capture','{}',500000)
                    .then((boardCapture) => {
                        this.step = 2
                        console.log('받아온 응답',boardCapture)
                        let capture = JSON.parse(boardCapture)
                        let image = new Image();
                        image.src = 'data:image/jpeg;base64,'+capture.content
                        image.onload = () => { this.captureImage = image};
                        console.log(capture.content)
                    })
                    .catch((error) => { EventBus.$emit('openAlert',error.message , 'error') })
            }else{
                this.close()
            }
        },

        async teaching(){
            EventBus.$emit('openLoading','Teaching...')

            let teachingInfo = ''
            let x1 = 0 , x2 = 0 , y1 = 0 ,y2 = 0 

            this.drawingRect.forEach((rect) => {
                rect.startX > rect.lastX ? ( x1 = rect.lastX , x2 = rect.startX ) : ( x1 = rect.startX , x2 = rect.lastX )
                rect.startY > rect.lastY ? ( y1 = rect.lastY , y2 = rect.startY ) : ( y1 = rect.startY , y2 = rect.lastY )

                let info = `(${Math.ceil(x1 * 1.5)},${Math.ceil(y1 * 1.5)},${Math.ceil(x2 * 1.5)},${Math.ceil( y2 * 1.5) })`
                teachingInfo= teachingInfo + "-" + info 
            })

            let msg = `{"teaching": "/home/falinux/image/teaching.jpg-${this.project.uid}-${this.mode}-(1920x1080)${teachingInfo}"}`
            
            await this.$store.state.neuro.wpoClient.wpoClient.call('teaching:info',msg,10000)
                .then((response) => {
                    let result = JSON.parse(response)
                    this.drawingRect.forEach((rect ,index) =>{
                        this.mode === 0 ? ( rect.goodPath = result.path[index] , rect.goodImage = result.content[index] ) : ( rect.missingPath = result.path[index] , rect.missingImage = result.content[index])                    
                    })
                    
                    this.isDrawing = false
                    this.teachingResult = true

                    EventBus.$emit('imageModalOpen', this.drawingRect , this.mode)

                    if(this.mode === 1) this.saved = true 

                })
                .catch((error) => { EventBus.$emit('openAlert',error.message , 'error') })
                .finally(() => { EventBus.$emit('closeLoading')})
        },


        handleMouseDown() {
            if (this.captureImage === null || this.mode === 1) return;
            this.isDrawing = true;
            const pos = this.$refs.stage.getNode().getPointerPosition();
            
            this.setRecs(
                [
                    ...this.drawingRect,
                    {order: ++this.orederRect , startX: Math.round(pos.x), startY: Math.round(pos.y), width: 0, height: 0 ,},
                ]
            );
        },

        handleMouseMove() {
            if (!this.isDrawing) return;
            const point = this.$refs.stage.getNode().getPointerPosition();
            curRect = this.drawingRect[this.drawingRect.length - 1];
            curRect.lastX = Math.round(point.x)
            curRect.lastY = Math.round(point.y)
            curRect.width = Math.round(curRect.lastX - curRect.startX);
            curRect.height =Math.round(curRect.lastY - curRect.startY);
            curRect.stroke = this.drwingColor
            curRect.dash = [8,8]
            curRect.thickness = this.thickness
        },

        handleMouseUp() {
            this.isDrawing = false;
            this.drawingRect[this.drawingRect.length - 1].dash = 0
            this.setRecs([
                ...this.drawingRect,
            ]);
        },

        handleMouseLeave() {
            if(this.isDrawing){
                this.isDrawing = false;
                this.drawingRect.splice(this.drawingRect.length - 1,1)
            }else{
                return
            }
        },

        setRecs(element) {
            this.drawingRect = element;
        },

        selectRect(item){
            this.selectedRect = item.order
            this.drawingRect.filter((rect) => { rect.order === item.order ? rect.fill = rect.stroke +"4D" : rect.fill = null})
            this.setRecs([ ...this.drawingRect])
        },

        removeRect(order){
            this.drawingRect.forEach((rect ,index )=> { if(rect.order === order) this.drawingRect.splice(index,1)});
        },



        async save(){
            await this.drawingRect.forEach(rect => { 
                learningGql.create( this.project.uid ,rect)
                rect.projectUid = this.project.uid
            })
            
            this.aoi.projectUid = this.project.uid
            this.aoi.state = true

            await aoiGql.update(this.aoi)

            this.project.aoiUid = this.aoi.uid
            this.project.state = true

            await projectGql.update(this.project)

            this.close()
        },

        close(){
            EventBus.$emit('teachingModalClose')
        }
    },
    watch:{
        modal(c){
            if(c === true) this.dataInit()
            if(c === true && this.captureImage  === null ) this.imageCapture()
            
        },

        captureImage(c){
            if (c === null )this.imageCapture()
        }
    }
}
</script>

<style>
.dashboard{
    height: 100vh;
}

.drawContainer {
    cursor: crosshair;
}  

/* .flicker-1 {
	animation: flicker-1 2s linear 1s infinite both;
} */

/* @-webkit-keyframes flicker-1{0%,100%{opacity:1}41.99%{opacity:1}42%{opacity:0}43%{opacity:0}43.01%{opacity:1}47.99%{opacity:1}48%{opacity:0}49%{opacity:0}49.01%{opacity:1}}@keyframes flicker-1{0%,100%{opacity:1}41.99%{opacity:1}42%{opacity:0}43%{opacity:0}43.01%{opacity:1}47.99%{opacity:1}48%{opacity:0}49%{opacity:0}49.01%{opacity:1}} */

</style>
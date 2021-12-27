<template>
    <div  class="test" >
        <v-app-bar
            color="gray"
            flat
            
        >        
        <v-toolbar-title><v-img src="../../public/falinux.png"></v-img>  </v-toolbar-title>
        <template v-slot:extension>
            <v-tabs
                v-model="selectMenu"
                centered
                class="ml-n9"
                :color="tabColor"
            >
                <v-tab>AOI 장비</v-tab>
                <v-tab :disabled="aoiLength === 0 ? true : false  ">프로젝트</v-tab>
                <v-tab >시뮬레이션</v-tab>
            </v-tabs>
        </template>
        </v-app-bar>    
        <Aoi v-if="selectMenu === 0" />
        <Project v-if="selectMenu === 1" />
        <Simulation v-if="selectMenu === 2"/>
        <Snackbar
            :open="snackbarOpen"
            :message="message"
            :color="color"
        />
    </div>
</template>

<script>
import Aoi from '@/views/Aoi.vue'
import Project from '@/views/Project.vue'
import Snackbar from '@/components/Snackbar.vue'
import Simulation from '@/views/Simulation.vue'

import { EventBus } from '@/event-bus'

import { mapActions } from 'vuex'

export default {
    data: () => ({
        selectMenu:0,

        snackbarOpen:false,
        message:'',
        color:'',
        tabColor:'teal'
    }), 

    components:{
        Aoi,
        Project,
        Snackbar,
        Simulation
    },

    async created(){
        await this.getAois()
        await this.getProjects()

        EventBus.$on('openSnackbar',( massage , color) => { 
            EventBus.$emit("closeSnackbar");

            this.snackbarOpen = true 
            this.message = massage
            this.color = color
        }),

        EventBus.$on('closeSnackbar',() => { this.snackbarOpen = false })

    },

    computed: {
        aoiLength() {
            return this.$store.state.aoi.aois.length
        }
    },

    methods: {
        ...mapActions([
            'getProjects',
            'getAois',
        ]),

        projectAddModalOpen(){
            EventBus.$emit('openProjectAddModal')
        }
    },

    watch:{
        selectMenu(current){
            switch (current){
                case 0 :
                    this.tabColor = 'teal'
                    break;
                case 1 :
                    this.tabColor = 'indigo'
                    break;
                case 2 :
                    this.tabColor = 'grey'
                    break        
            }
        }
    },

    beforeDestroy(){
        EventBus.$off('openSnackbar');
        EventBus.$off('closeSnackbar');
    },

}

</script>

<style scoped>
.test{
  height: 100vh;
}

</style>
<template>
  <v-app>
    <v-main>
      <Loading 
        :open="loadingModal"
        :message="message"
      />

      <Alert
        :open="alertModal"
        :message="message"
        :type="type"
      />

      <Confirm
        :title="confirmTitle"
        :open="confirmOpen"
        :message="confirmMessage"
        :type="confirmType"
      />

      <Connection 
        :open="connectionModal"
        :message="message"
      />

      <TeachingModal
        :modal="teachingModal"
        :project="teachingProject"
        :aoi="teachingAoi"
      />
      
      <ImageModal
        :modal="imageModal"
        :info="imageInfo"
        :mode="teachingMode"
      />

      <ProjectAddModal
        :modal="projectAddModal"
      />

      <ProjectSelectModal
        :modal="projectSelectModal"
        :project="projectSelect"
        :learning="learningSelect"
      />

      <AoiAddModal
        :modal="aoiAddModal"
      />

      <AoiSelectModal
        :modal="aoiSelectModal"
        :aoi="aoiSelect"
      />

      <keep-alive include="">
        <router-view/>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>

import ProjectAddModal from '@/modal/project/AddModal.vue'
import ProjectSelectModal from '@/modal/project/SelectModal.vue'
import AoiAddModal from '@/modal/aoi/AddModal.vue'
import AoiSelectModal from '@/modal/aoi/SelectModal.vue'

import Connection from './modal/ConnectModal.vue'
import Alert from './components/Alert.vue'
import Confirm from './components/Confirm.vue'
import Loading from './components/Loading.vue'
import TeachingModal from './modal/TeachingModal'
import ImageModal from './modal/ImageModal'

import aoiGql from '@/gql/aois'
import projectGql from '@/gql/projects'


import { EventBus } from '@/event-bus'

export default {
  name: 'App',

  components:{
    Alert,
    Confirm,
    Loading,
    Connection,

    TeachingModal,
    ImageModal,
    ProjectAddModal,
    ProjectSelectModal,
    AoiAddModal,
    AoiSelectModal,
  },

  data(){
    return {

      message:'',
      type:'',

      
      confirmTitle:'',
      confirmOpen: false ,
      confirmMessage:'',
      confirmType:'',

      teachingModal:false,
      teachingProject:{},
      teachingAoi:{},

      imageModal:false,
      imageInfo:[],
      teachingMode:0,
      
      loadingModal:false,

      alertModal: false ,

      projectAddModal:false,
      projectSelectModal:false,
      projectSelect:{},
      learningSelect:[],

      aoiAddModal:false,
      aoiSelectModal:false,
      aoiSelect:{},

      connectionModal:false,
      
    }
  },

  created () {

    EventBus.$on('openConnection',( massage ) => { 
      this.connectionModal = true 
      this.message = massage
    }),

    EventBus.$on('closeConnection',() => { this.connectionModal = false }),

    EventBus.$on('openLoading',( massage ) => { 
      this.loadingModal = true 
      this.message = massage
    }),

    EventBus.$on('closeLoading',() => { this.loadingModal = false }),

    EventBus.$on('openAlert',( massage , type) => { 
      this.alertModal = true 
      this.message = massage
      this.type = type
    }),

    EventBus.$on('closeAlert',() => { this.alertModal = false }),

    EventBus.$on('openProjectAddModal',() => { this.projectAddModal = true })

    EventBus.$on('closeProjectAddModal',() => { this.projectAddModal = false })

    EventBus.$on('openProjectSelectModal',(project ,learning ) => { 
      this.projectSelectModal = true 
      this.projectSelect = project
      this.learningSelect = learning

    })
    EventBus.$on('closeProjectSelectModal',() => { 
      this.projectSelectModal = false 
    })

    EventBus.$on('openAoiAddModal',() => { this.aoiAddModal = true })

    EventBus.$on('closeAoiAddModal',() => { this.aoiAddModal = false })

    EventBus.$on('openAoiSelectModal',(aoi) => { 
      this.aoiSelectModal = true 
      this.aoiSelect = aoi
    })
    EventBus.$on('closeAoiSelectModal',() => { 
      this.aoiSelectModal = false 
    }),


    EventBus.$on('openConfirm',( title, massage , type ,info) => { 
      this.confirmOpen = true, 
      this.confirmTitle = title,
      this.confirmMessage = massage,
      this.confirmType = type
    }),

    EventBus.$on('closeConfirm',() => { this.confirmOpen = false })

    EventBus.$on('aoiModalOpen',(type,uid,info) => { 
      this.aoiModal=true
      this.aoiType=type
      this.aoiUid=uid
      this.aoiInfo=info
    });

    EventBus.$on('aoiModalClose',() => { this.aoiModal = false });

    EventBus.$on('teachingModalOpen',(aoi ,project) => { 
      this.teachingModal = true
      this.teachingProject = project
      this.teachingAoi = aoi 
    });

    EventBus.$on('teachingModalClose',() => { this.teachingModal = false });

    EventBus.$on('imageModalOpen',(info,mode) => { 
      this.imageModal = true
      this.imageInfo = info
      this.teachingMode = mode
    });

    EventBus.$on('imageModalClose',() => { this.imageModal = false });

    aoiGql.createSubscript()
    aoiGql.updateSubscript()
    aoiGql.deleteSubscript()

    projectGql.createSubscript()
    projectGql.updateSubscript()
    projectGql.deleteSubscript()

  },

  beforeDestroy(){
    EventBus.$off('openConfirm');
    EventBus.$off('closeConfirm');
    EventBus.$off('aoiModalOpen');
    EventBus.$off('aoiModalClose');
    EventBus.$off('teachingModalOpen');
    EventBus.$off('teachingModalClose');
    EventBus.$off('imageModalOpen');
    EventBus.$off('imageModalClose');

    EventBus.$off('openLoading');
    EventBus.$off('closeLoading');
    EventBus.$off('openAlert');
    EventBus.$off('closeAlert');
    EventBus.$off('openProjectAddModal');
    EventBus.$off('closeProjectAddModal');
    EventBus.$off('openProjectSelectModal');
    EventBus.$off('closeProjectSelectModal');

    EventBus.$off('openAoiAddModal');
    EventBus.$off('closeAoiAddModal');
    EventBus.$off('openAoiSelectModal');
    EventBus.$off('closeAoiSelectModal');
  },
}
</script>

<style>
  html::-webkit-scrollbar { display: none; }


body{
    margin: 0;
}

</style>

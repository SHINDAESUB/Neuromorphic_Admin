import aoiGQL from '@/gql/aois'
import { EventBus } from '@/event-bus'

const state = {
    aois: [],
}

const getters = {
    'aois': state => state.aois,
    'aoiUid': state => state.aoiUid 
}

const actions = {
    async getAois({commit}){
        let result = await aoiGQL.aois()        
        commit('GETAOIS' , result)
    },

    async createAoi({commit} , response){
        commit('CREATEPAOI' , response)
    },

    async updateAoi({commit} , response){
        commit('UPDATEAOI' , response)
    },

    async deleteAoi({commit} , response){
        commit('DELETEAOI' , response)
    }
}

const mutations = {
    GETAOIS(state,payload ){
        state.aois = payload
        EventBus.$emit('aoiUpdate')
    },
    
    CREATEPAOI(state,payload ){
        state.aois.push(payload)
    },

    UPDATEAOI(state,payload){
        let updateIndex =state.aois.findIndex( aoi => aoi.uid === payload.uid )
        state.aois.splice(updateIndex , 1 ,payload)
    },

    DELETEAOI(state,payload ){
        let removeIndex = state.aois.findIndex( aoi => aoi.uid === payload )
        state.aois.splice(removeIndex , 1 )
    }  
}

export default {
    state: {
        ...state
    },
    getters,
    mutations,
    actions
}
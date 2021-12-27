import projectGql from '@/gql/projects'

const state = {
    projects: [],
}

const getters = {
    'preparation':state => { return state.projects.filter(project => !project.result )},
    'success':state => { return state.projects.filter(project => project.result) }
}

const actions = {
    async getProjects({commit}){

        let result = await projectGql.projects()
        
        commit('GETPROEJCTS' , result)
    },

    async createProject({commit} , response){
        commit('CREATEPROEJCT' , response)
    },

    async updateProject({commit} , response){        
        commit('UPDATEPROEJCT' , response)
    },

    async deleteProject({commit} , response){
        commit('DELETEPROEJCT' , response)
    }
}

const mutations = {
    GETPROEJCTS(state,payload ){
        state.projects = payload
    },    

    CREATEPROEJCT(state,payload ){
        state.projects.push(payload)
    },    

    UPDATEPROEJCT(state,payload){
        let updateIndex =state.projects.findIndex( project => project.uid === payload.uid )
        state.projects.splice(updateIndex , 1 ,payload)
    },

    DELETEPROEJCT(state,payload ){
        let removeIndex = state.projects.findIndex( project => project.uid === payload )
        state.projects.splice(removeIndex , 1 )
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
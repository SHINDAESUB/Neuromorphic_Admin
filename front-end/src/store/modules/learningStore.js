import learningGQL from '../../gql/learning'

const state = {
    learning: [],
}

const getters = {}

const actions = {
    async getLearning({commit}){

        let result = await learningGQL.getLearning()
        
        commit('GETLEARNING' , result)
    },

    async addLearning({commit} , input){

        commit('ADDLEARNING' , input)
    },

    async deleteLearning({commit} , uid){

        let result = await learningGQL.deleteLearning(uid)

        commit('DELETELEARNING' , result)
    }
}

const mutations = {
    GETLEARNING(state,payload ){
        state.learning = payload
    },    


    ADDLEARNING(state,payload ){
        state.learning.push(payload)
    },    

    DELETELEARNING(state,payload ){
        state.learning.forEach(( learn ,index) => {
            if(learn.projectUid === payload){
                state.learning.splice(index , 1 )
            }
        });
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
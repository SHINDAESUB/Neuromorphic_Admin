import gql from 'graphql-tag' // eslint-disable-line no-unused-vars
import apolloProvider from '@/plugins/apollo'
import store from '@/store'
import { EventBus } from '@/event-bus'

export default {
    async projects(){
        try{
            const response = await apolloProvider.defaultClient.query({
                query: gql`
                    {
                        nProjects{
                            uid
                            name
                            user
                            admin
                            createDate
                            successDate
                            updateDate
                            counter
                            aoiUid
                            state
                            success
                            fail 
                            total
                            result
                        }
                    }
                `,
                fetchPolicy: 'no-cache'
            })

        let projects = response.data.nProjects

        if (!projects) return ''

        if (projects.errors)  throw new Error(projects.errors[0])
        
        return projects

        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    async create(input){
        let uid = await this.projectUid()
        try{
            const response = await apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation createNproject( $name: String! ,$admin: String! ,$user: String! ,$createDate: String! ,$successDate: String! , $counter:Int ,$uid:Int! ,$updateDate:String ){
                        createNproject(input:{
                            name:$name
                            admin:$admin
                            user:$user
                            createDate:$createDate
                            successDate:$successDate
                            counter:$counter
                            aoiUid:0
                            uid:$uid
                            updateDate:$updateDate
                        })
                        {
                            nProject{
                                name
                                admin
                                user
                                createDate
                                successDate
                                counter
                                aoiUid
                                uid
                                state
                                updateDate
                                result
                            }
                        }
                    }
                `,
                variables: {
                    name: input.name,
                    admin: input.admin,
                    user: input.user,
                    createDate: input.createDate,
                    successDate: input.successDate,
                    counter: input.counter,
                    uid:uid ,
                    updateDate: new Date()
                }
            })

        let project = response.data.createNproject.nProject
        
        if (!project) return ''

        if (project.errors){
            throw new Error(project.errors[0])
        }
        
        this.updateNprojectUid(uid)
        
        return project

        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    async update(input){

        try{
            const response = await apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation updateNproject( $name: String! ,$admin: String! ,$user: String! ,$createDate: String! ,$successDate: String! , $counter:Int , $aoiUid:Int! ,$uid:Int!,$state:Boolean!, $updateDate:String){
                        updateNproject(input:{
                            name:$name
                            admin:$admin
                            user:$user
                            createDate:$createDate
                            successDate:$successDate
                            counter:$counter
                            aoiUid:$aoiUid
                            uid:$uid
                            state:$state
                            updateDate:$updateDate
                        })
                        {
                            nProject{
                                name
                                admin
                                user
                                createDate
                                successDate
                                counter
                                aoiUid
                                uid
                                state
                                updateDate
                            }
                        }
                    }
                `,
                variables: {
                    name: input.name,
                    admin: input.admin,
                    user: input.user,
                    createDate: input.createDate,
                    successDate: input.successDate,
                    counter: input.counter,
                    aoiUid: input.aoiUid,
                    uid: input.uid,
                    state: input.state,
                    updateDate: new Date()
                }
            })

        let project = response.data.updateNproject.nProject

        if (!project) return ''

        if (project.errors){
            throw new Error(project.errors[0])
        } 
        
        return project

        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    async updateUid(projectUid , aoiUid){
        try{
            const response = await apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation updateNproject( $aoiUid:Int! ,$uid:Int! ){
                        updateNproject(input:{
                            aoiUid:$aoiUid
                            uid:$uid
                        })
                        {
                            nProject{
                                name
                                admin
                                user
                                createDate
                                successDate
                                counter
                                aoiUid
                                uid
                                state
                            }
                        }
                    }
                `,
                variables: {
                    aoiUid: aoiUid,
                    uid: projectUid,
                }
            })

        let project = response.data.updateNproject.nProject

        if (!project) return ''

        if (project.errors){
            throw new Error(project.errors[0])
        } 
        
        return project

        }catch (e) { 
            console.log(e)
            throw e 
        }
    },


    async delete(projectUid){
        try{
            const response = await apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation deleteNproject($uid:Int!){
                        deleteNproject(uid:$uid)
                        {
                            nProject{
                                uid
                            }
                        }
                    }
                `,
                variables: {
                    uid: projectUid
                }
            })

        let project = response.data.deleteNproject.nProject
        if (!project) return ''

        if (project.errors){
            throw new Error(project.errors[0])
        } 
        
        return project

        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    async projectUid(){
        try{
            const response = await apolloProvider.defaultClient.mutate({
                mutation: gql`
                    {
                        nProjectUid{
                            uid
                        }
                    }
                `,
                fetchPolicy: 'no-cache'
            })

        let uid = response.data.nProjectUid[0].uid

        return uid

        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    updateNprojectUid(uid){
        apolloProvider.defaultClient.mutate({
            mutation: gql`
                mutation updateNprojectUid( $uid: Int!){
                    updateNprojectUid(input:{
                        uid:$uid
                    })
                    {
                        nProjectUid{
                            uid
                        }
                    }
                }
            `,
            variables: {
                uid: uid
            }
        })
    },


    async createSubscript() {
        try {
            this.subscription = await apolloProvider.defaultClient.subscribe({
              query: gql`
                subscription createProject{
                    createProject{
                        nProject{
                            name
                            admin
                            user
                            createDate
                            successDate
                            counter
                            aoiUid
                            uid
                            state
                            updateDate
                        }
                    }
                }
              `
            }).subscribe(response => {
                store.dispatch('createProject', response.data.createProject.nProject )
                EventBus.$emit('openSnackbar',`프로젝트 "${response.data.createProject.nProject.name}" 생성 되었습니다. ` , 'indigo')
            })
          } catch (e) { 
            throw e 
          }
    },

    async updateSubscript() {
        try {
            this.subscription = await apolloProvider.defaultClient.subscribe({
              query: gql`
                subscription updateProject{
                    updateProject{
                        nProject{
                            name
                            admin
                            user
                            createDate
                            successDate
                            counter
                            aoiUid
                            uid
                            state
                            updateDate
                            result
                            success
                            fail 
                            total
                        }
                    }
                }
              `
            }).subscribe(response => {
                store.dispatch('updateProject' ,response.data.updateProject.nProject) 
                EventBus.$emit('openSnackbar',`프로젝트 "${response.data.updateProject.nProject.name}" 수정 되었습니다. ` , 'indigo')

            })
          } catch (e) { 
            throw e 
          }
      },
  
    async deleteSubscript() {
        try {
            this.subscription = await apolloProvider.defaultClient.subscribe({
                query: gql`
                    subscription deleteProject{
                        deleteProject{
                            nProject{
                                uid
                            }
                        }
                    }
                `
            }).subscribe(response => {
                store.dispatch('deleteProject' ,response.data.deleteProject.nProject.uid) 
                EventBus.$emit('openSnackbar',`프로젝트 "${response.data.deleteProject.nProject.name}" 삭제 되었습니다. ` , 'indigo')

            })
        }catch (e) { 
            throw e 
        }
    }

}
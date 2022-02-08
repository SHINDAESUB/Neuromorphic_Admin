import gql from 'graphql-tag' // eslint-disable-line no-unused-vars
import apolloProvider from '@/plugins/apollo'
import store from '@/store'
import { EventBus } from '@/event-bus'

export default {
    async aois(){
        try{
            const response = await apolloProvider.defaultClient.query({
                query: gql`
                    {
                        aois{
                            uid                  
                            name                
                            state                
                            serial               
                            etc                  
                            projectUid
                            createDate            
                            updateDate  
                        }
                    }
                `,
                fetchPolicy: 'no-cache'
            })

            let aois = response.data.aois

            if (!aois) return ''

            if (aois.errors)  throw new Error(aois.errors[0])
            
            return aois

        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    async create(input ){

        let uid = await this.getAoiUid()

        try{
            const response = await apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation createAoi( $name: String! ,$state: Boolean! ,$createDate: String! , $serial:String! , $etc:String! ,$updateDate:String! ,$uid:Int! ,$projectUid:Int){
                        createAoi(input:{
                            name:$name
                            state:$state
                            createDate:$createDate
                            serial:$serial
                            etc:$etc
                            updateDate:$updateDate
                            uid:$uid
                            projectUid:$projectUid
                        })
                        {
                            aoi{
                                uid                  
                                name                
                                state                
                                serial               
                                etc       
                                projectUid           
                                createDate            
                                updateDate           
                            }
                        }
                    }
                `,
                variables: {
                    uid:uid,              
                    name:input.name,            
                    state:false,                
                    serial:input.serial,               
                    etc:input.etc,        
                    projectUid:0,           
                    createDate:input.createDate,                  
                    updateDate:new Date()            
                }
            })


        
        let aoi = response.data.createAoi.aoi

        if (!aoi) return ''

        if (aoi.errors){
            throw new Error(aoi.errors[0])
        } 
        
        this.updateAoiUid(uid)



        return aoi

        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    updateAoiUid(uid){
        apolloProvider.defaultClient.mutate({
            mutation: gql`
                mutation updateAoiUid( $uid: Int!){
                    updateAoiUid(input:{
                        uid:$uid
                    })
                    {
                        aoiUid{
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

    async update(input ){
        try{
            const response = await apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation updateAoi( $name: String! ,$state: Boolean! ,$createDate: String! , $serial:String! , $etc:String! ,$updateDate:String! ,$uid:Int! , $projectUid:Int ){
                        updateAoi(input:{
                            name:$name
                            state:$state
                            createDate:$createDate
                            serial:$serial
                            etc:$etc
                            updateDate:$updateDate
                            projectUid:$projectUid
                            uid:$uid
                        })
                        {
                            aoi{
                                uid                  
                                name                
                                state                
                                serial               
                                etc                  
                                createDate            
                                updateDate
                                projectUid
                            }
                        }
                    }
                `,
                variables: {
                    uid:input.uid,              
                    name:input.name,            
                    state:input.state,                
                    serial:input.serial,               
                    etc:input.etc,                   
                    createDate:input.createDate,                  
                    updateDate:new Date(),    
                    projectUid:input.projectUid
                }
            })

        let aoi = response.data.updateAoi.aoi

        if (!aoi) return ''

        if (aoi.errors){
            throw new Error(aoi.errors[0])
        } 
        
        return aoi

        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    async delete(aoiUid){
        try{
            const response = await apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation deleteAoi($uid:Int!){
                        deleteAoi(uid:$uid)
                        {
                            aoi{
                                uid
                            }
                        }
                    }
                `,
                variables: {
                    uid: aoiUid
                }
            })

        let deleteUid = response.data.deleteAoi.aoi.uid
        if (!deleteUid) return ''

        if (deleteUid.errors){
            throw new Error(deleteUid.errors[0])
        } 
        
        return deleteUid

        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    async getAoiUid(){
        try{
            const response = await apolloProvider.defaultClient.query({
                query: gql`
                    {
                        aoiUid{
                            uid
                        }
                    }
                `,
                fetchPolicy: 'no-cache'
            })
        let uid = response.data.aoiUid[0].uid

        return uid

        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    async createSubscript() {
        try {
            this.subscription = await apolloProvider.defaultClient.subscribe({
              query: gql`
                subscription createAoi{
                  createAoi{
                    aoi{
                          uid,
                          projectUid,
                          name,
                          state,
                          serial,
                          etc,
                          createDate,
                          updateDate,
                    }
                  }
                }
              `
            }).subscribe(response => {
                store.dispatch('createAoi' ,response.data.createAoi.aoi) 
                EventBus.$emit('openSnackbar',`AOI 장비 "${response.data.createAoi.aoi.name}" 생성되었습니다. ` , 'teal')

            })
          } catch (e) { 
            throw e 
          }
    },

    async updateSubscript() {
        try {
            this.subscription = await apolloProvider.defaultClient.subscribe({
              query: gql`
                subscription updateAoi{
                  updateAoi{
                    aoi{
                          uid,
                          projectUid,
                          name,
                          state,
                          serial,
                          etc,
                          createDate,
                          updateDate,
                    }
                  }
                }
              `
            }).subscribe(response => {
                store.dispatch('updateAoi' ,response.data.updateAoi.aoi) 
                EventBus.$emit('openSnackbar',`AOI 장비 "${response.data.updateAoi.aoi.name}" 수정 되었습니다. ` , 'teal')
            })
          } catch (e) { 
            throw e 
          }
      },
  
    async deleteSubscript() {
        try {
            this.subscription = await apolloProvider.defaultClient.subscribe({
                query: gql`
                subscription deleteAoi{
                    deleteAoi{
                        aoi{
                                uid,
                                projectUid,
                                name,
                                state,
                                serial,
                                etc,
                                createDate,
                                updateDate,
                        }
                    }
                }
                `
            }).subscribe(response => {
                store.dispatch('deleteAoi' ,response.data.deleteAoi.aoi.uid) 
                EventBus.$emit('openSnackbar',`AOI 장비 "${response.data.deleteAoi.aoi.name}" 삭제 되었습니다. ` , 'teal')
            })
        }catch (e) { 
            throw e 
        }
    }
}
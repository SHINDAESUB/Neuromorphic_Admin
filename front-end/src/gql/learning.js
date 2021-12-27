import gql from 'graphql-tag' // eslint-disable-line no-unused-vars
import apolloProvider from '@/plugins/apollo'

export default {
    async get(projectUid){
        try{
            const response = await apolloProvider.defaultClient.query({
                query: gql`
                    query learning($projectUid: Int!) {
                        learning(projectUid: $projectUid) {
                            projectUid
                            order
                            type 
                            startX
                            startY 
                            lastX
                            lastY
                            width
                            height
                            goodImage
                            missingImage
                            goodPath
                            missingPath
                        
                    }
                }`,


                fetchPolicy: 'no-cache',
                variables: { projectUid: projectUid }
            })
            let infos = response.data.learning

            if (!infos) return ''

            if (infos.errors)  throw new Error(infos.errors[0])
            
            return infos

        }catch (e) { 
            console.log(e)
            throw e 
        }
    },


    async create(projectUid ,input){
        try{
            const response = await apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation createLearning($projectUid: Int! ,$order: Int! ,$startX: Int! ,$startY: Int! , $lastX:Int! ,$lastY:Int! ,$width:Int! , $height:Int! ,$stroke:String! ,$thickness:Int! ,$goodImage:String!, $missingImage:String! ,$goodPath:String!,$missingPath:String!  ){
                        createLearning(input:{
                                projectUid:$projectUid
                                order:$order
                                startX:$startX
                                startY:$startY
                                lastX:$lastX
                                lastY:$lastY
                                width:$width
                                height:$height
                                stroke:$stroke                             
                                thickness:$thickness                                 
                                goodImage:$goodImage                                 
                                missingImage:$missingImage 
                                goodPath:$goodPath                                 
                                missingPath:$missingPath 
                        })
                        {
                            learning{
                                projectUid
                                order
                                startX
                                startY
                                lastX
                                lastY
                                width
                                height
                                stroke                             
                                thickness
                                goodImage
                                missingImage
                                goodPath
                                missingPath
                            }
                        }
                    }
                `,
                variables: {
                    projectUid:projectUid,
                    order:input.order,
                    startX:input.startX,
                    startY:input.startY,
                    lastX:input.lastX,
                    lastY:input.lastY,
                    width:input.width,
                    height:input.height,
                    stroke:input.stroke,                             
                    thickness:input.thickness,
                    goodImage:input.goodImage,
                    missingImage:input.missingImage,
                    goodPath:input.goodPath,
                    missingPath:input.missingPath
                }
            })

        let info = response.data.createLearning

        if (!info) return ''

        if (info.errors){
            throw new Error(info.errors[0])
        } 
        
        return info

        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    async delete(projectUid){
        try{
            const response = await apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation deleteLearning($projectUid:Int!){
                        deleteLearning(projectUid:$projectUid)
                        {
                            learning{
                                projectUid
                            }
                        }
                    }
                `,
                variables: {
                    projectUid: projectUid
                }
            })
        }catch (e) { 
            console.log(e)
            throw e 
        }
    }
}
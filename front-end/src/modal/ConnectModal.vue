<template>
    <v-overlay v-if="open" :z-index="20">
        <v-card :loading="loading" width="400" max-width="400" color="blue-grey lighten-5" light  class="d-flex flex-column">
            <template slot="progress">
                <v-progress-linear
                    color="indigo"
                    height="10"
                    indeterminate
                ></v-progress-linear>
            </template>
            <v-text-field
                class="mx-3"
                label="S/N"
                readonly
                v-model="message"
                hint="AOI 장비와 연결 중 입니다."
                persistent-hint
            ></v-text-field>
        </v-card>
    </v-overlay>    
</template>

<script>

export default {
    props:{
        open:Boolean, 
        message:String,
    },
    data(){
        return{
            loading:true
        }
    },

    methods:{

    },

    
    watch:{

    }
}
</script>

<style>

</style>
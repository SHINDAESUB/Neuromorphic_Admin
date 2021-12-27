<template>
    <v-card
    class="elevation-2 rounded-xl"
    height="450"
    dark    
>
    <v-card-text>
    <div class=" display-1 white--text font-weight-medium mt-5 ml-6">ex</div>
    <div class=" subtitle-2  font-weight-medium mt-2 ml-6"></div>
    <BarChart
        class="px-2"
        :chart-data="colorColl"
        :height="320"
    />
    </v-card-text>

</v-card>
</template>

<script>
import BarChart from '@/components/BarChart.vue'

export default {
  components: {
    BarChart,
  },

  created() {
      this.jobHistory()
  },

  methods:{
    async jobHistory(){
      try {
        // let result = await slurm.jobHistory(type)

        console.log("결과값", this.result['Algorithm'][0]['color'])

        let result = []

        let topResult = result.filter((order , index) => { return index < 18 })
        let barLabel = topResult.map(result => { return result.id})
        let barData = topResult.map(result => { return result.second})

        let color = this.result['Algorithm'][0]['color']
        let corner = this.result['Algorithm'][0]['corner']

        let test = color.filter((order , index) => { return index < 24 })


        let colorData = test.map(data => { return Number(data['accuracy'])})
        let colorLabel = test.map(data => { return data['part_id']})

        let cornerData = corner.map(data => { return Number(data['accuracy'])})
        let cornerLabel = corner.map(data => { return data['part_id']})


        console.log('colorData :' ,colorData)
        console.log('colorLabel :' ,colorLabel)

        console.log('cornerData :' ,cornerData)
        console.log('cornerLabel :' ,cornerLabel)

        this.colorColl = {
        //   labels: [colorLabel,cornerLabel] ,
          labels: colorLabel,

          datasets:[
            {
              label: 'COLOR',
              backgroundColor: '#66cdff',   
              data: colorData
            },
            {
              label: 'CORNER',
              backgroundColor: '#ffff66',   
              data: cornerData
            }

        ]}
      } catch (e) {
        console.error(e)
      }
    },
  },

  data () {
    return {
      colorColl:{},
      result:{
    "Best": [
        {
            "best algorithm": "color",
            "best case": "case1) neurons/vectors = '512 / 32'"
        }
    ],
    "Objective": "Component Inspection",
    "Board Name": "157",
    "Algorithm": [
        {
            "corner": [
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "0_part_0",
                    "accuracy": "0"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "4_part_1",
                    "accuracy": "0"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "2_part_1",
                    "accuracy": "0"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "3_part_0",
                    "accuracy": "0"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "2_part_0",
                    "accuracy": "0"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "4_part_0",
                    "accuracy": "0"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "0_part_1",
                    "accuracy": "0"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "1_part_0",
                    "accuracy": "0"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "1_part_1",
                    "accuracy": "0"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "3_part_1",
                    "accuracy": "10"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "5_part_1",
                    "accuracy": "0"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "5_part_0",
                    "accuracy": "0"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "0_part_0",
                    "accuracy": "0"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "4_part_1",
                    "accuracy": "6"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "2_part_1",
                    "accuracy": "6"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "3_part_0",
                    "accuracy": "0"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "2_part_0",
                    "accuracy": "43"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "4_part_0",
                    "accuracy": "0"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "0_part_1",
                    "accuracy": "12"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "1_part_0",
                    "accuracy": "0"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "1_part_1",
                    "accuracy": "5"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "3_part_1",
                    "accuracy": "14"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "5_part_1",
                    "accuracy": "0"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "5_part_0",
                    "accuracy": "0"
                }
            ],
            "color": [
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "0_part_0",
                    "accuracy": "99"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "4_part_1",
                    "accuracy": "96"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "2_part_1",
                    "accuracy": "95"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "3_part_0",
                    "accuracy": "99"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "2_part_0",
                    "accuracy": "97"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "4_part_0",
                    "accuracy": "96"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "0_part_1",
                    "accuracy": "98"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "1_part_0",
                    "accuracy": "99"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "1_part_1",
                    "accuracy": "98"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "3_part_1",
                    "accuracy": "97"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "5_part_1",
                    "accuracy": "95"
                },
                {
                    "vector length": 32,
                    "number of neurons": 512,
                    "part_id": "5_part_0",
                    "accuracy": "97"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "0_part_0",
                    "accuracy": "98"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "4_part_1",
                    "accuracy": "95"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "2_part_1",
                    "accuracy": "93"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "3_part_0",
                    "accuracy": "99"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "2_part_0",
                    "accuracy": "97"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "4_part_0",
                    "accuracy": "96"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "0_part_1",
                    "accuracy": "98"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "1_part_0",
                    "accuracy": "99"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "1_part_1",
                    "accuracy": "98"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "3_part_1",
                    "accuracy": "91"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "5_part_1",
                    "accuracy": "91"
                },
                {
                    "vector length": 64,
                    "number of neurons": 256,
                    "part_id": "5_part_0",
                    "accuracy": "96"
                },
                {
                    "vector length": 128,
                    "number of neurons": 128,
                    "part_id": "0_part_0",
                    "accuracy": "98"
                },
                {
                    "vector length": 128,
                    "number of neurons": 128,
                    "part_id": "4_part_1",
                    "accuracy": "94"
                },
                {
                    "vector length": 128,
                    "number of neurons": 128,
                    "part_id": "2_part_1",
                    "accuracy": "93"
                },
                {
                    "vector length": 128,
                    "number of neurons": 128,
                    "part_id": "3_part_0",
                    "accuracy": "98"
                },
                {
                    "vector length": 128,
                    "number of neurons": 128,
                    "part_id": "2_part_0",
                    "accuracy": "94"
                },
                {
                    "vector length": 128,
                    "number of neurons": 128,
                    "part_id": "4_part_0",
                    "accuracy": "95"
                },
                {
                    "vector length": 128,
                    "number of neurons": 128,
                    "part_id": "0_part_1",
                    "accuracy": "97"
                },
                {
                    "vector length": 128,
                    "number of neurons": 128,
                    "part_id": "1_part_0",
                    "accuracy": "98"
                },
                {
                    "vector length": 128,
                    "number of neurons": 128,
                    "part_id": "1_part_1",
                    "accuracy": "98"
                },
                {
                    "vector length": 128,
                    "number of neurons": 128,
                    "part_id": "3_part_1",
                    "accuracy": "89"
                },
                {
                    "vector length": 128,
                    "number of neurons": 128,
                    "part_id": "5_part_1",
                    "accuracy": "90"
                },
                {
                    "vector length": 128,
                    "number of neurons": 128,
                    "part_id": "5_part_0",
                    "accuracy": "94"
                },
                {
                    "vector length": 256,
                    "number of neurons": 64,
                    "part_id": "0_part_0",
                    "accuracy": "96"
                },
                {
                    "vector length": 256,
                    "number of neurons": 64,
                    "part_id": "4_part_1",
                    "accuracy": "92"
                },
                {
                    "vector length": 256,
                    "number of neurons": 64,
                    "part_id": "2_part_1",
                    "accuracy": "92"
                },
                {
                    "vector length": 256,
                    "number of neurons": 64,
                    "part_id": "3_part_0",
                    "accuracy": "91"
                },
                {
                    "vector length": 256,
                    "number of neurons": 64,
                    "part_id": "2_part_0",
                    "accuracy": "93"
                },
                {
                    "vector length": 256,
                    "number of neurons": 64,
                    "part_id": "4_part_0",
                    "accuracy": "93"
                },
                {
                    "vector length": 256,
                    "number of neurons": 64,
                    "part_id": "0_part_1",
                    "accuracy": "96"
                },
                {
                    "vector length": 256,
                    "number of neurons": 64,
                    "part_id": "1_part_0",
                    "accuracy": "97"
                },
                {
                    "vector length": 256,
                    "number of neurons": 64,
                    "part_id": "1_part_1",
                    "accuracy": "97"
                },
                {
                    "vector length": 256,
                    "number of neurons": 64,
                    "part_id": "3_part_1",
                    "accuracy": "86"
                },
                {
                    "vector length": 256,
                    "number of neurons": 64,
                    "part_id": "5_part_1",
                    "accuracy": "89"
                },
                {
                    "vector length": 256,
                    "number of neurons": 64,
                    "part_id": "5_part_0",
                    "accuracy": "91"
                }
            ]
        }
    ]
},
    }
  },



}
</script>

<style>

</style>
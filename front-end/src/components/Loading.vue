<template>
  <v-overlay 
    class="loading-overlay"
    :z-index="20"
    :value="open">
      <v-progress-circular
          indeterminate
          :size="150"
          :width="7" 
          class="title"
      >{{message}}...</v-progress-circular>
  </v-overlay>
</template>


<script>
export default {
  props: {
    open:Boolean,
    message:String,
  },
}

</script>

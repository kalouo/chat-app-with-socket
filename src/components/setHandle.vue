<template>
  <div class="set-handle">
    <v-card class="text-xs-center pl-3 pr-3 pt-5 pb-5 mt-5 mr-5 ml-5">
      <h3 class="text-xs-center mb-3">ENTER YOUR HANDLE</h3>
      <v-text-field v-model="handle" class="mr-5 ml-5"></v-text-field>
      <v-btn class="white--text" color="blue" @click="handleClick(handle)">Enter</v-btn>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      handle: ""
    };
  },
  methods: {
    handleClick(input) {
      this.$emit("set-handle", input);
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>

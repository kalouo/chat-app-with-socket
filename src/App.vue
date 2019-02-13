<template>
  <div id="app">
    <setHandle v-if="handleNotSet" v-on:set-handle="setHandle"/>
    <Chat v-else :handle="handle"/>
  </div>
</template>

<script>
import Chat from "./components/Chat.vue";
import setHandle from "./components/setHandle.vue";

export default {
  name: "app",
  components: {
    Chat,
    setHandle
  },
  data: () => ({
    handle: "",
    handleNotSet: true
  }),
  methods: {
    setHandle: function(handle) {
      this.handle = handle;
      this.handleNotSet = false;
    }
  }
};
</script>

<style>
</style>
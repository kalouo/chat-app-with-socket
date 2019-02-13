<template>
  <div>
    <v-card
      color="purple"
      class="white--text mt-1 mr-5 ml-1 mb-1"
      v-if="isMyHandle(this.chat.handle)"
    >{{this.chat.handle}} : {{this.chat.message}}</v-card>
    <v-card
      v-else
      color="blue"
      class="white--text mt-1 mr-1 ml-5 mb-1"
    >{{this.chat.handle}} : {{this.chat.message}}</v-card>

    <!-- <v-tooltip left>
      <span slot="activator">
        <p class="grey--text text--darken-2">
          <b class="indigo--text" v-if="isMyHandle(chat.handle)">{{chat.handle}} :</b>
          <b class="pink--text" v-else>Me :</b>
          {{chat.message}}
        </p>
      </span>
    </v-tooltip>-->
  </div>
</template>

<script>
export default {
  props: ["chat", "handle"],
  methods: {
    isMyHandle(chatHandle) {
      return this.handle == chatHandle;
    }
  }
};
</script>
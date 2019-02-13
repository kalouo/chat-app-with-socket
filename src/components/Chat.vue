<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Room</h3>
        <v-card class="pl-5 pr-5">
          <chatItem
            v-for="message in this.messages.slice(this.messages.length -15)"
            :key="message._id"
            :chat="message"
            :handle="user"
          ></chatItem>
        </v-card>
        <hr>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <v-card class="text-xs-center">
          <v-text-field v-model="message" class="mr-5 ml-5"></v-text-field>
          <v-btn type="submit" class="white--text" color="blue">Send</v-btn>
        </v-card>
      </form>
    </div>
  </div>
</template>
<script>
const io = require("socket.io-client");
import chatItem from "./chatItem";

// const message = require("../../server/message.js");

export default {
  name: "Chat",
  components: {
    chatItem
  },
  props: ["handle"],
  data() {
    return {
      user: this.handle,
      message: "",
      messages: [],
      socket: io()
    };
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        handle: this.user,
        message: this.message
      });
      this.message = "";
    }
  },
  mounted() {
    fetch("/messages")
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        this.messages = jsonResponse;
      })
      .then(() => {
        this.socket.on("MESSAGE", data => {
          this.messages = [...this.messages, data];
        });
      })
      .catch(err => console.log(err));
  }
};
</script>


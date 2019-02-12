<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        <hr>
      </div>
      <div class="card-body">
        <div class="messages">{{this.messages}}</div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <label for="user">User:</label>
          <input type="text" v-model="user" class="form-control">
        </div>
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control">
        </div>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
    </div>
  </div>
</template>
<script>
const io = require("socket.io-client");
// const message = require("../../server/message.js");

export default {
  data() {
    return {
      user: "",
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
    const PORT = process.env.PORT || 3001;
    fetch("http://localhost:" + PORT + "/messages")
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


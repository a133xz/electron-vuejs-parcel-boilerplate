<template>
  <button v-on:click="showDialog">Open a dialog window from Electron</button>
  <h4>Sending data to Electron</h4>
  <p>In this case a number to be multiplied by 2 on the background</p>
  <p>
    <input v-model="data" type="number" />
    <button v-on:click="sendData">Send</button>
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const expose: any = window;
const electron = expose.electron;

export default defineComponent({
  name: "ElectronBridge",
  mounted() {
    electron.receive("fromMain", (reply: number) => {
      alert("Sent to electron: " + this.data + "\nResponse: " + reply);
    });
  },
  data() {
    return {
      data: 100
    };
  },
  methods: {
    showDialog() {
      electron.send("showDialog");
    },
    sendData() {
      const data = this.data;
      electron.send("toMain", { data });
    }
  }
});
</script>

<style scoped>
input {
  margin-right: 5px;
}
</style>

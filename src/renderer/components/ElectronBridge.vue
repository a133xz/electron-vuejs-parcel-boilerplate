<template>
  <button v-on:click="showDialog">Dialog window from Electron</button>
  <p>
    <button v-on:click="sendData">Send data to Electron</button>
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const expose: any = window;
const electron = expose.electron;

export default defineComponent({
  name: "ElectronBridge",
  mounted() {
    electron.on("doStuffCompleted", (event: any, reply: string) => {
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
      electron.send("doStuffElectron", { data });
    }
  }
});
</script>

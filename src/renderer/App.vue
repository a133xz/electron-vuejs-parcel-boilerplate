<template>
  <div>
    <p class="text">{{ data }}</p>
    <p>
      <BasicComponent />
    </p>
    <ElectronBridge />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BasicComponent from "./components/BasicComponent.vue";
import ElectronBridge from "./components/ElectronBridge.vue";

export default defineComponent({
  components: {
    BasicComponent,
    ElectronBridge
  },
  data() {
    return {
      data: "Hello from Vuejs :)"
    };
  }
});
</script>

<style lang="scss" scoped>
.text {
  color: green;
}
</style>

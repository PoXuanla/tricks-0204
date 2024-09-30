<template>
  <VueDragResize
    :isActive="true"
    :w="200"
    :h="200"
    :isResizable="false"
    :parentLimitation="true"
    :parentW="screenWidth"
    :parentH="screenHeight"
    @dragging="resize"
  >
    <h3>Hello World!</h3>
    <p>{{ top }} х {{ left }}</p>
    <p>{{ width }} х {{ height }}</p>
  </VueDragResize>
</template>

<script setup>
import { ref } from "vue";

const width = ref(0);
const height = ref(0);
const top = ref(0);
const left = ref(0);
const screenWidth = ref(0);
const screenHeight = ref(0);

onMounted(() => {
  screenWidth.value = window.innerWidth - 5;
  screenHeight.value = window.innerHeight - 21;
});

const resize = (newRect) => {
  width.value = newRect.width;
  height.value = newRect.height;
  top.value = newRect.top;
  left.value = newRect.left;
};
</script>

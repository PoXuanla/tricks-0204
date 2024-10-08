<script setup lang="ts">
import { useMutationObserver } from "@vueuse/core";
import { ref } from "vue";

const el = ref(null);
const messages = ref<string[]>([]);
const className = ref({});
const style = ref({});

useMutationObserver(
  el,
  (mutations) => {
    const mutation = mutations[0];

    console.log("mutation", mutation);

    if (!mutation) return;
  },
  { childList: true, subtree: true }
);

messages.value.push("123123");

// setTimeout(() => {
//   messages.value.push("qwe");
// }, 1000);

setTimeout(() => {
  style.value = {
    color: "red",
  };
}, 1550);

setTimeout(() => {
  messages.value.push("123123");

  style.value = {
    color: "blue",
  };
}, 2000);
</script>

<template>
  <div>
    <div ref="el" :class="className">
      <div :style="style" v-for="(text, index) of messages" :key="index">
        Mutation Attribute: {{ text }}
      </div>
    </div>
  </div>
</template>

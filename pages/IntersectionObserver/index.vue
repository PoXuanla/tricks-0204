<template>
  <div
    class="bg-slate-600 w-[300px] h-[70%] fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 overflow-auto"
  >
    <div class="listItem h-[50px] bg-red-100" v-for="e in messages">
      {e.text}
    </div>
  </div>
</template>

<script setup lang="ts">
const messages = ref<{ text: string }[]>([]);

const generateObjects = (n: number): { text: string }[] => {
  return Array.from({ length: n }, (_, i) => ({
    text: `Item ${i + 1}`,
  }));
};

onMounted(() => {
  console.log(generateObjects(20));
  messages.value = messages.value.concat(generateObjects(20));
  console.log("messages", messages.value);
});
</script>

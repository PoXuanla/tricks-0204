<template>
  <ListBox
    class="fixed-center animate-fade-in opacity-0"
    :list-data="messages"
    :load-data="loadData"
  />
</template>

<script setup lang="ts">
import type { ListData } from "~/components/ListBox/types";
const messages = ref<ListData[]>([]);
const round = ref(0);
const vegetables = ["Aubergine", "Broccoli", "Carrot", "Courgette", "Leek"];

const generateData = (r: number) => {
  round.value = r;
  messages.value.push({
    round: r,
    data: vegetables.map((e) => {
      return e;
    }),
  });
};

const loadData = () => {
  generateData(round.value + 1);
};

onMounted(() => {
  generateData(round.value + 1);
  generateData(round.value + 1);
  generateData(round.value + 1);
});
</script>

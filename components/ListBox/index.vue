<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { ListData } from "./types";
import { useIntersectionObserver } from "@vueuse/core";

const { listData, loadData = undefined } = defineProps<{
  listData: ListData[];
  loadData?: () => void;
}>();

const loadTrigger = useTemplateRef("loadTrigger");

if (loadData) {
  useIntersectionObserver(
    loadTrigger,
    async ([{ isIntersecting }]) => {
      if (isIntersecting) {
        if (loadData) loadData();
      }
    },
    { threshold: 0.5 }
  );
}
</script>

<template>
  <ListboxRoot class="rounded-lg border bg-white text-green1 overflow-hidden">
    <ListboxContent class="rounded-lg p-[5px] w-48 h-72 overflow-auto">
      <ListboxGroup v-for="data in listData">
        <ListboxGroupLabel
          class="px-[25px] text-xs leading-[25px] text-mauve11"
        >
          Round {{ data.round }}
        </ListboxGroupLabel>
        <ListboxItem
          v-for="i in data.data"
          :key="`${data.round}-${i}`"
          :value="`${data.round}-${i}`"
          class="w-full flex items-center px-[25px] h-[25px] leading-none text-[13px] relative text-green9 select-none outline-none data-[highlighted]:ring-green9 data-[highlighted]:ring-1 focus:ring-green9 focus:ring-1 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 rounded"
        >
          <ListboxItemIndicator
            class="absolute left-0 w-[25px] inline-flex items-center justify-center"
          >
            <Icon icon="radix-icons:check" />
          </ListboxItemIndicator>
          <span>{{ i }}</span>
        </ListboxItem>
      </ListboxGroup>
      <div ref="loadTrigger" class="h-[10px]"></div>
    </ListboxContent>
  </ListboxRoot>
</template>

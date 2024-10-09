<script setup lang="ts">
import { useDraggable, useWindowSize, useElementSize } from "@vueuse/core";
import { ref } from "vue";

const el = ref<HTMLElement | null>(null);
const { width } = useWindowSize();

const startFunc = (position: { x: number; y: number }, e: MouseEvent) => {
  // 獲取被點擊的元素
  const clickedElement = e.target as HTMLElement;

  // 檢查被點擊的元素是否有 class="drag-element"
  if (clickedElement.classList.contains("drag-element")) {
  } else {
    // 可以在這裡處理非 drag-element 的情況
  }
};

const getScrollBar = () => {
  var cWidth =
    document.body.clientWidth || document.documentElement.clientWidth; // 頁面可見區域寬度
  var iWidth = window.innerWidth; // 瀏覽器窗口大小
  return iWidth - cWidth; // 計算滾動條寬度
};

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
  onStart: startFunc,
  onMove: (position) => {
    const dragElementWidth = el.value?.clientWidth || 0;
    const ww = getScrollBar();
    console.log("dragElementWidth", dragElementWidth);
    console.log("ww", ww);

    if (position.x > width.value - dragElementWidth - ww) {
      console.log("position", position);

      position.x = width.value - dragElementWidth - ww;
    }
  },
});
</script>

<template>
  <div
    ref="el"
    :style="style"
    style="
      position: fixed;
      background-color: red;
      z-index: 1000;
      white-space: no-wrap;
    "
  >
    <div class="drag-element no-wrap">Drag me! I am at</div>
    <div class="item">asdasd</div>
  </div>
</template>

<style lang="css" scoped>
.drag-element {
  white-space: nowrap;
}
</style>

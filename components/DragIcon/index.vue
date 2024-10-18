<script setup lang="ts">
import { useDraggable, useWindowSize, useElementSize } from "@vueuse/core";
import { ref } from "vue";

const el = ref<HTMLElement | null>(null);
const { width, height } = useWindowSize();

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
  initialValue: { x: 500, y: 40 },
  onMove: (position) => {
    const dragElementWidth = el.value?.clientWidth || 0;
    const dragElementHeight = el.value?.clientHeight || 0;

    const ww = getScrollBar();

    if (position.x > width.value - dragElementWidth - ww) {
      position.x = width.value - dragElementWidth - ww;
    }

    if (position.x < 0) {
      position.x = 0;
    }

    if (position.y < 0) {
      position.y = 0;
    }

    if (position.y > height.value - dragElementHeight) {
      position.y = height.value - dragElementHeight;
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
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* Standard syntax */
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

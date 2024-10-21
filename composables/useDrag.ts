import { useDraggable, useWindowSize } from "@vueuse/core";

interface Boundary {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

interface Position {
  x: number;
  y: number;
}

/**
 * useDrag 是一個用於處理拖曳功能的自定義 Hook。
 *
 * @param {globalThis.Ref<HTMLElement | null>} targetEl - 目標元素的引用。
 * @param {Position} initialPosition - 初始位置，包含 x 和 y 坐標。
 * @param {() => void} [onClickEvent] - 可選的點擊事件回調函數。
 * @param {globalThis.Ref<Boundary>} [boundary] - 可選的邊界限制，包含 top、right、bottom 和 left。
 *
 * @returns {{ x: Ref<number>, y: Ref<number>, style: Ref<CSSProperties> }} - 返回 x 和 y 坐標以及樣式的引用。
 *
 * @description
 * 這個 Hook 使用了 useWindowSize 來獲取窗口大小。
 * 它還使用了 useDraggable 來處理拖曳邏輯，包括開始、移動和結束事件。
 * 在移動過程中，會根據窗口大小和邊界限制來調整目標元素的位置。
 * 當拖曳結束時，如果拖曳距離小於一定值，則會觸發點擊事件。
 */
export default function useDrag(
  targetEl: globalThis.Ref<HTMLElement | null>,
  initialPosition: Position,
  boundary?: globalThis.ComputedRef<Boundary> | undefined,
  onClickEvent?: () => void
) {
  const { width: windowW, height: windowH } = useWindowSize();

  const startTime = ref(0);

  const endTime = ref(0);

  /**
   * 計算並返回滾動條的寬度。
   *
   * @returns {number} 滾動條的寬度。
   */
  const getScrollBarWidth = () => {
    var cWidth =
      document.body.clientWidth || document.documentElement.clientWidth; // 頁面可見區域寬度
    var iWidth = window.innerWidth; // 瀏覽器窗口大小
    return iWidth - cWidth; // 計算滾動條寬度
  };

  /**
   * 判斷是否觸發目標事件。
   *
   * @param toleranceValue - 容忍值，用於判斷開始時間和結束時間之間的差異是否在容忍範圍內。
   * @returns 如果開始時間和結束時間之間的差異小於容忍值，則返回 true，否則返回 false。
   */
  const isTriggerTarget = (toleranceValue: number) => {
    return Math.abs(startTime.value - endTime.value) < toleranceValue;
  };

  const { x, y, style } = useDraggable(targetEl, {
    initialValue: { x: initialPosition.x, y: initialPosition.y },
    onStart: () => {
      startTime.value = x.value + y.value;
    },
    onMove: (position) => {
      const targetElWidth = targetEl.value?.clientWidth || 0;
      const targetElHeight = targetEl.value?.clientHeight || 0;

      const scrollBarWidth = getScrollBarWidth();

      // right boundary
      if (
        position.x >
        windowW.value -
          scrollBarWidth -
          targetElWidth -
          (boundary?.value.right || 0)
      ) {
        position.x =
          windowW.value -
          scrollBarWidth -
          targetElWidth -
          (boundary?.value.right || 0);
      }

      // left boundary
      if (position.x < 0 + (boundary?.value.left || 0)) {
        position.x = 0 + (boundary?.value.left || 0);
      }

      // top boundary
      if (position.y < 0 + (boundary?.value.top || 0)) {
        position.y = 0 + (boundary?.value.top || 0);
      }

      // bottom boundary
      if (
        position.y >
        windowH.value - targetElHeight - (boundary?.value.bottom || 0)
      ) {
        position.y =
          windowH.value - targetElHeight - (boundary?.value.bottom || 0);
      }
    },
    onEnd: () => {
      endTime.value = x.value + y.value;

      if (isTriggerTarget(5)) {
        onClickEvent?.();
      }
    },
  });

  return { x, y, style };
}

<template>
  <client-only>
    <DragIcon />
  </client-only>
  <div class="container" ref="targetDiv">
    white-space property values can be specified as a single keyword chosen from
    the list of values below, or two values representing shorthand for the
    white-space-collapse and text-wrap properties.
  </div>
  <button @click="cc">qwasdddddddddddddddewqe</button>
  <div
    v-show="show"
    ref="reff"
    id="myElement"
    class="test-div"
    :style="{ top: top, left: left }"
  ></div>
</template>
<script lang="js" setup>
const targetDiv = ref(null)
const fontInfo = ref(null)
const show = ref(false)
const reff = ref(null)

const top = ref('300px')
const left = ref('300px')

const showItem = () => {
    show.value = !show.value
}

const getFontSizeAndLineHeight = (element) => {
    if (!(element instanceof Element)) {
        console.error('Invalid input. Please provide a DOM element.')
        return null
    }

    const style = window.getComputedStyle(element)
    const fontSize = parseFloat(style.fontSize)
    let lineHeight = style.lineHeight

    if (lineHeight === 'normal') {
        lineHeight = fontSize * 1.2
    } else {
        lineHeight = parseFloat(lineHeight)
    }

    return {
        fontSize: Number(fontSize.toFixed(2)),
        lineHeight: Number(lineHeight.toFixed(2))
    }
}

// 找出小於等於「指定高度」的最大 line-height 倍數的數值
const findHeight = (targetHeight, lh) => {
    const lowerMultiple = Math.floor(targetHeight / lh) * lh;
    return lowerMultiple
}

const setDivHeight = (divElement, height) => {
    // 確保 height 是一個正數
    if (typeof height !== 'number' || height <= 0) {
        console.error('Height must be a positive number');
        return;
    }

    // 如果傳入的是字符串（ID），則獲取對應的元素
    if (typeof divElement === 'string') {
        divElement = document.getElementById(divElement);
    }

    // 檢查元素是否存在且是一個 div
    if (!divElement || divElement.tagName.toLowerCase() !== 'div') {
        console.error('Invalid div element');
        return;
    }

    // 設置 div 的高度
    divElement.style.height = `${height}px`;
}

function isElementHeightExceedingScreen(element) {
    // 獲取元素的位置資訊
    const rect = element.getBoundingClientRect();

    // 獲取元素的頂部和底部位置
    const elementTop = rect.top;

    console.log("elementTop", elementTop)

    // 檢查元素底部是否超出視窗底部
    return elementTop < 0;
}

const cc = async () => {
    show.value = !show.value
    await nextTick();
    if (isElementHeightExceedingScreen(reff.value)) {
        console.log('元素高度超出螢幕!');
    } else {
        console.log('元素高度在螢幕範圍內');
        top.value = '0px'

    }
}

onMounted(() => {
    // if (targetDiv.value) {
    //     fontInfo.value = getFontSizeAndLineHeight(targetDiv.value)
    //     const aa = findHeight(120, fontInfo.value.lineHeight)
    //     setDivHeight(targetDiv.value, aa)
    // }
})
</script>

<style lang="css" scoped>
.container {
  position: relative;
  width: 150px;
  white-space: wrap;
  color: #2c3a2f;
  background-color: #c348e2;
  font-size: 12px;
  line-height: 1.5;
  height: 50px;
}

.test-div {
  width: 300px;
  height: 300px;
  background-color: #c348e2;
  position: fixed;
  top: 300px;
  left: 300px;
}
</style>

<script setup lang="ts">
import "./style.css";
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger class="PopoverTrigger"> More info </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent class="PopoverContent">
        Some more info...
        <PopoverClose />
        <PopoverArrow class="PopoverArrow" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

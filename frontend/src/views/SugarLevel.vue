<script setup>
import { ref, computed } from "vue";

const sugarLevel = ref(110);

const sugarLevelText = computed(() => {
  if (sugarLevel.value < 70) {
    return "น้ำตาลต่ำ";
  } else if (sugarLevel.value >= 70 && sugarLevel.value <= 100) {
    return "น้ำตาลปกติ";
  } else if (sugarLevel.value > 100 && sugarLevel.value <= 125) {
    return "เบาหวานแฝง";
  } else if (sugarLevel.value > 125){
    return "น้ำตาลสูง";
  }
});

const bgColor = computed(() => {
  if (sugarLevel.value < 70) {
    return "yellow";
  } else if (sugarLevel.value >= 70 && sugarLevel.value <= 100) {
    return "green";
  } else if (sugarLevel.value > 100 && sugarLevel.value <= 125) {
    return "orange";
  } else if (sugarLevel.value > 125){
    return "red";
  }
});
</script>
 
<template>
  <Layout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        
      </h2>
    </template>
    <div :style="{ backgroundColor: bgColor }">
      <p>{{ sugarLevelText }}</p>
    </div>
  </Layout>
</template>
 
<style>
</style>
<script setup>
import { useRouter } from "vue-router";
import mysugar from './views/mysugar.vue';
import login from './views/login.vue';

import Sidebar from './components/Sidebar.vue';

const appRouter = useRouter();
/* const close = () => appRouter.push({ name: "home" });
const signin = () => appRouter.push({ name: "login" }); */
</script>
<template>
  <router-view />
   
</template>
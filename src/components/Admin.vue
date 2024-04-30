<template>
  <div>
    <Navbar />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { useRouter } from "vue-router";
export default {
  name: "admin",
  components: {
    Navbar,
  },
  data() {
    return {
      router: useRouter(),
    };
  },
  beforeMount() {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      this.router.push("/");
    }
  },
};
</script>

<style>
</style>
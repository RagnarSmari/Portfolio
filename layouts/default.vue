<script setup lang="ts">
import Navbar from "~/components/layout/navbar.vue";
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Starfield Background -->
    <StarfieldBackground />

    <!-- Main Content -->
    <div class="relative z-10 flex justify-center">
      <div class="container">
        <Navbar />
        <div class="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
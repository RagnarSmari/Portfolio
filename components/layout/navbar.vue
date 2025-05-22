<script setup lang="ts">
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const navItems = [
  { label: 'Home', section: 'about' },
  { label: 'Skills', section: 'skills' },
  { label: 'Experience', section: 'experience' },
  { label: 'Projects', section: 'projects' },
  { label: 'Contact', section: 'contact' }
]
</script>

<template>
  <div class="fixed top-3 sm:top-5 left-1/2 transform -translate-x-1/2 z-50 px-2 sm:px-4">
    <div class="flex justify-center gap-2 sm:gap-4 md:gap-6 border border-dashed rounded-lg backdrop-blur-sm shadow-lg px-3 sm:px-4 md:px-6 py-2 sm:py-3">
      <UButton
          v-for="item in navItems"
          :key="item.section"
          variant="ghost"
          size="sm"
          @click="scrollToSection(item.section)"
          class="hover:text-yellow-500 transition-colors text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4"
      >
        {{ item.label }}
      </UButton>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
const skills = [
  {
    category: "Backend Development",
    icon: "i-heroicons-server",
    items: [
      { name: "C#", icon: "", color: "purple" },
      { name: "Golang", icon: "", color: "blue" },
      { name: "Eclipse mosquitto", icon: "", color: "indigo" },
      { name: "ASP.NET", icon: "", color: "violet" },
    ]
  },
  {
    category: "Frontend Development",
    icon: "i-heroicons-computer-desktop",
    items: [
      { name: "Vue.js", icon: 80, color: "green" },
      { name: "Nuxt.js", icon: 75, color: "emerald" },
      { name: "TypeScript", icon: 78, color: "blue" },
      { name: "JavaScript", icon: 82, color: "yellow" },
      { name: "Blazor", icon: 82, color: "yellow" }
    ]
  },
  {
    category: "Database & Tools",
    icon: "i-heroicons-circle-stack",
    items: [
      { name: "SQL Server", icon: 85, color: "red" },
      { name: "PostgreSQL", icon: 80, color: "blue" },
    ]
  },
  {
    category: "DevOps & Cloud",
    icon: "i-heroicons-cloud",
    items: [
      { name: "Docker", icon: 80, color: "blue" },
      { name: "Azure", icon: 75, color: "blue" },
      { name: "Git", icon: 90, color: "orange" }
    ]
  }
]
</script>

<template>
  <div class="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
        <p class="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto px-4">
          A comprehensive overview of my technical expertise and proficiency levels
        </p>
      </div>

      <!-- Skills Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <UCard
            v-for="skillGroup in skills"
            :key="skillGroup.category"
            class="hover:shadow-lg transition-shadow duration-300"
        >
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon :name="skillGroup.icon" class="text-xl sm:text-2xl text-primary-500 flex-shrink-0" />
              <h3 class="text-lg sm:text-xl font-semibold">{{ skillGroup.category }}</h3>
            </div>
          </template>

          <div class="space-y-4">
            <div v-for="skill in skillGroup.items" :key="skill.name" class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="font-medium text-sm sm:text-base">{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Additional Skills -->
      <div class="mt-12 text-center">
        <h3 class="text-xl sm:text-2xl font-semibold mb-6">Additional Competencies</h3>
        <div class="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
          <UBadge
              v-for="skill in ['Clean Architecture', 'SOLID Principles', 'API Design', 'Test-Driven Development', 'Agile Methodologies', 'Code Reviews']"
              :key="skill"
              variant="subtle"
              color="primary"
              size="md"
              class="px-3 sm:px-4 py-2 text-xs sm:text-sm"
          >
            {{ skill }}
          </UBadge>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
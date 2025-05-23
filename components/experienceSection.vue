<script setup lang="ts">
const experiences = [
  {
    id: 1,
    company: "Akureyri University",
    position: "Inern",
    period: "2024 - 2024",
    location: "On-site",
    type: "Part-time",
    description: "Assistant teacher for Programming languages and Advanced game design courses.",
    achievements: [
      "Helping students with their assignments and projects"
    ],
    technologies: ["F#", "Unity"],
  },
  {
    id: 2,
    company: "Slippurinn DNG",
    position: "Software developer",
    period: "2023 - present",
    location: "On-site",
    type: "Full-time",
    description: "Developed and maintaine Promas, a production management software for fish processing equipment.",
    achievements: [
      "Built responsive web applications using Vue.js and C# backends",
      "Implemented automated testing strategies improving code coverage by 60%",
      "Integrated third-party APIs and payment processing systems",
      "Participated in agile development processes and sprint planning"
    ],
    technologies: ["C#", ".NET", "Blazor", "PostgreSQL", "Docker","SQL Server", "Eclipse Mosquitto","Git", "Azure"]
  }
]
</script>

<template>
  <div class="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Professional Experience</h2>
        <p class="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto px-4">
          My journey as a software developer, building innovative solutions and growing expertise
        </p>
      </div>

      <!-- Experience Timeline -->
      <div class="relative">
        <!-- Timeline Line - Hidden on mobile, visible on larger screens -->
        <div class="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-primary-500"/>

        <div class="space-y-8 sm:space-y-12">
          <div
              v-for="experience in experiences"
              :key="experience.id"
              class="relative flex items-start"
          >
            <!-- Timeline Dot - Hidden on mobile -->
            <div class="hidden sm:block absolute left-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg"></div>

            <!-- Content Card -->
            <div class="w-full sm:ml-16">
              <UCard class="hover:shadow-lg transition-shadow duration-300">
                <template #header>
                  <div class="flex flex-col gap-3">
                    <div>
                      <h3 class="text-lg sm:text-xl font-bold">{{ experience.position }}</h3>
                      <div class="flex items-center gap-2 text-primary-500 font-semibold text-sm sm:text-base">
                        <UIcon name="i-heroicons-building-office" class="flex-shrink-0" />
                        <span class="truncate">{{ experience.company }}</span>
                      </div>
                    </div>
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                      <div class="flex items-center gap-1">
                        <UIcon name="i-heroicons-calendar" class="flex-shrink-0" />
                        <span>{{ experience.period }}</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <UIcon name="i-heroicons-map-pin" class="flex-shrink-0" />
                        <span>{{ experience.location }} • {{ experience.type }}</span>
                      </div>
                    </div>
                  </div>
                </template>

                <div class="space-y-4">
                  <p class="leading-relaxed text-sm sm:text-base">{{ experience.description }}</p>

                  <div>
                    <h4 class="font-semibold mb-2 text-sm sm:text-base">Key Achievements:</h4>
                    <ul class="space-y-2">
                      <li
                          v-for="achievement in experience.achievements"
                          :key="achievement"
                          class="flex items-start gap-2"
                      >
                        <UIcon name="i-heroicons-check-circle" class="text-primary-500 mt-1 flex-shrink-0 text-sm" />
                        <span class="text-sm sm:text-base">{{ achievement }}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 class="font-semibold mb-2 text-sm sm:text-base">Technologies Used:</h4>
                    <div class="flex flex-wrap gap-2">
                      <UBadge
                          v-for="tech in experience.technologies"
                          :key="tech"
                          variant="subtle"
                          color="primary"
                          size="sm"
                          class="text-xs"
                      >
                        {{ tech }}
                      </UBadge>
                    </div>
                  </div>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
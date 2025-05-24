<script setup lang="ts">
const projects = [
  {
    id: 1,
    title: "Pumba",
    description: "A full-stack web application for companies time management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    technologies: ["Golang", "Vue.js", "PostgreSQL", "Docker"],
    features: [
        "Admin dashboard for company management",
        "Time tracking for projects and tasks",
        "File management for projects documents",
        "User management for company and employee accounts",
    ],
    liveUrl: "",
    githubUrl: "",
    status: "In Progress",
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Gravity simulator",
    description: "Gravity simulator for our solar system",
    image: "/gravitySimulator.png", 
    technologies: ["C++", "OpenGL"],
    features: [
        "Simulation of solar system with gravity calculations",
        "Interactive 3D view with buttons for controlling the simulation",
    ],
    githubUrl: "https://github.com/RagnarSmari/GravitySimulatorOpenGL",
    status: "Completed",
    category: "Backend"
  },
  {
    id: 3,
    title: "Personal portfolio",
    description: "This website, a personal portfolio showcasing my skills and experience.",
    image: "personalPortfolio.png",
    technologies: ["Vue.js", "Nuxt.js",],
    features: [
        "Interactive star background"
    ],
    liveUrl: "https://portfolio-ragnar-smari.nuxt.dev",
    githubUrl: "https://github.com/RagnarSmari/Portfolio",
    status: "In Progress",
    category: "Frontend"
  },
  {
    id: 4,
    title: "Journal, a catch log for ships",
    description: "Final project in my BSc in Computer Science at Akureyri University.",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop",
    technologies: ["C#", "Blazor", "MudBlazor","ASP .NET", "SQL Server"],
    features: [
        "Catch log for ships",
        "Deployed on-site",
        "External communication with Fiskistofa to sync data",
    ],
    githubUrl: "",
    status: "Completed",
    category: "FullStack"
  }
]

const categories = ["All", "Full Stack", "Backend", "Frontend"]
const selectedCategory = ref("All")

const filteredProjects = computed(() => {
  if (selectedCategory.value === "All") {
    return projects
  }
  return projects.filter(project => project.category === selectedCategory.value)
})
</script>

<template>
  <div class="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
        <p class="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto">
          A showcase of my recent work, demonstrating expertise in full-stack development,
          system architecture, and modern technologies
        </p>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
        <UButton
            v-for="category in categories"
            :key="category"
            :variant="selectedCategory === category ? 'solid' : 'outline'"
            :color="selectedCategory === category ? 'primary' : 'neutral'"
            size="sm"
            class="transition-all duration-200"
            @click="selectedCategory = category"
        >
          {{ category }}
        </UButton>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <UCard
            v-for="project in filteredProjects"
            :key="project.id"
            class="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Project Image -->
          <div class="relative overflow-hidden rounded-t-lg">
            <NuxtImg
                :src="project.image"
                :alt="project.title"
                class="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute top-4 right-4">
              <UBadge
                  :color="project.status === 'Completed' ? 'primary' : 'info'"
                  variant="solid"
                  size="sm"
              >
                {{ project.status }}
              </UBadge>
            </div>
            <div class="absolute top-4 left-4">
              <UBadge color="neutral" variant="solid" size="sm">
                {{ project.category }}
              </UBadge>
            </div>
          </div>

          <template #header>
            <div class="space-y-2">
              <h3 class="text-xl sm:text-2xl font-bold group-hover:text-primary-600 transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-sm sm:text-base leading-relaxed">
                {{ project.description }}
              </p>
            </div>
          </template>

          <div class="space-y-4 pt-4">
            <div>
              <h4 class="font-semibold mb-2 text-sm sm:text-base">Key Features:</h4>
              <ul class="grid grid-cols-1 sm:grid-cols-1 gap-1">
                <li
                    v-for="feature in project.features"
                    :key="feature"
                    class="flex items-start gap-2 text-sm"
                >
                  <UIcon name="i-heroicons-check-circle" class="text-primary-500 mt-0.5 flex-shrink-0 text-xs" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- Technologies -->
            <div>
              <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Technologies:</h4>
              <div class="flex flex-wrap gap-2">
                <UBadge
                    v-for="tech in project.technologies"
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

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3 pt-2">
              <UButton
                  v-if="project.liveUrl"
                  color="primary"
                  size="sm"
                  :to="project.liveUrl"
                  external
                  target="_blank"
              >
                <UIcon name="i-heroicons-globe-alt" class="mr-2" />
                Live Demo
              </UButton>
              <UButton
                  v-if="project.githubUrl"
                  variant="outline"
                  color="neutral"
                  size="sm"
                  :to="project.githubUrl"
                  external
                  target="_blank"
              >
                <UIcon name="i-heroicons-code-bracket" class="mr-2" />
                View Code
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
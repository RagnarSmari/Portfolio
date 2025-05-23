<script setup lang="ts">
// Optional: Add smooth scrolling functionality
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="w-full">
    <div class="border-x border-dashed min-h-screen">

      <section id="about" class="min-h-screen">
        <AboutSection />
      </section>

      <section id="skills" class="min-h-screen">
        <SkillsSection />
      </section>

      <section id="experience" class="min-h-screen">
        <ExperienceSection />
      </section>

      <section id="projects" class="min-h-screen">
        <ProjectsSection />
      </section>

      <section id="contact" class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <h2 class="text-4xl font-bold mb-4">Get In Touch</h2>
          <p class="text-xl text-gray-600">Contact section coming soon...</p>
        </div>
      </section>

    </div>
  </div>
</template>
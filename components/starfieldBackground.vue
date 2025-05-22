<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'

const starfieldRef = ref<HTMLCanvasElement>()

onMounted(() => {
  if (!starfieldRef.value) return

  const canvas = starfieldRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Mouse tracking
  const mouse = {
    x: 0,
    y: 0,
    moved: false
  }

  // Set canvas size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()

  // Event listeners
  const handleResize = () => resizeCanvas()
  const handleMouseMove = (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    mouse.moved = true
  }

  const handleClick = (e: MouseEvent) => {
    createShootingStar(e.clientX, e.clientY)
  }

  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('click', handleClick)

  // Star configuration
  const stars: Array<{
    x: number
    y: number
    baseX: number
    baseY: number
    size: number
    opacity: number
    speed: number
    parallaxFactor: number
  }> = []

  // Shooting stars
  const shootingStars: Array<{
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
    size: number
  }> = []

  const createStars = () => {
    const numStars = Math.floor((canvas.width * canvas.height) / 6000)
    stars.length = 0 // Clear existing stars

    for (let i = 0; i < numStars; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      stars.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.01,
        parallaxFactor: Math.random() * 0.03 + 0.01
      })
    }
  }

  const createShootingStar = (startX: number, startY: number) => {
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 8 + 4

    shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 60 + Math.random() * 40,
      size: Math.random() * 3 + 2
    })
  }

  const drawStar = (star: typeof stars[0]) => {
    // Calculate parallax offset based on mouse position
    let offsetX = 0
    let offsetY = 0

    if (mouse.moved) {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      offsetX = (mouse.x - centerX) * star.parallaxFactor
      offsetY = (mouse.y - centerY) * star.parallaxFactor
    }

    const x = star.baseX + offsetX
    const y = star.baseY + offsetY

    // Draw main star
    ctx.beginPath()
    ctx.arc(x, y, star.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
    ctx.fill()

    // Add glow effect for larger stars
    if (star.size > 1.5) {
      ctx.beginPath()
      ctx.arc(x, y, star.size * 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.1})`
      ctx.fill()
    }

    // Update star position
    star.x = x
    star.y = y
  }

  const drawShootingStar = (shootingStar: typeof shootingStars[0]) => {
    const alpha = 1 - (shootingStar.life / shootingStars.maxLife)

    // Draw trail
    const trailLength = 20
    for (let i = 0; i < trailLength; i++) {
      const trailAlpha = alpha * (1 - i / trailLength) * 0.8
      if (trailAlpha <= 0) continue

      const trailX = shootingStar.x - shootingStar.vx * i * 0.5
      const trailY = shootingStar.y - shootingStar.vy * i * 0.5
      const trailSize = shootingStar.size * (1 - i / trailLength)

      ctx.beginPath()
      ctx.arc(trailX, trailY, trailSize, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 150, ${trailAlpha})`
      ctx.fill()
    }

    // Draw main shooting star
    ctx.beginPath()
    ctx.arc(shootingStar.x, shootingStar.y, shootingStar.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 200, ${alpha})`
    ctx.fill()

    // Add bright glow
    ctx.beginPath()
    ctx.arc(shootingStar.x, shootingStar.y, shootingStar.size * 3, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 150, ${alpha * 0.3})`
    ctx.fill()
  }

  const updateStars = () => {
    stars.forEach(star => {
      // Twinkling effect
      star.opacity += (Math.random() - 0.5) * star.speed
      star.opacity = Math.max(0.1, Math.min(0.9, star.opacity))
    })
  }

  const updateShootingStars = () => {
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const shootingStar = shootingStars[i]

      // Update position
      shootingStar.x += shootingStar.vx
      shootingStar.y += shootingStar.vy
      shootingStar.life++

      // Apply gravity
      shootingStar.vy += 0.1

      // Remove if out of bounds or life expired
      if (shootingStar.life > shootingStar.maxLife ||
          shootingStar.x < -50 || shootingStar.x > canvas.width + 50 ||
          shootingStar.y < -50 || shootingStar.y > canvas.height + 50) {
        shootingStars.splice(i, 1)
      }
    }
  }

  // Add some random shooting stars
  const addRandomShootingStar = () => {
    if (Math.random() < 0.003) { // 0.3% chance per frame
      const side = Math.floor(Math.random() * 4)
      let startX, startY

      switch (side) {
        case 0: // Top
          startX = Math.random() * canvas.width
          startY = -20
          break
        case 1: // Right
          startX = canvas.width + 20
          startY = Math.random() * canvas.height
          break
        case 2: // Bottom
          startX = Math.random() * canvas.width
          startY = canvas.height + 20
          break
        default: // Left
          startX = -20
          startY = Math.random() * canvas.height
      }

      createShootingStar(startX, startY)
    }
  }

  const animate = () => {
    // Clear canvas with dark background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#0f172a')
    gradient.addColorStop(0.5, '#1e293b')
    gradient.addColorStop(1, '#334155')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw everything
    updateStars()
    updateShootingStars()
    addRandomShootingStar()

    stars.forEach(drawStar)
    shootingStars.forEach(drawShootingStar)

    requestAnimationFrame(animate)
  }

  // Initialize
  createStars()
  animate()

  // Cleanup function
  const cleanup = () => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('click', handleClick)
  }

  onUnmounted(cleanup)
})
</script>

<template>
  <canvas
      ref="starfieldRef"
      class="fixed inset-0 z-0 cursor-crosshair"
      style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)"
  />
</template>

<style scoped>

</style>
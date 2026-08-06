/**
 * Composable for scroll-reveal animations using IntersectionObserver.
 * Adds 'reveal--visible' class when elements enter the viewport.
 */

export function useScrollReveal() {
  const observer = ref<IntersectionObserver | null>(null)

  function initObserver(options?: IntersectionObserverInit) {
    if (import.meta.server) return

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
            observer.value?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      }
    )
  }

  function observe(el: HTMLElement | null) {
    if (!el || !observer.value) return
    observer.value.observe(el)
  }

  function observeAll(selector: string = '.reveal') {
    if (import.meta.server) return

    nextTick(() => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((el) => {
        observe(el as HTMLElement)
      })
    })
  }

  function cleanup() {
    observer.value?.disconnect()
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    observer,
    initObserver,
    observe,
    observeAll,
    cleanup,
  }
}

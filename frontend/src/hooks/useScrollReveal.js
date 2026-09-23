import { useEffect, useRef } from 'react'

/**
 * Custom hook for scroll-triggered reveal animations using IntersectionObserver.
 * 
 * @param {Object} options
 * @param {number} options.threshold - Percentage of element visible before triggering (0-1). Default 0.15
 * @param {string} options.rootMargin - Margin around root. Default '0px 0px -40px 0px'
 * @param {boolean} options.once - If true, animation triggers only once. Default true
 * @returns {React.RefObject} ref to attach to the element
 */
export default function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  once = true,
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Add the 'not yet revealed' class
    el.classList.add('scroll-hidden')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('scroll-hidden')
          el.classList.add('scroll-reveal')
          if (once) observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}

/**
 * Hook for multiple child elements that reveal staggered on scroll.
 * Attach the returned ref to the parent container.
 * Children should have the class 'reveal-child' to be animated.
 * 
 * @param {Object} options
 * @param {number} options.threshold - Default 0.1
 * @param {string} options.rootMargin - Default '0px 0px -30px 0px'
 * @param {number} options.staggerMs - Stagger delay between children in ms. Default 80
 * @returns {React.RefObject}
 */
export function useStaggerReveal({
  threshold = 0.1,
  rootMargin = '0px 0px -30px 0px',
  staggerMs = 80,
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const children = container.querySelectorAll('.reveal-child')
    children.forEach((child) => {
      child.classList.add('scroll-hidden')
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => {
              child.classList.remove('scroll-hidden')
              child.classList.add('scroll-reveal')
            }, i * staggerMs)
          })
          observer.unobserve(container)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [threshold, rootMargin, staggerMs])

  return ref
}

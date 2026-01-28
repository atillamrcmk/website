/**
 * IntersectionObserver helper for scroll reveal animations
 * Respects prefers-reduced-motion
 */
export function initReveal() {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Immediately reveal all elements
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    observer.observe(el);
  });
}





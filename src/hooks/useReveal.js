import { useEffect } from 'react'

export function useReveal(containerRef, dependencies = []) {
  useEffect(() => {
    if (!containerRef || !containerRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-element');
        } else {
          entry.target.classList.remove('show-element');
        }
      });
    }, { threshold: 0.15 });

    const elements = containerRef.current.querySelectorAll('.achievement-card, .project-card, .section-header');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, ...dependencies]);
}

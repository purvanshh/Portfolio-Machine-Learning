const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function smoothScrollTo(targetY, duration = 600) {
    if (prefersReducedMotion()) {
        window.scrollTo(0, targetY);
        return;
    }

    const startY = window.pageYOffset;
    const delta = targetY - startY;

    if (Math.abs(delta) < 1) return;

    const startTime = performance.now();

    const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + delta * easeInOutCubic(progress));

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
}

export function smoothScrollToTop(duration = 600) {
    smoothScrollTo(0, duration);
}

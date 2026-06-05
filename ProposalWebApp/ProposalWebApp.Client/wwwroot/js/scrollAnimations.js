/* Prevent redeclaration if script is accidentally loaded more than once */
if (!window.__scrollAnimationsLoaded) {
    window.__scrollAnimationsLoaded = true;

    (function () {
        let animationInitialized = false;
        let lenis = null;

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        setTimeout(() => {
                             
                            entry.target.classList.add("visible");

                            // Stop observing once revealed
                            observer.unobserve(entry.target);

                        }, 150);

                    }

                });

            },
            {
                threshold: 0.25
            }
        );

        window.initializeScrollAnimations = () => {

            if (animationInitialized)
                return;

            animationInitialized = true;

            //
            // Initialize Lenis
            //
            lenis = new Lenis({
                duration: 1.2,
                smoothWheel: true,
                smoothTouch: true
            });

            function raf(time) {

                lenis.raf(time);

                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            //
            // Update parallax whenever Lenis scrolls
            //
            lenis.on("scroll", () => {
                updateParallax();
            });

            //
            // Register fade sections
            //
            const sections =
                document.querySelectorAll(".fade-section");

            sections.forEach(section => {

                observer.observe(section);

                // If already visible, reveal immediately
                const rect =
                    section.getBoundingClientRect();

                if (
                    rect.top < window.innerHeight &&
                    rect.bottom > 0
                ) {
                    section.classList.add("visible");
                    observer.unobserve(section);
                }
            });
            //
            // Initial parallax positioning
            //
            updateParallax();
        };

        function updateParallax() {

            document
                .querySelectorAll(".parallax")
                .forEach(section => {

                    const rect =
                        section.getBoundingClientRect();

                    const img =
                        section.querySelector("img");

                    if (!img)
                        return;

                    //
                    // Subtle cinematic movement
                    //
                    const offset =
                        rect.top * -0.075;

                    img.style.transform =
                        `translateY(${offset}px) scale(1.1)`;

                });
        }

        window.launchConfetti = () => {

            if (typeof confetti !== 'function')
                return;

            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 }
            });

        };

    })();

}

document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const navLinks = Array.from(
        document.querySelectorAll(
            '.site-header nav a[href="#about"], ' +
            '.site-header nav a[href="#work"], ' +
            '.site-header nav a[href="#contact"]'
        )
    );
    const sections = navLinks
        .map((link) => ({
            link,
            section: document.querySelector(link.getAttribute("href"))
        }))
        .filter((item) => item.section);

    if (!("IntersectionObserver" in window) || sections.length === 0) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                sections.forEach(({ link, section }) => {
                    if (section === entry.target) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            });
        },
        { rootMargin: "-25% 0px -65% 0px" }
    );

    sections.forEach(({ section }) => observer.observe(section));
});
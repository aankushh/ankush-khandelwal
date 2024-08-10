document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const progressBarLinks = document.querySelectorAll('.progress-bar a');
    const progressLine = document.querySelector('.progress-line');
    const themeSwitcher = document.querySelector('.theme-switcher');
    const body = document.body;

    // Scroll to next section on scroll
    let isThrottled = false;
    window.addEventListener('wheel', function (event) {
        if (isThrottled) return;
        isThrottled = true;

        const currentScrollPos = window.pageYOffset;
        let nextSection;

        if (event.deltaY > 0) {
            // Scroll down
            sections.forEach((section, index) => {
                if (section.offsetTop > currentScrollPos) {
                    nextSection = section;
                    return false;
                }
            });
        } else {
            // Scroll up
            sections.forEach((section, index) => {
                if (section.offsetTop < currentScrollPos && index > 0) {
                    nextSection = sections[index - 1];
                    return false;
                }
            });
        }

        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }

        setTimeout(() => {
            isThrottled = false;
        }, 1000);
    });

    // Update progress bar and section highlight
    window.addEventListener('scroll', () => {
        let progressHeight = 0;
        let currentSectionIndex = 0;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - window.innerHeight / 2;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollY = window.scrollY;

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                progressHeight = ((index + 1) / sections.length) * 100;
                currentSectionIndex = index;
            }
        });

        progressBarLinks.forEach((link, index) => {
            if (index <= currentSectionIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        progressLine.style.height = `${progressHeight}%`;
        progressLine.style.backgroundColor = '#008080'; // Teal color
    });

    progressBarLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Theme switcher functionality
    themeSwitcher.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');
    });

    // Set default theme
    body.classList.add('light-theme');

    // Skills Section Interactivity
    const skillHeadings = document.querySelectorAll('.skill-heading');
    const skillSets = document.querySelectorAll('.skill-set');

    skillHeadings.forEach(heading => {
        heading.addEventListener('click', () => {
            // Remove active class from all headings
            skillHeadings.forEach(h => h.classList.remove('active'));
            // Add active class to clicked heading
            heading.classList.add('active');

            // Hide all skill sets
            skillSets.forEach(set => set.classList.add('hidden'));
            // Show the selected skill set
            document.getElementById(heading.getAttribute('data-skill')).classList.remove('hidden');
        });
    });

    // Initialize the first skill set as visible
    document.querySelector('.skill-heading').click();
});

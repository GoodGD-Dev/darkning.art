AOS.init();

document.addEventListener('DOMContentLoaded', () => {
    let sections = {
    'about': document.getElementById('about'),
    'contact': document.getElementById('contact'),
    'comission': document.getElementById('comission')
    };

    let navItems = {
    'about': document.querySelector('[data-target="about"]'),
    'contact': document.querySelector('[data-target="contact"]'),
    'comission': document.querySelector('[data-target="comission"]')
    };

    function showSection(section) {
        for (let key in sections) {
            if (key === section) {
                sections[key].classList.remove('hidden');
                sections[key].classList.add('visible');
                // Atualize atributos data-aos e data-aos-delay
                sections[key].setAttribute('data-aos', 'fade-right');
                sections[key].setAttribute('data-aos-delay', '100');
            } else {
                sections[key].classList.remove('visible');
                sections[key].classList.add('hidden');
                sections[key].removeAttribute('data-aos');
                sections[key].removeAttribute('data-aos-delay');
            }
        }

    document.querySelectorAll('[data-aos]').forEach(el => el.classList.remove('aos-animate'));
    setTimeout(() => {
        document.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
        AOS.refresh();
    }, 0);
    }

    function setActiveNavItem(navItem) {
    for (let key in navItems) {
        navItems[key].classList.toggle('active', key === navItem);
    }
    }

    function addNavItemClickEvent(navItem, section) {
    navItem.addEventListener('click', () => {
        showSection(section);
        setActiveNavItem(section);
    });
    }

    for (let key in navItems) {
    addNavItemClickEvent(navItems[key], key);
    }
});
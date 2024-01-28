document.addEventListener('DOMContentLoaded', function () {
    var sections = {
        'projects': document.getElementById('projects'),
        'about': document.getElementById('about'),
        'store': document.getElementById('store'),
        'contact': document.getElementById('contact'),
        'links': document.getElementById('links')
    };

    var navItems = {
        'projects': document.querySelector('[data-target="projects"]'),
        'about': document.querySelector('[data-target="about"]'),
        'store': document.querySelector('[data-target="store"]'),
        'contact': document.querySelector('[data-target="contact"]'),
        'links': document.querySelector('[data-target="links"]')
    };

    function showSection(section) {
        for (var key in sections) {
            sections[key].style.display = (key === section) ? 'block' : 'none';
        }
    }

    function setActiveNavItem(navItem) {
        for (var key in navItems) {
            navItems[key].classList.toggle('active', key === navItem);
        }
    }

    function addNavItemClickEvent(navItem, section) {
        navItem.addEventListener('click', function () {
            showSection(section);
            setActiveNavItem(section);
        });
    }

    for (var key in navItems) {
        addNavItemClickEvent(navItems[key], key);
    }
});
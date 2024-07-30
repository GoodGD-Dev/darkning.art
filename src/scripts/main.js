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



//form

// Função para mostrar ou esconder o campo "Outros" para o tipo de projeto
function showOtherInput() {
    var projectType = document.getElementById('project-type');
    var otherInput = document.getElementById('other-project-type');
    if (projectType.value === 'Other') {
        otherInput.style.display = 'block';
    } else {
        otherInput.style.display = 'none';
    }
}

// Função para mostrar ou esconder o campo "Outros" para as necessidades de licenciamento
function showOtherLicensingInput() {
    var licensingNeeds = document.getElementById('licensing-needs');
    var otherLicensingInput = document.getElementById('other-licensing-needs');
    if (licensingNeeds.value === 'Other') {
        otherLicensingInput.style.display = 'block';
    } else {
        otherLicensingInput.style.display = 'none';
    }
}

// Adiciona validação personalizada para campos obrigatórios
document.querySelectorAll('input[required], select[required], textarea[required]').forEach((input) => {
    input.addEventListener('invalid', (event) => {
        event.preventDefault();
        var label = input.previousElementSibling.textContent.replace('*', '').trim();
        input.setCustomValidity(`Please fill out the "${label}" field.`);
        input.reportValidity();
    });

    input.addEventListener('input', (event) => {
        input.setCustomValidity('');
    });
});
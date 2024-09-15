// Inicialização do AOS
AOS.init();

document.addEventListener('DOMContentLoaded', () => {
    // Mapeamento das seções e itens de navegação
    const sections = {
        'about': document.getElementById('about'),
        'links': document.getElementById('links'),
        'comission': document.getElementById('comission')
    };

    const navItems = {
        'about': document.querySelector('[data-target="about"]'),
        'links': document.querySelector('[data-target="links"]'),
        'comission': document.querySelector('[data-target="comission"]')
    };

    // Mostra a seção específica
    function showSection(section) {
        for (const key in sections) {
            if (key === section) {
                sections[key].classList.remove('hidden');
                sections[key].classList.add('visible');
                sections[key].setAttribute('data-aos', 'fade-right');
                sections[key].setAttribute('data-aos-delay', '100');
            } else {
                sections[key].classList.remove('visible');
                sections[key].classList.add('hidden');
                sections[key].removeAttribute('data-aos');
                sections[key].removeAttribute('data-aos-delay');
            }
        }

        // Reativa animações AOS
        document.querySelectorAll('[data-aos]').forEach(el => el.classList.remove('aos-animate'));
        setTimeout(() => {
            document.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
            AOS.refresh();
        }, 0);
    }

    // Define o item de navegação ativo
    function setActiveNavItem(navItem) {
        for (const key in navItems) {
            navItems[key].classList.toggle('active', key === navItem);
        }
    }

    // Adiciona eventos de clique aos itens de navegação
    function addNavItemClickEvent(navItem, section) {
        navItem.addEventListener('click', () => {
            showSection(section);
            setActiveNavItem(section);
        });
    }

    // Inicializa os eventos de clique para os itens de navegação
    for (const key in navItems) {
        addNavItemClickEvent(navItems[key], key);
    }
});

// Envia dados do formulário para o Trello
document.getElementById('project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    const lang = document.documentElement.lang;
    const idList = lang.startsWith('pt') ? 'id da sua lista em pt' :
        lang.startsWith('es') ? 'id da sua lista em es' :
            'id da sua lista em en';

    const cardData = {
        name: `${data.name} ${data.email}`,
        desc: `Tipo de Projeto: ${data['project-type']}
               Preço: ${data['price-range']}
               Descrição: ${data.description}
               Referências: ${data['visual-preference']}
               Formatos: ${data['format-needed']}
               Data: ${data['date-needed']} 
               Licenças: ${data['licensing-needs']}`,
        due: data['date-needed'] ? new Date(data['date-needed']).toISOString() : null,
        start: new Date().toISOString(),
        idList: idList,
        key: 'seu_key_aqui',
        token: 'seu_token_aqui'
    };

    try {
        const response = await fetch('https://api.trello.com/1/cards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cardData)
        });

        if (response.ok) {
            alert('Formulário enviado com sucesso!');
            window.location.href = 'https://darkning.art';
        } else {
            alert('Houve um erro ao enviar o formulário.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Houve um erro ao enviar o formulário.');
    }
});

// Desativa o menu de contexto
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Redireciona para o idioma correto
document.addEventListener('DOMContentLoaded', () => {
    const userLang = navigator.language || navigator.userLanguage;
    const path = window.location.pathname;

    if (userLang.startsWith('pt') && !path.startsWith('/pt/')) {
        window.location.href = '/pt/';
    } else if (userLang.startsWith('es') && !path.startsWith('/es/')) {
        window.location.href = '/es/';
    }
});

// Inicialização de eventos para o formulário
function init() {
    function showOtherInput() {
        const projectType = document.getElementById('project-type');
        const otherInput = document.getElementById('other-project-type');
        otherInput.style.display = projectType.value === 'Other' ? 'block' : 'none';
    }

    function showOtherLicensingInput() {
        const licensingNeeds = document.getElementById('licensing-needs');
        const otherLicensingInput = document.getElementById('other-licensing-needs');
        otherLicensingInput.style.display = licensingNeeds.value === 'Other' ? 'block' : 'none';
    }

    document.getElementById('project-type').addEventListener('change', showOtherInput);
    document.getElementById('licensing-needs').addEventListener('change', showOtherLicensingInput);
}

window.onload = init;

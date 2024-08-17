AOS.init();

document.addEventListener('DOMContentLoaded', () => {
    let sections = {
        'about': document.getElementById('about'),
        'links': document.getElementById('links'),
        'comission': document.getElementById('comission')
    };

    let navItems = {
        'about': document.querySelector('[data-target="about"]'),
        'links': document.querySelector('[data-target="links"]'),
        'comission': document.querySelector('[data-target="comission"]')
    };

    function showSection(section) {
        for (let key in sections) {
            if (key === section) {
                sections[key].classList.remove('hidden');
                sections[key].classList.add('visible');
                // Atualiza atributos data-aos e data-aos-delay
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

// Função para enviar dados para o Trello
document.getElementById('project-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados do formulário
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Configura a URL da API do Trello
    const trelloApiUrl = 'https://api.trello.com/1/cards';

    // Configura os dados do card
    const cardData = {
        name: `${data.name} ${data.email}`, // Inclui o email junto ao nome
        desc: `Tipo de Projeto: ${data['project-type']}
        Preço: ${data['price-range']}
        Descrição: ${data.description}
        Referências: ${data['visual-preference']}
        Formatos : ${data['format-needed']}
        Data: ${data['date-needed']} 
        Licenças: ${data['licensing-needs']}`,
        idList: '66c09834bd7bc70b3522d228', // Substitua pelo ID da sua lista
        key: '2edec1d82889c648b879474fc0cc0505', // Substitua pela sua chave de API
        token: 'ATTAcc69586c0da53a549ddfe1c766dd27cfb288d69f0f275c22ec28879769073d238258503D' // Substitua pelo seu token de API
    };

    // Envia os dados para o Trello
    try {
        const response = await fetch(trelloApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardData)
        });

        if (response.ok) {
            alert('Formulário enviado com sucesso!');
            e.target.reset(); // Reseta o formulário
        } else {
            alert('Houve um erro ao enviar o formulário.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Houve um erro ao enviar o formulário.');
    }
});

// Desativa o contextmenu
window.addEventListener('contextmenu', function (e) {
    console.log('Context menu prevention active'); // Verifique se isso aparece no console
    e.preventDefault();
});



document.addEventListener('DOMContentLoaded', function () {
    var userLang = navigator.language || navigator.userLanguage;
    var path = window.location.pathname;

    // Verifica se o idioma do navegador é português ou espanhol
    if (userLang.startsWith('pt')) {
        if (!path.startsWith('/pt/')) {
            window.location.href = '/pt/';
        }
    } else if (userLang.startsWith('es')) {
        if (!path.startsWith('/es/')) {
            window.location.href = '/es/';
        }
    }
    // Se o idioma não for português nem espanhol, permanece na URL atual
});

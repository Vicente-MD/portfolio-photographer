// Function to map language codes to names (or any representation you prefer)
function getLanguageName(lang) {
    const languageNames = {
        'en': 'English',
        'es': 'Español',
        'pt': 'Português' // Updated Portuguese spelling
    };
    return languageNames[lang] || 'Language';
}

async function changeLanguage(lang) {
    setLanguagePreference(lang);
    const langData = await fetchLanguageData(lang);
    updateButtonLanguage(lang); // Update the button text with the selected language
    updateContent(langData);
}

function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = langData[key];
    });
}

async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
}

function updateButtonLanguage(lang) {
    const button = document.querySelector('.btn.btn-secondary.dropdown-toggle');
    const buttonSmScreen = document.getElementById('btn-lang-sm');
    let imageUrl = '';
    let altText = '';

    switch (lang) {
        case 'en':
            imageUrl = 'assets/img/svg/flag-usa-solid-svgrepo-com.svg';
            altText = 'English';
            break;
        case 'es':
            imageUrl = 'assets/img/svg/flag-for-spain-svgrepo-com.svg';
            altText = 'Español';
            break;
        case 'pt':
            imageUrl = 'assets/img/svg/brazil-flag-svgrepo-com.svg';
            altText = 'Português';
            break;
        default:
            imageUrl = '';
            altText = 'Select Language';
    }

    if (button) button.innerHTML = `<img class="icon-start" src="${imageUrl}" alt="${altText}">`;
    if (buttonSmScreen) buttonSmScreen.innerHTML = `<img class="icon-start" src="${imageUrl}" alt="${altText}">`;
}


window.addEventListener('DOMContentLoaded', async () => {
    let userPreferredLanguage = navigator.language.split('-')[0];

    userPreferredLanguage = localStorage.getItem('language') || userPreferredLanguage || 'en';

    updateButtonLanguage(userPreferredLanguage); // Set button text on initial load
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
});

document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const imgs = document.querySelectorAll('#photos img');
    imgs.forEach(img => {
        observer.observe(img);
    });

    var width = window.innerWidth;
    if (width <= 768) {
        var newContent = document.createElement('div');
        newContent.id = 'about'
        newContent.innerHTML = `
                <div class="d-flex flex-column align-items-center">
                    <h1 data-i18n="title_about" id="about-title" class="text-center title-section"></h1>
                    <img src="assets/img/profile.jpeg" id="profile-image">
                    <p data-i18n="text_about" id="text-about" class="mt-5"></p>
                </div>`;
        var oldContent = document.getElementById('about');
        oldContent.parentNode.replaceChild(newContent, oldContent);
    }

    document.getElementById("message").addEventListener("change", function () {

        var messageText = encodeURIComponent(this.value);

        var whatsappHref = "https://wa.me/557381638037?text=" + messageText;

        document.getElementById("whatsapp-link").setAttribute("href", whatsappHref);
    });
});

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    const content = document.getElementById('sidebarContent');
    sidebar.classList.toggle('expanded');
    content.classList.toggle('d-none');
}



Questo è il "cervello" del sito. Gestisce la creazione dinamica dei prodotti e il sistema di temi.
document.addEventListener('DOMContentLoaded', () => {

    // --- DATI PRODOTTI ---
    const products = [
      { id: "prod1", link: "https://amzn.to/3Z551fa", img: "https://m.media-amazon.com/images/I/61hiFJPpY9L._AC_SL1500_.jpg", nome: "Samsung Galaxy S25 Ultra", prezzo: "1.199€", descrizione: "Smartphone AI, 12GB RAM, 256GB, fotocamera 200MP, batteria 5000 mAh. Garanzia 3 anni.", category: "smartphones" },
      { id: "prod2", link: "https://amzn.to/4mB7UhK", img: "https://m.media-amazon.com/images/I/71b8mpCMTOL._AC_SL1500_.jpg", nome: "by Amazon Quinoa biologica, 500g", prezzo: "5,49€", descrizione: "Quinoa biologica di alta qualità, ricca di proteine e fibre. Perfetta per piatti salutari.", category: "food" },
      { id: "prod3", link: "https://www.amazon.it/dp/B0CHWV5HTM", img: "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_SL1500_.jpg", nome: "Apple iPhone 15", prezzo: `<span style="text-decoration: line-through; color: #888;">879€</span> <span style="font-weight: bold;">645€</span> <span style="color: red; font-weight: bold;">-27%</span>`, descrizione: "Prestazioni top per l'uso quotidiano e foto incredibili.", category: "smartphones" },
      { id: "prod4", link: "https://amzn.to/4kCH9aV", img: "https://m.media-amazon.com/images/I/618ha2Ia5tL._AC_SL1500_.jpg", nome: "Samsung Galaxy S25", prezzo: "929,00€", descrizione: "Display 6.2'' FHD+, fotocamera 50MP, RAM 12GB, 256GB, batteria 4.000 mAh. 3 anni garanzia.", category: "smartphones" },
      { id: "prod5", link: "https://amzn.to/3ZAt8T4", img: "https://m.media-amazon.com/images/I/61Wj-1t3TwL._AC_SL1500_.jpg", nome: "SAMSUNG Galaxy S25 Edge", prezzo: "1.299,00€", descrizione: "Display 6.7'' QHD+, fotocamera 200MP, RAM 12GB, 512GB. Garanzia 3 anni.", category: "smartphones" },
      { id: "prod6", link: "https://amzn.to/45gPEUX", img: "https://m.media-amazon.com/images/I/61y0hmQWlsL._AC_SL1500_.jpg", nome: "Samsung Galaxy S25+ AI", prezzo: "1.189,00€", descrizione: "Display 6.7'' QHD+, fotocamera 50MP, RAM 12GB, 512GB, batteria 4.900 mAh. Versione italiana.", category: "smartphones" },
      { id: "prod7", link: "https://amzn.to/3Z6Kc2W", img: "https://m.media-amazon.com/images/I/610vqacJO2L.__AC_SY445_SX342_QL70_ML2_.jpg", nome: "Apple iPhone 16e – 128 GB", prezzo: "699,00€", descrizione: "Progettato per Apple Intelligence, chip A18, fotocamera Fusion 48MP e display 6,1\".", category: "smartphones" },
      { id: "prod8", link: "https://amzn.to/3ZEqKut", img: "https://m.media-amazon.com/images/I/61cUeqowwZL._AC_SL1500_.jpg", nome: "Apple iPhone 16 Pro Max – 256 GB", prezzo: "1.195,00€", descrizione: "Controllo fotocamera avanzato, video Dolby Vision 4K, autonomia record. Titanio Nero.", category: "smartphones" },
      { id: "prod9", link: "https://amzn.to/43t1D0l", img: "https://m.media-amazon.com/images/I/61BGE6iu4AL.__AC_SY445_SX342_QL70_ML2_.jpg", nome: "Apple iPhone 14 Plus – 128 GB", prezzo: "871,00€", descrizione: "Display Super Retina XDR da 6,7\", ottime prestazioni e autonomia, colore Azzurro.", category: "smartphones" },
      { id: "prod10", link: "https://amzn.to/4mBncTC", img: "https://m.media-amazon.com/images/I/51v1hYXGsdL._AC_SL1500_.jpg", nome: "Google Pixel 9 Pro XL", prezzo: "879,00€", descrizione: "Android con Gemini, tripla fotocamera, autonomia 24 ore e display Super Actua 6,8\".", category: "smartphones" },
    ];

    // --- LOGICA DI VISUALIZZAZIONE PRODOTTI ---
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.img}" alt="${product.nome}" class="product-card-img">
                <div class="product-card-body">
                    <h3>${product.nome}</h3>
                    <p class="price">${product.prezzo}</p>
                    <p class="description">${product.descrizione}</p>
                    <a href="${product.link}" target="_blank" class="btn btn-primary">Compra Ora</a>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    // --- LOGICA PER IL CAMBIO TEMA ---
    const themeSelectors = document.querySelectorAll('input[name="theme"]');
    const colorPicker = document.getElementById('tint-color-picker');
    const root = document.documentElement;

    function applyTheme(theme, tintColor = '#007aff') {
        // Rimuove tutte le classi di tema
        root.classList.remove('dark-theme', 'glass-theme');
        
        if (theme === 'dark') {
            root.classList.add('dark-theme');
        }
        if (theme === 'glass') {
            root.classList.add('glass-theme');
            // La modalità vetro può essere combinata con la scura
            const savedTheme = localStorage.getItem('baseThemeForGlass') || 'light';
            if(savedTheme === 'dark') root.classList.add('dark-theme');
        }
        if (theme === 'tint') {
            const baseTheme = localStorage.getItem('baseThemeForTint') || 'light';
             if(baseTheme === 'dark') root.classList.add('dark-theme');
            root.style.setProperty('--primary-accent', tintColor);
            root.style.setProperty('--btn-primary-text', getContrastingTextColor(tintColor));
        } else {
             // Reset alla tinta di default se non è attiva la modalità tinta
            root.style.setProperty('--primary-accent', theme === 'dark' ? '#ffffff' : '#000000');
            root.style.setProperty('--btn-primary-text', theme === 'dark' ? '#000000' : '#ffffff');
        }
    }
    
    function getContrastingTextColor(hexcolor){
      hexcolor = hexcolor.replace("#", "");
      const r = parseInt(hexcolor.substr(0,2),16);
      const g = parseInt(hexcolor.substr(2,2),16);
      const b = parseInt(hexcolor.substr(4,2),16);
      const yiq = ((r*299)+(g*587)+(b*114))/1000;
      return (yiq >= 128) ? 'black' : 'white';
    }

    function saveAndApply(theme, tintColor) {
        localStorage.setItem('theme', theme);
        if(theme !== 'glass' && theme !== 'tint') {
            localStorage.setItem('baseThemeForGlass', theme);
            localStorage.setItem('baseThemeForTint', theme);
        }
        if (tintColor) {
            localStorage.setItem('tintColor', tintColor);
        }
        applyTheme(theme, tintColor);
    }
    
    // Event listener per i radio button del tema
    if (themeSelectors) {
        themeSelectors.forEach(selector => {
            selector.addEventListener('change', (e) => {
                const theme = e.target.value;
                const tintColor = colorPicker.value;
                saveAndApply(theme, tintColor);
            });
        });
    }

    // Event listener per il color picker
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            const tintColor = e.target.value;
            // Attiva automaticamente il tema tinta quando si sceglie un colore
            const tintRadio = document.getElementById('tint-theme');
            tintRadio.checked = true;
            saveAndApply('tint', tintColor);
        });
    }

    // Carica il tema salvato all'avvio
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedColor = localStorage.getItem('tintColor') || '#007aff';
    
    if(colorPicker) colorPicker.value = savedColor;
    
    const currentRadio = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
    if (currentRadio) {
        currentRadio.checked = true;
    }
    
    applyTheme(savedTheme, savedColor);
});
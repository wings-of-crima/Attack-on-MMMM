let currentDifficulty = 'simple';
let currentLength = 'short';
let itemData = null;
let currentNarrativeList = []; // Lista degli ID nella narrativa attuale
let currentIndex = -1;

async function loadItemData() {
    try {
        const response = await fetch('items.json');
        const data = await response.json();
        
        // 1. Leggiamo i parametri dall'URL (es: item.html?id=watch&narrative=legend)
        const urlParams = new URLSearchParams(window.location.search);
        const itemId = urlParams.get('id');
        const narrativeName = urlParams.get('narrative') || 'historical'; // Default se manca

        // 2. Recuperiamo la lista degli ID per la narrativa selezionata
        currentNarrativeList = data.narratives[narrativeName];

        // 3. Cerchiamo l'oggetto specifico nel database globale (items)
        itemData = data.items.find(i => i.id === itemId);

        // Backup: se l'ID non esiste, carichiamo il primo della narrativa
        if (!itemData) {
            itemData = data.items.find(i => i.id === currentNarrativeList[0]);
        }

        // 4. Troviamo la posizione attuale per gestire la navigazione (Opzionale)
        currentIndex = currentNarrativeList.indexOf(itemId);

        populatePage();
    } catch (error) {
        console.error("Errore caricamento dati:", error);
    }
}

function populatePage() {
    if (!itemData) return;

    // Titolo in cima (Display Title)
    const mainTitle = document.getElementById('item-title');
    if (mainTitle) mainTitle.innerText = itemData.displayTitle;

    // Immagini
    document.getElementById('main-img-real').src = itemData.images.real;
    document.getElementById('main-img-anime').src = itemData.images.anime;

    // Metadati tecnici nel box
    document.getElementById('meta-title').innerText = itemData.metadata.title;
    document.getElementById('meta-type').innerText = itemData.metadata.type;
    document.getElementById('meta-year').innerText = itemData.metadata.year;
    document.getElementById('meta-institution').innerText = itemData.metadata.institution;

    updateNavigation();
    
    updateDisplay();
}

function setDifficulty(level) {
    currentDifficulty = level;
    updateDisplay();
}

function setLength(len) {
    currentLength = len;
    updateDisplay();
}

function updateDisplay() {
    if (!itemData) return;
    const textContainer = document.getElementById('dynamic-text');
    if (textContainer) {
        textContainer.innerText = itemData.texts[currentDifficulty][currentLength];
    }
}

window.addEventListener("DOMContentLoaded", loadItemData);

function updateNavigation() {
    const prevBtn = document.getElementById('prev-item');
    const nextBtn = document.getElementById('next-item');
    
    // Recuperiamo il nome della narrativa dall'URL attuale per mantenerla
    const urlParams = new URLSearchParams(window.location.search);
    const narrativeName = urlParams.get('narrative') || 'historical';

    // Gestione tasto PREV
    if (currentIndex > 0) {
        const prevId = currentNarrativeList[currentIndex - 1];
        prevBtn.href = `single narrative.html?id=${prevId}&narrative=${narrativeName}`;
        prevBtn.classList.remove('nav-hidden');
    } else {
        prevBtn.classList.add('nav-hidden');
    }

    // Gestione tasto NEXT
    if (currentIndex < currentNarrativeList.length - 1) {
        const nextId = currentNarrativeList[currentIndex + 1];
        nextBtn.href = `single narrative.html?id=${nextId}&narrative=${narrativeName}`;
        nextBtn.classList.remove('nav-hidden');
    } else {
        nextBtn.classList.add('nav-hidden');
    }
}
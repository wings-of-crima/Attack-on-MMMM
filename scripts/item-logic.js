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
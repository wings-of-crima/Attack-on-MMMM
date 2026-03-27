let currentDifficulty = 'simple';
let currentLength = 'short';
let itemData = null;
let currentNarrativeList = []; // current narrative IDs list
let currentIndex = -1;

async function loadItemData() {
    try {
        const response = await fetch('items.json');
        const data = await response.json();
        
        const urlParams = new URLSearchParams(window.location.search);
        const narrativeName = urlParams.get('narrative') || 'historical'; 
        let itemId = urlParams.get('id'); // use let because we could overwrite it

        // 1. retrieve the list of IDs for the selected fiction
        currentNarrativeList = data.narratives[narrativeName] || [];

        // 2. IF THE ID IS MISSING (as is the case with the Home page), we take the first item in the list
        if (!itemId && currentNarrativeList.length > 0) {
            itemId = currentNarrativeList[0];
        }

        // 3. We search for the specific object in the global database
        itemData = data.items.find(i => i.id === itemId);

        // 4. We update the current index for navigation (crucial!)
        currentIndex = currentNarrativeList.indexOf(itemId);

        populatePage();
    } catch (error) {
        console.error("Errore caricamento dati:", error);
    }
}

function populatePage() {
    if (!itemData) return;

    // Title (Display Title)
    const mainTitle = document.getElementById('item-title');
    if (mainTitle) mainTitle.innerText = itemData.displayTitle;

    // Images
    document.getElementById('main-img-real').src = itemData.images.real;
    document.getElementById('main-img-anime').src = itemData.images.anime;

    // Alt for images
    document.getElementById('main-img-real').alt = itemData.images.altReal;
    document.getElementById('main-img-anime').alt = itemData.images.altAnime;

    // Technical metadata in the box
    document.getElementById('meta-title').innerText = itemData.metadata.title;
    document.getElementById('meta-type').innerText = itemData.metadata.type;
    document.getElementById('meta-period').innerText = itemData.metadata.period;
    const instElement = document.getElementById('meta-institution');
    const instName = itemData.metadata.institution;
    const instUrl = itemData.metadata.institutionUrl; // Prende l'URL dal JSON

    if (instUrl) {
        // If there is a URL, the name of the institution becomes a link
        instElement.innerHTML = `<a href="${instUrl}" target="_blank" style="color: inherit; text-decoration: underline;">${instName}</a>`;
    } else {
        // If there is no URL, it remains plain text
        instElement.innerText = instName;
    }
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
    
    // retrieve the story title from the current URL to preserve it
    const urlParams = new URLSearchParams(window.location.search);
    const narrativeName = urlParams.get('narrative') || 'historical';

    // PREV button
    if (currentIndex > 0) {
        const prevId = currentNarrativeList[currentIndex - 1];
        prevBtn.href = `single_narrative.html?id=${prevId}&narrative=${narrativeName}`;
        prevBtn.classList.remove('nav-hidden');
    } else {
        prevBtn.classList.add('nav-hidden');
    }

    // NEXT button
    if (currentIndex < currentNarrativeList.length - 1) {
        const nextId = currentNarrativeList[currentIndex + 1];
        nextBtn.href = `single_narrative.html?id=${nextId}&narrative=${narrativeName}`;
        nextBtn.classList.remove('nav-hidden');
    } else {
        nextBtn.classList.add('nav-hidden');
    }
    
}

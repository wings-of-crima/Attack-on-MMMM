window.addEventListener("load", ()  =>{
    const preLoader = document.getElementById("pre-loader");

    preLoader.classList.add("fade-out");

    setTimeout(() => {
        preLoader.remove();
    }, 1000);
});

const gateSfx = document.getElementById("gate-sfx");
const enterButton = document.getElementById("enter-button");
const loadScreen = document.getElementById("loader-screen");


enterButton.addEventListener("click", () => {
    loadScreen.classList.add("fade-out");

    gateSfx.currentTime = 0.5; 
    gateSfx.play()
    gateSfx.volume = 0.3;
    console.log("Welcome to Trost, the Shiganshina District where everything started...");
    setTimeout(() => {
        loadScreen.remove();
    }, 5900);
});

// function updateNavbarHeight() {
    // 1. Grab the navbar element
    // const navbar = document.querySelector('.navbar');
    
    // 2. Get its calculated height in pixels
    //if (navbar) {
        //const rect = navbar.getBoundingClientRect(); /* for precise decimal values */
        //const height = rect.height;
        
        // 3. Send this value to CSS as a variable named '--navbar-height'
        //document.documentElement.style.setProperty('--navbar-height:', height + 'px');
    //}
//}

// Run this function as soon as the page loads
//window.addEventListener('load', updateNavbarHeight);
// Run it again if the user resizes the browser (so it stays accurate)
//window.addEventListener('resize', updateNavbarHeight);
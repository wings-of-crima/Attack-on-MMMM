// ==========================================
// Pre-loader and loader JS:
// ==========================================
window.addEventListener("load", () => {
    const preLoader = document.getElementById("pre-loader");
    const loadScreen = document.getElementById("loader-screen");
    const bgVideo = document.getElementById("bg-video");
    const enterButton = document.getElementById("enter-button");
    const gateSfx = document.getElementById("gate-sfx");

    const shouldSkipIntro =
        window.skipIntro === true ||
        document.documentElement.classList.contains("skip-intro");

    if (shouldSkipIntro) {
        if (preLoader) preLoader.remove();
        if (loadScreen) loadScreen.remove();

        if (bgVideo) {
            bgVideo.pause();
            bgVideo.removeAttribute("src");
            while (bgVideo.firstChild) {
                bgVideo.removeChild(bgVideo.firstChild);
            }
            bgVideo.load();
            bgVideo.remove();
        }

        return;
    }

    if (preLoader) {
        preLoader.classList.add("fade-out");
        setTimeout(() => {
            preLoader.remove();
        }, 1000);
    }

    const textContainer = document.getElementById("loader-screen-text");
    if (textContainer) {
        const typeText = 'Year 845. "That day, the human race remembered... the terror of being dominated by them... and the shame of being held captive in a birdcage."';

        textContainer.innerHTML = '<span id="typewriter-text"></span><span class="typewriter-cursor">&#8203;</span>';
        const textSpan = document.getElementById("typewriter-text");

        let i = 0;
        const speed = 65;

        function typeWriter() {
            if (i < typeText.length) {
                textSpan.innerHTML += typeText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                setTimeout(() => {
                    if (enterButton) {
                        enterButton.classList.add("show-button");
                    }
                }, 200);
            }
        }

        setTimeout(typeWriter, 800);
    }

    if (enterButton) {
        enterButton.addEventListener("click", () => {
            if (loadScreen) loadScreen.classList.add("fade-out");

            if (gateSfx) {
                gateSfx.currentTime = 0.5;
                gateSfx.play();
                gateSfx.volume = 0.5;
            }

            if (bgVideo) {
                bgVideo.pause();
                bgVideo.removeAttribute("src");
                while (bgVideo.firstChild) {
                    bgVideo.removeChild(bgVideo.firstChild);
                }
                bgVideo.load();
                bgVideo.remove();
            }

            setTimeout(() => {
                if (loadScreen) loadScreen.remove();
            }, 3000);
        });
    }
});


// ==========================================
// Audio Toggle Logic
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    // Get the audio element and the button by their HTML IDs
    const audio = document.getElementById("narration");
    const toggleBtn = document.getElementById("toggleAudio");

    // Only run this if the elements actually exist on the page
    if (audio && toggleBtn) {
        toggleBtn.addEventListener("click", function() {
            if (audio.paused) {
                // If paused, play the audio
                audio.play();
                toggleBtn.textContent = "Pause Audio";
                
                // Optional: Change button color (Bootstrap classes)
                toggleBtn.classList.remove("btn-primary");
                toggleBtn.classList.add("btn-danger"); 
            } else {
                // If playing, pause the audio
                audio.pause();
                toggleBtn.textContent = "Play Audio";
                
                // Optional: Revert button color
                toggleBtn.classList.remove("btn-danger");
                toggleBtn.classList.add("btn-primary");
            }
        });

        // Reset the button when the audio finishes playing naturally
        audio.addEventListener("ended", function() {
            toggleBtn.textContent = "Play Audio";
            toggleBtn.classList.remove("btn-danger");
            toggleBtn.classList.add("btn-primary");
        });
    }
});

// Example: tap card to toggle overlay on touch/mobile
document.addEventListener("click", (event) => {
  const card = event.target.closest(".manga-panel .card");
  if (!card) return;

  // Limit this behavior to touch/mobile contexts
  const isTouchLike =
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(max-width: 768px)").matches;

  if (!isTouchLike) return;

  event.preventDefault();

  // Optional: close others first
  document
    .querySelectorAll(".manga-panel .card.overlay-open")
    .forEach((c) => {
      if (c !== card) c.classList.remove("overlay-open");
    });

  card.classList.toggle("overlay-open");
});

// Optional: tap outside closes any open overlay
document.addEventListener("click", (event) => {
  const insideCard = event.target.closest(".manga-panel .card");
  if (insideCard) return;

  document
    .querySelectorAll(".manga-panel .card.overlay-open")
    .forEach((c) => c.classList.remove("overlay-open"));
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

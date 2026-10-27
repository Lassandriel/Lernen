    let klicks = 0
    function begruessen() {
      const vorname = document.getElementById("Vorname").value;
      const nachname = document.getElementById("Nachname").value;
      if (vorname === "") {
        alert("Bitte gib einen Vornamen ein!")
      } else {
        document.getElementById("Ausgabe").textContent = `Hallo ${vorname} ${nachname}!`;
        document.getElementById("Ausgabe").style.color = nachname;
        if (klicks >= 3) {
          alert("Stop hör auf damit!")
        } else {
          klicks++;
          alert(`Hallo! Schon ${klicks}-mal geklickt!`);
        }
      }

    }
const begruessenBtn = document.getElementById("begruessen-btn")
if (begruessenBtn) {
  begruessenBtn.addEventListener("click", begruessen);
}
    const seiten = [      
      {name: "Startseite", url: "index.html"},
      {name: "Über mich", url: "about-me.html"},
      {name: "Shortcuts", url: "shortcuts.html"},
      { name: "Tagebuch", url: "diary.html" },
    
    ];
    
    const navContainer = document.getElementById("nav-links")
    for (const seite of seiten){
      navContainer.innerHTML += `<a href="${seite.url}">${seite.name}</a>
      `
      } 
      navContainer.innerHTML += `<button id="theme-toggle">🌙</button>`

    const footer = document.getElementById("fusszeile")
      const jahr = new Date().getFullYear();
    footer.innerHTML = `<p>Lassandriel - Hobby-Developer und Liebhaber von Flügeln! &copy; ${jahr}</p>`;
    
// -------------------------------------------------------------------  
// Tagebuch Einträger hier rein!
// -------------------------------------------------------------------

const tagebuchContainer = document.getElementById("tagebuch-eintraege");
const eintraege = [
  {
    datum: "22. Oktober 2026",
    titel: "Heute gelernt: Git, Terminal & Flexbox",
    text: "Heute habe ich mich mehr mit JS rumgeärgert. CSS ist immernoch super einfach und leicht zu verstehen. HTML selber ist in ordnung. Aber JS ist mein Hasskind."
  },
  {
    datum: "24. Oktober 2026",
    titel: "Meilenstein: Saubere Events & Daten",
    text: "HTML und JS komplett getrennt mit addEventListener. Tagebucheinträge werden jetzt dynamisch generiert!"
  },
  {
    datum: "25. Oktober 2026",
    titel: "Dark Mode, Live-Wetter & Einstieg in Python",
    text: "Heute habe ich einen universellen Dark Mode mit classList.toggle gebaut und echte Wetterdaten über eine API mit fetch geladen. Danach ging es direkt mit Python los: print, input, if/else und Schleifen ohne geschweifte Klammern!"
  },
];
// -------------------------------------------------------------------
if (tagebuchContainer) {
  for (const eintrag of eintraege) {
    tagebuchContainer.innerHTML += `
      <article class="karte tagebuch-eintrag">
        <span class="datum">${eintrag.datum}</span>
        <h3>${eintrag.titel}</h3>
        <p>${eintrag.text}</p>
      </article>
    `;
  }
}

const eintragBtn = document.getElementById("eintrag-btn");
if (eintragBtn) {
  eintragBtn.addEventListener ("click", eintragSpeichern);
}

function eintragSpeichern() {
  const titel = document.getElementById("titel-input").value;
  const text =document.getElementById("text-input").value;
  const datum = "Heute";
  if (titel === "") {
        alert("Bitte gib einen Titel ein!")
      } else {
        if (text === "") {
          alert("Bitte gib einen Text ein!")
        } else {
          tagebuchContainer.innerHTML += `
      <article class="karte tagebuch-eintrag">
        <span class="datum">${datum}</span>
        <h3>${titel}</h3>
        <p>${text}</p>
      </article>
    `;
      document.getElementById("titel-input").value = "";
      document.getElementById("text-input").value = "";
        }
      }

    }
// -------------------------------------------------------------------  
// Theme Toggle
// -------------------------------------------------------------------
const toggleBtn = document.getElementById("theme-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", toggle);
}
function toggle() {
  document.body.classList.toggle("dark");
}

// -------------------------------------------------------------------  
// Wetter fetch
// -------------------------------------------------------------------


async function ladeWetter() {
  const antwort =  await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m")
  const daten = await antwort.json();
  console.log(daten);
  const anzeige = document.getElementById("wetter-anzeige");
let icon ="☀"
if (daten.current.temperature_2m < 15) {
  icon = "❄"}
if (anzeige) {
  anzeige.textContent = `${icon} Aktuell: ${daten.current.temperature_2m} °C`;
}
}
ladeWetter();
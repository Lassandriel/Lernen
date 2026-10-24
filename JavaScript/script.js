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
      navContainer.innerHTML += `<a href="${seite.url}">${seite.name}</a>`
    }

    const footer = document.getElementById("fusszeile")
      const jahr = new Date().getFullYear();
    footer.innerHTML = `<p>Lassandriel - Hobby-Developer und Liebhaber von Flügeln! &copy; ${jahr}</p>`;
    
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
  }
];

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


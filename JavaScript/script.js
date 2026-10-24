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
    

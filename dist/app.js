// Dane projektów — tutaj zmienisz nazwy, opisy, zdjęcia i kategorie.
const projects = [
  {
    name: "MRV-01 Rover",
    type: "mobile",
    label: "ROBOT MOBILNY",
    image: "photo-1581092921461-eab62e97a780",
    desc: "Mobilna platforma inspekcyjna do poznawania trudno dostępnych przestrzeni i zbierania danych o otoczeniu.",
    goal: "Wsparcie inspekcji w obiektach przemysłowych i ograniczenie potrzeby wchodzenia człowieka w trudno dostępne miejsca.",
    solution:
      "Koncepcja platformy kołowej z kamerami, czujnikami odległości i mapowaniem otoczenia. Operator wyznacza obszar pracy, a robot pomaga zebrać i uporządkować obserwacje.",
    tags: ["Inspekcje", "Mapowanie", "Platforma kołowa"],
  },
  {
    name: "SkyScan",
    type: "drone",
    label: "DRON INSPEKCYJNY",
    image: "photo-1506947411487-a56738267384",
    desc: "Powietrzna perspektywa dla infrastruktury. Koncepcja drona do dokumentacji i oględzin obiektów.",
    goal: "Ułatwienie obserwacji dachów, konstrukcji i infrastruktury bez organizowania dostępu na wysokości.",
    solution:
      "Proponowany system łączy drona z kamerą, planowanie trasy oraz uporządkowaną dokumentację zdjęciową. Zakres autonomii i wyposażenie wymagałyby ustalenia na etapie projektu.",
    tags: ["Dokumentacja", "Planowanie tras", "Obserwacja"],
  },
  {
    name: "Cargo Move",
    type: "mobile",
    label: "ROBOT TRANSPORTOWY",
    image: "photo-1581092160562-40aa08e78837",
    desc: "Pomysł na autonomiczny transport materiałów między stanowiskami w magazynie lub zakładzie.",
    goal: "Odciążenie zespołu od powtarzalnego transportu wewnętrznego i uporządkowanie przepływu materiałów.",
    solution:
      "Koncepcja robota mobilnego poruszającego się między zdefiniowanymi punktami. Projekt zakłada analizę tras, dobór udźwigu i opracowanie reakcji na przeszkody przed wdrożeniem.",
    tags: ["Logistyka", "Nawigacja", "Transport"],
  },
  {
    name: "Terra Eye",
    type: "drone",
    label: "DRON MAPUJĄCY",
    image: "photo-1473448912268-2022ce9509d8",
    desc: "Koncepcja systemu do obserwacji terenów zielonych i tworzenia dokumentacji z powietrza.",
    goal: "Dostarczanie porównywalnych obserwacji terenu, przydatnych w planowaniu prac i śledzeniu zmian w otoczeniu.",
    solution:
      "Propozycja misji pomiarowych z zaplanowanym pokryciem terenu i zdjęciami przypisanymi do lokalizacji. Rodzaj sensorów i dokładność danych pozostają do określenia podczas analizy potrzeb.",
    tags: ["Monitoring terenu", "Fotogrametria", "Dane przestrzenne"],
  },
];
// Elementy strony używane przez skrypt.
const projectGrid = document.querySelector("#project-grid"),
  dialog = document.querySelector("#detail"),
  dialogContent = document.querySelector("#dialog-content");
// Wyświetlanie kart i aktualizacja aktywnego filtra.
function renderProjects(filter = "all") {
  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.type === filter,
  );
  projectGrid.innerHTML = filteredProjects
    .map(
      (project) =>
        `<button class="project-card" data-project="${projects.indexOf(project)}" aria-label="Zobacz projekt ${project.name}">
        <div class="project-image">
        <img loading="lazy" src="https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=1000&q=80" alt="${project.type === "drone" ? "Fotografia ilustracyjna projektu powietrznego" : "Fotografia ilustracyjna technologii przemysłowych"}">
        <span class="badge">${project.label}</span>
        <span class="arrow">↗</span>
        </div>
        <div class="project-title">
        <h3>${project.name}</h3>
        <span>KONCEPCJA / 2026</span>
        </div>
        <p>${project.desc}</p>
        </button>`,
    )
    .join("");
  document.querySelector("#count").textContent =
    `0${filteredProjects.length} PROJEKTY`;
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filter);
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filter === filter),
    );
  });
}
// Filtry projektów i odnośniki z sekcji technologii.
document
  .querySelectorAll("[data-filter]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      renderProjects(button.dataset.filter),
    ),
  );
document
  .querySelectorAll("[data-tech]")
  .forEach((link) =>
    link.addEventListener("click", () => renderProjects(link.dataset.tech)),
  );
// Otwieranie szczegółów wybranego projektu.
projectGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-project]");
  if (!button) return;
  const project = projects[+button.dataset.project];
  dialogContent.innerHTML = `<p class="eyebrow">${project.label} / KONCEPCJA</p>
        <h2>${project.name}</h2>
        <p>${project.desc}</p>
        <h3>Cel projektu</h3>
        <p>${project.goal}</p>
        <h3>Proponowane rozwiązanie</h3>
        <p>${project.solution}</p>
        <div class="tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        <p class="project-note">Przykładowa propozycja. Opis nie potwierdza gotowego produktu ani realizacji Morwis.</p>`;
  dialog.showModal();
});
// Zamykanie okna przyciskiem, klawiszem Escape (natywnie) lub kliknięciem tła.
document.querySelector(".close").onclick = () => dialog.close();
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const dialogBounds = dialog.getBoundingClientRect();
    if (
      event.clientX < dialogBounds.left ||
      event.clientX > dialogBounds.right ||
      event.clientY < dialogBounds.top ||
      event.clientY > dialogBounds.bottom
    )
      dialog.close();
  }
});
// Formularz briefu działa lokalnie — kopiuje tekst, nie wysyła wiadomości.
document.querySelector("#contact-button").onclick = () => {
  dialogContent.innerHTML = `<p class="eyebrow">ZACZNIJMY OD POMYSŁU</p>
        <h2>Przygotuj zapytanie</h2>
        <p>Opisz zadanie, środowisko pracy i oczekiwany rezultat. Skopiuj brief, aby wykorzystać go w rozmowie z firmą. Dane kontaktowe Morwis zostaną uzupełnione po ich potwierdzeniu.</p>
        <label for="brief">Twój brief</label>
        <textarea id="brief">Chcę zautomatyzować: \nŚrodowisko pracy: \nPreferowana platforma (robot / dron): \nOczekiwany rezultat: \nPlanowany termin: </textarea>
        <button class="button" id="copy">Kopiuj brief ↗</button>
        <p id="copy-status" role="status">
        </p>`;
  dialog.showModal();
  document.querySelector("#copy").onclick = async () => {
    const field = document.querySelector("#brief");
    try {
      await navigator.clipboard.writeText(field.value);
      document.querySelector("#copy-status").textContent = "Brief skopiowany.";
    } catch {
      field.select();
      document.querySelector("#copy-status").textContent =
        "Zaznaczono brief. Skopiuj go skrótem Ctrl+C lub z menu urządzenia.";
    }
  };
};
renderProjects();

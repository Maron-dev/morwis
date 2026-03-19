const button = document.getElementById("themeButton");

const themes = [
  { accent: "#7c8cff", accent2: "#63e6be" },
  { accent: "#ff7eb6", accent2: "#ffd166" },
  { accent: "#6ea8fe", accent2: "#c77dff" }
];

let index = 0;

button?.addEventListener("click", () => {
  index = (index + 1) % themes.length;
  document.documentElement.style.setProperty("--accent", themes[index].accent);
  document.documentElement.style.setProperty("--accent-2", themes[index].accent2);
});

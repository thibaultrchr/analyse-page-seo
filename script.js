document.getElementById("analyzeBtn").addEventListener("click", function () {
  const url = document.getElementById("urlInput").value;
  const output = document.getElementById("output");

  if (!url) {
    output.innerHTML = "<p>Veuillez entrer une URL valide.</p>";
    return;
  }

  output.innerHTML = "<p>Analyse en cours…</p>";

  // API publique pour contourner les restrictions CORS
  const apiUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);

  fetch(apiUrl)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const title = doc.querySelector("title")?.innerText || "Non trouvé";
      const description = doc.querySelector("meta[name='description']")?.content || "Non trouvée";
      const canonical = doc.querySelector("link[rel='canonical']")?.href || "Non trouvée";
      const robots = doc.querySelector("meta[name='robots']")?.content || "Non spécifié";

      const h1 = Array.from(doc.querySelectorAll("h1")).map(h => h.innerText);
      const h2 = Array.from(doc.querySelectorAll("h2")).map(h => h.innerText);

      const textContent = doc.body.innerText || "";
      cons

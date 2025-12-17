document.getElementById("analyzeBtn").addEventListener("click", function () {
  const url = document.getElementById("urlInput").value.trim();
  const output = document.getElementById("output");

  if (!url) {
    output.innerHTML = "<p>Veuillez entrer une URL valide.</p>";
    return;
  }

  output.innerHTML = "<p>Analyse en cours…</p>";

  // Proxy CORS plus fiable
  const apiUrl = "https://r.jina.ai/http://" + url.replace(/^https?:\/\//, "");

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

      const textContent = doc.body?.innerText || "";
      const wordCount = textContent.trim() ? textContent.trim().split(/\s+/).length : 0;

      output.innerHTML = `
        <h3>Balises principales</h3>
        <ul>
          <li><strong>Title :</strong> ${title}</li>
          <li><strong>Meta description :</strong> ${description}</li>
          <li><strong>Canonical :</strong> ${canonical}</li>
          <li><strong>Meta robots :</strong> ${robots}</li>
          <li><strong>Nombre de mots :</strong> ${wordCount}</li>
        </ul>

        <h3>Structure des titres</h3>
        <p><strong>H1 :</strong></p>
        <ul>${h1.length ? h1.map(h => `<li>${h}</li>`).join("") : "<li>Aucun H1 trouvé</li>"}</ul>

        <p><strong>H2 :</strong></p>
        <ul>${h2.length ? h2.map(h => `<li>${h}</li>`).join("") : "<li>Aucun H2 trouvé</li>"}</ul>
      `;
    })
    .catch(() => {
      output.innerHTML = `
        <p><strong>Impossible d’analyser cette URL.</strong></p>
        <p>Le site bloque peut-être l’accès externe ou n’est pas accessible.</p>
      `;
    });
});

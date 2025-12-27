document.getElementById("analyzeBtn").addEventListener("click", function () {
  const url = document.getElementById("urlInput").value.trim();
  const output = document.getElementById("output");

  if (!url.startsWith("http")) {
    output.innerHTML = "<p>Merci d’entrer une URL complète (avec https://)</p>";
    return;
  }

  output.innerHTML = "<p>Analyse en cours…</p>";

  const apiUrl = "https://r.jina.ai/" + url;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur de récupération");
      }
      return response.text();
    })
    .then(text => {
      // Extraction simple via regex (plus fiable que DOMParser ici)
      const titleMatch = text.match(/Title:\s*(.*)/i);
      const descriptionMatch = text.match(/Description:\s*(.*)/i);

      const title = titleMatch ? titleMatch[1] : "Non trouvé";
      const description = descriptionMatch ? descriptionMatch[1] : "Non trouvée";

      const wordCount = text.split(/\s+/).length;

      output.innerHTML = `
        <h3>Résultats SEO</h3>
        <ul>
          <li><strong>Title :</strong> ${title}</li>
          <li><strong>Meta description :</strong> ${description}</li>
          <li><strong>Nombre de mots (approx.) :</strong> ${wordCount}</li>
        </ul>

        <p style="font-size:14px;opacity:.7;">
          Analyse basée sur le contenu textuel accessible publiquement.
        </p>
      `;
    })
    .catch(() => {
      output.innerHTML = `
        <p><strong>Analyse impossible.</strong></p>
        <p>Le site bloque peut-être l’accès ou l’URL est invalide.</p>
      `;
    });
});

import Sortable from "./sortable.complete.esm.js";

// Use Sortable.js to create a sortable container for images
const list = document.querySelector("div");
const btnConvert = document.querySelector("a.convert");
const sort = Sortable.create(list);

btnConvert.addEventListener("click", function () {
  const images = document.querySelectorAll("img");
  const loader = document.querySelector("span.loader");
  const convertText = document.querySelector("span.text");
  const btnDownload = document.querySelector("a.download");

  const filenames = Array.from(images).map((image) => image.dataset.name);

  loader.style.display = "inline-block";
  convertText.style.display = "none";

  const convertAndDownloadPDF = async () => {
    try {
      const response = await fetch("/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filenames),
      });

      const data = await response.text();

      setTimeout(() => {
        btnConvert.style.display = "none";
        loader.style.display = "none";
        convertText.style.display = "inline-block";
        btnDownload.style.display = "inline-block";

        btnDownload.href = data;
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  convertAndDownloadPDF();
});

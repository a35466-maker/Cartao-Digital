document.addEventListener("DOMContentLoaded", () => {
  const shareBtn = document.getElementById("share-btn");
  const sharePop = document.getElementById("share-pop");
  const exportBtn = document.getElementById("export-jpg");
  const root = document.getElementById("card-root");

  if (!shareBtn || !sharePop) return;

  // Alternar popover
  shareBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sharePop.classList.toggle("open");
  });

  // Impedir fechar clicando dentro
  sharePop.addEventListener("click", (e) => e.stopPropagation());

  // Fechar clicando fora
  document.addEventListener("click", () => sharePop.classList.remove("open"));

  // Exportar JPG
  exportBtn.addEventListener("click", async () => {
    sharePop.classList.remove("open");

    if (!html2canvas) {
      alert("html2canvas não carregado");
      return;
    }

    try {
      const canvas = await html2canvas(root, { scale: 2, useCORS: true });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 0.92);
      link.download = "CartaoDigital.jpg";
      link.click();
    } catch (err) {
      console.error(err);
      alert("Erro ao exportar JPG.");
    }
  });
});

const sayfaAdi = window.location.pathname.split("/").pop();
const linkler = document.querySelectorAll(".menu a");
linkler.forEach(function (link) {
  const href = link.getAttribute("href");
  if (href === sayfaAdi || (sayfaAdi === "" && href === "index.html")) {
    link.classList.add("aktif");
  } else {
    link.classList.remove("aktif");
  }
});
const kartlar = document.querySelectorAll(".kart");
const gozlemci = new IntersectionObserver(
  function (girisler) {
    girisler.forEach(function (giris, i) {
      if (giris.isIntersecting) {
        setTimeout(function () {
          giris.target.classList.add("goster");
        }, i * 90);
        gozlemci.unobserve(giris.target);
      }
    });
  },
  { threshold: 0.15 }
);
kartlar.forEach(function (kart) {
  gozlemci.observe(kart);
});

document.addEventListener('DOMContentLoaded', () => {
  const kalpFormu = document.getElementById('kalpFormu');
  const sonuclarKutusu = document.getElementById('sonuclar');

  const bolgeler = [
    { ad: "Isınma", altYuzde: 0.50, ustYuzde: 0.60 },
    { ad: "Yağ Yakımı", altYuzde: 0.60, ustYuzde: 0.70 },
    { ad: "Kardiyo", altYuzde: 0.70, ustYuzde: 0.80 },
    { ad: "Zor Antrenman", altYuzde: 0.80, ustYuzde: 0.90 },
    { ad: "Maksimum Efor", altYuzde: 0.90, ustYuzde: 1.00 },
  ];

  kalpFormu.addEventListener('submit', (e) => {
    e.preventDefault();

    const yas = parseInt(document.getElementById('yas').value);
    const dinlenme = parseFloat(document.getElementById('dinlenme').value);

    if (!yas) return;

    const mhrKlasik = 220 - yas;
    const mhrTanaka = Math.round(208 - (0.7 * yas));

    let bolgeKartlari = "";
    bolgeler.forEach((bolge) => {
      let alt, ust;
      if (dinlenme) {
        alt = Math.round((mhrKlasik - dinlenme) * bolge.altYuzde + dinlenme);
        ust = Math.round((mhrKlasik - dinlenme) * bolge.ustYuzde + dinlenme);
      } else {
        alt = Math.round(mhrKlasik * bolge.altYuzde);
        ust = Math.round(mhrKlasik * bolge.ustYuzde);
      }
      bolgeKartlari += `
        <div class="sonuc-karti">
          <h3>${bolge.ad} (%${bolge.altYuzde * 100}-${bolge.ustYuzde * 100})</h3>
          <div class="deger">${alt} - ${ust} <small>bpm</small></div>
        </div>
      `;
    });

    sonuclarKutusu.innerHTML = `
      <div class="sonuc-karti">
        <h3>Maksimum Kalp Hızı</h3>
        <div class="deger" style="color:#4f8a1e; font-size:1.5rem;">${mhrKlasik} <small>bpm</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Tanaka Formülü</h3>
        <div class="deger">${mhrTanaka} <small>bpm</small></div>
      </div>
      ${bolgeKartlari}
    `;
    sonuclarKutusu.classList.remove('gizli');
  });
});

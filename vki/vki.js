document.addEventListener('DOMContentLoaded', () => {
  const vkiFormu = document.getElementById('vkiFormu');
  const sonuclarKutusu = document.getElementById('sonuclar');

  vkiFormu.addEventListener('submit', (e) => {
    e.preventDefault();

    const boy = parseFloat(document.getElementById('boy').value);
    const kilo = parseFloat(document.getElementById('kilo').value);

    if (!boy || !kilo) return;

    const boyMetre = boy / 100;
    const vki = (kilo / (boyMetre * boyMetre)).toFixed(1);

    let durum = "";
    let renkKodu = "";

    if (vki < 18.5) {
      durum = "Zayıf";
      renkKodu = "#f59e0b";
    } else if (vki >= 18.5 && vki <= 24.9) {
      durum = "Normal Kilo";
      renkKodu = "#4f8a1e";
    } else if (vki >= 25 && vki <= 29.9) {
      durum = "Fazla Kilolu";
      renkKodu = "#f59e0b";
    } else if (vki >= 30 && vki <= 34.9) {
      durum = "1. Derece Obez";
      renkKodu = "#ef4444";
    } else {
      durum = "2. Derece / Morbid Obez";
      renkKodu = "#dc2626";
    }

    const idealKiloAltLimit = (18.5 * (boyMetre * boyMetre)).toFixed(1);
    const idealKiloUstLimit = (24.9 * (boyMetre * boyMetre)).toFixed(1);

    sonuclarKutusu.innerHTML = `
      <div class="sonuc-karti">
        <h3>VKİ Değeriniz</h3>
        <div class="deger" style="color: ${renkKodu}">${vki}</div>
      </div>
      <div class="sonuc-karti">
        <h3>Durumunuz</h3>
        <div class="deger" style="color: ${renkKodu}">${durum}</div>
      </div>
      <div class="sonuc-karti">
        <h3>İdeal Kilo Aralığınız</h3>
        <div class="deger" style="color: #4f8a1e; font-size: 1.25rem;">
          ${idealKiloAltLimit} - ${idealKiloUstLimit} <small>kg</small>
        </div>
      </div>
    `;
    sonuclarKutusu.classList.remove('gizli');
  });
});

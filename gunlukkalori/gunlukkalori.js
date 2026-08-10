document.addEventListener('DOMContentLoaded', () => {
  const kaloriFormu = document.getElementById('kaloriFormu');
  const sonuclarKutusu = document.getElementById('sonuclar');

  kaloriFormu.addEventListener('submit', (e) => {
    e.preventDefault();

    const cinsiyet = document.querySelector('input[name="cinsiyet"]:checked').value;
    const yas = parseInt(document.getElementById('yas').value);
    const boy = parseFloat(document.getElementById('boy').value);
    const kilo = parseFloat(document.getElementById('kilo').value);
    const aktivite = parseFloat(document.getElementById('aktivite').value);

    if (!yas || !boy || !kilo) return;

    let bmh = 0;
    if (cinsiyet === 'erkek') {
      bmh = (10 * kilo) + (6.25 * boy) - (5 * yas) + 5;
    } else {
      bmh = (10 * kilo) + (6.25 * boy) - (5 * yas) - 161;
    }

    const gunlukKalori = Math.round(bmh * aktivite);

    const kiloVerme = Math.round(gunlukKalori - 400);
    const kiloAlmaTemiz = Math.round(gunlukKalori + 300);
    const kiloAlmaHizli = Math.round(gunlukKalori + 500);

    sonuclarKutusu.innerHTML = `
      <div class="sonuc-karti">
        <h3>Bazal Metabolizma (BMH)</h3>
        <div class="deger">${Math.round(bmh)} <small>kcal</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Kilo Koruma Kalorisi</h3>
        <div class="deger">${gunlukKalori} <small>kcal</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Kilo Verme (-400 kcal)</h3>
        <div class="deger">${kiloVerme} <small>kcal</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Temiz Kilo Alma (+300 kcal)</h3>
        <div class="deger">${kiloAlmaTemiz} <small>kcal</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Hızlı Kilo Alma (+500 kcal)</h3>
        <div class="deger">${kiloAlmaHizli} <small>kcal</small></div>
      </div>
    `;

    sonuclarKutusu.classList.remove('gizli');
  });
});

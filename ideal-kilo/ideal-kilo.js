document.addEventListener('DOMContentLoaded', () => {
  const idealFormu = document.getElementById('idealFormu');
  const sonuclarKutusu = document.getElementById('sonuclar');

  idealFormu.addEventListener('submit', (e) => {
    e.preventDefault();

    const cinsiyet = document.querySelector('input[name="cinsiyet"]:checked').value;
    const boy = parseFloat(document.getElementById('boy').value);

    if (!boy) return;

    const boyInc = boy / 2.54;
    const fazlaInc = Math.max(0, boyInc - 60);

    let devine, robinson, miller, hamwi;
    if (cinsiyet === 'erkek') {
      devine   = 50   + 2.3  * fazlaInc;
      robinson = 52   + 1.9  * fazlaInc;
      miller   = 56.2 + 1.41 * fazlaInc;
      hamwi    = 48   + 2.7  * fazlaInc;
    } else {
      devine   = 45.5 + 2.3  * fazlaInc;
      robinson = 49   + 1.7  * fazlaInc;
      miller   = 53.1 + 1.36 * fazlaInc;
      hamwi    = 45.5 + 2.2  * fazlaInc;
    }

    const ortalama = (devine + robinson + miller + hamwi) / 4;

    sonuclarKutusu.innerHTML = `
      <div class="sonuc-karti">
        <h3>Ortalama İdeal Kilo</h3>
        <div class="deger" style="color:#4f8a1e; font-size:1.5rem;">${ortalama.toFixed(1)} <small>kg</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Devine Formülü</h3>
        <div class="deger">${devine.toFixed(1)} <small>kg</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Robinson Formülü</h3>
        <div class="deger">${robinson.toFixed(1)} <small>kg</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Miller Formülü</h3>
        <div class="deger">${miller.toFixed(1)} <small>kg</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Hamwi Formülü</h3>
        <div class="deger">${hamwi.toFixed(1)} <small>kg</small></div>
      </div>
    `;
    sonuclarKutusu.classList.remove('gizli');
  });
});

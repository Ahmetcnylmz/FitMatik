document.addEventListener('DOMContentLoaded', () => {
  const suFormu = document.getElementById('suFormu');
  const sonuclarKutusu = document.getElementById('sonuclar');

  suFormu.addEventListener('submit', (e) => {
    e.preventDefault();

    const kilo = parseFloat(document.getElementById('kilo').value);
    const aktiviteEk = parseFloat(document.getElementById('aktivite').value);

    if (!kilo) return;

    const temelMl = kilo * 33;
    const toplamMl = Math.round(temelMl + aktiviteEk);
    const toplamLitre = (toplamMl / 1000).toFixed(1);
    const bardakSayisi = Math.round(toplamMl / 200);

    sonuclarKutusu.innerHTML = `
      <div class="sonuc-karti">
        <h3>Günlük Su İhtiyacı</h3>
        <div class="deger">${toplamLitre} <small>litre</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Mililitre Cinsinden</h3>
        <div class="deger">${toplamMl} <small>ml</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Bardak Sayısı (200 ml)</h3>
        <div class="deger">${bardakSayisi} <small>bardak</small></div>
      </div>
    `;
    sonuclarKutusu.classList.remove('gizli');
  });
});

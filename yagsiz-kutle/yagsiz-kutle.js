document.addEventListener('DOMContentLoaded', () => {
  const yvkFormu = document.getElementById('yvkFormu');
  const sonuclarKutusu = document.getElementById('sonuclar');

  yvkFormu.addEventListener('submit', (e) => {
    e.preventDefault();

    const cinsiyet = document.querySelector('input[name="cinsiyet"]:checked').value;
    const boy = parseFloat(document.getElementById('boy').value);
    const kilo = parseFloat(document.getElementById('kilo').value);

    if (!boy || !kilo) return;

    let yvk = 0;
    if (cinsiyet === 'erkek') {
      yvk = (0.407 * kilo) + (0.267 * boy) - 19.2;
    } else {
      yvk = (0.252 * kilo) + (0.473 * boy) - 48.3;
    }

    const yagKutlesi = kilo - yvk;
    const yagOraniTahmini = (yagKutlesi / kilo) * 100;

    sonuclarKutusu.innerHTML = `
      <div class="sonuc-karti">
        <h3>Yağsız Vücut Kütlesi</h3>
        <div class="deger">${yvk.toFixed(1)} <small>kg</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Yağ Kütlesi</h3>
        <div class="deger">${yagKutlesi.toFixed(1)} <small>kg</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Tahmini Yağ Oranı</h3>
        <div class="deger">%${yagOraniTahmini.toFixed(1)}</div>
      </div>
    `;
    sonuclarKutusu.classList.remove('gizli');
  });
});

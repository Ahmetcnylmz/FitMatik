document.addEventListener('DOMContentLoaded', () => {
  const bmhFormu = document.getElementById('bmhFormu');
  const sonuclarKutusu = document.getElementById('sonuclar');

  bmhFormu.addEventListener('submit', (e) => {
    e.preventDefault();

    const cinsiyet = document.querySelector('input[name="cinsiyet"]:checked').value;
    const yas = parseInt(document.getElementById('yas').value);
    const boy = parseFloat(document.getElementById('boy').value);
    const kilo = parseFloat(document.getElementById('kilo').value);

    if (!yas || !boy || !kilo) return;

    let mifflin = 0;
    if (cinsiyet === 'erkek') {
      mifflin = (10 * kilo) + (6.25 * boy) - (5 * yas) + 5;
    } else {
      mifflin = (10 * kilo) + (6.25 * boy) - (5 * yas) - 161;
    }

    let harrisBenedict = 0;
    if (cinsiyet === 'erkek') {
      harrisBenedict = 88.362 + (13.397 * kilo) + (4.799 * boy) - (5.677 * yas);
    } else {
      harrisBenedict = 447.593 + (9.247 * kilo) + (3.098 * boy) - (4.330 * yas);
    }

    sonuclarKutusu.innerHTML = `
      <div class="sonuc-karti">
        <h3>Mifflin-St Jeor</h3>
        <div class="deger">${Math.round(mifflin)} <small>kcal</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Harris-Benedict</h3>
        <div class="deger">${Math.round(harrisBenedict)} <small>kcal</small></div>
      </div>
    `;

    sonuclarKutusu.classList.remove('gizli');
  });
});

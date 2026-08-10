document.addEventListener('DOMContentLoaded', () => {
  const yagFormu = document.getElementById('yagFormu');
  const sonuclarKutusu = document.getElementById('sonuclar');
  const kalcaInput = document.getElementById('kalca');
  const cinsiyetRadyolari = document.querySelectorAll('input[name="cinsiyet"]');

  function kalcaDurumunuGuncelle() {
    const cinsiyet = document.querySelector('input[name="cinsiyet"]:checked').value;
    kalcaInput.required = cinsiyet === 'kadin';
  }
  cinsiyetRadyolari.forEach((r) => r.addEventListener('change', kalcaDurumunuGuncelle));
  kalcaDurumunuGuncelle();

  yagFormu.addEventListener('submit', (e) => {
    e.preventDefault();

    const cinsiyet = document.querySelector('input[name="cinsiyet"]:checked').value;
    const boy = parseFloat(document.getElementById('boy').value);
    const boyun = parseFloat(document.getElementById('boyun').value);
    const bel = parseFloat(document.getElementById('bel').value);
    const kalca = parseFloat(kalcaInput.value);

    if (!boy || !boyun || !bel) return;
    if (cinsiyet === 'kadin' && !kalca) return;

    let yagOrani = 0;
    if (cinsiyet === 'erkek') {
      yagOrani = 495 / (1.0324 - 0.19077 * Math.log10(bel - boyun) + 0.15456 * Math.log10(boy)) - 450;
    } else {
      yagOrani = 495 / (1.29579 - 0.35004 * Math.log10(bel + kalca - boyun) + 0.22100 * Math.log10(boy)) - 450;
    }
    yagOrani = Math.max(2, yagOrani);

    let kategori = "";
    let renk = "";
    if (cinsiyet === 'erkek') {
      if (yagOrani < 6) { kategori = "Çok Düşük (Atlet)"; renk = "#4f8a1e"; }
      else if (yagOrani < 14) { kategori = "Atletik"; renk = "#4f8a1e"; }
      else if (yagOrani < 18) { kategori = "Fitness"; renk = "#4f8a1e"; }
      else if (yagOrani < 25) { kategori = "Ortalama"; renk = "#f59e0b"; }
      else { kategori = "Yüksek"; renk = "#ef4444"; }
    } else {
      if (yagOrani < 14) { kategori = "Çok Düşük (Atlet)"; renk = "#4f8a1e"; }
      else if (yagOrani < 21) { kategori = "Atletik"; renk = "#4f8a1e"; }
      else if (yagOrani < 25) { kategori = "Fitness"; renk = "#4f8a1e"; }
      else if (yagOrani < 32) { kategori = "Ortalama"; renk = "#f59e0b"; }
      else { kategori = "Yüksek"; renk = "#ef4444"; }
    }

    sonuclarKutusu.innerHTML = `
      <div class="sonuc-karti">
        <h3>Vücut Yağ Oranı</h3>
        <div class="deger" style="color: ${renk}">%${yagOrani.toFixed(1)}</div>
      </div>
      <div class="sonuc-karti">
        <h3>Kategori</h3>
        <div class="deger" style="color: ${renk}">${kategori}</div>
      </div>
    `;
    sonuclarKutusu.classList.remove('gizli');
  });
});

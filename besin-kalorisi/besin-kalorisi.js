document.addEventListener('DOMContentLoaded', () => {
  const aramaKutusu = document.getElementById('aramaKutusu');
  const aramaSonuclari = document.getElementById('aramaSonuclari');
  const miktarAlani = document.getElementById('miktarAlani');
  const seciliBesinAdi = document.getElementById('seciliBesinAdi');

  const birimSecimi = document.getElementById('birimSecimi');
  const birimButonlari = birimSecimi.querySelectorAll('.birim-btn');
  const gramGrubu = document.getElementById('gramGrubu');
  const adetGrubu = document.getElementById('adetGrubu');
  const miktarInput = document.getElementById('miktar');
  const adetInput = document.getElementById('adetSayisi');

  const butonGrubu = document.getElementById('butonGrubu');
  const hesaplaBtn = document.getElementById('hesaplaBtn');
  const ekleBtn = document.getElementById('ekleBtn');

  const tekSonuc = document.getElementById('tekSonuc');

  const ogunListesi = document.getElementById('ogunListesi');
  const ogunSatirlari = document.getElementById('ogunSatirlari');
  const temizleBtn = document.getElementById('temizleBtn');

  const toplamKaloriEl = document.getElementById('toplamKalori');
  const toplamProteinEl = document.getElementById('toplamProtein');
  const toplamKarbEl = document.getElementById('toplamKarb');
  const toplamYagEl = document.getElementById('toplamYag');
  const toplamLifEl = document.getElementById('toplamLif');

  let seciliBesin = null;
  let aktifBirim = 'gram';

  let ogun = [];

  aramaKutusu.addEventListener('input', () => {
    const sorgu = aramaKutusu.value.trim().toLocaleLowerCase('tr');
    aramaSonuclari.innerHTML = '';
    tekSonuc.classList.add('gizli');

    if (sorgu.length < 2) return;

    const eslesenler = besinListesi
      .filter((b) => b.ad.toLocaleLowerCase('tr').includes(sorgu))
      .slice(0, 8);

    if (eslesenler.length === 0) {
      aramaSonuclari.innerHTML = '<p style="color:#6b7166; font-size:0.85rem;">Eşleşen besin bulunamadı.</p>';
      return;
    }

    eslesenler.forEach((besin) => {
      const buton = document.createElement('button');
      buton.type = 'button';
      buton.className = 'arama-sonuc-satiri';
      buton.innerHTML = `<span>${besin.ad}</span><small>${besin.kategori} · ${besin.kalori} kcal / ${besin.porsiyon_g} g</small>`;
      buton.addEventListener('click', () => besinSec(besin));
      aramaSonuclari.appendChild(buton);
    });
  });

  function besinSec(besin) {
    seciliBesin = besin;
    seciliBesinAdi.textContent = `${besin.ad} (${besin.kategori})`;

    birimSecimi.classList.remove('gizli');
    birimeGec('gram');

    miktarInput.value = besin.porsiyon_g;
    adetInput.value = 1;

    miktarAlani.classList.remove('gizli');
    butonGrubu.classList.remove('gizli');
    tekSonuc.classList.add('gizli');

    aramaSonuclari.innerHTML = '';
    aramaKutusu.value = besin.ad;
  }

  birimButonlari.forEach((btn) => {
    btn.addEventListener('click', () => birimeGec(btn.dataset.birim));
  });

  function birimeGec(birim) {
    aktifBirim = birim;
    birimButonlari.forEach((btn) => {
      btn.classList.toggle('aktif-birim', btn.dataset.birim === birim);
    });
    if (birim === 'adet') {
      gramGrubu.classList.add('gizli');
      adetGrubu.classList.remove('gizli');
    } else {
      adetGrubu.classList.add('gizli');
      gramGrubu.classList.remove('gizli');
    }
  }

  function girilenGramiHesapla() {
    if (aktifBirim === 'adet') {
      const adetSayisi = parseFloat(adetInput.value);
      if (!adetSayisi || adetSayisi <= 0) return null;
      return {
        gram: adetSayisi * seciliBesin.adet_g,
        gosterim: `${adetSayisi} adet (${Math.round(adetSayisi * seciliBesin.adet_g)} g)`,
      };
    } else {
      const gram = parseFloat(miktarInput.value);
      if (!gram || gram <= 0) return null;
      return { gram: gram, gosterim: `${gram} g` };
    }
  }

  function degerleriHesapla(gram) {
    const oran = gram / seciliBesin.porsiyon_g;
    return {
      kalori: seciliBesin.kalori * oran,
      protein: seciliBesin.protein * oran,
      karbonhidrat: seciliBesin.karbonhidrat * oran,
      yag: seciliBesin.yag * oran,
      lif: seciliBesin.lif * oran,
    };
  }

  hesaplaBtn.addEventListener('click', () => {
    if (!seciliBesin) return;

    const girdi = girilenGramiHesapla();
    if (!girdi) {
      alert('Lütfen geçerli bir miktar gir.');
      return;
    }

    const deger = degerleriHesapla(girdi.gram);

    tekSonuc.innerHTML = `
      <div class="sonuc-karti">
        <h3>${girdi.gosterim} için Kalori</h3>
        <div class="deger">${Math.round(deger.kalori)} <small>kcal</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Protein</h3>
        <div class="deger">${deger.protein.toFixed(1)} <small>g</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Karbonhidrat</h3>
        <div class="deger">${deger.karbonhidrat.toFixed(1)} <small>g</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Yağ</h3>
        <div class="deger">${deger.yag.toFixed(1)} <small>g</small></div>
      </div>
      <div class="sonuc-karti">
        <h3>Lif</h3>
        <div class="deger">${deger.lif.toFixed(1)} <small>g</small></div>
      </div>
    `;
    tekSonuc.classList.remove('gizli');
  });

  ekleBtn.addEventListener('click', () => {
    if (!seciliBesin) return;

    const girdi = girilenGramiHesapla();
    if (!girdi) {
      alert('Lütfen geçerli bir miktar gir.');
      return;
    }

    const deger = degerleriHesapla(girdi.gram);

    ogun.push({
      ad: seciliBesin.ad,
      miktarGosterim: girdi.gosterim,
      kalori: deger.kalori,
      protein: deger.protein,
      karbonhidrat: deger.karbonhidrat,
      yag: deger.yag,
      lif: deger.lif,
    });

    ogunuCiz();

    seciliBesin = null;
    aramaKutusu.value = '';
    miktarAlani.classList.add('gizli');
    birimSecimi.classList.add('gizli');
    butonGrubu.classList.add('gizli');
    tekSonuc.classList.add('gizli');
    aramaKutusu.focus();
  });

  temizleBtn.addEventListener('click', () => {
    ogun = [];
    ogunuCiz();
  });

  function satirSil(index) {
    ogun.splice(index, 1);
    ogunuCiz();
  }

  function ogunuCiz() {
    if (ogun.length === 0) {
      ogunListesi.classList.add('gizli');
      ogunSatirlari.innerHTML = '';
      return;
    }

    ogunListesi.classList.remove('gizli');

    ogunSatirlari.innerHTML = ogun
      .map(
        (madde, index) => `
      <div class="ogun-satir">
        <div class="ogun-satir-bilgi">
          <span class="ogun-satir-ad">${madde.ad}</span>
          <span class="ogun-satir-gram">${madde.miktarGosterim}</span>
        </div>
        <span class="ogun-satir-kalori">${Math.round(madde.kalori)} kcal</span>
        <button type="button" class="ogun-sil-btn" data-index="${index}" aria-label="Sil">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `
      )
      .join('');

    ogunSatirlari.querySelectorAll('.ogun-sil-btn').forEach((btn) => {
      btn.addEventListener('click', () => satirSil(parseInt(btn.dataset.index)));
    });

    const toplam = ogun.reduce(
      (acc, madde) => {
        acc.kalori += madde.kalori;
        acc.protein += madde.protein;
        acc.karbonhidrat += madde.karbonhidrat;
        acc.yag += madde.yag;
        acc.lif += madde.lif;
        return acc;
      },
      { kalori: 0, protein: 0, karbonhidrat: 0, yag: 0, lif: 0 }
    );

    toplamKaloriEl.textContent = `${Math.round(toplam.kalori)} kcal`;
    toplamProteinEl.textContent = `${toplam.protein.toFixed(1)}g`;
    toplamKarbEl.textContent = `${toplam.karbonhidrat.toFixed(1)}g`;
    toplamYagEl.textContent = `${toplam.yag.toFixed(1)}g`;
    toplamLifEl.textContent = `${toplam.lif.toFixed(1)}g`;
  }
});

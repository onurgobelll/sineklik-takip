# Sinek Tuzağı Kontrol — kurulum

Repoya konacak dosyalar: `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`.
(`firebase-kurallari.json` repoya konmaz, içeriği Firebase konsoluna yapıştırılır.)

## 1. GitHub Pages
1. Yeni public repo: `sineklik-takip`
2. Beş dosyayı yükle (Add file > Upload files)
3. Settings > Pages > Source: **main / (root)** > Save
4. Adres: `https://KULLANICIADIN.github.io/sineklik-takip/`

## 2. Firebase kimlik doğrulama
1. Firebase Console > Authentication > Sign-in method > **Anonymous** > Etkinleştir
2. Proje ayarları > Genel > **Web API anahtarı**nı kopyala
3. `index.html` içinde `const API_KEY = "";` satırına yapıştır, kaydet
   - Boş bırakılırsa uygulama çalışır ama izin kontrolü olmaz (herkes yazar)

## 3. Veritabanı kuralları
Realtime Database > Rules > `firebase-kurallari.json` içeriğini yapıştır > Publish.
Tank Takip düğümleri aynı veritabanındaysa, mevcut kuralların içine `sineklik_*`
bloklarını ekle; tank kurallarını silme.

## 4. İlk açılış
1. Sayfayı **kendi telefonundan** aç → bu ilk cihaz otomatik **yönetici** olur
2. Ayarlar: personel listesi, iş periyotları ve ayları, sarf miktarları, tuzak listesi
3. Ayarlar > kroki fotoğrafı yükle, Kroki sekmesinden 35 noktayı yerleştir
4. QR etiketlerini bas, lamine et, tuzaklara yapıştır

## 5. Personel telefonları
1. Adresi aç → Chrome menü > **Ana ekrana ekle** (uygulama gibi açılır)
2. Açılışta personel seçimi yapılır → cihaz "onay bekliyor" durumuna düşer
3. Sen: Ayarlar > Cihazlar > **Onayla**. Onaylanmayan telefon hiçbir şey yazamaz.

## Otomatik sinek sayımı
Fotoğraf çekilince görüntü taranır, tül üzerindeki koyu lekeler sayılır ve
Düşük / Orta / Yüksek seviyesi önerilir. Personel yanlışsa tek dokunuşla düzeltir;
kayda hem otomatik sayı hem seçilen seviye hem de elle düzeltilip düzeltilmediği yazılır.
Ayarlar > Otomatik sinek sayımı: hassasiyet (varsayılan 38 — düşürürsen daha çok leke sayar),
en küçük/en büyük leke boyutu, Orta ve Yüksek eşikleri.
İlk hafta birkaç fotoğrafta sayımı gözle karşılaştırıp hassasiyeti oturt.

## Notlar
- Kayıt yalnız tuzağın QR'ı okutulunca açılır; her kayıttan sonra yeni okutma gerekir
- Yönetici PIN: **2026** (index.html içinde `const PIN` satırından değiştirilir)
- Yedek: haftada bir otomatik, son 4 yedek saklanır, fotoğraflar dahil değildir
- Fotoğraflar `sineklik_foto_v1` altında ayrı tutulur; liste açılırken indirilmez

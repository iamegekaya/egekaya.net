# Egekaya.net İnceleme Raporu

Tarih: 2026-03-09

## Kapsam

- Tüm kaynak dosyaları, yapılandırmalar ve içerik JSON'ları incelendi.
- Odak alanları: tekrar eden kod, mantık hataları, güvenlik açıkları, içerik/doğruluk riskleri ve bakım maliyeti.
- Çalıştırılabilir doğrulama denemeleri yapıldı; ancak bağımlılıklar kurulu olmadığı için `npm run lint` ve `npm run build` çalıştırılamadı.

## Öncelikli Bulgular

### P1 - İletişim API'si bot/spam suistimaline açık

`src/app/api/contact/route.ts` içindeki public `POST` endpoint'i e-posta göndermeden önce herhangi bir rate limit, captcha, honeypot, IP bazlı throttling ya da origin tabanlı kontrol uygulamıyor. Bu haliyle herkes script ile endpoint'i çağırıp Gmail kotasını tüketebilir, inbox'ı spam ile doldurabilir ve servisi kullanılamaz hale getirebilir.

### P1 - Kullanıcı girdisi HTML e-postaya kaçışlanmadan basılıyor

Aynı endpoint'te `name`, `email` ve özellikle `message` alanı doğrudan HTML template içine gömülüyor. `message.replace(/\n/g, '<br>')` satırı satır sonlarını dönüştürüyor ama HTML escape yapmıyor. Bu, gönderilen e-postanın içine kullanıcı kontrollü HTML enjekte edilmesine yol açar. Web XSS değil, ancak e-posta istemcisinde yanıltıcı link, beklenmeyen markup veya uzaktan içerik çağrısı üretme riski var.

### P2 - Geçersiz form verileri 500 olarak dönüyor

`schema.parse(body)` aynı `try/catch` içinde olduğu için kullanıcı hataları ile gerçek sunucu hataları ayrışmıyor. Bozuk JSON, eksik alan veya geçersiz e-posta gibi durumlarda endpoint 400 yerine 500 dönüyor. Bu hem gözlemlenebilirliği bozuyor hem de istemci tarafında yanlış hata davranışı üretiyor.

### P2 - Sosyal paylaşım metadatası kırık

`src/app/[locale]/layout.tsx` içinde Open Graph görseli `https://egekaya.net/og-image.jpg` olarak tanımlanmış, fakat repoda böyle bir dosya yok. Sonuç olarak link preview kartları görselsiz veya hatalı üretilecek. Aynı metadata'da `openGraph.locale` sabit `en_US`; Türkçe sayfalarda yanlış locale bildiriliyor.

### P2 - Gizlilik/çerez metinleri mevcut uygulama davranışıyla uyuşmuyor

`src/messages/en.json` ve `src/messages/tr.json` içinde yer alan politika metinleri analitik çerezler, davranışsal çerezler, sosyal eklenti çerezleri, cookie management paneli, telefon numarası ve geniş kapsamlı veri toplama iddiaları içeriyor. Mevcut kod tabanında bu sistemlerin implementasyonu görünmüyor. Hukuki metin ile gerçek davranış arasındaki fark, teknik değil ama ciddi bir uyumluluk riski.

### P3 - Footer locale'den bağımsız ve zamanla eskimeye açık

Footer telif metni sabit Türkçe yazılmış ve yıl `2026` olarak hardcode edilmiş. İngilizce sayfalarda da Türkçe gösterilecek; ayrıca yıl otomatik ilerlemeyecek.

## Tekrar Eden Kodlar

### X/Twitter ikonu iki yerde kopyalanmış

`src/components/Footer.tsx` ve `src/app/[locale]/contact/page.tsx` içinde aynı `XIcon` SVG bileşeni ayrı ayrı tanımlanmış. Ortak bir ikon component'i veya `icons.tsx` dosyasıyla tekilleştirilmeli.

### Politika sayfaları aynı render yapısını üç kez tekrarlıyor

`src/app/[locale]/privacy-policy/page.tsx`, `src/app/[locale]/cookie-policy/page.tsx` ve `src/app/[locale]/terms-of-use/page.tsx` neredeyse birebir aynı. Ortak bir `PolicyPage` renderer ile bakım maliyeti düşürülebilir.

### Profil fotoğrafı iki kez tutuluyor

Kök dizindeki `pp.jpg` ile `public/pp.jpg` byte bazında aynı dosya. Yaklaşık 2.6 MB x 2 gereksiz depolama tüketiyor.

## Ek Riskler ve Öneriler

- `src/middleware.ts` matcher'ı yalnızca `/` ve zaten locale içeren path'leri yakalıyor. Buradan şu çıkarımı yapıyorum: `/about` gibi locale'siz derin linkler locale redirect yerine 404 alacak.
- `src/components/PhotoGallery.tsx` galeride kullanılan kaynak görseller 7 MB ile 12 MB arasında. `next/image` optimizasyon sağlasa da kaynak asset'ler gereğinden ağır; önceden sıkıştırılmış WebP/AVIF türevleri düşünülmeli.
- `package.json` içinde test script'i veya test altyapısı yok. Bu repo için en azından smoke test, form API testi ve i18n route testleri eklenmeli.
- `README.md` hâlâ create-next-app boilerplate. Projeye özel kurulum, env değişkenleri ve deployment notları eklenmeli.
- `Header.tsx` ve `contact/page.tsx` içinde kullanılmayan import/hook kalıntıları var; bağımlılıklar kurulduğunda lint bunu muhtemelen işaretleyecek.

## Doğrulama Notları

- `npm run lint` çalıştırılamadı: `eslint: command not found`
- `npm run build` çalıştırılamadı: `next: command not found`
- Bu yüzden çalışma zamanı doğrulaması yerine statik kod incelemesine dayalı rapor hazırlanmıştır.

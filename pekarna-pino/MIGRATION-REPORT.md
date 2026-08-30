# Report migrace PHP → statický HTML web

## Zdroj
- `www(20260830-130933).zip`
- Export proveden 2026-08-30.

## Výsledek
- 38 HTML souborů celkem.
- 30 samostatných produktových detailů.
- `sitemap.xml` převeden na statické `.html` URL.
- Statická aktiva zachována v původní struktuře (`assets`, `css`, `js`, `admin/data/img`).
- Všechny lokální odkazy a cesty v HTML jsou relativní.
- Žádný nevyhodnocený PHP kód, `.php` odkaz ani dynamická URL `produkt?produkt=…` nezůstala.

## Mapy.com iframe – pojízdná prodejna
Na `pojizdna-prodejna.html` jsou zachované oba externí iframe odkazy:

- Trasa A: `https://mapy.com/s/cokateholo`
- Trasa B: `https://mapy.com/s/karapecaro`

Oba iframe mají `allowfullscreen` a původní `src` zůstává absolutní HTTPS URL. Do statického exportu je přidán `js/mapy-iframe-fix.js`. První mapa se načte standardně; mapa v dalším skrytém tabu se při prvním zobrazení jednou znovu načte až ve viditelném panelu. Tím se eliminuje problém s inicializací Mapy.com iframe uvnitř panelu skrytého přes `hidden` / `display:none`.

## Font Recoleta
Fontové CSS bylo zachováno z dodané verze. V HTML preloadu je pouze sjednocen název souboru na skutečně existující `assets/fonts/Recoleta-SemiboldCondensed.woff2`, aby preload neodkazoval na neexistující variantu názvu lišící se velikostí písmene.

## QA
- 1 817 lokálních referencí zkontrolováno při souborové validaci.
- 148 unikátních lokálních souborových cílů.
- 152 HTTP cílů ověřeno přes lokální statický server: všechny HTTP 200.
- `sitemap.xml` je validní XML a obsahuje 36 veřejných URL.
- 2/2 Mapy.com iframe mají zachovaný externí `src`, `data-map-src` a `allowfullscreen`.

## Vygenerované základní stránky
- `index.html`
- `o-nas.html`
- `produkty.html`
- `prodejna-potravin.html`
- `pojizdna-prodejna.html`
- `kontakty.html`
- `produkt.html`
- `404.html`

## Produktové stránky
- `produkt-chleba-1.html`
- `produkt-chleba-2.html`
- `produkt-chleba-3.html`
- `produkt-chleba-4.html`
- `produkt-hruskovy-frgal.html`
- `produkt-jemne-pecivo-1.html`
- `produkt-jemne-pecivo-2.html`
- `produkt-jemne-pecivo-3.html`
- `produkt-jemne-pecivo-4.html`
- `produkt-jemne-pecivo-5.html`
- `produkt-jemne-pecivo-6.html`
- `produkt-jemne-pecivo-7.html`
- `produkt-jemne-pecivo-8.html`
- `produkt-makovy-frgal.html`
- `produkt-orechovy-frgal.html`
- `produkt-ovocny-frgal.html`
- `produkt-povidlovy-frgal.html`
- `produkt-speci-aln-i-1.html`
- `produkt-speci-aln-i-2.html`
- `produkt-speci-aln-i-3.html`
- `produkt-speci-aln-i-4.html`
- `produkt-specialni-pecivo-1.html`
- `produkt-specialni-pecivo-2.html`
- `produkt-specialni-pecivo-3.html`
- `produkt-specialni-pecivo-4.html`
- `produkt-specialni-pecivo-5.html`
- `produkt-specialni-pecivo-6.html`
- `produkt-specialni-pecivo-7.html`
- `produkt-specialni-pecivo-8.html`
- `produkt-tvarohovy-frgal.html`

## Omezení statické verze
- PHP administrace a serverová editace dat nejsou součástí exportu.
- Obsah produktů a ostatní data jsou statický snímek z této verze webu; při změně CMS dat je nutné export znovu vygenerovat.
- Stav tras (aktuální časy / zvýraznění zastávek) se nadále dopočítává klientským JavaScriptem v prohlížeči; samotná data tras jsou ze zdrojové verze.
- Externí Mapy.com obsah závisí na dostupnosti služby Mapy.com a síťovém připojení návštěvníka.

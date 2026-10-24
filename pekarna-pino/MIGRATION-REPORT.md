# Report migrace PHP → statický HTML web

Zdroj: `admin(2).zip`
Datum exportu: 2026-10-24

## Výsledek

- HTML souborů: 25
- veřejných produktových detailů: 17
- URL v sitemap.xml: 23
- PHP soubory nejsou součástí statického výstupu
- lokální CSS, JS, obrázky, fonty a interní odkazy používají relativní cesty
- produktové URL `/produkt?produkt=...` byly převedeny na `produkt-<technical_id>.html`

## Pojízdná prodejna / Mapy.com

Aktuální trasy:
- `https://mapy.com/s/holerakade`
- `https://mapy.com/s/gukanalede`


Oba route iframe mají ve statickém exportu zachované absolutní HTTPS URL, `data-map-src`, `allowfullscreen` a používají `js/mapy-iframe-fix.js`. Skript při prvním zobrazení panelu iframe jednou znovu načte, aby se mapa správně vykreslila i v panelu, který byl při načtení stránky skrytý.

## Omezení statického exportu

- Administrační PHP rozhraní není součástí statického webu; z `/admin` se kopírují pouze veřejně potřebné obrázky `/admin/data/img`.
- PHP výpočet opakování tras je zachycen jako stav v okamžiku exportu. Klientský JavaScript nadále aktualizuje stav trasy podle aktuálního dne a času z dat vložených do HTML.
- Pro změny obsahu řízeného JSON daty je potřeba statický export znovu vygenerovat.

## Kontrola kvality

- zkontrolováno 1 084 lokálních referencí v HTML/CSS
- chybějící lokální soubory: 0
- kořenové lokální cesty v HTML: 0
- PHP soubory ve výstupu: 0
- dynamické produktové odkazy ve výstupu: 0
- HTTP kontrola statického serveru: 168 unikátních lokálních cílů, 0 chyb
- `sitemap.xml`: validní XML

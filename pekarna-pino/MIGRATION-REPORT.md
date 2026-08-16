# Report migrace PHP → statický HTML

Datum exportu: 16. 8. 2026
Zdroj: `www(20260816-142035).zip`

## Výsledek

- Vygenerováno 38 HTML stránek.
- Z toho 30 samostatných produktových detailů.
- Základní veřejné stránky: `index.html`, `o-nas.html`, `produkty.html`, `prodejna-potravin.html`, `pojizdna-prodejna.html`, `kontakty.html`, `produkt.html` (404 fallback produktu) a `404.html`.
- Vygenerován statický `sitemap.xml` s URL odpovídajícími `.html` souborům.
- Zachovány aktuální CSS, JavaScript, fonty, SVG a obrázky z této konkrétní zálohy.
- CMS obrázky potřebné veřejným webem jsou zachovány v `admin/data/img/`; administrační PHP rozhraní a datové JSON soubory nejsou pro statický provoz potřeba a nejsou součástí exportu.

## Relativní cesty

Ve vykresleném HTML jsou všechny lokální cesty relativní. Například:

- `css/styles.css?v=...`
- `js/_menu.js?v=...`
- `assets/img/pino-logo.png?v=...`
- `admin/data/img/frgal-makovy.jpg`
- `produkty.html`
- `produkt-makovy-frgal.html`

Absolutní URL v SEO metadatech (canonical, Open Graph, JSON-LD) zůstávají absolutní, ale interní stránkové URL byly převedeny na odpovídající statické `.html` adresy.

## Kontrola kvality

- HTML stránek: 38
- Produktových detailů: 30
- Lokálních referencí z HTML/CSS zkontrolováno: 1 814
- Unikátních lokálních souborových cílů: 145
- Kořenových lokálních cest (`/css/...`, `/assets/...`, `/admin/data/img/...` apod.): 0
- Chybějících lokálních souborů: 0
- HTTP cílů ověřených přes lokální statický server: 148
- HTTP chyb: 0
- `sitemap.xml`: syntakticky validní XML
- Nevyhodnocený PHP kód ve výstupním HTML: 0
- Lokální odkazy na `.php`: 0
- Dynamické produktové odkazy `produkt?produkt=...`: převedeny na `produkt-<id>.html`

## Omezení statické verze

1. **Administrace / CMS**
   Statický export neobsahuje funkční PHP administraci. Změny produktů, tras nebo údajů je nutné provést ve zdrojovém PHP webu a následně vytvořit nový statický export.

2. **Pojízdná prodejna je časový snímek**
   Zdrojový PHP web počítá aktuální týden tras pomocí `DateTimeImmutable('today')` v časové zóně `Europe/Prague`. Statická stránka `pojizdna-prodejna.html` proto zachycuje stav platný v okamžiku exportu 16. 8. 2026. Pro dlouhodobý provoz je vhodné export pravidelně regenerovat nebo logiku tras převést do JavaScriptu.

3. **Produkty bez vlastního obrázku**
   Čtyři produkty (`speci-aln-i-1` až `speci-aln-i-4`) nemají ve zdrojové záloze vlastní master JPG. PHP u nich používá dodaný `assets/img/product-placeholder.*`; statický export toto chování zachovává.

4. **Serverové přepisy URL**
   Původní web používá Apache `.htaccess` pro URL bez přípony. Statický export na těchto přepisech nezávisí a všechny interní odkazy vedou přímo na `.html` soubory.

## Nasazení

Obsah této složky lze nahrát přímo na statický hosting. Jako vstupní stránka slouží `index.html`; vlastní 404 lze na hostingu nastavit na `404.html`.

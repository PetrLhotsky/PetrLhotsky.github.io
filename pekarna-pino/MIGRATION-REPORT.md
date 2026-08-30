# Report statického exportu

Zdroj: `www(20260830-211129).zip`
Datum exportu: 2026-08-30

## Výsledek

- Vygenerováno **38 HTML stránek**.
- Z toho **30 produktových detailů** (`produkt-<technical_id>.html`).
- Všechny lokální odkazy a cesty k CSS, JS, obrázkům a fontům jsou relativní.
- Dynamické odkazy `produkt?produkt=...` byly převedeny na samostatné `.html` soubory.
- `sitemap.php` byl převeden na statický `sitemap.xml` s **36 veřejnými URL**.
- Administrační PHP část není součástí statického webu; obrázky potřebné z `admin/data/img` byly zachovány.

## Mapy.com iframe

Na `pojizdna-prodejna.html` jsou zachovány oba externí Mapy.com iframe:

- `https://mapy.com/s/cokateholo`
- `https://mapy.com/s/karapecaro`

Oba mají `allowfullscreen`, původní absolutní HTTPS URL a atribut `data-map-src`. Soubor `js/mapy-iframe-fix.js` při prvním zobrazení aktivního/skrytého panelu mapu jednou znovu načte až ve viditelném tabu, aby se předešlo problému s vykreslením iframe načteného ve skrytém panelu. Externí Mapy.com URL se při relativizaci nemění.

## Font Recoleta

CSS fontu bylo převzato ze zdrojové verze beze změny. V HTML preloadu byl použit přesný existující název souboru `assets/fonts/Recoleta-SemiboldCondensed.woff2`, aby cesta fungovala i na case-sensitive hostingu.

## Kontrola kvality

- HTML souborů: **38**
- Lokálních referencí zkontrolovaných souborově: **1 655**
- Unikátních lokálních cest: **146**
- HTTP cílů ověřených přes lokální statický server: **150**
- Chybné HTTP cíle: **0**
- Zbytky PHP v HTML: **0**
- Lokální `.php` odkazy: **0**
- Dynamické produktové odkazy: **0**
- Kořenové lokální cesty v HTML/CSS: **0**
- `sitemap.xml`: validní XML, **36 URL**

## Vygenerované stránky

- `404.html`
- `index.html`
- `kontakty.html`
- `o-nas.html`
- `pojizdna-prodejna.html`
- `prodejna-potravin.html`
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
- `produkt.html`
- `produkty.html`

## Omezení statické verze

- PHP administrace a ukládání změn na serveru nejsou ve statickém exportu dostupné.
- Změny produktů, tras nebo dalších JSON dat je nutné znovu vyexportovat do HTML.
- Mapy.com iframe zůstávají závislé na dostupnosti externí služby Mapy.com a připojení návštěvníka k internetu.

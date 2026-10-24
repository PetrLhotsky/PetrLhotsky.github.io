# Report migrace na statický web

Zdroj: `www(20261024-113259).zip`

## Výsledek

- 25 HTML souborů celkem
- 17 veřejných produktových detailů
- 6 hlavních veřejných stránek + `404.html` + fallback `produkt.html`
- 23 veřejných URL v `sitemap.xml`
- všechny veřejné PHP routy převedeny na `.html`
- lokální cesty k CSS, JS, obrázkům a fontům jsou relativní
- PHP administrační část nebyla přenesena; zachovány jsou pouze statické obrázky z `admin/data/img`

## Produkty

Zdrojová data obsahují 18 viditelných produktů, ale produkt `cerealni-bageta` patří do skryté kategorie `cerealni-pecivo`. Původní PHP web proto jeho veřejný detail nepovoluje a statický export jej rovněž negeneruje. Výsledkem je 17 veřejných produktových detailů.

## Mapy.com iframe

Na `pojizdna-prodejna.html` jsou zachovány dva externí iframe:

- `https://mapy.com/s/holerakade`
- `https://mapy.com/s/gukanalede`

Oba mají zachovaný absolutní `src`, atribut `data-map-src` a `allowfullscreen`. Soubor `js/mapy-iframe-fix.js` při prvním zobrazení dříve skrytého panelu mapu jednou znovu načte, aby se iframe správně vykreslil po přepnutí trasy.

## Font

Recoleta je ponechána podle zdrojové verze. Preload i CSS používají existující soubor `assets/fonts/Recoleta-SemiboldCondensed.woff2`.

## Kontrola

- 1 084 lokálních HTML/CSS referencí zkontrolováno souborově
- 171 unikátních lokálních cílů ověřeno přes statický HTTP server
- 0 chybějících lokálních cílů
- 0 PHP fragmentů
- 0 nezmigrovaných dynamických URL `produkt?produkt=...`
- 0 kořenových lokálních cest v HTML/CSS
- `sitemap.xml` je validní XML

## Omezení statické verze

Administrace a ukládání změn přes PHP nejsou součástí statického webu. Pro změnu katalogu, tras nebo kontaktních údajů je nutné znovu vytvořit statický export ze zdrojové PHP/CMS verze.

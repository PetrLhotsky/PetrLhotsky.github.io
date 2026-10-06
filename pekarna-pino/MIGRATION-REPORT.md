# Report statického exportu

- Zdroj: `www(20261006-143921).zip`
- Vygenerováno HTML stránek: **22**
- Produktových detailů: **14**
- URL v `sitemap.xml`: **20**
- Ověřených lokálních HTML referencí: **954**
- Ověřených CSS `url()` referencí: **4**
- Ověřených unikátních cílů přes statický HTTP server: **156**
- HTTP chyby: **0**
- Chybějící lokální soubory: **0**
- Kořenové lokální cesty v HTML: **0**
- Zbývající `.php` / dynamické produktové odkazy: **0**

## Mapy.com iframe

Na stránce `pojizdna-prodejna.html` jsou zachovány dva externí iframe:

- `https://mapy.com/s/holerakade`
- `https://mapy.com/s/gukanalede`

Oba mají `data-map-src`, `allowfullscreen` a stránka načítá `js/mapy-iframe-fix.js`. Skript při prvním zobrazení aktivního/skrytého panelu iframe jednou znovu inicializuje, stejně jako v předchozím statickém převodu. Externí Mapy.com URL se nepřevádějí na relativní cesty.

## Poznámka k dynamickému obsahu

Jízdní řád/trasy jsou statickým snímkem stavu vykresleného při tomto exportu. Budoucí změny dat v PHP/CMS se do statického webu samy nepropíší a vyžadují nový export. PHP administrace není součástí statického balíčku; z `/admin` se kopírují pouze obrázky potřebné veřejným katalogem (`admin/data/img`).

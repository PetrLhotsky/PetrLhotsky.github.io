# Report statického exportu

- Zdroj: `www(20261025-203801).zip`
- HTML souborů: 25
- Veřejných produktových detailů: 17
- Sitemap veřejných URL: 23
- Lokální odkazy a assety jsou převedeny na relativní cesty.
- Dynamické produktové URL jsou převedeny na samostatné `produkt-*.html` soubory.
- `pojizdna-prodejna.html` zachovává externí Mapy.com iframe a používá `js/mapy-iframe-fix.js` pro opětovnou inicializaci mapy ve skrytém tabu.
- Administrace PHP není součástí statického exportu; z `/admin` jsou přeneseny pouze veřejně používané obrázky `/admin/data/img`.
- Jízdní řád je vyrenderovaný jako stav v okamžiku exportu; klientský JS dále aktualizuje stav zastávek podle času v rámci vyrenderovaných dnů tras.

## Kontrola kvality

- Lokálních referencí v HTML/CSS: 1 109
- Unikátních lokálních cílů: 169
- Chybějících lokálních souborů: 0
- HTTP chyb při kontrole statického webu: 0
- `sitemap.xml`: validní XML
- Nevyhodnocený PHP kód v HTML: nenalezen
- Kořenové lokální URL v HTML: nenalezeny
- Dynamické `produkt?produkt=...` odkazy: nenalezeny

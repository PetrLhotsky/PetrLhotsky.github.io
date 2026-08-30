# Report migrace PHP → statický HTML

- Zdroj: `www(20260830-114103).zip`
- Datum exportu: 2026-08-30
- HTML stránek: **38**
- Produktových detailů: **30**
- Lokálních referencí zkontrolováno: **2257**
- Unikátních lokálních cílů zkontrolováno: **145**
- Chybějící lokální cíle: **0**
- HTTP cílů ověřeno přes lokální statický server: **152** (0 chyb)
- Mapy.com iframe na `pojizdna-prodejna.html`: **2**

## Mapy.com iframe

Oba route iframe zůstávají absolutní HTTPS URL a nejsou relativizovány:

- `https://mapy.com/s/cokateholo`
- `https://mapy.com/s/karapecaro`

Do statické verze byl přidán `js/mapy-iframe-fix.js`. Při prvním zobrazení konkrétního panelu trasy iframe jednou znovu načte až ve chvíli, kdy panel není skrytý. Tím se eliminuje problém s výpočtem rozměrů Mapy.com ve skrytém tabu. Iframe zároveň obsahuje `allowfullscreen`.

## Další úpravy

- veřejné PHP stránky jsou vyrenderované do `.html`,
- dynamické produktové URL jsou převedené na `produkt-<technical_id>.html`,
- lokální cesty k CSS, JS, obrázkům, fontům a interním stránkám jsou relativní,
- externí URL (včetně Mapy.com) zůstávají absolutní,
- `sitemap.xml` obsahuje statické `.html` URL,
- PHP administrace není součástí exportu.
- ve zdroji byl rozdíl velikosti písmen u souborů `Recoleta-SemiboldCondensed.*` vs. odkazů `Recoleta-SemiBoldCondensed.*`; statický export obsahuje kompatibilní aliasy, aby font fungoval i na case-sensitive Linux hostingu.

## Omezení

Jízdní řád tras je při generování PHP vyhodnocen vůči aktuálnímu týdnu; samotný JavaScript na stránce dále průběžně aktualizuje stav podle času. Administrace a jiné serverové PHP funkce nejsou ve statickém exportu dostupné. V build prostředí nebylo možné přímo načíst vzdálený obsah Mapy.com, proto je QA iframe zaměřené na správnost absolutních URL, atributů a chování při zobrazení tabu; formát odpovídá současnému iframe způsobu Mapy.com.

## QA

Kontrola neodhalila žádný nevyhodnocený PHP kód, lokální `.php` URL, dynamickou produktovou URL, kořenovou lokální cestu ani chybějící lokální soubor.

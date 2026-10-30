# Report statického exportu – Pekárna Pino

Datum exportu: 30. 10. 2026

## Výsledek

- 25 HTML souborů celkem.
- 17 veřejných produktových detailů.
- 6 hlavních veřejných stránek + statické fallback stránky `404.html` a `produkt.html`.
- `sitemap.xml` obsahuje 23 veřejných URL.
- Veškeré lokální odkazy na CSS, JS, fonty, obrázky a interní HTML stránky jsou relativní.
- Dynamické produktové URL `produkt?produkt=...` byly převedeny na samostatné soubory `produkt-<slug>.html`.
- Canonical a Open Graph URL produktů byly převedeny na statické `.html` adresy.
- Ve vygenerovaném HTML nezůstal PHP kód ani lokální `.php` odkaz.

## Produkty

Zdrojová data obsahují 18 produktů. Produkt `Cereální bageta` patří do kategorie `Cereální pečivo`, která má `is_visible: false`, proto jej veřejný PHP web nezobrazuje a statický export jeho detail nevytváří. Export tedy obsahuje 17 veřejných produktových detailů.

## Mapy.com – pojízdná prodejna

Dvě route mapy používají aktuální externí URL:

- Trasa A: `https://mapy.com/s/holerakade`
- Trasa B: `https://mapy.com/s/gukanalede`

U obou iframe je zachován externí `src`, přidán `data-map-src` a `allowfullscreen`. Soubor `js/mapy-iframe-fix.js` při prvním zobrazení skrytého tab panelu mapu jednou znovu inicializuje, aby se vyhnul problému s vykreslením iframe načteného ve skrytém panelu. Ostatní Mapy.com iframe (např. mapa provozovny) nejsou tímto loaderem měněny.

## Kontrola kvality

- 25 HTML stránek zkontrolováno.
- 1 067 lokálních HTML referencí zkontrolováno.
- 0 kořenových lokálních cest v HTML/CSS.
- 0 lokálních `.php` odkazů.
- 0 dynamických produktových odkazů.
- 174 unikátních lokálních cílů ověřeno přes statický HTTP server.
- 0 HTTP chyb.
- `sitemap.xml` používá statické veřejné URL.

## Omezení statického exportu

- Administrační PHP rozhraní není součástí statického webu; z `admin` je přenesena pouze veřejně používaná složka `admin/data/img` s obrázky katalogu.
- Změny provedené později v CMS/JSON datech se ve statickém webu automaticky neprojeví; je nutný nový export.
- Externí obsah Mapy.com závisí na dostupnosti služby Mapy.com a jejich embed URL.

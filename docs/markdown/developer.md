# Programátorská dokumentace

Programátorská část dokumentace k programu Hradla. Můžete si také [zobrazit uživatelskou dokumentaci](user.md).

Zdrojové kódy jsou k dispozici v [repozitáři na GitHubu](https://github.com/janjaromirhorak/hradla).

## Instalace a kompilace
Projekt pro instalaci a kompilaci používá balíčkovací nástroj
_npm_, veškerá jeho konfigurace je popsána v konfiguračním souboru `package.json`.

Po stažení zdrojových souborů je nutno v kořenové složce spustit
příkaz `npm install`, který doinstaluje potřebné balíky
popsané v konfiguračním souboru.

Po úspěšné instalaci závislostí už lze celý projekt zkompilovat pomocí příkazu
`npm run build`. Tento příkaz vygeneruje soubory `css/style.css`, `css/style.min.css`, `js/app.js` a `js/app.min.js`. 

## _npm_ skripty
Kromě skriptu `build` lze ještě použít skripty `build:css` na zkompilování kaskádových stylů a `build:js` na kompilaci
JavaScriptu. (Skript `build` pouze balí tyto dva příkazy do jednoho.) Skript `clean` odstraní všechny vygenerované soubory.

## Struktura projektu, použitá technologie
Uživatel k editoru přistupuje pomocí HTML stránky `index.html` v kořenovém adresáři.

### JavaScript
Samotný kód aplikace je psán v JavaScriptu podle specifikace EcmaScript 2015 (ES2015, ES6), pomocí kompilátoru `traceur`
je pak převáděn do JavaScriptu odpovídajícímu specifikaci EcmaScript 3.1 (ES5). Ke kódu je následně ještě připojena
knihovna `traceur-runtime` ze souboru `js/lib/traceur-runtime.js` (ta umožňuje načítání modulů) a kód je pak minifikován pomocí `uglifyjs`.

Zdrojové kódy se nacházejí ve složce `es6`.

JavaScriptový kód je rozdělen do několika souborů.

#### main
Inicializace aplikace (aplikace je spuštěna jako callback jQuery funkce `ready`). Zde je specifikován jQuery selektor inline SVG dokumentu, který je používán pro editační plochu, a jemnost mřížky v pixelech. Zavoláním konstruktoru `Svg` se aplikace inicializuje.

#### canvas
Hlavní soubor, obsahuje třídu `Svg` která spojuje všechnu dílčí funkcionalitu do jednoho celku. Tato třída má na starosti
inicializaci samotného SVG dokumentu, zpracovává uživatelské akce (řeší volání callbacků na správných cílech, inicializuje kontextové menu a menu v pravém dolním rohu), má funkce pro přidávání a odebírání elementů na editační ploše. Ve třídě `Svg` jsou také uloženy všechny objekty, se kterými uživatel v editoru pracuje.

#### editorElements
Definice tříd, které popisují elementy, se kterými pak pracuje hlavní třída `Svg` (Gate, Connector, Wire), tedy obalující
jednotlivé DOM objekty ze SVG dokumentu (definované v `svgObjects`) do logických celků a přiřazující jim funkcionalitu.

#### logic
Statická třída `Logic`, která obsahuje logické funkce pro jednotlivá hradla a konstanty čtyř logických stavů, se kterými
aplikace pracuje (`on`, `off`, `unknown`, `oscillating`).

#### smallFunctions
Statická třída pro malé pomocné funkce, zatím obsahuje jen funkci `deepCopy` (která obaluje volání metody `extend` z jQuery)
vracející hlubokou kopii pole.

#### structuresAndClasses
Třída obsahující různé datové struktury a singleton `Id` (sloužící ke generování unikátních identifikátorů pro DOM elementy).

#### svgObjects
Definice SVG objektů, které jsou pak používány v `editorElements`. Využití dědičnosti pro specializaci jednotlivých elementů.
Předchůdcem všech elementů je `Tag`, z něj jsou pak odvozovány různé specializace (`Image` pro vložení obrázku, `PolyLine` pro
lomenou čáru, `Rectangle` pro obdélník atd.). Každý objekt obsahuje jQuery objekt a metody, které ulehčují operace tímto objektem.

#### contextMenu
Soubor, obsahující třídu `contextMenu`, která obstarává funkcionalitu kontextového menu (zobrazí se po pravém kliknutí myší).

#### floatingMenu
Soubor, obsahující třídu `floatingMenu`, která obstarává funkcionalitu menu v pravém dolním rohu editoru.

### Kaskádové styly
Kaskádové styly jsou psány v jazyce SASS se syntaxí ve stylu SCSS a kompilován pomocí `sass` do CSS3. Po kompilaci je k
němu připojen soubor `css/lib/normalize.css`, který sjednocuje zobrazování nenastylovaných elementů napříč prohlížeči.
Kód je minifikován pomocí `uglify-css`.

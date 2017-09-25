# Uživatelská dokumentace

Uživatelská část dokumentace k programu Hradla. Můžete si také [zobrazit vývojářskou dokumentaci](developer.md).

## Základní ovládání
Pravým kliknutím myší na editační plochu zobrazíte
uživatelské menu. To umožňuje práci s objekty. Menu nabízí
možnost přidávat prvky do hradlové sítě
(hradla a vstupní a výstupní prvek).

Při pravém kliknutí na nějaký konkrétní prvek se v nabídce také
zobrazí volba pro odstranění tohoto prvku. 

## Interaktivní prvky
Pomocí uživatelského menu je možno přidávat na síť různé
interaktivní prvky - hradla (`not`, `and`, `or`, `xor`, `nand`, `not` a `xnor`)
a vstupní a výstupní prvek.

Po přidání prvku na pole je možno jej propojit s ostatními
prvky pomocí vstupních a výstupních konektorů. Pomocí spojů.
Po kliknutí na dva různé konektory se mezi nimi zobrazí spoj,
který indikuje jejich propojení.

_Výstupní konektory mohou být připojeny k více vstupním
konektorům, ke vstupnímu konektoru však může být připojen
jen jeden výstupní. Pro sjednocení více vstupů lze použít
například hradla `or`._

Interaktivní prvky je možno přesouvat levým stisknutím
a tažením, také možno prvkem rotovat klikáním prostředním
tlačítkem myši.

## Stavy spojů a konektorů

Spoj a konektory se mohou nacházet ve čtyřech různých stavech
znázorněných barvou:

- 1 (znázorněný zeleně)
- 0 (znázorněný červeně)
- neznámý (znázorněný šedě)
- oscilující (znázorněný modře)

Vstupní prvek (říkejme mu _spínač_) se může nacházet ve dvou
stavech (1 a 0), stavy lze přepínat levým kliknutím
na spínač.

Stav z výstupního konektoru spínače odpovídá stavu spínače
a je pak propagován do dalších prvků v hradlové síti pomocí spojů.

 
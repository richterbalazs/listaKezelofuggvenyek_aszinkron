// import { emberekLISTA } from "./adat.js";
import { rendez, szures, torol } from "./adatKezelo.js";
import { getAdat } from "./aszinkron.js";
import { htmlOsszeallit, megjelenit } from "./listaMegjelenit.js";
import { adatokListaba } from "./urlapkezelo.js";

getAdat("http://localhost:3000/emberekLISTA", init)


let irany = 1;
szuresEsemeny();
/* 
feladatspecifikáció: 
jelenítsük meg a listánkat egy táblázatban, majd a listát tudjuk rendezni pl név szerint, ha rákattintunk a táblázat fejlécére, akkor rendezze be a táblázat sorait. 
tudjunk szűrni név alapján, 
tudjunk új adatot hozzáadni a táblázathoz
tudjuk törölni a táblázat egy sorát */
/* Függvények és eljárások
1. htmlOszeallit(lista)->txt | összállatja a táblázat htm szerkezetét egy szöveges változóba
2.  megjelenit(txt) -  megjelnítette egy adott html elemben a paraméterénben kapott szöveget. 
3. rendez(lista) -> rendezettLista | a paraméterében kapott listát név szerint megrendezi; a függvény akkor fut le, ha a táblázat név fejlécére kattintunk. 
4. adatHozzaadas(lista) -> kibovitettLista |  Összegyűjti az űrlapról az adatokat és összeállít belőlök egy objektumot, majd azt beleteszi a listába.; a függvény akkor fut le, ha rákattintunk a Hozzáad gombra. 
5. torol(lista,id )->tLista | kitorli a listából az adott id-jű elemet.
Akkor fog lefutni, ha sor melletti torol gombra kattintunk. 
6. szures(lista, keresoSzoveg) -> szurtLista | a keresőmezőbe beírt szöveget keresi a lista objektumainak név mezőjében. mindez akkor fut le, ha beírunk valamit a keresőmezőbe. 

*/

 /* 1 - növekvő rendezés , -1 csökkenő rendezés */

export function init(lista) {
  console.log(lista);
  megjelenit(htmlOsszeallit(lista));
  rendezEsemeny(lista);
  torolEsemeny(lista);
  adatokListaba(lista);
}
/* 
a függvény akkor fut le, ha a táblázat név fejlécére kattintunk. */
function rendezEsemeny(lista) {
  const nevELEM = $(".adatok table th").eq(0);
  nevELEM.on("click", function () {
    const rLISTA = rendez(lista, irany);
    console.log(rLISTA);
    init(rLISTA);
    irany *= -1;
  });
}
function szuresEsemeny(lista) {
  /* akkor kell lefutnia, ha megváltozik a keresőmező tartalma */
  const keresoELEM = $("#szuro");
  keresoELEM.on("keyup", function () {
    let keresoSzoveg = keresoELEM.val();
    const szLISTA = szures(lista, keresoSzoveg);
    init(szLISTA);
  });
}

function torolEsemeny(lista) {
  /* Akkor fog lefutni, ha sor melletti torol gombra kattintunk.  */
  const torolGOMB = $(".torol");
  torolGOMB.on("click", function (event) {
    /*  event.target az az elem, amelyik kiváltotta az eseményt */
    let id = event.target.id;
    console.log(id);
    deleteAdat("http://localhost:3000/emberekLISTA",id)
  });
}


//ujAdat(emberekLISTA)
//init(emberekLISTA)



// Глобальные переменные
tbl = "";
mT = 0;
dn = false;
tmS = 0;
nFftngs = 0;
//
function mkTbl(tdSz, n) {
 mT = n;
 td = "<td style = 'background-color:#f0f0f0; width:" + tdSz + "; height:" + tdSz + "'";
 td += " onmouseover = 'mkCrsr(this)' onclick = 'mvFg(this)'></td>";
 tHdr = "<table id = 'tbl' style = 'background-color:#ccccaa; cursor:pointer'; border = 1px";
 document.write(tHdr);
 for (i = 0; i < mT; i++) {
  document.write("<tr>");
  for (j = 0; j < mT; j++) {
   document.write(td);
  }
  document.write("</tr>");
 }
 document.write("</table>");
}
function sayRC(cll) {
 // Номер столбца текущей ячейки
 c = cll.cellIndex;
 r = gtRw(cll, c);
 alert("Ячейка " + r + ":" + c);
}
// Возвращает номер строки, которой расположена ячейка cll
function gtRw(cll, c) {
 for (i = 0; i < mT; i++) {
  rw = tbl.rows[i];
  if (rw.cells[c] == cll) return i;
 }
}
function nGmFftngs() {
 dn = false;
 nFftngs = 0;
 dt = new Date();
 tmS = dt.getTime();
 // mT - размер заполняемой таблицы
 fL = mT * mT;
 // Массив генерируемых целых чисел
 arrF = new Array(fL);
 // Массив флажков генерируемых целых чисел
 // Элемент arrF2[k] равен false, если число k уже имеется в массиве arrF
 arrF2 = new Array(fL);
 for (k = 0; k < fL; k ++) {
  arrF[k] = 0;
  arrF2[k] = true;
 }
 kL = kL2 = 0;
 // Цикл заполнения массива arrF
 // Число итераций не более 10000
 while (kL < fL && kL2++ < 10000) {
  // Получаем целое случайное число из диапазона [1, fL]
  k = Math.floor(Math.random() * (fL + 1));
  if (k > 0 && arrF2[k - 1]) {
   arrF2[k - 1] = false;
   arrF[kL] = k;
   kL++;
  }
 }
 kL = 0;
 // Цикл заполнения таблицы числами из массива arrF
 for (i = 0; i < mT; i++) {
  rw = tbl.rows[i];
  for (j = 0; j < mT; j++) {
   k = arrF[kL++];
   rw.cells[j].innerHTML = (k > fL - 1) ? "" : k;
  }
 }
}
function mkCrsr(cll) {
 if (dn) mvd = false;
 else {
  c = cll.cellIndex;
  r = gtRw(cll, c);
  if (r == -1)
   mvd = false;
  else
   for (kL = 0; kL < 4; kL++) {
    switch (kL) {
     case 0 : mvd = chkC2(r - 1, c, cll); break;
     case 1 : mvd = chkC2(r, c - 1, cll); break;
     case 2 : mvd = chkC2(r + 1, c, cll); break;
     case 3 : mvd = chkC2(r, c + 1, cll); break;
    }
    if (mvd) break;
   }
 }
 tbl.style.cursor = (mvd) ? 'pointer' : 'crosshair';
}
// Возвращает true, если ячейка r2:c2 является пустой
function chkC2(r2, c2, cll) {
 if (r2 == -1 || c2 == -1 || r2 == mT || c2 == mT) return false;
 cll2 = tbl.rows[r2].cells[c2];
 if (cll2.innerHTML == "") return true;
}
function mvFg(cll) {
 if (dn) return;
 c = cll.cellIndex;
 r = gtRw(cll, c);
 if (r == -1) return;
 fL = mT * mT;
 for (kL = 0; kL < 4; kL++) {
  switch (kL) {
   case 0 : mvd = chkC(r - 1, c, cll); break;
   case 1 : mvd = chkC(r, c - 1, cll); break;
   case 2 : mvd = chkC(r + 1, c, cll); break;
   case 3 : mvd = chkC(r, c + 1, cll); break;
  }
  // Проверяем, завершена игра или нет
  if (mvd) {
   // Переменная dn будет равна true, если игра завершена
   dn = true;
   k = 0;
   for (i = 0; i < mT; i++) {
    rw = tbl.rows[i];
    for (j = 0; j < mT; j++) {
     k++;
     if (k < fL && rw.cells[j].innerHTML != k) {
      dn = false;
      break;
     }
    }
    if (!dn) break;
   }
   if (dn) sRslt();
   break;
  }
 }
}
function chkC(r2, c2, cll) {
 if (r2 == -1 || c2 == -1 || r2 == mT || c2 == mT) return false;
 cll2 = tbl.rows[r2].cells[c2];
 if (cll2.innerHTML == "") {
  nFftngs++;
  cll2.innerHTML = cll.innerHTML;
  cll.innerHTML = "";
  tbl.style.cursor = 'crosshair';
  return true;
 }
}
// Выстраивает кости в надлежащем порядке
function bldFftngs() {
 if (dn) return;
 k = 0;
 for (i = 0; i < mT; i++) {
  rw = tbl.rows[i];
  for (j = 0; j < mT; j++) rw.cells[j].innerHTML = (++k > 15) ? "" : k;
 }
 dn = true;
 sRslt();
}
// Показывает потраченные время и число ходов
function sRslt() {
 dt = new Date();
 tm = Math.round(0.001 * (dt.getTime() - tmS));
 alert("Игра завершена. Число ходов " + nFftngs + ". Затрачено времени " + tm + " с.");
}
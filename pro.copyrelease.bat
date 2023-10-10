rem  *******************************************************
rem  *     DANIEL ELÍAS BAT DE GENERACION DE RELEASE       *
rem  *                Fecha:13/02/2022                     *
rem  *                Fecha:13/02/2022                     *
rem  *******************************************************
echo off
cls
echo Creando variables de entorno
set current=%cd%
set t=%current%\dist
cd %t%
echo Compiando el Compilando

copy %current%\libs\*.* %t%\libs

xcopy %current%\src\public\contents %t%\src\public\contents /E
xcopy %current%\src\public\fuentes-sura %t%\src\public\fuentes-sura /E
xcopy %current%\src\public\fonts %t%\src\public\fonts /E
xcopy %current%\src\public\images %t%\src\public\images /E
xcopy %current%\src\public\scripts %t%\src\public\scripts /E

copy %current%\src\public\*.* %t%\src\public

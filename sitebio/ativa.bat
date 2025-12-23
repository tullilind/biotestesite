@echo off
title Servidor Local Bioteste (Porta 5000)
color 0A

echo ==================================================
echo      INICIANDO SERVIDOR LOCAL - BIOTESTE
echo      Porta: 5000
echo ==================================================
echo.
echo [INFO] Abrindo navegador em http://localhost:5000...
echo.

:: 1. Tenta abrir o navegador automaticamente (aguarda 2 seg para o server subir)
timeout /t 2 >nul
start http://localhost:5000

:: 2. Inicia o servidor usando Node.js (http-server)
:: O comando 'call' garante que o bat não feche se o npx demorar
call npx http-server -p 5000 -c-1

:: Caso o comando acima falhe (se não tiver Node), cai aqui:
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Nao foi possivel iniciar com Node.js/npx.
    echo Tentando com Python...
    python -m http.server 5000
)

pause
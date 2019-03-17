@echo off
title SIMSAR MANAGER
color 1f
D:
cd
cd D:\simsar-manager\src
start ng serve
cd db/
start json-server db.json --watch
start chrome.exe --new-tab http://localhost:4200/home
start D:\Apps\VSCode-win32-ia32-1.14.2\Code.exe
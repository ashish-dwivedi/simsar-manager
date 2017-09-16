@echo off
title SIMSAR_Manager
color 1f
start ng serve
cd ./db
start json-server db.json --watch
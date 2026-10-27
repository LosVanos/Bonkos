#!/bin/sh
# Cria a tua chave de assinatura (guarda o ficheiro e as palavras-passe num sítio seguro: sem elas não consegues atualizar a app).
keytool -genkeypair -v -keystore bonkos.jks -alias bonkos -keyalg RSA -keysize 2048 -validity 10000
echo "Para o GitHub: copia isto para o segredo KEYSTORE_BASE64"
base64 -w0 bonkos.jks 2>/dev/null || base64 bonkos.jks

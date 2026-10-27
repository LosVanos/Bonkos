# Bonkos — da página ao telemóvel e à Google Play

Esta pasta é o projeto Android do Bonkos, criado com Capacitor. O jogo em si é o ficheiro `src/game.html`, o mesmo que está publicado no Claude. Sempre que o jogo mudar, substituis esse ficheiro e voltas a compilar.

## 1. Ter a APK no telemóvel (sem instalar nada no PC)

1. Cria uma conta em github.com, se ainda não tiveres.
2. Cria um repositório novo, privado, chamado `bonkos`.
3. Carrega para lá o conteúdo desta pasta. Podes arrastar os ficheiros na página do GitHub ("Add file › Upload files"). A pasta `node_modules` não é precisa.
4. Abre o separador **Actions**. A compilação "Android (APK e AAB)" começa sozinha e demora cerca de 5 a 8 minutos.
5. Quando ficar verde, entra nela e descarrega `bonkos-apk-teste`. Dentro está `app-debug.apk`.
6. Passa a APK para o telemóvel e abre-a. O Android pede para autorizar "instalar apps desconhecidas".

Cada vez que mudares algo e carregares no GitHub, sai uma APK nova.

## 2. Ligar o online: ranking, adversários reais e transferir progresso

1. Vai a console.firebase.google.com › Adicionar projeto › `bonkos`. O Google Analytics é opcional.
2. Em **Authentication › Sign-in method**, liga o **Anónimo**.
3. Em **Firestore Database**, cria a base de dados em modo de produção, na região `europe-west1`.
4. No separador **Regras**, cola o conteúdo de `firebase/firestore.rules` e publica.
5. Em **Definições do projeto › As tuas apps**, adiciona uma app **Web** (ícone `</>`) e copia o bloco `firebaseConfig`.
6. Abre `www-config.js` e troca `window.BONKOS_FIREBASE = null;` pelo teu bloco, com o formato do exemplo que está no ficheiro.
7. Carrega no GitHub. A nova APK já fica ligada.

O plano grátis do Firebase (Spark) chega para os testes e para os primeiros milhares de jogadores.

## 3. Anúncios com recompensa (AdMob)

- Até lá, a app usa os **anúncios de teste da Google**. São seguros e não pagam.
- Para receber dinheiro:
  1. Cria a conta em admob.google.com.
  2. Adiciona a app Android "Bonkos".
  3. Cria um bloco **Recompensado** (rewarded).
  4. No `www-config.js`, mete `live: true` e o ID do bloco em `rewarded`.
  5. Em `android/app/src/main/res/values/strings.xml`, troca `admob_app_id` pelo ID da tua app AdMob (`ca-app-pub-...~...`).
  6. Em `capacitor.config.json`, troca também o `appIdAndroid`.
- Os anúncios aparecem em dois sítios:
  - "Moedas ×2" no fim de cada luta;
  - "×2 com anúncio" ao recolher a quinta.

## 4. Compras na app (gemas, pack de arranque, baú lendário)

- Na Play Console, em **Monetizar › Produtos › Produtos na app**, cria:
  - `bonkos_starter`, o Pack de arranque (compra única);
  - `bonkos_gems_80`, o Punhado de gemas;
  - `bonkos_gems_500`, o Saco de gemas;
  - `bonkos_chest_legend`, o Baú lendário.
- Os preços que meteres lá aparecem no jogo automaticamente.
- Fora da app instalada da Google Play, as compras continuam simuladas.
- As compras reais só funcionam com a app instalada a partir da Play Store, mesmo que seja do teste fechado.

## 5. Publicar na Google Play

1. **Conta de programador**: play.google.com/console, com um pagamento único de 25 dólares e verificação de identidade.
2. **Chave de assinatura**:
   - Corre `./make-keystore.sh`, ou pede-me que a faça contigo.
   - Guarda o ficheiro `bonkos.jks` e as palavras-passe em sítio seguro, porque sem eles não consegues atualizar a app.
   - No GitHub, em **Settings › Secrets › Actions**, cria quatro segredos:
     - `KEYSTORE_BASE64`, com o texto que o script mostra;
     - `KEYSTORE_PASSWORD`;
     - `KEY_ALIAS` (`bonkos`);
     - `KEY_PASSWORD`.
   - A partir daí cada compilação gera também `bonkos-aab-playstore`, o ficheiro `.aab` que se envia para a Play Store.
3. **Criar a app na Play Console** com os materiais da pasta `loja/`:
   - ícone 512×512;
   - imagem de destaque 1024×500;
   - 6 capturas;
   - textos em `textos-da-loja.md`.
4. **Política de privacidade**:
   - Preenche nome, email e data em `loja/privacidade.html`.
   - Publica-a num endereço público. Pode ser o GitHub Pages do próprio repositório ou um artefacto do Claude partilhado.
5. **Formulários obrigatórios**: segurança dos dados, classificação de conteúdo, público-alvo (13+ evita regras extra para crianças), anúncios: Sim.
6. **Teste fechado**:
   - Envia o `.aab` para **Testes › Teste fechado**.
   - Junta pelo menos 12 testadores pelos emails.
   - Os testadores precisam de ficar inscritos durante 14 dias seguidos. É obrigatório para contas pessoais novas.
7. **Produção**: ao fim dos 14 dias, pedes acesso à produção na Play Console e publicas.

## Comandos (só se quiseres compilar no teu PC, com o Android Studio instalado)

```
npm install
node build-www.js      # gera a pasta www a partir de src/game.html + www-config.js
npx cap sync android
npx cap open android   # abre no Android Studio › Run
```

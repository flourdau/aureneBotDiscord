printf "\nSetup Aurène :\n"

sudo apt-get update -y
sudo apt-get dist-upgrade -y
sudo apt-get autoclean -y
printf "\n- Update! ✅\n"

sudo apt-get install -y git curl
printf "\n- Installation de git & curl! ✅\n"

sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo bash - 
sudo apt-get install -y nodejs
# sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | sudo bash
# nvm install --16
# nvm use --16
printf "\n- Installation de Node & NMP! ✅\n"

npm i discord.js
npm i node-pre-gyp@0.17.0
npm i --save ytdl-core
npm i --save @discordjs/opus 
printf "\n- Installation de Discord.js & Youtube-dl-core & NMP! ✅\n"

git clone https://github.com/flourdau/libJS.git ../libJS
printf "\n- Installation de la libJS de senacra! ✅\n"
printf "\nInstallation terminée\n"

mkdir ./musics
printf "\n- Création du dossier musics ✅\n"

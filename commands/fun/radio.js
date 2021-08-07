const fs    =   require('fs');
const mm    =   require('music-metadata');

module.exports  =    {

	name        :   'radio',
    aliases     :   ['music', 'play'],
	description :   'Lecture d\'un titre locale...🎵',	
    usage       :   '-shuffle <directory name>',	
    guildOnly   :   false,
    args        :   false,
    cooldown    :   5,
	permissions :   [
                        '862769533311254548',   //	Admin
                        '869925004014415952',	//	Bots
                        '862769533278093347',   //	Super Link
                        '862769533278093346',   //	Link
                        '862769533278093345'	//	New Link
                    ],


	execute(message, args, client) {

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function parseFiles(audioFiles, connection) {
            const audioFile =   audioFiles.shift();

            if (audioFile) {
                return mm.parseFile(pathDir + audioFile).then(metadata => {
                    const duration  =   (Math.floor(metadata.format.duration) * 1000) + 3000;
                    let stream      =   fs.createReadStream(pathDir + audioFile);

                    connection.play(stream);
                    client.user.setPresence({
                        activity    :   {
                            name    :   `${metadata.common.title} - ${metadata.common.artist} 🎶🎵🌟`,
                            type    :   'LISTENING'
                        }, 
                        status      :   'online'});
                    setTimeout(function() {
                        return parseFiles(audioFiles, connection);
                    }, duration);
                })
            }
            return Promise.resolve();
        }

        const channelID     =   `868986550367711282`;
        const channel       =   client.channels.resolve(channelID);
        let pathDir         =   './musics/';
        let shuffle         =   0;
        let i               =   -1;
        client.musics       =   [];

        if (args[0] === '-shuffle') {
            shuffle =   1;
            args.shift();
        }
  
        if (args[0]) {
            pathDir =   pathDir.concat(args.join(` `) + `/`);
        }

        const musicsFolders =   fs.readdirSync(pathDir);

        for (const folder of musicsFolders) {
            let filterFolder    =   [];
            let musicsFolder    =   [];
            let flag            =   0;

            if (fs.lstatSync(`${pathDir}${folder}`).isDirectory()) {
                musicsFolder    =  fs.readdirSync(`${pathDir}${folder}`);
            }
            else {
                flag = 1;
                musicsFolder    =  musicsFolders;
            }

            filterFolder    =   musicsFolder.filter(file => file.endsWith('.mp3'));
            filterFolder    =   filterFolder.concat(musicsFolder.filter(file => file.endsWith('.flac')));
            filterFolder    =   filterFolder.concat(musicsFolder.filter(file => file.endsWith('.webm')));

            for (musicFile of filterFolder) {
                if (flag === 0) {
                    client.musics[++i]  =   `${folder}/` + musicFile;
                }
                else {
                    client.musics[++i]  =   `/` + musicFile;
                }
            }

            if (flag === 1) {
                break;
            }

        }

        if (shuffle === 1) {
            client.musics   =   shuffleArray(client.musics);
        }

        if (message.channel.type !== 'dm') {
            message.delete();
        }

        channel.join().then(connection => { parseFiles(client.musics, connection); });

    }

};
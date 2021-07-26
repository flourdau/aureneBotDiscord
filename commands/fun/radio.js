const fs    =   require('fs');
const mm    =   require('music-metadata');

module.exports  =    {

	name        :   'radio',
    aliases     :   ['music'],
	description :   'Lecture d\'un titre locale...🎵',	
    usage       :   '<URL>',	
    guildOnly   :   false,
    args        :   false,
    cooldown    :   5,
        // permissions  :   '🌻Administrateur🌻',

	execute(message, args, client) {

        function parseFiles(audioFiles, connection) {

            const audioFile =   audioFiles.shift();
            const pathDir   =   '/home/senacra/myDEPOTS/aureneBotDiscord/musics/';

            if (audioFile) {
                return mm.parseFile(pathDir + audioFile).then(metadata => {
                    const duration = (Math.floor(metadata.format.duration) * 1000) + 3000;

                    broadcast.play(pathDir + audioFile);
                    connection.play(broadcast);
                    setTimeout(function() {
                        return parseFiles(audioFiles, connection);
                    }, duration);
                })
            }
            return Promise.resolve();
        }

            
        const channelID     =   `862769535597281300`;
        const channel       =   client.channels.resolve(channelID);
        const mp3Files      =   fs.readdirSync('./musics').filter(file => file.endsWith('.mp3'));
        const broadcast     =   client.voice.createBroadcast();

        channel.join().then(connection => { parseFiles(mp3Files, connection); });
	}

};
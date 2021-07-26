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

        let channelID   =   `862769535597281300`;
        let channel     =   client.channels.resolve(channelID);
        
        if (message.channel.type !== 'dm') {
            message.delete();
        }
        channel.join()
                .then(connection => {
                    if (!args[1]) {
                        args[1] = '/home/senacra/myDEPOTS/aureneBotDiscord/musics/06.mp3';
                    }

                    const broadcast = client.voice.createBroadcast();

                    broadcast.play(args.join(``));
                    connection.play(broadcast);
                })
                .catch(err => console.log(err));
	},

};
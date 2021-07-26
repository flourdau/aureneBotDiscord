const  ytdl  = require('ytdl-core');

module.exports  =    {

    name        :   'youtube',
    aliases     :   ['yt'],
    description :   'Lecture d\'une video youtube avec audio en 96kbps max...🎵',
    usage       :   '<URL YouTube> <quality> max 96',
    guildOnly   :   false,
    args        :   true,
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
                    if (!args[1] || args[1] > 96 || args[1] < 18 ) {
                        args[1] = '96';
                    }

                    const stream        =   ytdl(args.join(``), { bitrate: args[1] * 1000 });
                    const dispatcher    =   connection.play(stream);

                    dispatcher.on('finish', () => voiceChannel.leave());
                })
                .catch(err => console.log(err));
	},

};
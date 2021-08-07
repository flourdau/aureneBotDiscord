const ytdl  =   require('ytdl-core');

module.exports  =    {

    name        :   'youtube',
    aliases     :   ['yt'],
    description :   'Lecture d\'une video youtube avec audio en 96kbps max...🎵',
    usage       :   '<URL YouTube> <quality> max 96',
    guildOnly   :   false,
    args        :   true,
    cooldown    :   5,
	permissions :   [
                        '862769533311254548',   //	Admin
                        '869925004014415952',	//	Bots
                        '862769533278093347',   //	Super Link
                        '862769533278093346',   //	Link
                        '862769533278093345'	//	New Link
                    ],


	execute(message, args, client) {

        let channelID   =   `868986550367711282`;
        let channel     =   client.channels.resolve(channelID);
        
        if (message.channel.type !== 'dm') {
            message.delete();
        }

        channel.join()
                .then(connection => {
                    if (!args[1] || args[1] > 96 || args[1] < 18 ) {
                        args[1] =   '96';
                    }

                    const stream    =   ytdl(args.join(``), { bitrate: args[1] * 1000 });
                    ytdl.getInfo(args.join(``)).then(info => {
                        client.user.setPresence({
                        activity    :   {
                            name    :   `${info.videoDetails.title}`,
                            url     :   `${info.videoDetails.video_url}`,
                            type    :   'LISTENING'
                        }, 
                        status      :   'online'});
                    });

                    const dispatcher    =   connection.play(stream);
                    dispatcher.on('finish', () => voiceChannel.leave());
                })
                .catch(err => console.log(err));
	},

};
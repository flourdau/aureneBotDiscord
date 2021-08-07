const { emojiBot }   =   require('../config.json');

module.exports  =   {

	name    :   'messageReactionAdd',


	async execute(reaction, user, client) {

        if ((reaction.message.id === "863147783111573545" || reaction.message.id === "862796269960822824"  ) && reaction.emoji.name === "💗") {

            try {
                await reaction.fetch();
            }
            catch (error) {
                console.error('Something went wrong when fetching the message: ', error);
                return;
            }
            
            let role    =   await reaction.message.guild.roles.cache.get("862769533278093345");
            let member  =   reaction.message.guild.members.cache.get(user.id);
            
            try {
                await member.send(`${emojiBot} Tu possédes un petit pouvoir <@${member.id}>, te voilà automatiquement ${role.name}!`);
            }
            catch (error) {
                console.log(error);
                return;
            }

        }

        if (reaction.message.channel.id !== "862769534757502980" && reaction.emoji.name === "🎁") {
            
            try {
                await reaction.fetch();
            }
            catch (error) {
                console.error('Something went wrong when fetching the message: ', error);
                return;
            }

            if (reaction.count <= 1) { 
                // clone to a message
                let tmp =   reaction.message;
        
                if (tmp.content === '') {
                    tmp =   reaction.message.attachments.first();
                    
                    if (!tmp) {
                        tmp =   reaction.message.embeds;
                    }

                    try {
                        let channel =   client.channels.cache.get("862769534757502980");
                        await channel.send(tmp);
                    }
                    catch (error) {
                        console.log(error);
                        return;
                    }
                }
                else {
                    try {
                        let channel =   client.channels.cache.get("862769534757502980");
                        await channel.send(`${tmp}`);
                    }
                    catch (error) {
                        console.log(error);
                        return;
                    }
                }
                
                // Reply to a Reaction
                let str =   ` et <@${user.id}> aussi!.. `;

                if (user.id === reaction.message.author.id) {
                    str = ' ';
                }

                reaction.message.reply(`${emojiBot} Merci${str}: )`)
                                    .then(() => console.log(`Sent a reply to ${user.username} Reaction`))
                                    .catch(console.error);
            }

        }

    }

};

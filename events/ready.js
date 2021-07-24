const { emojiBot }   =   require('../config.json');

module.exports = {

	name: 'ready',
	once: true,

	execute(client) {
        let d = client.myDate();
        console.log(`${emojiBot} ${d.myDate} ${d.myHour} I'm Up!`);
        client.channels.resolve("862769536289734669").send(`${emojiBot} ${d.myDate} ${d.myHour} I'm Up! Logged in as ${client.user.username} <@270810792612462592>`);
        client.user.setPresence({ activity: {
                                    name:'!help',
                                    type:'LISTENING'
                                }, 
                                status: 'online'
                            })
                    .then()
                    .catch(console.error);
                    
                    console.log(``);
                },

};

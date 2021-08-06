module.exports = {

	name    :   'message',

	async execute(message) {
        
        // Reaction 🎁 & crosspost of all messages in channel Gift: 862769534757502980
        if ((message.channel.id === '862769534757502980') && (message.channel.type === 'news')) {
            message.react('🎁');
            message.crosspost()
                    .then(() => console.log('Crossposted message'))
                    .catch(console.error);
        }

        // Reaction 💗 & crosspost of all messages in channel Gift: 862769534757502980
        if ((message.channel.id === '864464984360091668') && (message.channel.type === 'news')) {
            message.react('💗');
            message.crosspost()
                    .then(() => console.log('Crossposted message 💗'))
                    .catch(console.error);
        }
       
	}

};
const fetch =   require('node-fetch');

module.exports  =   {

	name		:	'epic',
	aliases		:	false,
	description	:	'Request 2 last epic games articles promo',
    usage		:	false,	
    guildOnly	:	false,
    cooldown	:	60,
	permissions :   [
                        '862769533311254548',   //Admin
                        '869925004014415952'	//Bots
                    ],


	async execute(message) {
        
        if (message.channel.type !== 'dm') {
            message.delete();
		}

        // const requestURL    =   `https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?country=FR`;
        const requestURL    =   `https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=fr&country=FR&allowCountries=FR`;
        const epic          =   await fetch(requestURL).then(res => res.json()).catch(console.error);
        const catalogue     =   epic.data.Catalog.searchStore.elements;

        catalogue.reverse().forEach(game => {
            if (game.promotions && game.promotions.promotionalOffers.length > 0 && game.promotions.promotionalOffers[0].promotionalOffers.find((p) => p.discountSetting.discountPercentage === 0)) {
                message.channel.send(`https://www.epicgames.com/store/fr/p/${game.productSlug.split('/', 1)[0]}`);
        }});
            
	},

};
const fetch                 =   require('node-fetch');
const { MessageEmbed }		=   require('discord.js');
const { openweathermap }	=	require('../../config.json');

/*
**	On execute 2 requetes https, une (Weather) pour reccuperer les coordonnée GPS 
**	& l'autre (Air Quality) pour reccuperer la data...
*/
module.exports	=	{

	name	        :	'air',
	aliases         :   ['aqi'],
	description     :   'Qualité de l\'air par coordonné GPS avec OpenWeatherMap',
    usage           :   '<ville> --full',	
    guildOnly       :   false,
	args        	:   true,
	cooldown        :   30,
	permissions :   [
						'862769533311254548',   //	Admin
						'869925004014415952',	//	Bots
						'862769533278093347',   //	Super Link
						'862769533278093346',   //	Link
						'862769533278093345'	//	New Link
					],


	async execute(message, args, client) {

		if (message.channel.type !== 'dm') {
			message.delete();
		}
		
		if (args) {
			if (!(args[0].search(/[^A-Za-z\s]/) === -1)) {
				if (!message.author.bot) {
					message.author.send(`ERROR! XD`);
				}
				return;
			}

			let lastElemt    =   false;
			lastElemt        =   args.pop();
			if ((lastElemt !== '--full') && (lastElemt !== '-f')) {
				args.push(lastElemt);
				lastElemt    =   false;
			}

			const city = args.join(' ');
			if (city.search(/[^A-Za-z\s]/) === -1) {
				let requestURL	=	`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweathermap}&units=metric&lang=fr`;
				let meteo		=	await fetch(requestURL).then(res => res.json())
															.catch(console.error);

				if (meteo.cod !== '404') {
					let requestURL2	=	`https://api.openweathermap.org/data/2.5/air_pollution?lat=${meteo.coord.lat}&lon=${meteo.coord.lon}&appid=${openweathermap}&units=metric&lang=fr`;
					let air			=	await fetch(requestURL2).then(res => res.json())
																.catch(console.error);

					if (air.cod !== '404') {
						let title		=	`${air.list[0].main.aqi}/5 Aqi`;
						let fields 		=	[];

						if (lastElemt) {
							fields	=	[
											{ name	:	`\u200B`, value	:	`**CO**		: *Monoxyde de Carbone*\n**${air.list[0].components.co}** μg/m3`, inline: true },
											{ name	:	`\u200B`, value	:	`**NO** 	: *Monoxyde d\'Azote*\n**${air.list[0].components.no}** μg/m3`, inline: true },
											{ name	:	`\u200B`, value :	`\u200B`, inline: false },
											{ name	:	`\u200B`, value	:	`**NO2**	: *Dioxyde d\'Ozone*\n**${air.list[0].components.no2}** μg/m3`, inline: true },
											{ name	:	`\u200B`, value	:	`**O3**		: *Ozone*\n**${air.list[0].components.o3}** μg/m3`, inline: true },
											{ name	:	`\u200B`,value	:	`\u200B`, inline: false },
											{ name	:	`\u200B`, value	:	`**SO2**	: *Dioxyde de Soufre*\n**${air.list[0].components.so2}** μg/m3`, inline: true },
											{ name	:	`\u200B`, value	:	`**PM2_5**	: *Particules Fines*\n**${air.list[0].components.pm2_5}** μg/m3`, inline: true },
											{ name	:	`\u200B`, value	:	`\u200B`, inline: false },
											{ name	:	`\u200B`, value	:	`**PM10**	: *Particules Grossières*\n**${air.list[0].components.pm10}** μg/m3`, inline: true },
											{ name	:	`\u200B`, value	:	`**NH3**	: *Ammoniac*\n**${air.list[0].components.nh3}** μg/m3`, inline: true },
											{ name	:	`\u200B`, value	:	`\u200B`, inline: false }
										];
						}

						const airEmbed	=	new MessageEmbed().setColor('#0099ff')
																.setTitle(title)
																.setURL('https://openweathermap.org/');

						fields.forEach(element => {
							airEmbed.addField(element.name,element.value,element.inline)
						});

						const canalID		=   `867622707049660496`;
						const messageAqiID	=	`872836732255629362`;
						const canal			=   client.channels.resolve(canalID);
						
						canal.messages.fetch(messageAqiID)
										.then(message => {message.edit(airEmbed);});

						const messageCityID =   `872836726597500968`;
						const cityEmbed     =   new MessageEmbed().setColor('#0099ff')
																	.setTitle(city)
						
						canal.messages.fetch(messageCityID)
										.then(message => {message.edit(cityEmbed);});
					}
				}
			}
		}

	}
	
};
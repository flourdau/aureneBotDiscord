const fetch                 =   require('node-fetch');
const { MessageEmbed }		=   require('discord.js');
const { openweathermap }	=	require('../../config.json');

module.exports	=	{

	name	        :	'meteo',
	aliases         :   ['temps', 'météo'],
	description     :   'Météo par ville avec OpenWeatherMap',
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
			if ((lastElemt !== "--full") && (lastElemt !== "-f")) {
				args.push(lastElemt);
				lastElemt    =   false;
			}

			const city	=	args.join(' ');
			if (city.search(/[^A-Za-z\s]/) === -1) {
				let requestURL	=	`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweathermap}&units=metric&lang=fr`;
				let meteo		=	await fetch(requestURL).then(res => res.json())
															.catch(console.error);

				if (meteo.cod !== '404') {
					let icon		=	"http://openweathermap.org/img/w/" + meteo.weather[0].icon + ".png";
					let title		=	`${meteo.main.temp}° C`;
					let fields 		=	[];

					if (lastElemt) {
						fields	=	[
										{ name	:	`\u200B`,		value	:	meteo.main.feels_like + `° C*Ressenti*`, inline	:	true },
										{ name	:	`\u200B`,		value	:	`\u200B`, inline	:	false },
										{ name	:	`Pression:`,	value	:	meteo.main.pressure + `hPa`, inline	:	true },
										{ name	:	`Humidité:`,	value	:	meteo.main.humidity + `%`, inline	:	true },

										{ name	:	`\u200B`,		value	:	`\u200B`, inline	:	false },
										{ name	:	`Vitesse:`,		value	:	meteo.wind.speed + `m/s`, inline	:	true },
										{ name	:	`Direction:`,	value	:	meteo.wind.deg + `°`, inline	:	true },

										{ name	:	`\u200B`,		value	:	`\u200B`, inline	:	false },
										{ name	:	`Levé:`,		value	:	meteo.sys.sunrise, inline	:	true },
										{ name	:	`Couché:`,		value	:	meteo.sys.sunset, inline	:	true }
									];
					}

					const meteoEmbed	=	new MessageEmbed().setColor('#0099ff')
																.setTitle(title)
																.setURL('https://openweathermap.org/')
																.setDescription(`**${meteo.weather[0].description}**`)
																.setThumbnail(icon);

					fields.forEach(element => {
						meteoEmbed.addField(element.name,element.value,element.inline)
					});

					const canalID			=   `867622707049660496`;
					const messageMeteoID	=	`872836729529319425`;
					const canal				=   client.channels.resolve(canalID);

					canal.messages.fetch(messageMeteoID)
									.then(message => {message.edit(meteoEmbed);});

					const messageCityID		=   `872836726597500968`;
					const cityEmbed     	=   new MessageEmbed().setColor('#0099ff')
																.setTitle(city)
					
					canal.messages.fetch(messageCityID)
									.then(message => {message.edit(cityEmbed);});
				}
			}
		}

	}

};
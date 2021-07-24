const fetch                 =   require('node-fetch');
const { MessageEmbed }		=   require('discord.js');
const { openweathermap }	=	require('../../config.json');

module.exports	=	{

	name	        :	'meteo',
	aliases         :   ['temps', 'météo'],
	description     :   'Météo par ville avec OpenWeatherMap',
    usage           :   '<ville> -full',	
    guildOnly       :   false,
	args        	:   true,
	cooldown        :   30,

	async execute(message, args) {
		
		if (message.channel.type !== 'dm') {
			message.delete();
		}
		
		if (args[0] === '-full' || args[0] === '-f') {
			message.channel.send(`ERROR! XD`);
			return;
		}
		
		let city		=	args[0];
		let requestURL	=	`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweathermap}&units=metric&lang=fr`;
		let meteo		=	await fetch(requestURL).then(res => res.json())
													.catch(console.error);
		let icon		=	"http://openweathermap.org/img/w/" + meteo.weather[0].icon + ".png";
		let title		=	`${meteo.main.temp}° C`;
		let fields 		=	[];

		if (args[1] === '-full' || args[1] === '-f') {
			fields	=	[
							{ name	:	`\u200B`,		value:meteo.main.feels_like + `° C*Ressenti*`,	inline: true },
							{ name	:	`\u200B`,		value:`\u200B`, inline: false },
							{ name	:	`Pression:`,	value:meteo.main.pressure + `hPa`, inline: true },
							{ name	:	`Humidité:`,	value:meteo.main.humidity + `%`, inline: true },

							{ name	:	`\u200B`,		value:`\u200B`, inline: false },
							{ name	:	`Vitesse:`,		value:meteo.wind.speed + `m/s`, inline: true },
							{ name	:	`Direction:`,	value:meteo.wind.deg + `°`, inline: true },

							{ name	:	`\u200B`,		value:`\u200B`, inline: false },
							{ name	:	`Levé:`,		value:meteo.sys.sunrise, inline: true },
							{ name	:	`Couché:`,		value:meteo.sys.sunset, inline: true }
						];
		}

		const meteoEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(title)
			.setURL('https://openweathermap.org/')
			.setDescription(`**${meteo.weather[0].description}**`)
			.setThumbnail(icon)
			.setFooter('Source : https://openweathermap.org/');

		fields.forEach(element => {
			meteoEmbed.addField(element.name,element.value,element.inline)
		});

		message.channel.send(meteoEmbed);

	},

};
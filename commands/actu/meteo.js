const https                 		=   require('https');
const { MessageEmbed }			=   require('discord.js');
const { openweathermap }	=	require('../../config.json');
module.exports	=	{

	name	        :	'meteo',
	aliases         :   ['temps', 'météo'],
	description     :   'Météo par ville avec OpenWeatherMap',
    usage           :   '<ville> -full',	
    guildOnly       :   true,
	args        	:   true,
	cooldown        :   15,

	execute(message, args, client) {
		
		let city = args[0];
		let requestURL	=	`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweathermap}&units=metric&lang=fr`;

        https.get(requestURL, (res) => {

            res.on('data', (d) => {

                if (message.channel.type !== 'dm') {
					message.delete();
                }
				
				if (res.statusCode !== 200 || args[0] === '-full' || args[0] === '-f') {
	                message.channel.send(`ERROR! XD`);
					return;
				}

				d						=	JSON.parse(d);
				let icon				=	"http://openweathermap.org/img/w/" + d.weather[0].icon + ".png";
				let title				=	`**${city}** : `;
				let author				=	client.user.username;
				let authorAvatar		=	`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.webp`;
				let fieldTemperature	=	{ name	:	`Température:`,	value:d.main.temp + `°C`,	inline: true };
				let fieldFeelsLike		=	{ name	:	`Ressenti:`,	value:d.main.feels_like + `°C`,	inline: true };
				let fields 				=	[
												fieldTemperature,
												fieldFeelsLike
											];

				if (args[1] === '-full' || args[1] === '-f') {
	                let tmpTab	=	[
										{ name	:	`\u200B`,		value:`\u200B`, inline: false },
										{ name	:	`Pression:`,	value:d.main.pressure + `hPa`, inline: true },
										{ name	:	`Humidité:`,	value:d.main.humidity + `%`, inline: true },

										{ name	:	`\u200B`,		value:`\u200B`, inline: false },
										{ name	:	`Vitesse:`,		value:d.wind.speed + `m/s`, inline: true },
										{ name	:	`Direction:`,	value:d.wind.deg + `°`, inline: true },

										{ name	:	`\u200B`,		value:`\u200B`, inline: false },
										{ name	:	`Levé:`,		value:d.sys.sunrise, inline: true },
										{ name	:	`Couché:`,		value:d.sys.sunset, inline: true }
									];

					fields = fields.concat(tmpTab);
				}

				const meteoEmbed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle(title)
					.setURL('https://openweathermap.org/')
					.setAuthor(author, authorAvatar, 'https://discord.js.org')
					.setDescription(d.weather[0].description)
					.setImage(icon)
					.setTimestamp()
					.setFooter('Meteo by https://openweathermap.org/');

				fields.forEach(element => {
					meteoEmbed.addField(element.name,element.value,element.inline)
				});
				message.channel.send(meteoEmbed);
				
				if (args[1] === '-full' || args[1] === '-f') {
					message.channel.send(`!air ${city} -f`);			
				}
				return;

            });
        })
        .on('error', (e) => {
            console.error(e);
        });

	},

};
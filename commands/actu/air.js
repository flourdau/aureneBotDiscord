const https                 		=   require('https');
const { MessageEmbed }			=   require('discord.js');
const { openweathermap }	=	require('../../config.json');
module.exports	=	{

	name	        :	'air',
	aliases         :   ['aqi'],
	description     :   'Qualité de l\'air par coordonné GPS avec OpenWeatherMap',
    usage           :   '<ville> -full',	
    guildOnly       :   true,
	args        	:   true,
	cooldown        :   15,

	execute(message, args, client) {
		// On execute 2 requetes https, une pour reccuperer les coordonnée GPS & l'autre pour reccuperer la data...

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
				let lat					=	d.coord.lat;
				let lon					=	d.coord.lon;
				let requestURL2			=	`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${openweathermap}&units=metric&lang=fr`;

				https.get(requestURL2, (res2) => {
					res2.on('data', (d2) => {
						
						d2				=	JSON.parse(d2);
						let fieldAqi	=	{ name	:	`Aqi:`,	value:d2.list[0].main.aqi,	inline: true };
						let fields 		=	[fieldAqi];

						if (args[1] === '-full' || args[1] === '-f') {
							let tmpTab	=	[
												{ name	:	`\u200B`,		value:`\u200B`, inline: false },
												{ name	:	`CO:`,	value:d2.list[0].components.co, inline: true },
												{ name	:	`no:`,	value:d2.list[0].components.no, inline: true },
												{ name	:	`no2:`,	value:d2.list[0].components.no2, inline: true },
												{ name	:	`o3:`,	value:d2.list[0].components.o3, inline: true },
												{ name	:	`so2:`,	value:d2.list[0].components.so2, inline: true },
												{ name	:	`pm2_5:`,	value:d2.list[0].components.pm2_5, inline: true },
												{ name	:	`pm10:`,	value:d2.list[0].components.pm10, inline: true },
												{ name	:	`nh3:`,	value:d2.list[0].components.nh3, inline: true },
												{ name	:	`\u200B`,		value:`\u200B`, inline: true }
											];
		
							fields = fields.concat(tmpTab);

						}

						const meteoEmbed = new MessageEmbed()
							.setColor('#0099ff')
							.setTitle(title)
							.setURL('https://openweathermap.org/')
							.setAuthor(author, authorAvatar, 'https://discord.js.org')
							.setFooter('Meteo by https://openweathermap.org/');
		
						fields.forEach(element => {
							meteoEmbed.addField(element.name,element.value,element.inline)
						});
						message.channel.send(meteoEmbed);
						return;
					});
				})
				.on('error', (e2) => {console.error(e2);});
	        });
		})
		.on('error', (e) => {
			console.error(e);
		});

	},

};
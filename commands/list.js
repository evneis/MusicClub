const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('List all submitted albums for this month'),
    
    async execute(interaction) {
        // TODO: Retrieve album data from database/file
        // TODO: Format and display albums in an embed
        
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('🎵 Music Club Submissions')
            .setDescription('Here are all the albums submitted this month:')
            .addFields(
                { name: 'Sample Album', value: 'Sample Artist - No link provided', inline: false }
            )
            .setTimestamp()
            .setFooter({ text: 'MusicClub Bot' });
        
        await interaction.reply({ embeds: [embed] });
    },
}; 
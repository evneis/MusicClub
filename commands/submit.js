const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('submit')
        .setDescription('Submit an album for the music club')
        .addStringOption(option =>
            option.setName('album')
                .setDescription('The album name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('artist')
                .setDescription('The artist name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('link')
                .setDescription('Link to the album (Spotify, Apple Music, etc.)')
                .setRequired(false)),
    
    async execute(interaction) {
        const album = interaction.options.getString('album');
        const artist = interaction.options.getString('artist');
        const link = interaction.options.getString('link') || 'No link provided';
        
        // TODO: Store album data in database/file
        // TODO: Validate album information
        // TODO: Check for duplicates
        
        await interaction.reply({
            content: `🎵 **Album Submitted!**\n**Album:** ${album}\n**Artist:** ${artist}\n**Link:** ${link}\n\nThank you for your submission!`,
            ephemeral: true
        });
    },
}; 
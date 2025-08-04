const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear all album submissions for a new month (Admin only)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {
        // TODO: Clear album data from database/file
        // TODO: Add confirmation prompt
        // TODO: Log the clear action
        
        await interaction.reply({
            content: '🗑️ All album submissions have been cleared for the new month!',
            ephemeral: true
        });
    },
}; 
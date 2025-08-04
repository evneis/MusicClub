const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { isFirebaseAvailable, getCollection, getCurrentMonthKey } = require('../firebase-utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear all album submissions for a new month (Admin only)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {
        // Check if Firebase is available
        if (!isFirebaseAvailable()) {
            await interaction.reply({
                content: '❌ **Error:** Firebase is not configured. Please contact an administrator.',
                ephemeral: true
            });
            return;
        }

        try {
            const monthlyListCollection = getCollection('monthly_list');
            const monthKey = getCurrentMonthKey();
            
            // Get the month document to check if it exists and count submissions
            const monthDoc = await monthlyListCollection.doc(monthKey).get();
            
            if (!monthDoc.exists) {
                await interaction.reply({
                    content: 'ℹ️ No submissions found for this month to clear.',
                    ephemeral: true
                });
                return;
            }

            const data = monthDoc.data();
            const submissionCount = Object.keys(data).filter(key => 
                key !== 'month' && key !== 'year' && key !== 'lastUpdated'
            ).length;

            // Delete the month document
            await monthlyListCollection.doc(monthKey).delete();

            await interaction.reply({
                content: `🗑️ **Cleared ${submissionCount} submission${submissionCount === 1 ? '' : 's'}** for ${monthKey}!\n\nReady for a fresh start! 🎵`,
                ephemeral: true
            });

        } catch (error) {
            console.error('Error clearing submissions from Firebase:', error);
            await interaction.reply({
                content: '❌ **Error:** Failed to clear submissions. Please try again later.',
                ephemeral: true
            });
        }
    },
}; 
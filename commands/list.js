const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { isFirebaseAvailable, getCollection, getCurrentMonthKey } = require('../firebase-utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('List all submitted albums for this month'),
    
    async execute(interaction) {
        // Check if Firebase is available
        // if (!isFirebaseAvailable()) {
        //     await interaction.reply({
        //         content: '❌ **Error:** Firebase is not configured. Please contact an administrator.',
        //         ephemeral: true
        //     });
        //     return;
        // }

        try {
            const monthlyListCollection = getCollection('monthly_list');
            const monthKey = getCurrentMonthKey();
            
            // Get the month document
            const monthDoc = await monthlyListCollection.doc(monthKey).get();
            
            if (!monthDoc.exists) {
                const embed = new EmbedBuilder()
                    .setColor(0xFF6B6B)
                    .setTitle('🎵 Music Club Submissions')
                    .setDescription('No albums have been submitted for this month yet.')
                    .setTimestamp()
                    .setFooter({ text: 'MusicClub Bot' });
                
                await interaction.reply({ embeds: [embed] });
                return;
            }

            const data = monthDoc.data();
            const submissions = [];
            
            // Extract user submissions (exclude metadata fields)
            for (const [key, value] of Object.entries(data)) {
                if (key !== 'month' && key !== 'year' && key !== 'lastUpdated') {
                    const [artist, album] = value.split(';');
                    submissions.push({ userId: key, artist, album });
                }
            }

            if (submissions.length === 0) {
                const embed = new EmbedBuilder()
                    .setColor(0xFF6B6B)
                    .setTitle('🎵 Music Club Submissions')
                    .setDescription('No albums have been submitted for this month yet.')
                    .setTimestamp()
                    .setFooter({ text: 'MusicClub Bot' });
                
                await interaction.reply({ embeds: [embed] });
                return;
            }

            // Create embed with submissions
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`🎵 Music Club Submissions - ${data.month} ${data.year}`)
                .setDescription(`**${submissions.length}** album${submissions.length === 1 ? '' : 's'} submitted this month:`)
                .setTimestamp()
                .setFooter({ text: 'MusicClub Bot' });

            // Add fields for each submission
            for (let i = 0; i < submissions.length; i++) {
                const submission = submissions[i];
                const user = await interaction.client.users.fetch(submission.userId).catch(() => ({ username: 'Unknown User' }));
                const username = user.username || 'Unknown User';
                
                embed.addFields({
                    name: `${i + 1}. ${submission.album}`,
                    value: `**Artist:** ${submission.artist}\n**Submitted by:** ${username}`,
                    inline: false
                });
            }

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Error retrieving albums from Firebase:', error);
            await interaction.reply({
                content: '❌ **Error:** Failed to retrieve albums. Please try again later.',
                ephemeral: true
            });
        }
    },
}; 
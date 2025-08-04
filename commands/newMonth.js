const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { isFirebaseAvailable, getCollection, getCurrentMonthKey, admin } = require('../firebase-utils');

/**
 * Get the next month and year as a key
 * @returns {string} Format: "Month_Year" (e.g., "September_2024")
 */
function getNextMonthKey() {
    const currentDate = new Date();
    // Add one month to current date
    currentDate.setMonth(currentDate.getMonth() + 1);
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    return `${monthName}_${year}`;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newmonth')
        .setDescription('Create a new month entry in the music club database'),

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
            const currentMonthKey = getCurrentMonthKey();
            const nextMonthKey = getNextMonthKey();

            // Check if current month already exists
            const currentMonthDoc = await monthlyListCollection.doc(currentMonthKey).get();
            
            let monthKeyToCreate;
            let monthName;
            let year;
            
            if (currentMonthDoc.exists) {
                // Current month exists, create next month
                monthKeyToCreate = nextMonthKey;
                [monthName, year] = nextMonthKey.split('_');
                year = parseInt(year);
            } else {
                // Current month doesn't exist, create current month
                monthKeyToCreate = currentMonthKey;
                [monthName, year] = currentMonthKey.split('_');
                year = parseInt(year);
            }

            // Check if the month we're trying to create already exists
            const targetMonthDoc = await monthlyListCollection.doc(monthKeyToCreate).get();
            
            if (targetMonthDoc.exists) {
                const embed = new EmbedBuilder()
                    .setColor(0xFF6B6B)
                    .setTitle('❌ Month Already Exists')
                    .setDescription(`The month **${monthName} ${year}** already exists in the database.`)
                    .setTimestamp()
                    .setFooter({ text: 'MusicClub Bot' });

                await interaction.reply({ embeds: [embed], ephemeral: true });
                return;
            }

            // Create the new month document
            await monthlyListCollection.doc(monthKeyToCreate).set({
                month: monthName,
                year: year,
                createdBy: interaction.user.id,
                createdByUsername: interaction.user.username,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            });

            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('✅ New Month Created')
                .setDescription(`Successfully created **${monthName} ${year}** in the music club database.`)
                .addFields({
                    name: 'Created by',
                    value: interaction.user.username,
                    inline: true
                })
                .setTimestamp()
                .setFooter({ text: 'MusicClub Bot' });

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Error creating new month in Firebase:', error);
            await interaction.reply({
                content: '❌ **Error:** Failed to create new month. Please try again later.',
                ephemeral: true
            });
        }
    },
};

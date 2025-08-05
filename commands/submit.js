const { SlashCommandBuilder } = require('discord.js');
const { isFirebaseAvailable, getCollection, getCurrentMonthKey, admin } = require('../firebase-utils');

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
        const userId = interaction.user.id;
        const userName = interaction.user.username;

        try {
            const monthlyListCollection = getCollection('monthly_list');
            const monthKey = getCurrentMonthKey();


            const albumEntry = {
                Album: album,
                Artist: artist,
                Link: link,
                SubmittedBy: userName,
                SubmittedAt: admin.firestore.FieldValue.serverTimestamp()
            };


            const monthDocRef = monthlyListCollection.doc(monthKey);
            // Check if this is a new submission or an update
            const monthDoc = await monthDocRef.get();
            const data = monthDoc.data();
            const isUpdate = data && data[userId] && data[userId].Album !== album;
            await monthDocRef.set({
                month: monthKey.split('_')[0],
                year: parseInt(monthKey.split('_')[1]),
                [userId]: albumEntry,
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            const responseMessage = isUpdate 
                ? `🔄 **Album Updated!**\n**Previous:** ${data[userId].Artist} - ${data[userId].Album}\n**New:** ${artist} - ${album}\n**Link:** ${link}`
                : `🎵 **Album Submitted!**\n**Album:** ${album}\n**Artist:** ${artist}\n**Link:** ${link}`;

            await interaction.reply({
                content: responseMessage,
                ephemeral: false
            });

        } catch (error) {
            console.error('Error submitting album to Firebase:', error);
            await interaction.reply({
                content: '❌ **Error:** Failed to submit album. Please try again later.',
                flags: MessageFlags.Ephemeral
            });
        }
    },
}; 
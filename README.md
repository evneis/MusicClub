# MusicClub Discord Bot

A Discord bot for managing monthly music club events where users can submit and view albums.

## Features

- **Submit Albums**: Users can submit albums with artist name, album name, and optional links
- **View Submissions**: List all submitted albums for the current month
- **Firebase Integration**: Persistent storage using Firebase Firestore
- **Automatic Month Management**: Organizes submissions by month and year

## Setup

### Prerequisites

- Node.js (v16 or higher)
- Discord Bot Token
- Firebase Project

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   cp env.example .env
   ```

4. Configure your environment variables in `.env`:
   - `DISCORD_TOKEN`: Your Discord bot token
   - `CLIENT_ID`: Your Discord application client ID
   - `FIREBASE_CREDENTIAL`: Path to your Firebase service account JSON file

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Go to Project Settings > Service Accounts
4. Generate a new private key (JSON file)
5. Save the JSON file in your project directory (e.g., `firebase-credentials.json`)
6. Update your `.env` file:
   ```
   FIREBASE_CREDENTIAL=./firebase-credentials.json
   ```

### Deploy Commands

Register the slash commands with Discord:
```bash
node deploy-commands.js
```

### Run the Bot

```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Commands

- `/submit <album> <artist> [link]` - Submit an album for the current month
- `/list` - View all submitted albums for the current month
- `/clear` - Clear all submissions (admin only)

## Firebase Structure

The bot uses the following Firebase Firestore structure:

```
monthly_list/
├── August_2024/
│   ├── month: "August"
│   ├── year: 2024
│   ├── 123456789: "Artist Name;Album Name"
│   ├── 987654321: "Another Artist;Another Album"
│   └── lastUpdated: timestamp
└── September_2024/
    └── ...
```

- Each month is a document with key format: `Month_Year`
- User submissions are stored as key-value pairs where:
  - Key: Discord User ID
  - Value: `"Artist Name;Album Name"` format
- If a user submits a new album, it overwrites their previous submission

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_TOKEN` | Discord bot token | Yes |
| `CLIENT_ID` | Discord application client ID | Yes |
| `GUILD_ID` | Discord guild ID (for development) | No |
| `FIREBASE_CREDENTIAL` | Path to Firebase service account JSON | Yes |
| `FIREBASE_COLLECTION_PREFIX` | Prefix for Firebase collections (for testing) | No |

## Goals

- ✅ Allow users to submit an album
- ✅ Store all albums and allow users to call a command to view albums
- ✅ Manually clear album data for new months
- 🔄 Lastfm connectivity
- 🔄 Automatic album parsing to retrieve album name and artist name
- 🔄 Automatic retrieval of Spotify and Apple Music links

## Album Links

- Investigate MusicBrainz API for getting links
- Regardless this might still be good for getting metadata (if lastfm doesn't already do it)

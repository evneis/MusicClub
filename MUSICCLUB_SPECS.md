# MusicClub Discord Bot - Project Specifications

## Overview
A Discord bot designed for monthly book-club-style music sharing events. Users can submit albums, view submissions, and administrators can manage the monthly cycle.

## Core Features

### Primary Goals ✅
- **Album Submission**: Allow users to submit albums with artist name and optional links
- **Album Listing**: Display all submitted albums for the current month
- **Monthly Reset**: Manually clear album data to start fresh each month

### Nice-to-Have Features 🎯
- **Last.fm Integration**: Connect with Last.fm API for enhanced album information
- **Automatic Parsing**: Parse album links to extract album name and artist automatically
- **Streaming Links**: Auto-generate Spotify and Apple Music links for submitted albums

## Technical Architecture

### File Structure
```
MusicClub/
├── index.js                 # Main bot entry point
├── deploy-commands.js       # Command registration script
├── package.json            # Dependencies and scripts
├── env.example             # Environment variables template
├── commands/               # Slash command implementations
│   ├── submit.js          # Album submission command
│   ├── list.js            # Album listing command
│   └── clear.js           # Admin clear command
├── README.md              # Project overview
└── MUSICCLUB_SPECS.md     # This specification file
```

### Commands

#### `/submit`
- **Purpose**: Submit an album for the music club
- **Parameters**:
  - `album` (required): Album name
  - `artist` (required): Artist name
  - `link` (optional): Streaming service link
- **Permissions**: All users
- **Response**: Confirmation with submission details

#### `/list`
- **Purpose**: Display all submitted albums for the current month
- **Parameters**: None
- **Permissions**: All users
- **Response**: Rich embed with album list

#### `/clear`
- **Purpose**: Clear all album submissions for a new month
- **Parameters**: None
- **Permissions**: Administrators only
- **Response**: Confirmation of data clearance

## Data Management

### Current Implementation
- Basic command structure with placeholder data handling
- TODO comments indicate where data persistence should be implemented

### Future Data Storage Options
1. **JSON File**: Simple file-based storage for small-scale usage
2. **SQLite Database**: Lightweight database for better data management
3. **MongoDB**: NoSQL option for flexible schema
4. **PostgreSQL**: Full-featured database for complex queries

## API Integrations

### Last.fm API (Future)
- **Purpose**: Enhanced album information and metadata
- **Features**:
  - Album artwork
  - Release date
  - Genre information
  - User ratings and reviews
  - Similar album recommendations

### Streaming Service APIs (Future)
- **Spotify API**: Auto-generate Spotify links
- **Apple Music API**: Auto-generate Apple Music links
- **YouTube Music**: Alternative streaming option

## Development Roadmap

### Phase 1: Basic Functionality ✅
- [x] Discord bot shell setup
- [x] Command structure
- [x] Basic interaction handling
- [ ] Data persistence implementation
- [ ] Error handling improvements

### Phase 2: Enhanced Features
- [ ] Last.fm API integration
- [ ] Automatic link parsing
- [ ] Rich embeds with album artwork
- [ ] User submission tracking
- [ ] Duplicate detection

### Phase 3: Advanced Features
- [ ] Monthly voting system
- [ ] Album recommendation engine
- [ ] Integration with music streaming services
- [ ] Analytics and statistics
- [ ] Web dashboard for management

## Setup Instructions

### Prerequisites
1. Node.js (v16 or higher)
2. Discord Bot Token
3. Discord Application ID

### Installation
1. Clone the repository
2. Run `npm install`
3. Copy `env.example` to `.env` and fill in your credentials
4. Run `node deploy-commands.js` to register slash commands
5. Run `npm start` to start the bot

### Environment Variables
- `DISCORD_TOKEN`: Your Discord bot token
- `CLIENT_ID`: Your Discord application client ID
- `LASTFM_API_KEY`: (Optional) Last.fm API key for future features

## Usage Guidelines

### For Users
- Use `/submit` to share your favorite albums
- Use `/list` to see what others have submitted
- Be respectful and follow community guidelines

### For Administrators
- Use `/clear` at the beginning of each month
- Monitor submissions for inappropriate content
- Consider implementing additional moderation features

## Technical Notes

### Discord.js Version
- Using Discord.js v14 for latest features and stability
- Slash commands for modern Discord experience
- Rich embeds for better presentation

### Security Considerations
- Admin commands require proper permissions
- Input validation for all user submissions
- Rate limiting for command usage
- Secure token management

### Performance Considerations
- Efficient data storage and retrieval
- Pagination for large album lists
- Caching for API responses
- Error handling and logging

## Future Enhancements

### User Experience
- Interactive buttons for album actions
- Reaction-based voting system
- Personalized recommendations
- Integration with Discord's rich presence

### Moderation Features
- Content filtering
- User submission limits
- Report system for inappropriate content
- Automated moderation tools

### Analytics
- Submission statistics
- Popular genres tracking
- User participation metrics
- Monthly trends analysis

---

*This document serves as the comprehensive specification for the MusicClub Discord bot project. Update as features are implemented and requirements evolve.* 
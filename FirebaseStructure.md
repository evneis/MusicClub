# Planned Firebase Structure
#### Collections and what values they would hold
- Monthly List
    - Each entry will have a month (i.e month: August) - that entry will represent that month
    - I think each month should then have a list of KVPs
        - They key is a users DiscordID, the value is the album (artistname;albumname)
        - If a user submits a different album - overwrite their entry instead of duping DiscordID
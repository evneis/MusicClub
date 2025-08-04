# Planned Firebase Structure
#### Collections and what values they would hold
- Monthly List
    - Each entry will have a month (i.e month: August) - that entry will represent that month
    - I think each month should then have a list of KVPs
        - The key is a users DiscordID, the value a list of KVPs?
            - {Album {"Be Here Now"},{Artist: "Oasis"}, {Link: generate lastfm link or somethin}}, etc
            - Allows for some scalability
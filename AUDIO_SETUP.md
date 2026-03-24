# Audio Setup Guide — Leipzig Sound Walk

## Overview

The sound walk plays location-specific audio when users are within proximity of each point on the map. For this to work, each database location needs an `audioUrl` pointing to a real audio file.

---

## Step 1: Add Your Audio Files

Place your MP3 files in the `public/audio/` directory with these exact filenames:

| # | Location | Filename |
|---|----------|----------|
| 1 | Thomaskirche | `thomaskirche.mp3` |
| 2 | Marktplatz | `marktplatz.mp3` |
| 3 | Nikolaikirche | `nikolaikirche.mp3` |
| 4 | Mädler-Passage | `maedler-passage.mp3` |
| 5 | Augustusplatz | `augustusplatz.mp3` |
| 6 | Gewandhaus Forecourt | `gewandhaus-forecourt.mp3` |
| 7 | Johannapark | `johannapark.mp3` |
| 8 | Karl-Liebknecht-Straße | `karli.mp3` |
| 9 | Clara-Zetkin-Park Entrance | `clara-zetkin-park.mp3` |
| 10 | Baumwollspinnerei Gate | `baumwollspinnerei.mp3` |
| 11 | Plagwitz Canal | `plagwitz-canal.mp3` |
| 12 | Hauptbahnhof Main Hall | `hauptbahnhof.mp3` |
| 13 | Völkerschlachtdenkmal | `voelkerschlachtdenkmal.mp3` |
| 14 | Schiller Park | `schiller-park.mp3` |
| 15 | Connewitz Kreuz | `connewitz-kreuz.mp3` |

### Recommended Audio Format
- **Format:** MP3
- **Bitrate:** 128–192 kbps
- **Size:** ≤ 5 MB per file (for fast mobile loading)
- **Duration:** 1–5 minutes per location

---

## Step 2: Update the Database with Audio URLs

The seed script (`scripts/seed.ts`) already includes `audioUrl` values for all 15 locations. Run it to populate or update your database:

```bash
# Locally (requires DATABASE_URL in .env)
npx tsx --require dotenv/config scripts/seed.ts

# Or via Prisma
npx prisma db seed
```

If locations already exist in the database, the script will **update** them to set `audioUrl` only if it's currently `null` — it won't overwrite custom URLs you've set via the admin panel.

---

## Step 3: Commit & Deploy

```bash
# Add your audio files to the repo
git add public/audio/*.mp3

# Commit
git commit -m "feat: add location audio files"

# Push to trigger Railway deployment
git push origin main
```

### Important for Railway
After deploying, run the seed script against your production database to update the `audioUrl` values:

```bash
# Option A: Use Railway CLI
railway run npx tsx --require dotenv/config scripts/seed.ts

# Option B: Set DATABASE_URL locally to your Railway Postgres URL and run
DATABASE_URL="postgresql://..." npx tsx --require dotenv/config scripts/seed.ts
```

---

## Alternative: Upload via Admin Panel

Instead of using the seed script, you can upload audio files through the admin dashboard:

1. Go to `/admin` and log in
2. Click on a location
3. Use the audio upload feature to add an MP3 file
4. The URL will be saved to the database automatically

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No sound playing | Check that `audioUrl` is set in the database (not `null`). Run the seed script. |
| Audio file 404 | Verify the file exists in `public/audio/` with the exact filename from the table above. |
| Slow loading | Keep audio files under 5 MB. The 63 MB test file has been removed. |
| Audio doesn't auto-play | Mobile browsers require user interaction first. Tap the sound icon once to enable playback. |

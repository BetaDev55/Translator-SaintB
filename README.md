# Translator SaintB for Legcord

A powerful translation plugin for Legcord with an elegant, Discord-native interface.

## Features

### Translation
- **Incoming message translation**: Hover over any message → click the translate button in the action bar
- **Outgoing message translation**: Automatically translates before sending (when enabled)
- **Translation format**: Bold translated text as protagonist, original quoted below
- **Word-by-word animation**: Smooth reveal animation on translations

### Per-Channel Configuration
- **Independent settings**: Each channel has its own translation preferences
- **Auto-translate toggle**: Automatically translate received messages
- **Translate before send**: Automatically translate your messages before sending
- **Language selection**: Choose input (source) and output (target) languages
- **DM support**: Fully functional in direct messages

### Intelligent Features
- **Mention handling**: Converts raw Discord mentions (`<@id>`) to readable `@username`
- **Server nickname resolution**: Uses server nicknames (not global usernames) for mentions
- **Mention styling**: Blue Discord-like accent for @mentions in translations
- **Translation caching**: Avoids redundant API calls for previously translated text
- **Queue system**: Handles rapid message flow without overwhelming the API

### Auto-Detection & i18n
- **Locale auto-detection**: Automatically detects your Discord language setting
- **Dynamic UI translation**: Translates the entire modal interface to your Discord language
- **Supports all languages**: Works with any language Discord supports (English, Spanish, Turkish, Portuguese, etc.)
- **Cached translations**: Translations are cached for instant display on subsequent opens

### Visual Design
- **Discord-native aesthetics**: Matches Legcord/Discord's dark theme
- **Server identity header**: Shows real server icon and name in modal header
- **Custom dropdowns**: Styled dropdowns (not native selects) for language selection
- **Subtle animations**: Glow effects and smooth transitions
- **Modern hover toolbar**: Translate button integrated into Discord's native action bar

## Supported Languages

Auto, English, Spanish, Portuguese, French, German, Russian, Japanese, Korean, Chinese, and any language Discord supports.

## Requirements

- Legcord installed ([download](https://legcord.app/download))
- Access to Legcord configuration file

## Installation

### Option 1: Automatic installation (Linux/macOS)

```bash
# 1. Create config folder if it doesn't exist
mkdir -p ~/.config/legcord

# 2. Copy the plugin to Legcord folder
cp custom.js ~/.config/legcord/custom.js

# 3. Add the path to Legcord configuration file
#    Edit ~/.config/legcord/storage/settings.json manually
```

### Option 2: Manual installation

1. **Copy the `custom.js` file** to your Legcord configuration folder:

| Operating System | Path |
|-----------------|------|
| **Linux** | `~/.config/legcord/custom.js` |
| **macOS** | `~/Library/Application Support/legcord/custom.js` |
| **Windows** | `%APPDATA%\legcord\custom.js` |

2. **Edit `settings.json`**:
   - Linux: `~/.config/legcord/storage/settings.json`
   - macOS: `~/Library/Application Support/legcord/storage/settings.json`
   - Windows: `%APPDATA%\legcord\storage\settings.json`

3. **Add this line** inside the JSON (if `customJsBundle` already exists, modify it):

```json
{
    "windowStyle": "native",
    "channel": "stable",
    "customJsBundle": "/your/path/to/custom.js",
    // ... rest of your configuration
}
```

4. **Save the file** and restart Legcord

## Usage

### Translate a received message
1. Hover over any message
2. Click the translate button (🌐) in the action bar
3. Translation appears with original quoted below

### Configure a channel
1. Click the 🌐 button in the composer (next to emoji picker)
2. Adjust languages and toggle options
3. Settings are saved per-channel automatically

## Troubleshooting

### Button doesn't appear
1. Verify that `customJsBundle` points correctly to the file
2. Make sure the `custom.js` file has no syntax errors
3. Check Legcord console (Ctrl+Shift+I) for errors

### Translation not showing
1. Ensure you have an internet connection (Google Translate API)
2. Check if the message language is correctly detected
3. Try changing the output language in channel settings

### UI showing wrong language
The modal auto-detects your Discord language setting. If incorrect:
1. Check your Discord language in Discord settings
2. Restart Legcord after changing Discord language

## Technical Details

### How mentions work
The plugin converts raw Discord mentions like `<@123456789>` to readable `@username`. For server members, it uses the server nickname instead of the global username.

### Translation API
Uses Google Translate API (`translate.googleapis.com`) for translations. The plugin:
- **Does NOT** store your messages or data
- **Does NOT** access your account beyond what's needed for translation
- **Does NOT** modify other users' messages

### Settings storage
Per-channel settings are stored using Vencord's DataStore system, persisting across Legcord restarts.

## Uninstallation

1. Delete the `custom.js` file
2. Edit `settings.json` and remove or comment out the `"customJsBundle"` line
3. Restart Legcord

## License

MIT License

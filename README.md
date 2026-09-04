# Translator SaintB for Legcord

Translation plugin for Legcord with improved visual interface.

## Features

- **Received message translation**: Hover over a message → click "A文" button
- **Sent message translation**: With configuration enabled
- **Per-channel configuration**: Each channel can have its own language pair
- **Improved UI**: Animations, modern styles with Discord theme
- **DMs support**: Also works in direct messages

## Requirements

- Legcord installed ([download](https://legcord.app/download))
- Access to Legcord configuration file

## Installation

### Option 1: Automatic installation (Linux/macOS)

Open a terminal and run these commands one by one:

```bash
# 1. Create config folder if it doesn't exist
mkdir -p ~/.config/legcord

# 2. Copy the plugin to Legcord folder
cp custom.js ~/.config/legcord/custom.js

# 3. Add the path to Legcord configuration file
#    (you need to edit ~/.config/legcord/storage/settings.json manually)
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

### What does automatic installation do?

If you chose Option 1, these are the exact commands that run:

```bash
mkdir -p ~/.config/legcord           # Creates the config folder
cp custom.js ~/.config/legcord/      # Copies the plugin
```

You can verify each step before running it. The script doesn't modify anything outside of Legcord.

## Usage

### Translate received messages

1. Hover over a message
2. An "A文" button will appear in the action bar
3. Click the button to translate

### Per-channel configuration

1. Find the "A文" button in the composer (next to the emoji button)
2. Click it to open channel settings
3. Adjust input and output languages

### Available settings

- **Auto translate received**: Translate messages upon receiving
- **Translate sent**: Translate before sending
- **Output language**: Target language for translation

## Troubleshooting

### Button doesn't appear

1. Verify that `customJsBundle` points correctly to the file
2. Make sure the `custom.js` file has no syntax errors
3. Check Legcord console (Ctrl+Shift+I) for errors

### Error "Cannot read properties of null"

The plugin needs Discord's DOM to be fully loaded. Wait a few seconds after opening Legcord.

## Uninstallation

1. Delete the `custom.js` file
2. Edit `settings.json` and remove or comment out the `"customJsBundle"` line
3. Restart Legcord

## Security

This plugin:
- **Does NOT** send your information to any external server except Google Translate API
- **Does NOT** store tokens or credentials
- **Does NOT** modify other users' message content

## License

MIT License

# TranslatorPlus for Legcord

Plugin de traducción para Legcord con interfaz visual mejorada.

## Características

- **Traducción de mensajes recibidos**: Hover sobre un mensaje → click en botón "A文"
- **Traducción de mensajes enviados**: Con configuración activada
- **Configuración por canal**: Cada canal puede tener su propio par de idiomas
- **UI mejorada**: Animaciones, estilos modernos con tema Discord
- **Soporte para DMs**: Funciona también en mensajes directos

## Requisitos

- Legcord instalado ([descargar](https://legcord.app/download))
- Acceso al archivo de configuración de Legcord

## Instalación

### Opción 1: Instalación automática (Linux/macOS)

Abre una terminal y ejecuta estos comandos uno por uno:

```bash
# 1. Crear carpeta de configuración si no existe
mkdir -p ~/.config/legcord

# 2. Copiar el plugin a la carpeta de Legcord
cp custom.js ~/.config/legcord/custom.js

# 3. Agregar la ruta al archivo de configuración de Legcord
#    (necesitas editar ~/.config/legcord/storage/settings.json manualmente)
```

### Opción 2: Instalación manual

1. **Copia el archivo `custom.js`** a tu carpeta de configuración de Legcord:

| Sistema Operativo | Ruta |
|-------------------|------|
| **Linux** | `~/.config/legcord/custom.js` |
| **macOS** | `~/Library/Application Support/legcord/custom.js` |
| **Windows** | `%APPDATA%\legcord\custom.js` |

2. **Edita `settings.json`**:
   - Linux: `~/.config/legcord/storage/settings.json`
   - macOS: `~/Library/Application Support/legcord/storage/settings.json`
   - Windows: `%APPDATA%\legcord\storage\settings.json`

3. **Agrega esta línea** dentro del JSON (si ya existe `customJsBundle`, modifícala):

```json
{
    "windowStyle": "native",
    "channel": "stable",
    "customJsBundle": "/tu/ruta/a/custom.js",
    // ... el resto de tu configuración
}
```

4. **Guarda el archivo** y reinicia Legcord

### ¿Qué hace la instalación automática?

Si elegiste la Opción 1, estos son los comandos exactos que se ejecutan:

```bash
mkdir -p ~/.config/legcord           # Crea la carpeta de configuración
cp custom.js ~/.config/legcord/      # Copia el plugin
```

Puedes verificar cada paso antes de ejecutarlo. El script no modifica nada fuera de Legcord.

## Uso

### Traducir mensajes recibidos

1. Pase el cursor sobre un mensaje
2. Aparecerá un botón "A文" en la barra de acciones
3. Click en el botón para traducir

### Configuración por canal

1. Busca el botón "A文" en el compositor (junto al botón de emojis)
2. Click en él para abrir la configuración del canal
3. Ajusta los idiomas de entrada y salida

### Configuraciones disponibles

- **Traducción automática de recibidos**: Traduce mensajes al recibirlos
- **Traducción de enviados**: Traduce antes de enviar
- **Idioma de salida**: Idioma objetivo para la traducción

## Solución de problemas

### El botón no aparece

1. Verifica que `customJsBundle` apunte correctamente al archivo
2. Asegúrate de que el archivo `custom.js` no tenga errores de sintaxis
3. Revisa la consola de Legcord (Ctrl+Shift+I) para errores

### Error "Cannot read properties of null"

El plugin necesita que el DOM de Discord esté completamente cargado. Espera unos segundos después de abrir Legcord.

## Desinstalación

1. Elimina el archivo `custom.js`
2. Edita `settings.json` y elimina o comenta la línea `"customJsBundle"`
3. Reinicia Legcord

## Seguridad

Este plugin:
- **NO** envía tu información a ningún servidor externo excepto Google Translate API
- **NO** almacena tokens o credenciales
- **NO** modifica el contenido de los mensajes de otros usuarios

## Licencia

MIT License

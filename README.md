# Estados Financieros · Edificio Davinci Soriano P.H.

Aplicación web para generar, a partir de los balances de prueba mensuales, los estados financieros de la copropiedad (ESF, ERI, ECP, EFE, indicadores, notas y certificación). También cubre informe de gestión, presupuesto, fondo de imprevistos, cartera, carteleras, cobro jurídico, impuestos, libro auxiliar y conciliaciones bancarias.

Es un sitio estático: un solo `index.html` que se ejecuta completo en el navegador. Los archivos contables se procesan en el equipo de quien los carga. Los datos viven en Firebase, no en este repositorio.

## Perfiles

| Perfil | Qué ve | Qué puede hacer |
|---|---|---|
| **Contador · editor** | Todo | Carga, edita y configura todo. Se define en `config.js` (`editores`) y en `firestore.rules` (`editor()`). |
| **Asistente** | Solo Cartera y Bancos | Carga la cartera (estado de cuenta) y las conciliaciones bancarias; ajusta las carteleras y el cobro jurídico. |
| **Administración** | Toda la app | Solo consulta y descarga informes. |
| **Revisoría Fiscal** | Toda la app | Solo consulta y descarga informes. |

Los perfiles Asistente, Administración y Revisoría Fiscal se asignan dentro de la app, en **Datos → Usuarios y perfiles**, con el correo de Google de cada persona. Quien no esté en la lista no ve nada. Las reglas de Firestore aplican los mismos permisos en el servidor.

## Publicar en GitHub Pages

1. Suba estos archivos a la rama `main` del repositorio.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`. Guarde.
3. En uno o dos minutos la app queda en `https://aldairmelot-cyber.github.io/davinci-soriano/`.

> En el plan gratuito de GitHub, Pages solo funciona con repositorios **públicos**. El código queda visible, pero los datos contables no, porque viven en Firebase.

El PDF del reglamento articulado (`reglamento_articulado.pdf`, 15 MB) se sube aparte al repositorio, con **Add file → Upload files**.

## Firebase (datos compartidos)

1. Cree un proyecto gratuito en <https://console.firebase.google.com> (por ejemplo `davinci-soriano`).
2. **Authentication → Sign-in method**: active **Google**. En **Authentication → Settings → Authorized domains**, agregue `aldairmelot-cyber.github.io`.
3. **Firestore Database → Crear base de datos**: modo producción, región `southamerica-east1`.
4. **Firestore → Reglas**: pegue el contenido de `firestore.rules` y pulse **Publicar**.
5. **Configuración del proyecto → Tus apps → Web (`</>`)**: registre la app y copie el objeto `firebaseConfig` en `config.js`, en el campo `firebase`.

Esta instalación usa el proyecto Firebase `davinci-soriano` (cuenta aldairmelot@gmail.com). Si `firebase` fuera `null`, la app funciona en modo local (datos solo en el navegador). Para ver cómo la ve cada perfil, agregue `?perfil=asistente`, `?perfil=admin` o `?perfil=revisor` a la dirección.

## Pasar los datos desde Claude

1. En la app de Claude: **Datos → Respaldo de datos → Descargar respaldo**.
2. En la app publicada, entre con el correo del contador y use **Restaurar** (abajo a la derecha) con ese archivo.

## Probar en su computador

```bash
python -m http.server 8000
```

Abra `http://localhost:8000`. No abra `index.html` con doble clic.

## Estructura

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa (interfaz, cálculos, PDF y Excel). |
| `plataforma.js` | Base de datos (local o Firebase), inicio de sesión, perfiles, respaldo y descargas. |
| `config.js` | Correos de los editores y configuración de Firebase. |
| `firestore.rules` | Permisos por perfil en el servidor. |
| `reglamento.json`, `inmuebles.json` | Reglamento de PH y listado de inmuebles. |
| `pdf.min.mjs`, `pdf.worker.min.mjs` | Lectura de PDF (estados de cuenta, extractos). |
| `manifest.webmanifest`, `sw.js`, `iconos/` | Instalar la app en el computador o el celular. |

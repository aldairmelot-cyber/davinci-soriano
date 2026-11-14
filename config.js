/*
 * Configuración de la app.
 *
 * MODO COMPARTIDO: pegue en `firebase` el objeto firebaseConfig del proyecto
 *   (Firebase → Configuración del proyecto → Tus apps → Web). Los datos viven en
 *   Firestore y los ven los usuarios autorizados según firestore.rules. Cada
 *   persona entra con su cuenta de Google. Estos valores no son secretos: la
 *   seguridad la dan las reglas de Firestore.
 *
 * MODO LOCAL (mientras `firebase` sea null): cada persona guarda sus datos en su
 *   propio navegador. Sirve para probar: agregue ?perfil=asistente, ?perfil=admin
 *   o ?perfil=revisor a la dirección para ver la app como ese perfil.
 */
window.APP_CONFIG = {
  titulo: "Estados Financieros · Edificio Davinci Soriano P.H.",

  /* Correos con perfil de edición (el contador). Deben coincidir con la lista
     `editor()` de firestore.rules. Los demás perfiles (Asistente, Administración,
     Revisoría Fiscal) se asignan dentro de la app: Datos → Usuarios y perfiles. */
  editores: ["aldairmelot@gmail.com", "aldair.melot@gmail.com"],

  firebase: null,
};

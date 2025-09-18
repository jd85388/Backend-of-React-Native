import { enviarCorreo } from "./enviarCorreo.js";
export const enviarCorreoRegistro = async (email, nombre, token) => {
    const link = `${process.env.FRONTEND}/confirmar/${token}`;
    const logoUrl = "https://raw.githubusercontent.com/jd85388/Backend-of-React-Native/ac99374462ac1be4aefb7adfb55026f9e23cba96/src/asset/BCO.7dfb749b-e63f-442c-a2e6-4be430b7181f.png";
    const fondoUrl = "https://raw.githubusercontent.com/jd85388/Backend-of-React-Native/ac99374462ac1be4aefb7adfb55026f9e23cba96/src/asset/fondo2.png";
    const whatsappIcon = "https://img.icons8.com/ios-filled/50/000000/whatsapp.png";
    const emailIcon = "https://img.icons8.com/ios-filled/50/000000/email.png";
    const infoIcon = "https://img.icons8.com/ios-glyphs/30/000000/info--v1.png";
    const html = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; line-height:1.6;
              background:#f4f4f4; padding:0; margin:0;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="background:#fff; border: 4px solid #111; border-radius: 12px; box-sizing: border-box;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" border="0"
                 style="background:#ffffff;border-radius:8px;overflow:hidden;">
            

            <!-- CABECERA CON FONDO DE IMAGEN -->
            <tr>
              <td align="center" style="background: url('${fondoUrl}') center/cover no-repeat; padding: 40px 30px 40px 30px;">
                <h1 style="color:#fff;margin:0;font-size:28px;font-weight:bold;text-shadow:0 2px 8px #0e7fc0;">
                  ¡BIENVENIDO A LIFE REMINDER,
                </h1>
                <h2 style="color:#fff;margin:0;font-size:22px;font-weight:400;text-shadow:0 2px 8px #0e7fc0;">${nombre} </h2>
              </td>
            </tr>

            <!-- CUERPO -->
            <tr>
              <td style="padding:30px;color:#333;">
                <p>Nos alegra mucho que hayas decidido unirte a <strong>Life Reminder</strong>, 
                tu nueva aplicación móvil diseñada para mejorar tu bienestar y facilitar tu día a día.</p>

                <p>Life Reminder ha sido creada pensando en ti. Nuestro objetivo es brindarte una experiencia segura, 
                práctica y agradable. Sabemos lo importante que es cuidar de tu salud, por eso hemos desarrollado 
                esta herramienta que te permite:</p>

                <ul style="padding-left:20px;margin-top:10px;">
                  <li>✔️ Programar y recibir recordatorios para la toma de tus medicamentos.</li>
                  <li>✔️ Agendar y gestionar tus citas médicas fácilmente.</li>
                  <li>✔️ Consultar tu información personal y médica en todo momento.</li>
                  <li>✔️ Fácil uso de la aplicación.</li>
                  <li>✔️ Consultar tus exámenes.</li>
                </ul>

                <p><strong>${nombre}</strong>, estás a un solo paso de comenzar. 
                Activa tu cuenta haciendo clic en el botón a continuación:</p>

                <table align="center" cellpadding="0" cellspacing="0" style="margin:25px auto;">
                  <tr>
                    <td align="center" bgcolor="#12c3f0" style="border-radius:6px;">
                      <a href="${link}" target="_blank"
                         style="display:inline-block;padding:14px 30px;color:#fff;
                                font-size:16px;font-weight:bold;text-decoration:none;">
                        Activar Cuenta
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CONTACTO CON FONDO DE IMAGEN -->
            <tr>
              <td style="background: url('${fondoUrl}') center/cover no-repeat; padding: 32px 25px;">
                <h3 style="color:#fff;text-align:center;margin-top:0;text-shadow:0 2px 8px #0e7fc0;">CONTÁCTANOS:</h3>
                <table width="100%" cellpadding="10" cellspacing="0">
                  <tr>
                    <td align="center" style="color:#fff;text-shadow:0 2px 8px #0e7fc0;">
                      <img src="${whatsappIcon}" width="30" alt="WhatsApp"><br/>
                      +57 322 9228590<br/>+57 312 7564367<br/>+57 324 4574375
                    </td>
                    <td align="center" style="color:#fff;text-shadow:0 2px 8px #0e7fc0;">
                      <img src="${emailIcon}" width="30" alt="Email"><br/>
                      jd8538879@gmail.com<br/>sakura123@gmail.com<br/>danielkike18@gmail.com
                    </td>
                    <td align="center" style="color:#fff;text-shadow:0 2px 8px #0e7fc0;">
                      <img src="${infoIcon}" width="30" alt="Soporte"><br/>
                      Soporte<br/>Estamos aquí para ayudarte
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
  `;
    await enviarCorreo(email, "Activa tu cuenta en Life Reminder", html);
};

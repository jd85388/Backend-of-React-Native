import { resend } from '../index.js';

/**
@param { string } to - correo de confirmacion.
@param { string } nombre - nombre del destinatario.
@param { string } link - link de confirmacion.
 */

export async function envioCorreoRegistro(to: string, nombre: string, link: string): Promise<void> {
    try {
        await resend.emails.send({
            from: 'soporteLifeReminder<onboarding@resend.dev>',
            to,
            subject: 'Confirma Cuenta',
            html: `
        <div style="
                font-family: 'Segoe UI', Arial, sans-serif;
                line-height: 1.7;
                border-radius: 32px;
                border: none;
                box-shadow: 0 4px 24px rgba(18,195,240,0.10), 0 1.5px 8px rgba(0,0,0,0.08);
                padding: 0;
                background: linear-gradient(135deg, #e3f6fd 0%, #fafdff 100%);
                max-width: 950px;
                margin: 40px auto;
            ">


            <div style="
                border-radius: 32px 32px 0 0;
                padding: 48px 32px 38px 32px;
                background: linear-gradient(90deg, #12c3f0 0%, #0e7fc0 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(18,195,240,0.10);
            ">
                <img src="../asset/BCO.7dfb749b-e63f-442c-a2e6-4be430b7181f.png" alt="Logo" width="150" height="150" style="margin-right: 48px; border-radius: 12px; box-shadow: none; background: transparent; padding: 0;" />
                <div style="text-align: center; width: 100%; color: #fff;">
                    <h1 style="margin: 0; font-size: 2.8rem; letter-spacing: 1px; font-weight: 700;">¡BIENVENIDO A LIFE REMINDER,</h1>
                    <h1 style="margin: 0; font-size: 2.2rem; font-weight: 400;">${nombre} ☻</h1>
                </div>
            </div>

            <div style="
                border-radius: 0 0 18px 18px;
                padding: 32px 24px 24px 24px;
                background: #fff;
                box-shadow: 0 2px 8px rgba(18,195,240,0.04);
            ">
                <p>Nos alegra mucho que hayas decidido unirte a <strong>Life Reminder</strong>, tu nueva aplicación móvil diseñada para mejorar tu bienestar 
                y facilitar tu día a día. Queremos darte una cálida bienvenida y agradecerte por confiar en nosotros.</p>

                <p>Life Reminder ha sido creada pensando en ti. Nuestro objetivo es brindarte una experiencia segura, práctica y agradable. Sabemos lo importante 
                que es cuidar de tu salud, por eso hemos desarrollado esta herramienta que te permite:</p>

                <ul style="list-style: none; padding-left: 0; margin: 18px 0 18px 0;">
                    <li style="margin-bottom: 8px; color: #0e7fc0; font-weight: 500;">✔️ Programar y recibir recordatorios para la toma de tus medicamentos.</li>
                    <li style="margin-bottom: 8px; color: #0e7fc0; font-weight: 500;">✔️ Agendar y gestionar tus citas médicas fácilmente.</li>
                    <li style="margin-bottom: 8px; color: #0e7fc0; font-weight: 500;">✔️ Consultar tu información personal y médica en todo momento.</li>
                    <li style="margin-bottom: 8px; color: #0e7fc0; font-weight: 500;">✔️ Fácil uso de la aplicación.</li>
                    <li style="margin-bottom: 8px; color: #0e7fc0; font-weight: 500;">✔️ Consultar tus exámenes.</li>
                </ul>

                <p>Queremos acompañarte en cada paso, ayudarte a organizar tu salud y asegurarnos de que nunca olvides lo importante.</p>

                <p><strong>${nombre}</strong>, estás a un solo paso de comenzar. Activa tu cuenta haciendo clic en el botón a continuación para disfrutar de todas 
                las funciones que tenemos para ti:</p>

                <a href="${link}" 
                    style="
                        display: inline-block;
                        padding: 14px 32px;
                        margin: 28px 0 0 0;
                        background: linear-gradient(90deg, #12c3f0 0%, #0e7fc0 100%);
                        color: #fff;
                        text-decoration: none;
                        border-radius: 8px;
                        font-size: 1.1rem;
                        font-weight: 600;
                        box-shadow: 0 2px 8px rgba(18,195,240,0.10);
                        letter-spacing: 1px;
                        transition: background 0.2s;
                    "
                    onmouseover="this.style.background='linear-gradient(90deg, #0e7fc0 0%, #12c3f0 100%)'"
                    onmouseout="this.style.background='linear-gradient(90deg, #12c3f0 0%, #0e7fc0 100%)'"
                >
                    Activar Cuenta
                </a>
            </div>

            <div style="
                border-radius: 0 0 18px 18px;
                padding: 24px 24px 32px 24px;
                background: linear-gradient(90deg, #e3f6fd 0%, #fafdff 100%);
                margin-top: 24px;
            ">
                <h3 style="color: #0e7fc0; font-size: 1.2rem; letter-spacing: 1px; margin-bottom: 24px;">CONTÁCTANOS POR NUESTROS CANALES:</h3>

                <div style="
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin-top: 20px;
                    text-align: center;
                    font-family: 'Segoe UI', Arial, sans-serif;
                ">

                    <!-- WhatsApp -->
                    <div style="padding: 20px; border: none; border-radius: 14px; background: #fff; box-shadow: 0 2px 8px rgba(18,195,240,0.08);">
                        <img src="https://img.icons8.com/ios-filled/50/000000/whatsapp.png" alt="WhatsApp" width="40" />
                        <p style="margin-top: 10px;"><strong>WhatsApp</strong></p>
                        <ul style="list-style: none; padding: 2;">
                            <li>📱 +57 322 9228590</li>
                            <li>📱 +57 312 7564367</li>
                            <li>📱 +57 324 4574375</li>
                        </ul>
                    </div>

                    <!-- Email -->
                    <div style="padding: 20px; border: none; border-radius: 14px; background: #fff; box-shadow: 0 2px 8px rgba(18,195,240,0.08);">
                        <img src="https://img.icons8.com/ios-filled/50/000000/email.png" alt="Email" width="40" />
                        <p style="margin-top: 10px;"><strong>Email:</strong></p>
                        <ul style="list-style: none; padding-left: 2;">
                            <li>✉️ jd8538879@gmail.com</li>
                            <li>✉️ sakura123@gmail.com</li>
                            <li>✉️ danielkike18@gmail.com</li>
                        </ul>
                    </div>

                    <!-- Espacio para 3ra columna (puedes poner otro canal aquí si deseas) -->
                    <div style="padding: 20px; border: none; border-radius: 14px; background: #fff; box-shadow: 0 2px 8px rgba(18,195,240,0.08);">
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/info--v1.png" alt="Info" width="40" />
                        <p style="margin-top: 10px;"><strong>Soporte</strong></p>
                        <p>Estamos aquí para ayudarte. Escríbenos si tienes preguntas o necesitas ayuda.</p>
                    </div>

                </div>
            </div>
        </div>
            `
        });
        console.log(`correo enviado a ${to}`);
    } catch (error) {
        console.error('Error al enviar el correo', error);  
        throw error;
    }
}
import { enviarCorreo } from "./enviarCorreo.js";
export const enviarCorreoRegistro = async (email, nombre, token) => {
    const link = `${process.env.FROTEND}/confirmar/${token}`;
    const html = `
    <div style="
    font-family: Arial, sans-serif;
    line-height: 1.6;
    border-radius: 20px;
    border: 3px solid rgb(0, 0, 0);
    padding: 2px;
">

    <div style="
        border-radius: 10px;
        border: 3px solid rgb(2, 0, 128);
        padding: 20px;
        text-align: center;
    ">
        <h1>¡BIENVENIDO A LIFE REMINDER,</h1>
        <h1>${nombre}☻</h1>
    </div>

    <div style="
        border: 3px solid rgb(2, 0, 128);
        border-radius: 10px;
        padding: 20px;
    ">
        <p>Nos alegra mucho que hayas decidido unirte a <strong>Life Reminder</strong>, tu nueva aplicación móvil diseñada para mejorar tu bienestar 
        y facilitar tu día a día. Queremos darte una cálida bienvenida y agradecerte por confiar en nosotros.</p>

        <p>Life Reminder ha sido creada pensando en ti. Nuestro objetivo es brindarte una experiencia segura, práctica y agradable. Sabemos lo importante 
        que es cuidar de tu salud, por eso hemos desarrollado esta herramienta que te permite:</p>

        <ul style="list-style: none; padding-left: 0;">
            <li>✔️ Programar y recibir recordatorios para la toma de tus medicamentos.</li>
            <li>✔️ Agendar y gestionar tus citas médicas fácilmente.</li>
            <li>✔️ Consultar tu información personal y médica en todo momento.</li>
            <li>✔️ Fácil uso de la aplicación.</li>
            <li>✔️ Consultar tus exámenes.</li>
        </ul>

        <p>Queremos acompañarte en cada paso, ayudarte a organizar tu salud y asegurarnos de que nunca olvides lo importante.</p>

        <p><strong>${nombre}</strong>, estás a un solo paso de comenzar. Activa tu cuenta haciendo clic en el botón a continuación para disfrutar de todas 
        las funciones que tenemos para ti:</p>

        <a href="${link}" 
            style="
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0px;
                background-color: #12c3f0ff;
                color: black;
                text-decoration: none;
                border-radius: 5px;
            ">
            Activar Cuenta
        </a>
    </div>

    <div style="
        border-radius: 10px;
        border: 3px solid rgb(2, 0, 128);
        padding: 20px;
    ">
        <h3>CONTÁCTANOS POR NUESTROS CANALES:</h3>

        <div style="
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 30px;
            text-align: center;
            font-family: Arial, sans-serif;
        ">

            <!-- WhatsApp -->
            <div style="padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                <img src="https://img.icons8.com/ios-filled/50/000000/whatsapp.png" alt="WhatsApp" width="40" />
                <p style="margin-top: 10px;"><strong>WhatsApp</strong></p>
                <ul style="list-style: none; padding: 2;">
                    <li>📱 +57 322 9228590</li>
                    <li>📱 +57 312 7564367</li>
                    <li>📱 +57 324 4574375</li>
                </ul>
            </div>

            <!-- Email -->
            <div style="padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                <img src="https://img.icons8.com/ios-filled/50/000000/email.png" alt="Email" width="40" />
                <p style="margin-top: 10px;"><strong>Email:</strong></p>
                <ul style="list-style: none; padding-left: 2;">
                    <li>✉️ jd8538879@gmail.com</li>
                    <li>✉️ sakura123@gmail.com</li>
                    <li>✉️ danielkike18@gmail.com</li>
                </ul>
            </div>

            <!-- Espacio para 3ra columna (puedes poner otro canal aquí si deseas) -->
            <div style="padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/info--v1.png" alt="Info" width="40" />
                <p style="margin-top: 10px;"><strong>Soporte</strong></p>
                <p>Estamos aquí para ayudarte. Escríbenos si tienes preguntas o necesitas ayuda.</p>
            </div>

        </div>
    </div>
</div>

        `;
    console.log(html);
    await enviarCorreo(email, 'Activa tu cuenta en Life Reminder', html);
};

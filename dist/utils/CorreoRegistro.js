import { enviarCorreo } from "./enviarCorreo.js";
export const enviarCorreoRegistro = async (email, nombre, token) => {
    const link = `${process.env.FROTEND}/confirmar/${token}`;
    const html = `
    <div style="
        font-family: Arial, sans-serif;
        color: #12c3f0ff;
        Line-height: 1.6;
        border-radius: 20px;
        border: 3px solid rgb(0, 0, 0);
        padding: 5px;
        ">
        <div style="
        border-radius: 10px;
        border: 3px solid rgb(61, 61, 61);
        padding: 20px;
        text-align: center;">
            <h1>!BIENVENIDO A LIFE REMINDER, <h1>${nombre}☻</h1></h1>
        </div>
        <div style="
        border: 3px solid rgb(61, 61, 61);
        border-radius: 20px;
        padding: 20px;">

        <p>Nos alegra mucho que hayas decidido unirte a <strong>Life Reminder</strong>, tu nueva aplicación móvil diseñada para mejorar tu bienestar 
            y facilitar tu día a día. Queremos darte una cálida bienvenida y agradecerte por confiar en nosotros.</p>
         <p>Life Reminder ha sido creada pensando en ti. Nuestro objetivo es brindarte una experiencia segura, práctica y agradable. Sabemos lo importante 
            que es cuidar tu salud, por eso hemos desarrollado herramientas que te permiten:</p>
            <ul>
                <li>Programar y recibir recordatorios para la toma de tus medicamentos.</li>
                <li>Agendar y gestionar tus citas médicas fácilmente.</li>
                <li>Consultar tu información personal y médica en todo momento.</li>
                <li>Facil uso de la aplicacion</li>
                <li>Consultar tus examenes</li>
            </ul>
        <p>Queremos acompañarte en cada paso, ayudarte a organizar tu salud y asegurarnos de que nunca olvides lo importante.</p>

        <p><strong>${nombre}</strong>, estás a un solo paso de comenzar. Activa tu cuenta haciendo clic en el botón a continuación para disfrutar de todas 
            las funciones que tenemos para ti:</p>

        <a href="${link}" 
        style="
            display: inline-block;
            padding: 10px 20px;
            margin: 20px opx;
            background-color: #12c3f0ff;
            color: black;
            text-decoration: none;
            border-radius: 5px;
            ">Activar Cuenta</a></div>
            <div style="
            border-radius: 20px;
            border: 3px solid rgb(61, 61, 61);
            padding: 20px;"></div>
</div>
        `;
    console.log(html);
    await enviarCorreo(email, 'Activa tu cuenta en Life Reminder', html);
};

import dotenv from 'dotenv';
dotenv.config();
if (!process.env.JWT_TOKEN) {
    console.error("No está leyendo la variable JWT_TOKEN en el archivo .env");
    process.exit(1);
}
if (!process.env.EMAIL) {
    console.log("No está leyendo la variable EMAIL en el archivo .env");
    process.exit(1);
}
else {
    console.log("Las Variable se estan leyendo correctamente");
}

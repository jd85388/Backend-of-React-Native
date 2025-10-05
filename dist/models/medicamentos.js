import { Schema, model } from "mongoose";
const MedicamentosSchema = new Schema({
    id_Paciente: {
        type: Schema.Types.ObjectId,
        ref: "paciente",
        required: true
    },
    nombre: {
        type: String,
        required: [true, "El campo es obligatorio"],
        trim: true
    },
    dosis: {
        type: Number,
        required: [true, "El campo es obligatorio"],
        min: 1,
        max: 1000
    },
    unidad: {
        type: String,
        required: [true, "El campo es obligatorio"],
        trim: true,
        enum: [
            "mg", "g", "kg", "ml", "l", "gotas(s)", "cucharada", "cucharaditas",
            "pulverizado", "tableta", "capsula", "ampolla", "sobre", "supositorio",
            "parche", "inhalacion", "inyeccion", "aplicacion"
        ]
    },
    frecuencia: {
        type: String,
        required: [true, "El campo es obligatorio"],
        trim: true
    },
    viaAdministracion: {
        type: String,
        required: [true, "El campo es obligatorio"],
        trim: true,
        enum: [
            "intravenosa", "intramuscular", "subcutanea", "intradermica", "intraosea",
            "intratecal", "oral", "sublingual", "buccal/yugal", "rectal", "nasogastrica",
            "inhalatoria", "intranasal", "topica", "transdermica", "oftalmica", "otica",
            "vaginal", "uretral", "dental/gingival", "intraarticular", "intracardiaca",
            "inhalacion nasal"
        ]
    },
    duracion: {
        inicio: { type: Date, required: true },
        fin: { type: Date, required: true }
    },
    recetadoPor: {
        type: String,
        required: [true, "El campo es obligatorio"],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, "El campo es obligatorio"],
        trim: true,
        maxlength: [2000, "No debe ser mayor al valor máximo permitido"],
        minlength: [10, "Debe ser mayor al valor mínimo admitido"]
    },
    notas: {
        type: String,
        trim: true,
        maxlength: [2000, "No debe exceder el valor máximo permitido"]
    },
    estado: {
        type: Boolean,
        default: true
    },
    causaUso: {
        type: String,
        required: [true, "Campo obligatorio"],
        trim: true
    }
}, {
    timestamps: true
});
// ✅ Validación personalizada con tipado correcto
MedicamentosSchema.pre("validate", function (next) {
    if (this.duracion?.inicio > this.duracion?.fin) {
        this.invalidate("duracion", "La fecha de inicio debe ser anterior a la fecha de fin");
    }
    next();
});
const Medicamento = model("medicamentos", MedicamentosSchema);
export default Medicamento;

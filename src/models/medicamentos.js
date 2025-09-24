import { Model, Schema, model, Document } from "mongoose";
const MedicamentosSchema = new Schema({
    id_Paciente: { type: Schema.Types.ObjectId, ref: 'paciente', require: true },
    nombre: { type: String,
        required: [true, 'El campo es obligatorio'],
        trim: true },
    dosis: { type: Number,
        required: [true, 'El campo es obligatorio'],
        min: 1,
        max: 1000 },
    unidad: { type: String,
        required: [true, 'El campo es obligatorio'],
        trim: true,
        enum: ['mg', 'g', 'kg', 'ml', 'l', 'gotas(s)', 'cucharada', 'cucharaditas',
            'pulverizado', 'tableta', 'capsula', 'ampolla', 'sobre', 'supositorio',
            'parche', 'inhalacion', 'inyeccion', 'aplicacion'] },
    frecuencia: { type: String,
        required: [true, 'El campo es obligatorio'],
        trim: true
    },
    viaAdministracion: { type: String,
        required: [true, 'El campo es obligatorio'],
        trim: true,
        enum: ['intravenosa', 'intramuscular', 'subcutanea', 'intradermica', 'intraosea',
            'intratecal', 'oral', 'sublingual', 'buccal/yugal', 'rectal', 'nasogastrica',
            'inhalatoria', 'intranasal', 'topica', 'transdermica', 'oftalmica', 'otica', 'vaginal',
            'uretral', 'dental/gingival', 'intraarticular', 'intracardiaca', 'inhalacion nasal']
    },
    duracion: { type: { inicio: Date, fin: Date },
        required: true,
        validate: {
            validator: (value) => value.inicio <= value.fin,
            message: 'La fecha de inicio debe ser anterior a la fecha de fin',
        },
    },
    recetadoPor: { type: String,
        required: [true, 'El campo es obligatorio'],
        trim: true
    },
    descripcion: { type: String,
        required: [true, 'el campo es obligatorio'],
        trim: true,
        maxlength: [2000, 'No debe ser mayor al valor maximo permitido'],
        minlength: [10, 'Debe ser mayor al valor maximo admitido']
    },
    notas: { type: String,
        required: false,
        trim: true,
        maxlength: [2000, 'No debe exeder el valor maximo permitido']
    },
    estado: { type: Boolean,
        default: true,
    },
    causaUso: { type: String,
        required: [true, 'campo obligatorio'],
        trim: true
    },
}, { timestamps: true });
const Medicamento = model('medicamentos', MedicamentosSchema);
export default Medicamento;
//# sourceMappingURL=medicamentos.js.map
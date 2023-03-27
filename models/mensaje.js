const { Schema , model }  = require('mongoose');

const MensajeSchema = Schema({
    de: {
        type: Schema.Types.ObjectId,
        ref:'Usuario,',
        required: true
    },

    para:{
        type: Schema.Types.ObjectId,
        ef:'Usuario,',
        required: true
    },

    mensaje: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    }
},
{
    timestamps:true
});

UsuariosSchema.method('toJSON', function() {
    const {__v, _id, ...object } = this.toObject();
    object.uid = _id;
    console.log(object);
    return object;
})

module.exports = model('Mensaje',MensajeSchema);
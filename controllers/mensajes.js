
const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res)=>{

    const miId = req.uid;
    const mensajesDe = req.params.de;

    const last30 = await Mensaje.find({
        //Buscamos todos los mensajes que son mios o me lo envían a mi
        $or: [{de: miId, para:mensajesDe},{de: mensajesDe, para:miId}]
    }).sort({
        createdAt: 'desc'
    }).limit(30);
    res.json({
        ok: true,
        mensajes: last30
        //miId, // pinta miId: valor
        //mensajesDe

    })
}


module.exports = {
    obtenerChat
}
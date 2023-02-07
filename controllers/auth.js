const {response} = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;
    console.log('Email -> '+ email);
    try {
        const existeEmail =  await Usuario.findOne({email});
        
        if(existeEmail){
            return res.status(400).json({ok: false,msg:'El correo ya está registrado'})
        }
        const usuario = new Usuario(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        usuario.save();
        res.json({
            ok: true,
            body: usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Habla con el administrador'
        })
    }
   

    
}

module.exports = {
    crearUsuario
}
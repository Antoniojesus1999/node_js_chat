const {response} = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');

const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;
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
        //Generar token
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            body: usuario,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Habla con el administrador'
        })
    }
   

    
}

const login = async (req, res = response)=>{
    console.log();
    const {email, password} = req.body;

    try {
        const usuarioDB = await Usuario.findOne({email});
        if (!usuarioDB) {
            return res.status(404).json({ok:false,msg:'Email no se encontro'});
        }
        //Validar el password
        const validPassword = bcrypt.compareSync(password,usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({ok:false,msg:'La contraseña no es valida'});
        }
        //Generar token
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            body: usuarioDB,
            token: token
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
    crearUsuario,login
}
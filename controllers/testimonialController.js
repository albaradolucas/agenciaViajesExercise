import { Testimonial } from "../models/Testimoniales.js"

const guardarTestimonial = async (req, res) => {
    const { nombre, correo, mensaje } = req.body
    const errores = []

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El campo nombre está vacío'})
    }
    if(correo.trim() === '') {
        errores.push({mensaje: 'El campo correo está vacío'})
    }
    if(mensaje.trim() === '') {
        errores.push({mensaje: 'El campo mensaje está vacío'})
    }
    if(errores.length > 0) {
        // Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll()

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }
    else {
        // Almacenar en la bd
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })

            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error);
        }
    }
}


export {
    guardarTestimonial
}
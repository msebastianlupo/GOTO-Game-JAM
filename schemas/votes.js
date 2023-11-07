import yup from 'yup'

const createVoteSchema = yup.object({
	game_id: yup.string("el id de juego debe ser una cadena")
    .min(24, "el id del juego contiene menos de 24 caracteres")
    .max(24, "el id del juego contiene más de 24 caracteres")
    .lowercase()
    .trim()
    .required("el id de juego es oblitario"),

	playability: yup.number("jugabilidad debe ser de tipo numérico")
    .min(1, "puntaje de jugabilidad es inferior a 1 pt")
    .max(10, "puntaje de jugabilidad excede los 10 pts")
    .required("jugabilidad es obligatorio")
    .positive("no se permite números negativos")
    .integer("los puntajes deben ser números enteros"),

    art: yup.number("arte debe ser de tipo numérico")
    .min(1, "puntaje de arte es inferior a 1 pt")
    .max(10, "puntaje de arte excede los 10 pts")
    .required("arte es obligatorio")
    .positive("no se permite números negativos")
    .integer("los puntajes deben ser números enteros"),

    sound: yup.number("sonido debe ser de tipo numérico")
    .min(1, "puntaje de sonido es inferior a 1 pt")
    .max(10, "puntaje de sonido excede los 10 pts")
    .required("sonido es obligatorio")
    .positive("no se permite números negativos")
    .integer("los puntajes deben ser números enteros"),

    afinity: yup.number("afinidad debe ser de tipo numérico")
    .min(1, "puntaje de afinidad es inferior a 1 pt")
    .max(10, "puntaje de afinidad excede los 10 pts")
    .required("afinidad es obligatorio")
    .positive("no se permite números negativos")
    .integer("los puntajes deben ser números enteros")
})

export {
    createVoteSchema
}
import yup from 'yup'

const createGameSchema = yup.object({
	name: yup.string()
	.min(1, "nombre debe contener un caracter como mínimo")
	.lowercase()
	.trim()
	.required(),

	genre: yup.string().min(3, "género debe contener 3 caracteres como mínimo")
	.lowercase()
	.trim()
	.required(),

	members: yup.array()
	.of(yup.string().lowercase().min(3).trim())
	.min(1).required(),

	edition: yup.number()
	.min(2000, "edición es inferior al año 2000")
	.max(new Date().getFullYear(), "edición supera al año actual")
	.required()
	.positive()
	.integer()
})

const modifyGameSchema = yup.object({
	name: yup.string()
	.min(1, "nombre debe contener un caracter como mínimo")
	.lowercase()
	.trim(),

	genre: yup.string()
	.min(3, "género debe contener 3 caracteres como mínimo")
	.lowercase()
	.trim(),

	members: yup.array()
	.of(yup.string().lowercase().min(3).trim())
	.min(1),

	edition: yup.number()
	.min(1980, "edición es inferior al año 1980")
	.max(new Date().getFullYear(), "edición supera al año actual")
	.positive()
	.integer()
})

export {
    createGameSchema,
	modifyGameSchema
}
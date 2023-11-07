import express from 'express'
import { gamesRoutes } from './routes/games.js'
import { judgesRoutes } from './routes/judges.js'
import { editionsRoutes } from './routes/editions.js'
import { votesRoutes } from './routes/votes.js'

const app = express()
app.use(express.json())

app.use(editionsRoutes)
app.use(gamesRoutes)
app.use(judgesRoutes)
app.use(votesRoutes)

app.listen(2023, () => {
    console.log("en línea, localhost:2023")
})
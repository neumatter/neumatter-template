// import NeuJS from '../../neujs/index.js'
import Neumatter from 'neumatter'

process.env.NODE_ENV = 'development'

const app = await Neumatter.load()

app.listen()

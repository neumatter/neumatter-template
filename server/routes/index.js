// import NeuJS from '../../../neujs/index.js'
import Neumatter from 'neumatter'

const router = new Neumatter.Router()

router.get('/', async (req, res) => {
  await res.render('index')
})

export default router

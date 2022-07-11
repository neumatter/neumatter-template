// import NeuJS from '../../../neujs/index.js'
import Neumatter from 'neumatter'

const router = new Neumatter.Router()

router.route('/:sku/:id')
  .get(async (req, res) => {
    await res.render({
      items: [
        'hello',
        'world'
      ],
      sku: req.params.sku,
      id: req.params.id
    })
  })

export default router

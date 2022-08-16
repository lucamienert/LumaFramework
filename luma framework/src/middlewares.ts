import style from './middlewares/style'
import interpolate from './middlewares/interpolate'
import render from './middlewares/render'

import { observe } from './middlewares/observe'
import { attributes } from './middlewares/attributes'

export default {
    attributes,
    style,
    observe,
    interpolate,
    render
}
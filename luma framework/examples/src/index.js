import * as luma from 'lumaframework'

luma.components.app({
    template: require('./index.html'),
    style: require('./index.css')
})
.register('init-component')
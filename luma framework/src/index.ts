var luma

if(typeof Proxy === undefined)
    luma = { supported: false }
else {
    luma = {
        core: import('./core'),
        components: import('./components'),
        supported: true
    }
}

if(typeof module !== 'undefined' && module.exports)
    module.exports = luma

if(typeof window !== 'undefined')
    window.luma = luma
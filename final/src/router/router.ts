const router = {
    getURL() {
        return window.location.hash.slice(1)
    },

    navigate(hash: string) {
        return (window.location.hash = hash)
    }
}

export default router
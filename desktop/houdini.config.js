/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
    "watchSchema": {
        // "url": "http://api.sonic-sync.com/graphql"
        "url": "http://localhost:8080/graphql"
    },
    "plugins": {
        "houdini-svelte": {}
    }
}

export default config

/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
    "watchSchema": {
        "url": "https://api.sonic-sync.com/graphql"
        // "url": "http://localhost:8080/graphql"
    },
    "plugins": {
        "houdini-svelte": {static: true}
    }
}

export default config

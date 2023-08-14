import { HoudiniClient } from '$houdini';

export default new HoudiniClient({
    url: 'https://api.sonic-sync.com/graphql',
      
      // "url": "http://localhost:8080/graphql"
    // uncomment this to configure the network call (for things like authentication)
    // for more information, please visit here: https://www.houdinigraphql.com/guides/authentication
    fetchParams({ session }: any) {
        return {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        }
    },
})



import { setSession } from '$houdini'
import type { Handle } from '@sveltejs/kit'

export async function handle ({ event, resolve }): Handle  {
    // get the user information however you want
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: '{"email":"","password":""}'
    };

    // const user = await fetch('https://api.sonic-sync.com/login', options)
    // let token = user.headers.get("set-cookie")?.split('=')[1].split(';')[0]
  // set the session information for this event
    // setSession(event, { token })

    // pass the event onto the default handle
    const response = await resolve(event)
    return response
}

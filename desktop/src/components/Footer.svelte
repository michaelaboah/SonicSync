<script lang="ts">
    import { Notification, Footer } from '@svelteuidev/core';
    import { setAccessToken } from '../utils/accessToken';
    import { Check, Cross2 } from 'radix-icons-svelte';
    import { REFRESH_ENDPOINT } from '../utils/ClientContants';

    const response = fetch(REFRESH_ENDPOINT, {
        method: 'POST',
        credentials: 'include',
    })
        .then((x) => x.json())
        .then(({ accessToken: recievedToken }) => {
            setAccessToken(recievedToken);
        });
    let isNotified: boolean = true;

    setTimeout(() => {
        isNotified = false;
    }, 5000);
</script>

<Footer height="10" fixed>
    {#if isNotified}
        {#await response}
            <Notification
                title="Connection Successful!"
                icon="{Check}"
                color="teal"
                closeButtonProps="{{ iconSize: 'xl' }}"
                on:close="{() => (isNotified = !isNotified)}"
                closeButtonLabel="Hide Success Notification"
            >
                You have successfully connected to the server
            </Notification>
        {:catch error}
            <Notification
                on:close
                title="Connection Failed"
                icon="{Cross2}"
                color="red"
                closeButtonProps="{{ iconSize: 'xl' }}"
                closeButtonLabel="Hide Error Notification"
                on:close="{() => (isNotified = !isNotified)}"
            >
                <div>You are not connected to the server | Autocomplete is diabled</div>
                <div>Error Message: {error}</div>
            </Notification>
        {/await}
    {/if}
</Footer>

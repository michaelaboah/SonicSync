<script lang="ts">
    import { Box, Button, Checkbox, Input, InputWrapper, Popper, Center } from '@svelteuidev/core';
    import { setAccessToken } from '../utils/accessToken';
    import { LoginUser, MeDoc, type MeQuery, type UserInput } from '../generated/graphql';
    import { onMount } from 'svelte';
    import { persist } from '../stores/RenderStore';

    let loginOptions: UserInput = { email: '', password: '' };
    //@ts-ignore
    let isLoggedIn: boolean;
    let mounted = false;

    let reference: HTMLElement;
    let rest: any;
    $: console.log($persist.rememberMe);
    onMount(() => {
        if ($persist.rememberMe) {
            loginOptions = $persist.credentials;
        }
    });

    const handleRemember = () => {
        if (!$persist.rememberMe) {
            loginOptions = $persist.credentials;
        } else {
            loginOptions.email = '';
            loginOptions.password = '';
            $persist.credentials = loginOptions;
        }
    };

    const sumbitLogin = async (credentials: UserInput) => {
        const loginResponse = await LoginUser({
            variables: { inputOptions: credentials },
            update: (store, { data }) => {
                if (!data) return null;
                store.writeQuery<MeQuery>({
                    query: MeDoc,
                    data: {
                        me: data.loginUser.user,
                    },
                });
                console.log();
                return data.loginUser.user;
            },
        });
        if (loginResponse && loginResponse.data) {
            isLoggedIn = false;
            setAccessToken(loginResponse.data?.loginUser.accessToken);
        }

        // check if the user wants the login to be remembered
        if ($persist.rememberMe) {
            $persist.credentials = loginOptions;
        }
        isLoggedIn = true;
        mounted = true;
        setTimeout(() => {
            mounted = false;
        }, 2000);
    };
</script>

<Box ml="6">
    <InputWrapper label="Login Credentials" description="Please enter your username and password" size="xs">
        <Input bind:value="{loginOptions.email}" placeholder="Enter: Email" />
        <Input bind:value="{loginOptions.password}" placeholder="Enter: Password" type="password" {...rest} />
        <Button bind:element="{reference}" on:click="{() => sumbitLogin(loginOptions)}" {...rest}>Login</Button>
    </InputWrapper>
    <Popper
        reference="{reference}"
        mounted="{mounted}"
        exitTransitionOptions="{{ start: 5, x: 3, y: 2 }}"
        position="right"
        gutter="{7}"
        arrowSize="{6}"
        arrowDistance="{3}"
        withArrow
    >
        <Box css="{{ backgroundColor: '$teal500' }}" m="sm">
            <Center inline>login Success!!</Center>
        </Box>
    </Popper>
    <Checkbox label="Remember Me" bind:checked="{$persist.rememberMe}" on:click="{handleRemember}" />
</Box>

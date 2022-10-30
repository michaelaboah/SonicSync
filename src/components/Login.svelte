<script lang="ts">
  import { Box, Button, Checkbox, Input, InputWrapper, Popper, Center } from "@svelteuidev/core";
  import { setAccessToken } from "../utils/accessToken";
  import { LoginUser, MeDoc, type MeQuery, type UserInput } from "../generated/graphql";
  import { onMount } from "svelte";

  let loginOptions: UserInput = { email: "", password: "" };
  //@ts-ignore
  let isLoggedIn: boolean;
  let mounted = false;
  let isRemembered: boolean;
  let reference: HTMLElement;
  let rest: any;
  onMount(async () => {
    const userData = await window.api.handleUserStorage("preferences");
    isRemembered = userData.rememberMe;
    if (isRemembered && userData.credentials !== undefined) {
      loginOptions = userData.credentials;
    }
  });

  const handleRememberMe = async () => {
    isRemembered = !isRemembered;
    const userData = await window.api.handleUserStorage("preferences");
    if (isRemembered === false) {
      loginOptions = { email: "", password: "" };
      userData.credentials = undefined;
      console.log(userData.credentials);
      await window.api.handleUserStorage("preferences", { ...userData, rememberMe: isRemembered });
    }
    await window.api.handleUserStorage("preferences", { ...userData, rememberMe: isRemembered });
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

    //check if the user wants the login to be remembered
    if (isRemembered) {
      const userData = await window.api.handleUserStorage("preferences");
      await window.api.handleUserStorage("preferences", { ...userData, credentials });
    }
    isLoggedIn = true;
    mounted = true;
    setTimeout(() => {
      mounted = false;
    }, 2000);
  };
</script>

<Box ml="6">
  <InputWrapper label="Login Credentials" description="Please enter your username and password" size="lg">
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
    <Box css="{{ backgroundColor: '$teal500' }}" m="xl">
      <Center inline>login Success!!</Center>
    </Box>
  </Popper>
  <Checkbox label="Remember Me" bind:checked="{isRemembered}" on:change="{handleRememberMe}" />
</Box>

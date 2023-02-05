<script lang="ts">
    import { Box, Divider, Group, Space, Stack, Switch, Title } from '@svelteuidev/core';
    import RangeSlider from 'svelte-range-slider-pips';
    import { persist } from '../../stores/RenderStore';
</script>

<Title align="left" mb="lg" order="{3}">Appearance</Title>
<Stack align="stretch" spacing="{'xl'}">
    <Box m="40">
        <Title align="right" order="{4}">Theme</Title>
        <Divider size="md" />
        <Group position="right">
            <Switch
                size="md"
                m="xl"
                onLabel="ON"
                offLabel="OFF"
                bind:checked="{$persist.darkMode}"
                label="Toggle Dark-Mode"
                color="dark"
            />
        </Group>
    </Box>

    <Box m="40">
        <Title align="right" order="{4}">Font</Title>
        <Divider size="md" />
        <Group position="right" grow ml="lg">
            <Space />
            <Box>
                <Group position="right" grow>
                    <Space />
                    <Box css="{{ fs: 15 }}">
                        <RangeSlider
                            bind:values="{$persist.fontSize}"
                            min="{15}"
                            step="{5}"
                            max="{30}"
                            pips
                            all="label"
                        />
                    </Box>
                </Group>
            </Box>
        </Group>
    </Box>
</Stack>

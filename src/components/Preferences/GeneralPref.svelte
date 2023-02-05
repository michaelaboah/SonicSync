<script lang="ts">
    import { Box, Divider, Group, Space, Stack, Switch, Text, Title } from '@svelteuidev/core';
    import RangeSlider from 'svelte-range-slider-pips';
    import { persist } from '../../stores/RenderStore';
</script>

<Title align="left" mb="lg" order="{3}">Appearance</Title>
<Stack align="stretch" spacing="{'xl'}">
    <Box m="40">
        <Title align="right" order="{2}">Theme</Title>
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
        <Title align="right" order="{2}">Font</Title>
        <Divider size="md" />
        <Group position="right" grow ml="lg">
            <Space />
            <Box>
                <Group position="right" grow>
                    <Space />
                    <Text inherit>Example Text</Text>
                    <Box css="{{ fs: 15 }}">
                        <RangeSlider
                            bind:values="{$persist.fontSize}"
                            min="{12}"
                            step="{4}"
                            max="{24}"
                            pips
                            all="label"
                        />
                    </Box>
                </Group>
            </Box>
        </Group>
    </Box>
</Stack>

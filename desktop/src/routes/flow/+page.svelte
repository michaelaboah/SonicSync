<script lang="ts">
  import { Drawer, Node, Svelvet, Minimap, Controls, ThemeToggle } from 'svelvet' 
  import { modeCurrent } from '@skeletonlabs/skeleton';
</script>
  <div class="h-full">
  <Svelvet id="my-canvas"  controls theme={$modeCurrent ? 'light' : 'dark'}>

    <Node />
    <Node id="alpha" bgColor="red" label="Default Node"/>
    <!-- <ThemeToggle main="dark" alt="light" slot="toggle"/> -->
  </Svelvet>
</div>
  


<!-- <Drawer height={1200} zoom={0.70} controls> -->
<!--    <ThemeToggle main='light' alt='dark' slot='toggle'/> -->
<!-- </Drawer> -->

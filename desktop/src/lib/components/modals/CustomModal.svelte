<script lang="ts">
  import CloseIcon from "~icons/ri/close-circle-line"
  
  export let open = false;

</script>

{#if open}

  <div class="modal fixed top-0 left-0 flex items-center justify-center  h-full w-full p-10 z-50">

      <div class="modal-overlay fixed w-full h-full bg-surface-900 opacity-50"></div>

      <div class="bg-surface-400 w-full lg:h-1/2 lg:w-1/2 mx-auto rounded-lg shadow-xl z-50 overflow-y-auto">

        <div class="card px-8 pt-2 h-full relative">

          <header class="card-header justify-between flex flex-row">
            <slot name="header"/>
            <button class="btn-icon" on:click={() => open = false}><span class="scale-125"><CloseIcon/></span></button>
          </header>

          <slot class=""/> 

          <footer class="card-footer absolute bottom-0">
            <slot name="footer"/>
          </footer>


        </div>

      </div>

  </div> 

{/if}

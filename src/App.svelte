<script lang="ts">
import { listItemStore } from './store'
import { fade } from 'svelte/transition';
const listItem = listItemStore();
let item: string = '';
function submitHandler(e: Event){
  listItem.add(item);
  item = '';
}
</script>

<div class="row">
  <div class="col-lg-4 offset-lg-4 my-4">
    <h4>Todolist Svelte LocalStorage</h4>
    <div class="card">
      <div class="card-body">
        <form on:submit|preventDefault={submitHandler}>
          <div class="row">
            <div class="col-10">
              <input class="form-control" required bind:value={item} placeholder="Add"/>
            </div>
            <div class="col-2">
                <button class="btn btn-success">Add</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {#if $listItem.length > 0}
    <div class="col-lg-4 offset-lg-4">
      {#each $listItem as itm}
        <div class="card mb-2" in:fade={{ delay: 500 }} out:fade>
          <div class="card-body">
            <div class="flex-row d-flex justify-content-between">
              <div class={itm.completed ? 'text-decoration-line-through' : null }>{itm.item}</div>
              <div>
                <button class="btn btn-danger" on:click={listItem.remove(itm.id)}>remove</button>
                {#if itm.completed}
                  <button class="btn btn-warning" on:click={listItem.changeCompleted(itm.id,false)}>incompleted</button>
                {:else}
                  <button class="btn btn-success" on:click={listItem.changeCompleted(itm.id,true)}>completed</button>
                {/if}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="col-lg-4 offset-lg-4 text-center" in:fade={{ delay: 500 }} out:fade>Empty</div>
  {/if}
</div>


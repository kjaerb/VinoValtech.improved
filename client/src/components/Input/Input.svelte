<script lang="ts">
	import type { InputType } from '../../types/Input';

	export let type: InputType;
	export let input: string;
	export let inputPlaceholder: string;
</script>

{#if type === 'number'}
	<input
		bind:value={input}
		type="number"
		class="py-1 px-2 my-2 shadow-md border rounded-lg"
		placeholder={inputPlaceholder}
	/>
{:else if type === 'text'}
	<input
		bind:value={input}
		type="text"
		class="py-1 px-2 my-2 shadow-md border rounded-lg"
		placeholder={inputPlaceholder}
	/>
{/if}

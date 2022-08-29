<script lang="ts">
	import { goto } from '$app/navigation';
	import Modal from '../components/Modal.svelte';

	let isModalOpen = false;
	let modalInput: string;

	function getRandomSixDigNumber() {
		// Thanks Federico
		return Math.random().toString().substring(2, 8);
	}

	function createRoom() {
		let roomId = getRandomSixDigNumber();
		goto(`/${roomId}`);
	}

	function connectToRoom() {
		// Do some form validation
		goto(`/${modalInput}`);
	}
</script>

<div>
	<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
		Welcome to the improved{' '}<span class="text-indigo-600">VinoValtech</span>
	</h2>
	<div />
	<div class="bg-gray-50">
		<div
			class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
		>
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
				<span>Join a wine tasting</span>
				<span class="block text-indigo-600">Or create your own lobby</span>
			</h2>
			<div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
				<div class="inline-flex rounded-md shadow">
					<button
						on:click={() => (isModalOpen = true)}
						class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-900"
					>
						Join
					</button>
				</div>
				<div class="ml-3 inline-flex rounded-md shadow">
					<button
						on:click={createRoom}
						class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
					>
						Create
					</button>
				</div>
			</div>
		</div>
	</div>
	{#if isModalOpen}
		<Modal
			title={'Join room'}
			description={'Enter room code to join room'}
			inputPlaceholder={'Room code'}
			inputType={'number'}
			bind:input={modalInput}
		>
			<button
				on:click={connectToRoom}
				type="button"
				class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-indigo-700 text-base font-medium text-white hover:indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
				>Join room</button
			>
			<button
				type="button"
				on:click={() => (isModalOpen = false)}
				class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
				>Cancel</button
			>
		</Modal>
	{/if}
</div>

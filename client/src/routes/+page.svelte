<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '../components/Input/Input.svelte';
	import { fade } from 'svelte/transition';

	let isModalOpen = false;
	let input: string;

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
		goto(`/${input}`);
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
		<div
			transition:fade|local|={{ duration: 200 }}
			class="absolute z-10 left-0 right-0"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<!--
          Background backdrop, show/hide based on modal state.
      
          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        -->
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

			<div class="z-10 inset-0 overflow-y-auto">
				<div
					class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
				>
					<!--
              Modal panel, show/hide based on modal state.
      
              Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            -->
					<div
						class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
					>
						<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<div class="sm:flex sm:items-start">
								<div
									class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
								>
									<!-- Heroicon name: outline/exclamation-triangle -->
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
										/>
									</svg>
								</div>
								<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
										Enter room id
									</h3>

									<div class="mt-2">
										<p class="text-sm text-gray-500">
											To join a room, please enter the room number
										</p>
										<Input type={'number'} {input} inputPlaceholder={'Enter room id'} />
									</div>
								</div>
							</div>
						</div>
						<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

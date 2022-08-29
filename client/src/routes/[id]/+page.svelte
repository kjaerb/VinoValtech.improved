<script lang="ts">
	import { page } from '$app/stores';
	import initSocket from '../../lib/socket';
	import { fade } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import type { Socket } from 'socket.io-client';
	import type Member from 'types/Member';
	import type Room from 'types/Room';

	let socket: Socket;
	let roomId: string = $page.params.id;
	let connected: boolean = false;
	let joined: boolean = false;
	let expired: boolean = false;
	let owner: boolean = false;

	let member: Member;
	let room: Room;

	onMount(() => {
		socket = initSocket({
			roomId,
			onConnect: () => {
				connected = true;
			},
			onUpdated: (event) => {
				room = event.data;
				console.log(room);
			},
			onJoined: () => {
				joined = true;
			},
			onExpired: () => {
				expired = true;
			}
		});
	});

	onDestroy(() => {
		socket?.close();
	});

	function updateName() {
		socket.emit('events', {
			type: 'update_name',
			payload: { id: roomId, name: member.name }
		});
	}
</script>

<div class=" h-64">
	{#if !connected}
		<div class="flex flex-col items-center justify-center">
			<div
				style="border-top-color:transparent"
				class="w-16 h-16 border-4 border-indigo-400 border-solid rounded-full animate-spin flex justify-center items-center"
			/>

			<p class="text-white text-xl mt-4">Connecting to the room</p>
		</div>
	{:else if !joined}
		<div
			transition:fade|local|={{ duration: 200 }}
			class="relative z-10"
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
										Enter name
									</h3>

									<div class="mt-2">
										<p class="text-sm text-gray-500">To join the room, please enter your name:</p>
										<input
											class="py-1 px-2 my-2 shadow-md border rounded-lg"
											bind:value={member.name}
											placeholder="Enter name"
										/>
									</div>
								</div>
							</div>
						</div>
						<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<button
								type="button"
								on:click={updateName}
								class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
								>Join room</button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div>
			<h1>
				Welcome {member.name}
			</h1>
		</div>
	{/if}
</div>

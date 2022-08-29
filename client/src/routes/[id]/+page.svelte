<script lang="ts">
	import { page } from '$app/stores';
	import initSocket from '../../lib/socket';
	import { fade } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import type { Socket } from 'socket.io-client';
	import type Member from 'types/Member';
	import type Room from 'types/Room';
	import Modal from '../../components/Modal.svelte';

	let socket: Socket;
	let roomId: string = $page.params.id;
	let connected: boolean = false;
	let joined: boolean = false;
	let expired: boolean = false;
	let owner: Member | undefined;
	let isOwner: boolean = false;

	let member: Member = {
		clientId: '',
		name: ''
	};
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
				if (owner === undefined) getOwner();
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

	function getOwner() {
		owner = room?.membersInfo.find((member) => member.clientId === room.owner);
		if (owner?.clientId === socket.id) isOwner = true;
	}

	function formatName(name?: string) {
		if (name?.[name.length - 1] === 's') {
			return `${name}'`;
		} else {
			return `${name}'s`;
		}
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
	{/if}
	{#if !joined}
		<Modal
			title={'Enter name'}
			description={'Enter name to join room'}
			inputPlaceholder={'Name'}
			bind:input={member.name}
		>
			<button
				on:click={updateName}
				type="button"
				class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-indigo-700 text-base font-medium text-white hover:indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
				>Join room</button
			>
		</Modal>
	{:else if isOwner}
		<div>
			<span class="font-bold text-xl">Welcome to your wine tasting</span>
			<span>These are the current members:</span>
			<ul>
				{#each room.membersInfo as member}
					<li>{member.name}</li>
				{/each}
			</ul>
		</div>
	{:else}
		<div>
			<span class="font-bold text-xl"
				>Hello {member.name}. Welcome to {formatName(owner?.name)} beverage tasting</span
			>
		</div>
	{/if}
</div>

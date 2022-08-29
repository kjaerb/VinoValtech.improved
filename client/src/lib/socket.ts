import { io } from 'socket.io-client';

const wsUrl = 'http://localhost:3000';

interface socketProps {
	roomId: string;
	onConnect?: () => void;
	onExpired?: () => void;
	onUpdated?: (event: { name: string; data: any }) => void;
	onException?: () => void;
	onJoined?: () => void;
}

export default function initSocket({
	roomId,
	onConnect,
	onExpired,
	onUpdated,
	onException,
	onJoined
}: socketProps) {
	const socket = io(wsUrl);

	socket.on('connect', () => {
		socket.emit('events', { type: 'join', payload: { id: roomId } });
		onConnect?.();
	});

	socket.on('updated', function (event) {
		onUpdated?.(event);
	});

	socket.on('exception', function (event) {
		console.log('event', event);
		onException?.();
	});

	socket.on('joined', function () {
		onJoined?.();
	});

	socket.on('expired', () => {
		socket.close();
		onExpired?.();
	});

	return socket;
}

import { io } from 'socket.io-client';

const wsUrl = 'http://localhost:3000';

interface socketProps {
	roomId: string;
	onConnect?: () => void;
	onExpired?: () => void;
}

export default function initSocket({ roomId, onConnect, onExpired }: socketProps) {
	const socket = io(wsUrl);

	socket.on('connect', () => {
		onConnect?.();
	});
	socket.on('expired', () => {
		socket.close();
		onExpired?.();
	});

	return socket;
}

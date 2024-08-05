import {
	Box,
	Button,
	Heading,
	HStack,
	Icon,
	StackDivider,
	Text,
	VStack,
} from '@chakra-ui/react';
import { IconCircleDot, IconPlayerPlay, IconRocket, IconSquare } from '@tabler/icons-react';
import moment from 'moment';
import { useStopwatch } from 'react-timer-hook';
import BigLayout from '../components/BigLayout';
import DisplayBigTime from '../components/DisplayBigTime';
import useTodos from '../hooks/useTodos';

export default function Focus({ activeTodo }: { activeTodo: Todo }) {
	return (
		<BigLayout icon={IconRocket} headingText="Fokus Cuy">
			{!activeTodo.startAt ? (
				<StartFocus activeTodo={activeTodo} />
			) : (
				<Stopwatch activeTodo={activeTodo} />
			)}
		</BigLayout>
	);
}

function StartFocus({ activeTodo }: { activeTodo: Todo }) {
	const Todos = useTodos();
	const queueTodos = Todos.findQueue().filter((e) => e.id !== activeTodo.id);

	const startHandler = () => {
		Todos.update(activeTodo.id, { startAt: new Date() });
	};

	return (
		<VStack>
			<Heading>Mulai Fokus sekarang ??</Heading>
			<Button
				leftIcon={<IconPlayerPlay />}
				children={activeTodo.name}
				variant="outline"
				colorScheme="green"
				w="full"
				onClick={startHandler}
			/>
			{!!queueTodos.length && (
				<Box w="full" mt="2">
					<Text alignSelf="start" fontSize="sm" fontWeight="600">
						Tugas Selanjutnya
					</Text>
					<VStack
						mt="2"
						w="full"
						divider={<StackDivider borderColor="gray.300" />}
						border="1px solid"
						borderColor="gray.300"
						rounded="md"
						py="2"
					>
						{queueTodos.slice(0, 4).map(({ id, name }) => (
							<HStack key={id} px="3" rounded="md" w="full">
								<Icon as={IconSquare} />
								<Text>{name}</Text>
							</HStack>
						))}

						{queueTodos.length - 4 > 0 && (
							<HStack px="3" rounded="md" w="full">
								<Icon as={IconCircleDot} />
								<Text fontStyle="italic">
									{queueTodos.length - 4} lainnya
								</Text>
							</HStack>
						)}
					</VStack>
				</Box>
			)}
		</VStack>
	);
}

function Stopwatch({ activeTodo }: { activeTodo: Todo }) {
	const Todos = useTodos();
	const { totalSeconds, seconds, minutes, hours, days, reset } = useStopwatch({
		offsetTimestamp: moment().add(moment().diff(activeTodo.startAt)).toDate(),
		autoStart: true,
	});

	const endHandler = () => {
		reset(undefined, false);
		Todos.update(activeTodo.id, {
			duration: totalSeconds,
			completedAt: new Date(),
		});
	};

	return (
		<DisplayBigTime
			title={activeTodo.name}
			subtitle={`Dimulai pada pukul ${moment(activeTodo.startAt).format('HH:mm')}`} // prettier-ignore
			endTaskHandler={endHandler}
			timeObj={{
				seconds,
				minutes,
				hours,
				days,
			}}
		/>
	);
}

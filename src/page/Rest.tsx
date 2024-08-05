import {
	Box,
	Button,
	Heading,
	HStack,
	Icon,
	IconButton,
	Spacer,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	Tag,
	VStack,
	AlertIcon,
	Alert,
	Circle,
	Square,
} from '@chakra-ui/react';
import {
	IconCheckbox,
	IconClock,
	IconClockBolt,
	IconPlayerPlay,
	IconRocket,
	IconZzz,
} from '@tabler/icons-react';
import moment from 'moment';
import { useTimer } from 'react-timer-hook';
import BigLayout from '../components/BigLayout';
import DisplayBigTime from '../components/DisplayBigTime';
import { taskLevelList } from '../components/inputTodo';
import useTodos from '../hooks/useTodos';
import { formatTimeFromSeconds } from '../utils/index.utils';

export default function Rest({ activeTodo }: { activeTodo: Todo }) {
	return (
		<BigLayout icon={IconZzz} headingText="Istirahat duluuu">
			{!activeTodo.startRestAt ? (
				<StartRest activeTodo={activeTodo} />
			) : (
				<Timer activeTodo={activeTodo} />
			)}
		</BigLayout>
	);
}

function StartRest({ activeTodo }: { activeTodo: Todo }) {
	const Todos = useTodos();
	const level = taskLevelList.find((e) => e.key == activeTodo.level)!;

	const startHandler = () => {
		Todos.update(activeTodo.id, {
			startRestAt: new Date(),
			endRestAt: moment()
				.add(activeTodo.duration! * level.value, 'second')
				.toDate(),
		});
	};

	return (
		<VStack align="start" w="lg" spacing="3">
			<Heading alignSelf="center">Istirahat</Heading>
			<HStack fontSize="lg" fontWeight="500">
				<Icon as={IconCheckbox} boxSize="1.3em" />
				<Text>{activeTodo.name}</Text>
			</HStack>
			<TableContainer w="full" bg="white" rounded="md" shadow="xs">
				<Table>
					<Thead bg="gray.100">
						<Tr>
							<Th>Mulai</Th>
							<Th>Selesai</Th>
							<Th>Durasi</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td py="3">
								{moment(activeTodo.startAt).format('HH:mm')}
							</Td>
							<Td py="3">
								{moment(activeTodo.completedAt).format('HH:mm')}
							</Td>
							<Td py="3">
								{formatTimeFromSeconds(activeTodo.duration!)}
							</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
			<Alert status="info" variant="left-accent" rounded="md" p="2">
				<Circle bg="blue.200" p="2" mr="3">
					<Icon as={IconZzz} color="blue.600" />
				</Circle>
				<Text fontWeight="600">
					Waktu Istirahat :{' '}
					{formatTimeFromSeconds(activeTodo.duration! * level.value)}
				</Text>
				<Spacer />
				<Tag>{level.name}</Tag>
			</Alert>

			<Button
				mt="4"
				leftIcon={<IconZzz />}
				children={'Mulai Istirahat'}
				variant="outline"
				colorScheme="green"
				w="full"
				onClick={startHandler}
			/>
		</VStack>
	);
}

function Timer({ activeTodo }: { activeTodo: Todo }) {
	const Todos = useTodos();

	const onExpire = () => {
		Todos.update(activeTodo.id, {
			endRestAt: new Date(),
			allCompleteAt: new Date(),
		});
	};

	const { seconds, minutes, hours, days } = useTimer({
		expiryTimestamp: new Date(activeTodo.endRestAt!),
		autoStart: true,
		onExpire,
	});

	return (
		<DisplayBigTime
			title={activeTodo.name}
			subtitle={`Selesai pada pukul ${moment(activeTodo.endRestAt).format('HH:mm')}`} // prettier-ignore
			endTaskHandler={onExpire}
			timeObj={{
				seconds,
				minutes,
				hours,
				days,
			}}
		/>
	);
}

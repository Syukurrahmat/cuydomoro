import {
	Box,
	Container,
	Heading,
	HStack,
	Icon,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Text,
	Popover,
	VStack,
} from '@chakra-ui/react';
import InputTodo from '../components/inputTodo';
import QueueTodos from '../components/queueTodos';
import { IconTimeline } from '@tabler/icons-react';
import useTodos from '../hooks/useTodos';
import moment from 'moment';

export default function App() {
	return (
		<Container maxW="container.md" py="4">
			<Box mb="4">
				<Heading size="lg">Cuymodoro</Heading>
				<Text mt="1" fontSize="sm">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				</Text>
			</Box>
			<VStack align="stretch" spacing="4">
				<InputTodo />
				<QueueTodos />
				<Timeline />
			</VStack>
		</Container>
	);
}

const isInDate = (todo: Todo, date: Date = new Date()) => {
	const { completedAt, startAt, startRestAt, endRestAt } = todo;

	const isToday = (dateToCheck: Date) =>
		moment(dateToCheck).startOf('day').isSame(moment(date).startOf('day'));

	return startAt && completedAt && (isToday(startAt) || isToday(completedAt));
};

const getMinMaxDates = (todos: Todo[]) => {
	const dates: Date[] = [];

	todos.forEach((todo) => {
		if (todo.startAt) dates.push(todo.startAt);
		if (todo.completedAt) dates.push(todo.completedAt);
		if (todo.startRestAt) dates.push(todo.startRestAt);
		if (todo.endRestAt) dates.push(todo.endRestAt);
		if (todo.allCompleteAt) dates.push(todo.allCompleteAt);
	});

	if (dates.length === 0) return { minDate: null, maxDate: null };

	const minDate = Math.min(...dates.map((date) => new Date(date).getTime()));
	const maxDate = Math.max(...dates.map((date) => new Date(date).getTime()));

	return { minDate, maxDate };
};

function Timeline() {
	const Todo = useTodos();

	const today = Todo.findAll().filter((e) => isInDate(e));

	const { minDate, maxDate } = getMinMaxDates(today);

	return (
		<Box>
			<HStack>
				<Icon as={IconTimeline} boxSize="20px" />
				<Text fontWeight="600">Linimasa hari ini</Text>
			</HStack>
			<Box
				mt="2"
				h="0.75em"
				w="full"
				border="1px solid"
				borderColor="gray.200"
				// rounded="md"
				position="relative"
				// overflow="hidden"
			>
				{today
					.filter((e) => e.startAt && e.completedAt)
					.map((e) => ({
						start: new Date(e.startAt!).getTime(),
						end: new Date(e.completedAt!).getTime(),
					}))
					.map(({ start, end }, i) => (
						<Box
							key={i}
							bg="red.400"
							h="full"
							w={`${((end - start) / (maxDate! - minDate!)) * 100}%`}
							left={`${
								((start - minDate!) / (maxDate! - minDate!)) * 100
							}%`}
							top="0"
							bottom="0"
							mt="auto"
							mb="auto"
							position="absolute"
							_hover={{
								h: '150%',
								rounded: 'sm',
							}}
						/>
					))}
				{today
					.filter((e) => e.startRestAt && e.endRestAt)
					.map((e) => ({
						start: new Date(e.startRestAt!).getTime(),
						end: new Date(e.endRestAt!).getTime(),
					}))
					.map(({ start, end }, i) => (
						<Popover trigger="hover" key={i} >
							<PopoverTrigger>
								<Box
									bg="blue.400"
									h="full"
									w={`${
										((end - start) / (maxDate! - minDate!)) * 100
									}%`}
									left={`${
										((start - minDate!) / (maxDate! - minDate!)) * 100
									}%`}
									top="0"
									bottom="0"
									mt="auto"
									mb="auto"
									position="absolute"
									_hover={{
										h: '150%',
										rounded: 'sm',
									}}
								/>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverArrow />
								<PopoverHeader>Confirmation!</PopoverHeader>
								<PopoverBody>
									Are you sure you want to have that milkshake?
								</PopoverBody>
							</PopoverContent>
						</Popover>
					))}
			</Box>

			<pre>
				{JSON.stringify(
					// prettier-ignore
					{minDate, maxDate},
					null,
					4
				)}
			</pre>
		</Box>
	);
}

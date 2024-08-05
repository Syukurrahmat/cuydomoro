import {
	Button,
	ButtonGroup,
	Heading,
	HStack,
	Input,
	Select,
	Spacer,
	Text,
	VStack,
} from '@chakra-ui/react';
import { IconPlayerPlay, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import useTodos from '../hooks/useTodos';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

export const taskLevelList = [
	{ key: 'pemula', name: 'Pemula', value: 0.35 },
	{ key: 'mahir', name: 'Mahir', value: 0.25 },
	{ key: 'pro', name: 'Pro', value: 0.2 },
];

export default function InputTodo() {
	const [taskLevel, setTasklevel] = useLocalStorage('level', 'pemula');
	const [taskName, setTaskName] = useState('');

	const navigate = useNavigate();
	const Todos = useTodos();

	const onSubmitHandler = (e: any, startNow?: boolean) => {
		e.preventDefault();
		if (!taskName.trim()) return;

		const newTodo = Todos.create(taskName, taskLevel);
		setTaskName('');

		if (startNow) {
			setTimeout(() => {
				navigate(`./${newTodo.id}`);
			});
		}
	};

	return (
		<VStack w="full" as="form" spacing="3" py="10" onSubmit={onSubmitHandler}>
			<Heading color="gray.600">
				Tambah tugas dan mulai fokus sekarang
			</Heading>

			<VStack w="full">
				<Input
					tabIndex={1}
					size="lg"
					bg="white"
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
					placeholder="Tulis nama tugas"
				/>
				<HStack w="full">
					<Select
						tabIndex={4}
						w="fit-content"
						value={taskLevel}
						cursor="pointer"
						onChange={(e) => setTasklevel(e.target.value)}
						bg='gray.100'
					>
						{taskLevelList.map(({ key, name }) => (
							<option
								value={key}
								key={key}
								children={'Level : ' + name}
							/>
						))}
					</Select>
					<Spacer />
					<Button
						tabIndex={2}
						w="fit-content"
						type="submit"
						colorScheme="blue"
						leftIcon={<IconPlus size="18px" />}
						children="Tambah"
					/>
					<Button
						tabIndex={3}
						colorScheme="green"
						leftIcon={<IconPlayerPlay size="18px" />}
						children="Mulai"
						onClick={(e) => onSubmitHandler(e, true)}
					/>
				</HStack>
			</VStack>
		</VStack>
	);
}

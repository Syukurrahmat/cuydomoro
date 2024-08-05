import {
	Box,
	Button,
	HStack,
	Icon,
	IconButton,
	Table,
	TableContainer,
	Tag,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import {
	IconClipboardData,
	IconPlayerPlay,
	IconX
} from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';
import useTodos from '../hooks/useTodos';

export default function QueueTodos() {
	const Todos = useTodos();
	const navigate = useNavigate();
	const queue = Todos.findQueue()

	if(!queue.length) return null

	return (
		<Box>
			<HStack>
				<Icon as={IconClipboardData} boxSize="20px" />
				<Text fontWeight="600">Daftar Tugas </Text>
				<Tag>{queue.length}</Tag>
			</HStack>
			<TableContainer mt="4" bg="white" rounded="md" shadow="xs">
				<Table>
					<Thead bg="gray.100">
						<Tr>
							<Th w="full">Tugas</Th>
							<Th textAlign="center">Aksi</Th>
						</Tr>
					</Thead>
					<Tbody>
						{queue.map(({ id, name }) => (
							<Tr justifyContent="right" key={id}>
								<Td py="3" w="full">
									{name}
								</Td>

								<Td py="3">
									<Button
										size="sm"
										colorScheme="green"
										leftIcon={<IconPlayerPlay size="18px" />}
										children="Mulai"
										onClick={() => navigate(`/${id}`)}
									/>
									<IconButton
										aria-label="Hapus"
										ml="2"
										size="sm"
										colorScheme="red"
										icon={<IconX size="18px" />}
										onClick={() => Todos.destroy(id)}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
}

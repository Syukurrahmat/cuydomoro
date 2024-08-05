import {
	Divider,
	AbsoluteCenter,
	Box,
	Button,
	Heading,
	HStack,
	Icon,
	Text,
	VStack,
} from '@chakra-ui/react';

import {
	IconHome,
	IconHome2,
	IconPlayerPlay,
	IconRocket,
} from '@tabler/icons-react';
import BigLayout from '../components/BigLayout';
import useTodos from '../hooks/useTodos';
import { useNavigate } from 'react-router-dom';

export default function NextTodo() {
	const Todos = useTodos();
	const navigate = useNavigate();
	const nextTodo = Todos.findQueue()[0];

	return (
		<BigLayout icon={IconRocket} headingText="Istirahat Selesai">
			<VStack align="start" w="lg" spacing="3">
				<Heading alignSelf="center">Istirahat Selesai</Heading>
				{nextTodo && (
					<>
						<HStack>
							<Icon as={IconRocket} boxSize="1.3em" />
							<Text>Lanjut ke tugas selanjutnya</Text>
						</HStack>
						<Button
							leftIcon={<IconPlayerPlay />}
							children={nextTodo.name}
							variant="outline"
							colorScheme="green"
							w="full"
							onClick={() => {
								Todos.update(nextTodo.id, { startAt: new Date() });
								setTimeout(() => {
									navigate('/' + nextTodo.id);
								});
							}}
						/>
						<Box position="relative" py="4" w="full">
							<Divider />
							<AbsoluteCenter
								bg="white"
								px="4"
								color="gray.500"
								children="atau"
							/>
						</Box>
					</>
				)}
				<Button
					leftIcon={<IconHome2 />}
					children={'Kembali Ke Beranda'}
					variant="outline"
					colorScheme="telegram"
					w="full"
					onClick={() => navigate('/')}
				/>
			</VStack>
		</BigLayout>
	);
}

import { Box, Button, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { IconChecks, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { timeFormated } from '../utils/index.utils';

interface DisplayBigTime {
	title: string;
	subtitle: string;
	timeObj: {
		hours: number;
		days: number;
		minutes: number;
		seconds: number;
	};
	endTaskHandler: () => any;
}

export default function DisplayBigTime({
	title,
	subtitle,
	timeObj,
	endTaskHandler,
}: DisplayBigTime) {
	const { hours, days, minutes, seconds } = timeObj;
	const [isConfirmStop, setIsConfirmStop] = useState(false);

	const onEnd = () => {
		setIsConfirmStop(false);
		endTaskHandler();
	};

	return (
		<VStack flexGrow="1" w="full" justify="center">
			<Spacer />
			<Box w={{ base: 'full', md: '3xl' }} color="gray.500">
				<Text fontWeight="600" fontSize="3xl">
					{title}
				</Text>
				<Text fontWeight="400" fontStyle="italic" mt="-1" fontSize="sm">
					{subtitle}
				</Text>
			</Box>

			<Text
				fontSize={{ base: '6xl', md: '9xl', lg: '150px' }}
				w="full"
				textAlign="center"
				fontWeight="600"
				children={timeFormated(hours, days, minutes, seconds)}
			/>

			<HStack justify="end" w={{ base: 'full', md: '3xl' }}>
				{!isConfirmStop ? (
					<Button
						colorScheme="green"
						leftIcon={<IconChecks size="18" />}
						onClick={() => setIsConfirmStop(true)}
						children="Selesaikan"
					/>
				) : (
					<>
						<Button
							colorScheme="green"
							leftIcon={<IconChecks size="18px" />}
							onClick={onEnd}
							children="Ya"
						/>
						<Button
							colorScheme="gray"
							leftIcon={<IconX size="18px" />}
							onClick={() => setIsConfirmStop(false)}
							children="Tidak"
						/>
					</>
				)}
			</HStack>
			<Spacer />
			<Spacer />
		</VStack>
	);
}

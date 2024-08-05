import {
	Container,
	Heading,
	HStack,
	Icon,
	Spacer,
	VStack
} from '@chakra-ui/react';

export default function BigLayout({
	icon,
	headingText,
	children,
}: {
	icon: any;
	headingText: string;
	children: any;
}) {
	return (
		<Container as={VStack} className="container" maxW="container.full">
			<HStack color="telegram.500" alignSelf="start">
				<Icon as={icon} boxSize="32px" />
				<Heading size="lg" alignSelf="start" children={headingText} />
			</HStack>
			<VStack
				justify="center"
				flexGrow="1"
				w="full"
			>
				<Spacer />
				{children}
				<Spacer />
				<Spacer />
			</VStack>
		</Container>
	);
}

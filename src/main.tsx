import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/open-sans/700.css';
import '@fontsource/raleway/500.css';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './page/App.tsx';
import Todo from './page/Todo.tsx';

const theme = extendTheme({
 
	styles: {
		global: {
			':root': { fontSize: '15px' },
			body: { color: 'gray.700' },
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ChakraProvider theme={theme}>
		<RouterProvider
			router={createBrowserRouter([
				{ path: '/', element: <App /> },
				{ path: '/:id', element: <Todo /> },
			])}
		/>
	</ChakraProvider>
);

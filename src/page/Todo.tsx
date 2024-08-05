import moment from 'moment';
import { Navigate, useParams } from 'react-router-dom';
import useTodos from '../hooks/useTodos';
import Focus from './Focus';
import NextTodo from './NextTodo';
import Rest from './Rest';

export default function Todo() {
	const { id } = useParams();
	const Todos = useTodos();

	const activeTodo = Todos.find(parseInt(id || ''));

	if (!activeTodo) return <Navigate to="/" />;

	if (activeTodo.allCompleteAt) {
		const isExpired = moment().diff(activeTodo.allCompleteAt, 'minute') > 5;
		return isExpired ? <Navigate to="/" /> : <NextTodo />;
	}

	if (activeTodo.completedAt) return <Rest activeTodo={activeTodo} />;
	return <Focus activeTodo={activeTodo} />;
}

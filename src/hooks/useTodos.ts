import useLocalStorage from 'use-local-storage';


export default function useTodos(initial: Todo[] = []) {
    const [data, setData] = useLocalStorage<Todo[]>('data', initial);

    return {
        findAll: () => data,
        findQueue: () => data.filter((e) => !e.startAt).sort((a, b) => a.id - b.id),
        find: (id: number) => data.find((e) => e.id == id),

        create: (name: string, level : string) => {
            const newTodo: Todo = { id: new Date().getTime(), name , level};
            setData((e) => [...e!, newTodo]);
            return newTodo
        },

        destroy: (id: number) => setData((e) => e?.filter((e) => e.id !== id)),
        update: (id: number, d: Partial<Todo>) => setData((e) => e?.map((t) => t.id == id ? { ...t, ...d } : t)),
    };
}

type Todo = {
    id: number;
    name: string;
    level : string;
    duration?: number;

    startAt?: Date;
    completedAt?: Date;

    startRestAt?: Date;
    endRestAt?: Date;

    allCompleteAt ? : Date
};

export const DIFFICULTIES = [
    { value: 'EASY', label: 'Fácil' },
    { value: 'MEDIUM', label: 'Media' },
    { value: 'HARD', label: 'Difícil' },
];

export const CUISINES = ['Italiana', 'Mexicana', 'Asiática', 'Mediterránea', 'Vegetariana', 'Otra']
    .map((c) => (
        { value: c, label: c }
    ));

export const DIFFICULTY_LABELS = {
    EASY: 'Fácil',
    MEDIUM: 'Media',
    HARD: 'Difícil',
};
export const DIFFICULTIES = [
    { value: 'EASY', label: 'Fácil' },
    { value: 'MEDIUM', label: 'Media' },
    { value: 'HARD', label: 'Difícil' },
];

export const CUISINES = ['Española', 'Mexicana', 'Asiática', 'Mediterránea', 'Italiana', 'Otra']
    .map((c) => (
        { value: c, label: c }
    ));

export const DIFFICULTY_LABELS = {
    EASY: 'Fácil',
    MEDIUM: 'Media',
    HARD: 'Difícil',
};

export const TIME_RANGES = [
    { value: 'lt15', label: '≤ 15 min', maxTime: 15 },
    { value: 'lt30', label: '≤ 30 min', maxTime: 30 },
    { value: 'lt60', label: '≤ 60 min', maxTime: 60 },
    { value: 'gt60', label: '> 60 min', minTime: 61 },
];

export const ORIGINS = [
    { value: 'MANUAL', label: 'Manual' },
    { value: 'IMPORTED', label: 'Importada' },
];
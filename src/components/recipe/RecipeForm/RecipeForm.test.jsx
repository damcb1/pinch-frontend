import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeForm from './RecipeForm';

describe('RecipeForm', () => {
    it('pre-rellena el formulario con los valores iniciales (borrador importado)', () => {
        render(
            <RecipeForm
                onSubmit={vi.fn()}
                initialValues={{
                    title: 'Tarta de manzana',
                    ingredients: [{ qty: '2', unit: '', name: 'manzanas' }],
                    steps: ['Pelar las manzanas'],
                }}
            />
        );

        expect(screen.getByLabelText('Título')).toHaveValue('Tarta de manzana');
        expect(screen.getByLabelText('Nombre del ingrediente')).toHaveValue('manzanas');
    });

    it('muestra error y no envía si el título está vacío', async () => {
        const onSubmit = vi.fn();
        render(<RecipeForm onSubmit={onSubmit} />);

        await userEvent.click(screen.getByRole('button', { name: /guardar receta/i }));

        expect(await screen.findByText('El título es obligatorio')).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
    });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from './api';
import { importFromUrl, importFromText, confirmImport } from './importService';

vi.mock('./api', () => ({
    default: {
        post: vi.fn(),
        get: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}));

describe('importService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('importFromUrl llama a POST /recipes/import con la url', async () => {
        api.post.mockResolvedValue({ data: { title: 'Tarta' } });

        const result = await importFromUrl('https://blog.com/tarta');

        expect(api.post).toHaveBeenCalledWith('/recipes/import', { url: 'https://blog.com/tarta' });
        expect(result).toEqual({ title: 'Tarta' });
    });

    it('importFromText llama a POST /recipes/import/text con el texto', async () => {
        api.post.mockResolvedValue({ data: { title: 'Del caption' } });

        await importFromText('receta pegada');

        expect(api.post).toHaveBeenCalledWith('/recipes/import/text', { text: 'receta pegada' });
    });

    it('confirmImport llama a POST /recipes/import/confirm con la receta', async () => {
        const recipe = { title: 'Tarta', ingredients: [], steps: [] };
        api.post.mockResolvedValue({ data: { id: 1 } });

        const result = await confirmImport(recipe);

        expect(api.post).toHaveBeenCalledWith('/recipes/import/confirm', recipe);
        expect(result.id).toBe(1);
    });
});
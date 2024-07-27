import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DetailedCard } from '../detailed-card/DetailedCard';
import { CardItem } from '../../types';
import * as pokemonService from '../../services/pokemon';

const mockCard: CardItem = {
    name: 'Pikachu',
    description: 'An electric type Pokemon',
    sprites: {
        front_default: '',
    },
};

describe('DetailedCard', () => {
    it('renders correctly with data', async () => {
        vi.spyOn(pokemonService, 'useGetPokemonByNameQuery').mockReturnValue({
            data: { sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' } },
            error: null,
            isLoading: false,
        });

        render(<DetailedCard card={mockCard} onClose={vi.fn()} />);

        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

        const image = await screen.findByAltText('Pikachu');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png');
    });

    it('shows error message on failure', async () => {
        vi.spyOn(pokemonService, 'useGetPokemonByNameQuery').mockReturnValue({
            data: null,
            error: true,
            isLoading: false,
        });

        render(<DetailedCard card={mockCard} onClose={vi.fn()} />);

        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

        const errorMessage = await screen.findByText('Error loading image');
        expect(errorMessage).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        const onCloseMock = vi.fn();

        render(<DetailedCard card={mockCard} onClose={onCloseMock} />);

        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../../slices/selectedItemsSlice';
import { CardList } from '../card-list/CardList';
import { CardItem } from '../../types';

const mockCards: CardItem[] = [
    { name: 'Pikachu', description: 'Electric type', sprites: { front_default: '' } },
    { name: 'Bulbasaur', description: 'Grass type', sprites: { front_default: '' } },
];

const renderWithProvider = (component: React.ReactElement) => {
    const store = configureStore({ reducer: { selectedItems: selectedItemsReducer } });
    return render(<Provider store={store}>{component}</Provider>);
};

describe('CardList', () => {
    it('renders a list of cards', () => {
        renderWithProvider(<CardList cards={mockCards} onCardClick={vi.fn()} />);
        expect(screen.getByText('Pikachu')).toBeInTheDocument();
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    });

    it('handles checkbox changes correctly', () => {
        renderWithProvider(<CardList cards={mockCards} onCardClick={vi.fn()} />);
        const pikachuCheckbox = screen.getByLabelText('Pikachu');
        fireEvent.click(pikachuCheckbox);
        expect(pikachuCheckbox).toBeChecked();
        fireEvent.click(pikachuCheckbox);
        expect(pikachuCheckbox).not.toBeChecked();
    });

    it('calls onCardClick when card name is clicked', () => {
        const onCardClick = vi.fn();
        renderWithProvider(<CardList cards={mockCards} onCardClick={onCardClick} />);
        fireEvent.click(screen.getByText('Pikachu'));
        expect(onCardClick).toHaveBeenCalledWith(mockCards[0]);
    });

    it('clears all selected items when Clear All button is clicked', () => {
        renderWithProvider(<CardList cards={mockCards} onCardClick={vi.fn()} />);
        const pikachuCheckbox = screen.getByLabelText('Pikachu');
        const bulbasaurCheckbox = screen.getByLabelText('Bulbasaur');

        fireEvent.click(pikachuCheckbox);
        fireEvent.click(bulbasaurCheckbox);

        expect(pikachuCheckbox).toBeChecked();
        expect(bulbasaurCheckbox).toBeChecked();

        const clearButton = screen.getByText('Clear All');
        fireEvent.click(clearButton);

        expect(pikachuCheckbox).not.toBeChecked();
        expect(bulbasaurCheckbox).not.toBeChecked();
    });
});

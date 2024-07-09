import {ReactNode} from 'react';

export type Pokemon = {
    name: string;
    url: string;
}

export type PokemonResponse = {
    results: Pokemon[];
}
export type ResultProps = {
    children: ReactNode;
}

export type State = {
    hasError: boolean;
}
export type Props = {
    results: { name: string; description: string }[];
}
export type AppState = {
    results: { name: string; description: string }[];
    loading: boolean;
}
export type SearchProps = {
    onSearch: (term: string) => void;
    onThrowError: () => void;
}

export type SearchState = {
    searchTerm: string;
}
export type ErrorProps = {
    children: ReactNode;
}

interface ErrorState {
    hasError: boolean;
}

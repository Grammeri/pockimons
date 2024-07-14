// src/types.ts

export type CardItem = {
    name: string;
    description: string;
};

export type CardProps = {
    items: CardItem[];
};

export type CardListProps = {
    cards: CardItem[];
    onCardClick: (card: CardItem) => void;
};

export type ErrorProps = {
    children: React.ReactNode;
};

export type ErrorState = {
    hasError: boolean;
};

export type SearchProps = {
    onSearch: (searchTerm: string) => void;
    onThrowError: () => void;
};
export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};


export type CardItem = {
    name: string;
    description: string;
    sprites: {
        front_default: string;
    };
};
export type CardListProps = {
    cards: CardItem[];
    onCardClick: (card: CardItem) => void;
    sprites: {
        front_default: string;
    };
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
export type ApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: ApiResult[];
};
export type ApiResult = {
    name: string;
    url: string;
};

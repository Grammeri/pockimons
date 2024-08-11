import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Meta, Links, Outlet, ScrollRestoration, Scripts, useParams, useNavigate } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import React, { createContext, useState, useContext, useEffect, Component, useCallback } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const initialState$1 = {
  selectedItems: []
};
const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState: initialState$1,
  reducers: {
    addItem: (state, action) => {
      state.selectedItems.push(action.payload);
    },
    removeItem: (state, action) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.name !== action.payload.name
      );
    },
    clearItems: (state) => {
      state.selectedItems = [];
    }
  }
});
const { addItem, removeItem, clearItems } = selectedItemsSlice.actions;
const selectedItemsReducer = selectedItemsSlice.reducer;
const initialState = {
  items: [],
  currentPage: 1
};
const currentPageSlice = createSlice({
  name: "currentPage",
  initialState,
  reducers: {
    setPageItems: (state, action) => {
      state.items = action.payload.items;
      state.currentPage = action.payload.currentPage;
    }
  }
});
const { setPageItems } = currentPageSlice.actions;
const currentPageReducer = currentPageSlice.reducer;
const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`
    })
  })
});
const { useGetPokemonByNameQuery } = pokemonApi;
const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    selectedItems: selectedItemsReducer,
    currentPage: currentPageReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware)
});
setupListeners(store.dispatch);
const ThemeContext = createContext(void 0);
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, setTheme }, children: /* @__PURE__ */ jsx("div", { className: theme, children }) });
};
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsxs(ThemeProvider, { children: [
        /* @__PURE__ */ jsx(Outlet, {}),
        " "
      ] }) }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const searchContainer$1 = "_searchContainer_lr9jt_1";
const styles$4 = {
  searchContainer: searchContainer$1,
  "search-container": "_search-container_lr9jt_39"
};
const useSearchTerm = (key) => {
  const [searchTerms, setSearchTerms] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTerms = localStorage.getItem(key);
      const terms = storedTerms ? JSON.parse(storedTerms) : [];
      return terms;
    }
    return [];
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(searchTerms));
    }
  }, [key, searchTerms]);
  const addSearchTerm = (term) => {
    if (!searchTerms.includes(term)) {
      setSearchTerms([...searchTerms, term]);
    }
  };
  return [searchTerms, addSearchTerm];
};
const Search = ({ onSearch, onThrowError }) => {
  const [searchTerms, addSearchTerm] = useSearchTerm("searchTerms");
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(`Input change: ${event.target.value}`);
  };
  const handleSearchClick = () => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      if (!searchTerms.includes(trimmedTerm)) {
        addSearchTerm(trimmedTerm);
      }
      console.log(`Searching for term: ${trimmedTerm}`);
      onSearch(trimmedTerm);
    } else {
      onSearch("");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$4.searchContainer, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: searchTerm,
        onChange: handleInputChange,
        onKeyDown: handleKeyDown,
        placeholder: "Search"
      }
    ),
    /* @__PURE__ */ jsx("button", { onClick: handleSearchClick, children: "Search" }),
    /* @__PURE__ */ jsx("button", { onClick: onThrowError, children: "Throw Error" })
  ] });
};
const cardList = "_cardList_1ph8r_1";
const card = "_card_1ph8r_1";
const cardName = "_cardName_1ph8r_39";
const clearButton = "_clearButton_1ph8r_49";
const styles$3 = {
  cardList,
  card,
  cardName,
  clearButton,
  "clear-button": "_clear-button_1ph8r_73",
  "card-list": "_card-list_1ph8r_83"
};
const CardList = ({ cards, onCardClick }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.selectedItems.selectedItems);
  const handleCheckboxChange = (card2) => {
    if (selectedItems.some((item) => item.name === card2.name)) {
      dispatch(removeItem(card2));
    } else {
      dispatch(addItem(card2));
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$3.cardList, children: [
    cards.map((card2) => /* @__PURE__ */ jsx("div", { className: styles$3.card, children: /* @__PURE__ */ jsxs("label", { children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selectedItems.some((item) => item.name === card2.name),
          onChange: () => handleCheckboxChange(card2)
        }
      ),
      /* @__PURE__ */ jsx("span", { onClick: () => onCardClick(card2), className: styles$3.cardName, children: card2.name })
    ] }) }, card2.name)),
    /* @__PURE__ */ jsx("button", { className: styles$3.clearButton, onClick: () => dispatch(clearItems()), children: "Clear All" })
  ] });
};
const detailedCard = "_detailedCard_f17ud_1";
const styles$2 = {
  detailedCard,
  "content-wrapper": "_content-wrapper_f17ud_77"
};
const DetailedCard = ({ card: card2, onClose }) => {
  const { data, error, isLoading } = useGetPokemonByNameQuery(card2.name.toLowerCase());
  return /* @__PURE__ */ jsxs("div", { className: styles$2.detailedCard, children: [
    /* @__PURE__ */ jsx("button", { onClick: onClose, children: "Close" }),
    /* @__PURE__ */ jsx("h2", { children: card2.name }),
    /* @__PURE__ */ jsx("p", { children: card2.description }),
    isLoading ? /* @__PURE__ */ jsx("p", { children: "Loading..." }) : error ? /* @__PURE__ */ jsx("p", { children: "Error loading image" }) : /* @__PURE__ */ jsx("img", { src: (data == null ? void 0 : data.sprites.front_default) || "", alt: card2.name })
  ] });
};
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx("h1", { children: "Something went wrong." });
    }
    return this.props.children;
  }
}
const pagination = "_pagination_8nz40_1";
const paginationButton = "_paginationButton_8nz40_15";
const paginationArrow = "_paginationArrow_8nz40_15";
const active = "_active_8nz40_41";
const styles$1 = {
  pagination,
  paginationButton,
  paginationArrow,
  "pagination-button": "_pagination-button_8nz40_33",
  "pagination-arrow": "_pagination-arrow_8nz40_33",
  active
};
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const visiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);
  if (endPage - startPage < visiblePages - 1) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  return /* @__PURE__ */ jsxs("div", { className: styles$1.pagination, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: styles$1.paginationArrow,
        onClick: () => onPageChange(currentPage - 1),
        disabled: currentPage === 1,
        children: "«"
      }
    ),
    pageNumbers.map((number) => /* @__PURE__ */ jsx(
      "button",
      {
        className: `${styles$1.paginationButton} ${currentPage === number ? "active" : ""}`,
        onClick: () => onPageChange(number),
        children: number
      },
      number
    )),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: styles$1.paginationArrow,
        onClick: () => onPageChange(currentPage + 1),
        disabled: currentPage === totalPages,
        children: "»"
      }
    )
  ] });
};
const appContainer = "_appContainer_n4th3_1";
const themeSwitcher = "_themeSwitcher_n4th3_17";
const light = "_light_n4th3_37";
const dark = "_dark_n4th3_47";
const topSection = "_topSection_n4th3_57";
const flyout = "_flyout_n4th3_69";
const bottomSection = "_bottomSection_n4th3_115";
const contentWrapper = "_contentWrapper_n4th3_129";
const searchContainer = "_searchContainer_n4th3_153";
const styles = {
  appContainer,
  themeSwitcher,
  light,
  dark,
  topSection,
  flyout,
  bottomSection,
  contentWrapper,
  searchContainer
};
const useFetchData = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchData = useCallback(async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`);
      const data = await response.json();
      const items = data.results.map((item) => ({
        name: item.name,
        description: item.url,
        sprites: ""
      }));
      setResults(items);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error2) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);
  const handleSearch = async (searchTerm) => {
    if (searchTerm === "") {
      fetchData(currentPage);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      const data = await response.json();
      const item = {
        name: data.name,
        description: data.url,
        sprites: data.sprites.front_default
      };
      setResults([item]);
      setTotalPages(1);
      setCurrentPage(1);
    } catch (error2) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const throwError = () => {
    throw new Error("Test error");
  };
  return {
    results,
    loading,
    error,
    currentPage,
    totalPages,
    handleSearch,
    handlePageChange,
    throwError,
    fetchData
  };
};
const HomePage = () => {
  const { results, loading, handleSearch, throwError, currentPage, totalPages, handlePageChange, fetchData } = useFetchData();
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerms, addSearchTerm] = useSearchTerm("searchTerms");
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.selectedItems.selectedItems);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const searchTerm = Array.isArray(params.search) ? params.search[0] : params.search || "";
    if (searchTerm) {
      handleSearch(searchTerm);
    } else {
      fetchData(currentPage);
    }
  }, [params, fetchData, currentPage]);
  useEffect(() => {
    if (results.length > 0) {
      dispatch(setPageItems({ items: results, currentPage }));
    }
  }, [results, currentPage, dispatch]);
  const handleCardClick = (card2) => {
    setSelectedCard(selectedCard === card2 ? null : card2);
  };
  const handleSearchChange = (searchTerm) => {
    setSelectedCard(null);
    if (searchTerm === "") {
      fetchData(currentPage);
      navigate("/");
    } else if (searchTerms.includes(searchTerm)) {
      handleSearch(searchTerm);
      navigate(`/?search=${searchTerm}`);
    } else {
      handleSearch(searchTerm);
      addSearchTerm(searchTerm);
      navigate(`/?search=${searchTerm}`);
    }
  };
  const handlePageChangeWithSearch = (page) => {
    const searchTerm = Array.isArray(params.search) ? params.search[0] : params.search || "";
    navigate(`/?page=${page}${searchTerm ? `&search=${searchTerm}` : ""}`);
    handlePageChange(page);
  };
  const handleUnselectAll = () => {
    dispatch(clearItems());
  };
  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," + selectedItems.map((item) => `${item.name},${item.description}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedItems.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    console.log("Theme changed to:", newTheme);
  };
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-testid": "home-page-container",
      className: `${styles.appContainer} ${theme === "light" ? styles.light : styles.dark}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: styles.themeSwitcher, children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "theme", children: "Choose theme:" }),
          /* @__PURE__ */ jsxs("select", { id: "theme", onChange: handleThemeChange, value: theme, children: [
            /* @__PURE__ */ jsx("option", { value: "light", children: "Light" }),
            /* @__PURE__ */ jsx("option", { value: "dark", children: "Dark" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: styles.topSection, children: /* @__PURE__ */ jsx(Search, { onSearch: handleSearchChange, onThrowError: throwError }) }),
        /* @__PURE__ */ jsx("div", { className: styles.bottomSection, children: /* @__PURE__ */ jsxs("div", { className: styles.contentWrapper, children: [
          loading ? /* @__PURE__ */ jsx("p", { children: "Loading..." }) : /* @__PURE__ */ jsx(CardList, { cards: results, onCardClick: handleCardClick }),
          selectedCard && /* @__PURE__ */ jsx(DetailedCard, { card: selectedCard, onClose: () => setSelectedCard(null) })
        ] }) }),
        /* @__PURE__ */ jsx(Pagination, { currentPage, totalPages, onPageChange: handlePageChangeWithSearch }),
        selectedItems.length > 0 && /* @__PURE__ */ jsxs("div", { className: styles.flyout, children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Items selected: ",
            selectedItems.length
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: handleUnselectAll, children: "Unselect all" }),
          /* @__PURE__ */ jsx("button", { onClick: handleDownload, children: "Download" })
        ] })
      ]
    }
  ) });
};
function Page() {
  return /* @__PURE__ */ jsx(HomePage, {});
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DVzhYPj0.js", "imports": ["/assets/index-CyNO9vh1.js", "/assets/components-CTmqA5gd.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-C4eRjL-O.js", "imports": ["/assets/index-CyNO9vh1.js", "/assets/components-CTmqA5gd.js", "/assets/ThemeContext-D6vxlOeq.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-_zmRXxHO.js", "imports": ["/assets/index-CyNO9vh1.js", "/assets/ThemeContext-D6vxlOeq.js"], "css": ["/assets/_index-9jFvpaAg.css"] } }, "url": "/assets/manifest-a8e9de3c.js", "version": "a8e9de3c" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};

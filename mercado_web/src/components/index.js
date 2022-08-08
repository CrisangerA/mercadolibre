import dynamic from "next/dynamic";

const Breadcumbs = dynamic(() => import('./Breadcumbs'));
const SearchBar = dynamic(() => import('./Searchbar/SearchBar'));
const Typograpy = dynamic(() => import('./Typograpy'));

export { SearchBar, Typograpy, Breadcumbs };

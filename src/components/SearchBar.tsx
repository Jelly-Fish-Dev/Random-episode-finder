import type { ChangeEventHandler } from "react";

interface searchTerm{
    value: string,
    searchHandler: ChangeEventHandler,
    placeholder: string,
}

export const SearchBar = (props: searchTerm) => {
    return (
        <input
            type="Search"
            className=""
            value={props.value}
            onChange={props.searchHandler}
        />
    )
}
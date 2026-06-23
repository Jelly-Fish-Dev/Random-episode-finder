import type { ChangeEventHandler } from "react";

interface searchTerm{
    value: string,
    searchHandler: ChangeEventHandler<HTMLInputElement>,
    placeholder: string,
    onFocus?: () => void,
    onBlur?: () => void,
}

export const SearchBar = (props: searchTerm) => {
    return (
        <input
            type="Search"
            className=""
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.searchHandler}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
        />
    )
}
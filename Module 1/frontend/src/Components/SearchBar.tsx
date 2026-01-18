import { memo, useCallback, useEffect, useRef, useState } from "react";
import Cross from "../Icons/Cross";
import Search from "../Icons/Search";
import "../Style/SearchBar.css"

export function match(list: string[], key: string) {
    let res = []
    for (let i = 0; i < list.length; i++) {
        if (list[i].toLowerCase().indexOf(key.toLowerCase()) !== -1) {
            res.push(i)
        }
    }
    return res
}

interface SearchBarProps {
    array: string[],
    onChange?: (filteredArray: string[], searchedValue?: string, isSelection?: boolean) => void,
    dontProccess?: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({ array = [], onChange = () => { }, dontProccess = false }) => {
    const [active, setActive] = useState(true); // Always true
    const [searchKey, setSearchKey] = useState("");
    const [filteredResults, setFilteredResults] = useState<string[]>([]);

    const searchInputBox = useRef<HTMLInputElement>(null);

    const searchChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let searchKey = e.target.value;
        setSearchKey(searchKey);
        if (dontProccess) {
            onChange([], searchKey, false)
            return
        }
        if (searchKey.length === 0) {
            setFilteredResults([]);
            onChange(array, searchKey, false)
        } else {
            // Case-insensitive filtering
            const filtered = array.filter((item) => item.toUpperCase().indexOf(searchKey.toUpperCase()) !== -1)
            setFilteredResults(filtered);
            onChange(filtered, searchKey, false)
        }
    }, [array, onChange])

    const selectResult = (item: string) => {
        setSearchKey("");
        setFilteredResults([]);
        // setActive(false); // Removed to keep permanent
        onChange([item], item, true); // true indicates explicit selection
    }

    const searchIconClickHandler = useCallback(() => {
        if (searchInputBox.current != null) {
            // setActive(true); // Already active
            searchInputBox.current.focus()
        }
    }, [searchInputBox])

    const crossIconClickHandler = useCallback(() => {
        setSearchKey("");
        setFilteredResults([]);
        onChange(array)
        // setActive(false); // Removed to keep permanent
    }, [array, onChange])

    useEffect(() => {
        onChange(array)
    }, [array])

    return (
        <div className={"search-container" + (active ? " active" : "")}>
            <Search searchIconClickHandler={searchIconClickHandler} />
            <input className="search-input" placeholder="Search Name" value={searchKey} onChange={searchChangeHandler} ref={searchInputBox}></input>
            <Cross crossIconClickHandler={crossIconClickHandler} />

            {active && searchKey.length > 0 && filteredResults.length > 0 && (
                <div className="search-results-dropdown">
                    {filteredResults.map((item, index) => (
                        <div
                            key={index}
                            className="search-result-item"
                            onClick={() => selectResult(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default memo(SearchBar)
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { hasElement } from "../Script/util";
import "../Style/Tags.css"
import Cross from "../Icons/Cross";

const TagInput = ({
    tagList = [],
    validTags = [],
    onChange = () => { },
    onInput = () => { }
}) => {
    const [tag, setTag] = useState("")
    const [tagsList, setTagsList] = useState(tagList)
    const [showDropdown, setShowDropdown] = useState(false)

    const inputElem = useRef(null)

    useEffect(() => {
        setTagsList(tagList)
    }, [tagList])

    const tagChangeHandler = useCallback((e) => {
        onInput(e.currentTarget.value.trim())
        setTag(e.currentTarget.value.trim().toUpperCase())
        if (e.currentTarget.value.trim() === "") return
        setShowDropdown(true)
    }, [onInput])

    const addTag = useCallback((tagValue) => {
        if (tagValue === "" || tagValue.length === 0) {
            alert("Value can't be empty")
            return
        }
        if (validTags.length > 0) {
            if (!hasElement(validTags, tagValue)) {
                alert("Value not valid")
                return
            }
        }
        if (hasElement(tagList, tagValue)) {
            alert("Value already exists")
            return
        }
        onChange([...tagList, tagValue])
        setTagsList([...tagList, tagValue])
        setTag("")
    }, [tagList, validTags, onChange])

    return (
        <div style={{ position: 'relative' }}>
            <div className='tag-input-container'>
                <div className='tags-container' onClick={event => {
                    event.stopPropagation();
                    inputElem.current?.focus();
                }}>
                    {tagsList.map((tagItem, index) => (
                        <Tag
                            key={index}
                            value={tagItem}
                            onDeleteBtnClick={(e) => {
                                e.preventDefault()
                                onChange(tagList.filter(tagValue => tagValue !== tagItem))
                            }}
                        />
                    ))}
                </div>
                <input
                    ref={inputElem}
                    type="text"
                    value={tag}
                    onChange={tagChangeHandler}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            addTag(tag)
                        }
                    }}
                />
            </div>
            {validTags?.length > 0 && showDropdown && <div
                className='dropdown-list'
                style={{
                    position: 'absolute',
                    background: 'var(--containerColor)',
                    width: '100%',
                    left: 0,
                    boxSizing: 'border-box',
                    zIndex: 2,
                    borderRadius: 5,
                    transform: 'translateY(10px)',
                    boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.2)',
                    paddingTop: '0.1rem',
                    paddingBottom: '0.4rem'
                }}>
                {
                    validTags.filter(op => op.toUpperCase().includes(tag)).map((option, index) => (<div
                        key={index}
                        className='dropdown-item hoverBgEffect'
                        style={{
                            padding: '0.5rem 0.7rem',
                            cursor: 'pointer'
                        }}
                        onClick={async () => {
                            setTag(option)
                            addTag(option)
                            setShowDropdown(false);
                        }}>{option}</div>)
                    )
                }
            </div>}
        </div>
    )
}

const Tag = ({ value, onDeleteBtnClick = () => { } }) => {
    return (
        <div className="tag">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', lineHeight: 1 }}>{value}</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={onDeleteBtnClick}>
                <Cross size={15} fillColor="var(--textColor)" />
            </div>
        </div>
    )
}

export default memo(TagInput)

import Plus from "../Icons/Plus";
import "../Style/Cards.css"
import Arrow from '../Icons/Arrow'
import { memo, useCallback, useEffect, useRef, useState } from "react";
import EditIcon from "../Icons/Edit";

const Cards = ({
    cardList = [],
    cardClassName = "",
    onCardClick = () => { },
    onAddBtnClick = () => { },
    canStayActiveMultipleCards = false,
    showEditBtn = false,
    onEditBtnClick = () => { },
    onActive = () => { }
}) => {
    const [activeCards, setActiveCards] = useState([])

    const defaultCardClickHandler = useCallback((card) => {
        let newActiveCards = [...activeCards]
        if (canStayActiveMultipleCards) {
            if (activeCards.includes(card)) {
                newActiveCards = activeCards.filter(activeCard => activeCard !== card)
            } else {
                newActiveCards = [...activeCards, card]
            }
        } else {
            newActiveCards = [card]
        }
        setActiveCards(newActiveCards)
        onActive(newActiveCards)
    }, [activeCards, canStayActiveMultipleCards, onActive])

    return (
        <div className="cards-container">
            <div className={"card add " + cardClassName + " add-new"} onClick={(e) => {
                setActiveCards([])
                onAddBtnClick(e)
            }}>
                <Plus />
            </div>
            {cardList && cardList.length > 0 && cardList.map((card) => (
                <Card
                    details={card}
                    key={card}
                    className={cardClassName}
                    active={activeCards.includes(card)}
                    onClick={(card) => {
                        defaultCardClickHandler(card)
                        onCardClick(card)
                    }}
                    compressText={false}
                    showEditBtn={showEditBtn}
                    onEditBtnClick={onEditBtnClick}
                />
            ))}
        </div>
    )
}

const CardsComponent = memo(Cards)
CardsComponent.displayName = 'Cards'
export default CardsComponent

export const Card = memo(({
    details = "Sample",
    className = "",

    active = false,
    onClick = () => { },
    compressText = false,
    showEditBtn = false,
    onEditBtnClick = () => { }
}) => {
    const innerCard = (
        <div className={"card data " + className + (active ? ' active' : '')} onClick={() => onClick(details)} title={details}>
            {compressText ? (details.length > 6 ? details.slice(0, 5) + ".." : details) : details}
        </div>
    )
    return (
        (showEditBtn ? (
            <div className="card-wrapper">
                <div className="edit-btn" onClick={() => { onEditBtnClick(details) }}><EditIcon /></div>
                {innerCard}
            </div>
        ) : innerCard)
    )
})
Card.displayName = 'Card'

export const HorizentalCardsContainer = memo(({
    cardList = [],
    className = "",
    onChange = () => { },
    cardClassName = "",
    onCardClick = () => { },
    compressText,
    showEditBtn = false,
    onEditBtnClick,
    canStayActiveMultipleCards = false
}) => {
    const cardsContainer = useRef(null)
    const [showArrow, setShowArrow] = useState(false)
    const [activeCards, setActiveCards] = useState([])

    useEffect(() => {
        if (cardList.length > 0) {
            setActiveCards([cardList[0]])
            onCardClick(cardList[0])
        }
    }, [cardList, onCardClick])

    const defaultCardClickHandler = useCallback((card) => {
        let newActiveCards = [...activeCards]
        if (canStayActiveMultipleCards) {
            if (activeCards.includes(card)) {
                newActiveCards = activeCards.filter(activeCard => activeCard !== card)
            } else {
                newActiveCards = [...activeCards, card]
            }
        } else {
            newActiveCards = [card]
        }
        setActiveCards(newActiveCards)
        onChange(newActiveCards)
    }, [activeCards, canStayActiveMultipleCards, onChange])

    const showLeftArrow = useCallback(() => {
        if (cardsContainer.current == null) return
        if (cardsContainer.current.scrollLeft >= 120) {
            setShowArrow(true)
        } else {
            setShowArrow(false)
        }
    }, [])

    const horizentalCardsOnWheelHandler = useCallback((event) => {
        if (cardsContainer.current == null) return
        cardsContainer.current.scrollLeft += (event.deltaY);
        showLeftArrow()
    }, [showLeftArrow])

    const arrowClickHandler = useCallback((value) => {
        if (cardsContainer.current == null) return
        cardsContainer.current.scrollLeft += value;
        showLeftArrow()
    }, [showLeftArrow])

    return (
        <div className={'horizental-cards-container ' + className} onWheel={horizentalCardsOnWheelHandler}>
            <Arrow className="left-arrow-for-scroll arrow-for-scroll" arrowStyle={{ zIndex: (showArrow ? "1" : "-10"), width: '1.5rem', height: '1.5rem' }} arrowIconClickHandler={() => { arrowClickHandler(-125) }} />
            <div className='sub-horizental-cards-container' ref={cardsContainer}>
                {cardList && cardList.length > 0 && cardList.map((card) => {
                    return (
                        <Card
                            details={card}
                            key={card}
                            className={cardClassName}
                            active={activeCards.includes(card)}
                            onClick={() => {
                                defaultCardClickHandler(card)
                                onCardClick(card)
                            }}
                            compressText={compressText}
                            showEditBtn={showEditBtn}
                            onEditBtnClick={onEditBtnClick}
                        />
                    );
                })}
            </div>
            <Arrow className="right-arrow-for-scroll arrow-for-scroll" arrowStyle={{ width: '1.5rem', height: '1.5rem' }} arrowIconClickHandler={() => { arrowClickHandler(125) }} />
        </div>
    )
})
HorizentalCardsContainer.displayName = 'HorizentalCardsContainer'

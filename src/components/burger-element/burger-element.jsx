import styles from './burger-element.module.css';
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { moveIngredient } from "../../services/actions/ingredients-constructor";

export function BurgerElement({ element, deleteElement, id, index }) {

  const ref = useRef(null)
  const dispatch = useDispatch()

  const moveCard = (start, end) => {
    dispatch(moveIngredient(start, end))
  }

  const [, drop] = useDrop({
    accept: 'item',

    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [, drag] = useDrag({
    type: 'item',
    item: () => {
      return { id, index }
    },
  })

  drag(drop(ref))

  return (<div className={styles.listElement} key={element.id} ref={ref}>
    <DragIcon type="primary" />
    <ConstructorElement
      handleClose={() => deleteElement(element)}
      text={element.name}
      price={element.price}
      thumbnail={element.image}
    />
  </div>)
}

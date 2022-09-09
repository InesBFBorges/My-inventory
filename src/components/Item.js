import React, {useRef} from 'react';
import {TiTimesOutline} from 'react-icons/ti';
import {AiFillMinusCircle, AiFillPlusCircle} from 'react-icons/ai';


const Item = ({item, sections, inputDatalist, setSections}) => {
  const itemText = useRef(null);

  const deleteItem = () => {
    const newSections = [...sections];
    const newSection = newSections.filter(section => section.name === inputDatalist);
    const filteredList = newSection[0].list.filter(i => i.id !== item.id);
    newSection[0].list = filteredList;

    const index = newSections.findIndex(section => section.name === inputDatalist);
    newSection[index] = newSection;
    setSections(newSections);
  }

  function changeAmount(value){
    const newSections = [...sections];
    const newSection = newSections.filter(section => section.name === inputDatalist);
    let selectedItem = newSection[0].list.filter(listItem => listItem.text === itemText.current.innerHTML);
    if(selectedItem[0].quantity > 0 || value !== -1) selectedItem[0].quantity += value;
    const listIndex = newSection[0].list.findIndex(listItem => listItem.id === selectedItem[0].id);
    newSection[0].list[listIndex] = selectedItem[0];

    const index = newSections.findIndex(section => section.name === inputDatalist);
    newSection[index] = newSection;
    setSections(newSections);
  }

  return(
    <>
      <TiTimesOutline 
        id="delete-item" 
        size={25}
        onClick={deleteItem}
      />
      <p 
        id="item-text"
        ref={itemText}
      >{item.text}</p>
      <div className="amount">
        <AiFillMinusCircle 
          id="minus-amount" 
          size={25}
          onClick={() => changeAmount(-1)}
        />
        <p className="amount-text">{item.quantity}</p>
        <AiFillPlusCircle 
          id="plus-amount" 
          size={25}
          onClick={() => changeAmount(1)}
        />
      </div>
    </>
  )
}

export default Item;
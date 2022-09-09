import React, {useRef} from 'react';
import {BsPlusSquareFill} from 'react-icons/bs';
import {AiOutlineClear} from 'react-icons/ai';
import Item from './Item';
import { v4 as uuidv4 } from 'uuid';


const SectionList = (props) => {
  const inputItemName = useRef(null);

  const {
    setInputSearch,
    inputSearch,
    sections,
    setSections,
    inputDatalist,
    selectedId,
    selectedSection
  } = props;

  const inputSearchHandler = (e) => {
    setInputSearch(e.target.value);
  }

  function handleSetItem(){
    if(inputDatalist) {
      const itemName = inputItemName.current.value;
      const newSections = [...sections];
      const index = newSections.findIndex(s => s.id === selectedId);
      newSections[index].list.push({id: uuidv4(), text: itemName, quantity: 0});
      setSections(newSections);
      inputItemName.current.value="";
    }
  }

  function isValidSearchInput(){
    if(inputSearch && selectedSection[0]){
      const isItemFound = selectedSection[0].list.some(listItem => listItem.text.includes(inputSearch));
      console.log(isItemFound);
      return isItemFound;
    }
  }

  function returnItemSearched(){
    const searchedItemsList = selectedSection[0].list.filter(listItem => listItem.text.includes(inputSearch));
    console.log(searchedItemsList);
    const items = searchedItemsList.map(searchedItem => (
      <Item 
        key={searchedItem.id} 
        item={searchedItem} 
        sections={sections} 
        setSections={setSections} 
        inputDatalist={inputDatalist} 
        setSections={setSections} 
      />
    ))
    return items;
  }

  return(
    <div className="container">
      <div className="new-item-container">
        <input 
          type="text" 
          name="new-item-input" 
          id="new-item-input" 
          placeholder="New item"
          ref={inputItemName}
        />
        <BsPlusSquareFill 
          onClick={() => handleSetItem()} 
          id="plus-section-item" 
          size={35}
        />
      </div>
      <div className="search-container">
        <input 
          type="text" 
          name="search-input" 
          id="search-input" 
          placeholder="Search item"
          onChange={inputSearchHandler} 
          value={inputSearch}
        />
        <AiOutlineClear 
          id="search-section-item" 
          size={35}
          onClick={() => setInputSearch("")}
        />
      </div>
      {(inputSearch && isValidSearchInput()) && returnItemSearched()}
      {(selectedSection[0] && !isValidSearchInput()) && selectedSection[0].list.map(item => (
          <Item 
            key={item.id} 
            item={item} 
            sections={sections} 
            setSections={setSections} 
            inputDatalist={inputDatalist} 
            setSections={setSections}
          />
        ))
      }
    </div>
  )
}

export default SectionList;
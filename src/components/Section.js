import React, {useRef, useState} from 'react';
import {BsPlusCircleFill} from 'react-icons/bs';
import {FaRegTimesCircle} from 'react-icons/fa';
import Modal from "./Modal";

const Section = (props) => {
  const{
    setInputSection,
    setSections,
    sections,
    inputSection,
    setInputDatalist,
    setSelectedSection,
    selectedSection,
    // modalOpened,
    // setModalOpened
  } = props;

  const [modalOpened, setModalOpened] = useState(false);
  const inputDatalist = useRef(null);

  // const inputSectionHandler = (e) => {
  //   setInputSection(e.target.value); // Stores the input value of section in a variable
  // }

  // function sectionsHandler(e) {
  //   setSections(
  //     [...sections, {name: inputSection, list: [], id: uuidv4()}]
  //   );
  //   setInputSection("");
  // }

  function handleDeleteSection(e){
    if(inputDatalist.current.value){
      const sectionName = selectedSection[0].name;
      setSections(sections.filter(section => section.name !== sectionName));
      setSelectedSection([]);
      inputDatalist.current.value = "";
    }
  }

  function handleInputDatalistValue(){
    if(inputDatalist.current.value){
      setInputDatalist(inputDatalist.current.value);
      setSelectedSection(sections.filter(section => section.name === inputDatalist.current.value))
    }
  };

  return (
    <> 
      <div className="submit-section-container">
        {/* <div className="submit-section">
          <input 
            value={inputSection} 
            onChange={inputSectionHandler} 
            type="text" 
            name="input-section" 
            id="input-section" 
            placeholder="Enter new section"
          />
          
        </div> */}
        <BsPlusCircleFill 
          // onClick={() => sectionsHandler()} 
          onClick={() => setModalOpened(true)}
          id="plus-section-input" 
          size={40}
        />
        <input 
          type="text" 
          id="select-sections" 
          list="sections"
          ref={inputDatalist}
          onChange={handleInputDatalistValue}
          autoComplete="on"
        />
        <datalist id="sections">
          {sections && sections.map(section => {
            return <option 
              key={section.id} 
            >
              {section.name}
            </option>
          })}
        </datalist>
        <FaRegTimesCircle 
          className="delete-section" 
          size={30} 
          onClick={(e) => handleDeleteSection(e)}
        />
      </div>
      <Modal 
        opened={modalOpened} 
        setSections={setSections} 
        sections={sections} 
        setOpened={() => setModalOpened(false)} 
      />
    </>
  )
}

export default Section;
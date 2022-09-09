import React, {useState, useEffect} from 'react';
import './App.css';
import Section from './components/Section';
import SectionList from './components/SectionList';

function App() {
  const [inputName, setInputName] = useState("");
  const [sections, setSections] = useState([]);
  const [inputSection, setInputSection] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [inputDatalist, setInputDatalist] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedSection, setSelectedSection] = useState([]);
  // const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    getLocalSections();
    getLocalName();
  }, []);

  useEffect(() => {
    saveLocalSections();
  }, [sections]);

  useEffect(() => {
    saveLocalName();
  }, [inputName]);

  useEffect(() => {
    if(selectedSection[0]) {
      const isSectionNameSelected = sections.some(section => section.name === selectedSection[0].name);
      if(isSectionNameSelected) setSelectedId(selectedSection[0].id)
    }
  }, [selectedSection]);

  const saveLocalSections = () => {
    localStorage.setItem("sections", JSON.stringify(sections));
  }

  const saveLocalName = () => {
    localStorage.setItem("inventoryName", JSON.stringify(inputName));
  }

  const getLocalSections = () => {
    if(localStorage.getItem("sections") === null){
      localStorage.setItem("sections", JSON.stringify([]));
    }else{
      var localSections = JSON.parse(localStorage.getItem("sections"));
      setSections(localSections);
    }
  }

  const getLocalName = () => {
    if(localStorage.getItem("inventoryName") === null){
      localStorage.setItem("inventoryName", JSON.stringify(""));
    }else{
      var localName = JSON.parse(localStorage.getItem("inventoryName"));
      setInputName(localName);
    }
  }

  const exportJSON = (e) =>{
    var str = JSON.stringify(sections);
    var dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(str);
    e.target.href = dataUri;
  }

  const importJSON = (e) => {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      setSections(JSON.parse(contents))
    };
    reader.readAsText(file);
  }

  return (
    <div className="App">
      <header>
        <div className="title">
          <h1><input 
            value={inputName}
            type="text" 
            placeholder="Your name"
            onChange={(e) => setInputName(e.target.value)}
          /> inventory</h1>
        </div>
        <div className="export-container">
          <input onChange={importJSON} type="file" placeholder="Import"/>
          <a className='export-btn' onClick={exportJSON} href="#" download="myInventory">Export</a>
        </div>
      </header>
      <main>
        <Section 
          setInputSection={setInputSection} 
          setSections={setSections} 
          sections={sections} // Array of all the sections and its items
          inputSection={inputSection} // The input that adds a new section
          setInputDatalist={setInputDatalist} //The function to set the input datalist
          setSelectedId={setSelectedId} // The function to set the section id
          setSelectedSection={setSelectedSection}
          selectedSection={selectedSection}
          // modalOpened={modalOpened}
          // setModalOpened={() => setModalOpened(false)}
        />
        <SectionList 
          inputSearch={inputSearch} 
          setInputSearch={setInputSearch} 
          sections={sections}
          setSections={setSections}
          inputDatalist={inputDatalist}
          selectedId={selectedId}
          selectedSection={selectedSection}
        />
      </main>
      
    </div>
  );
}

export default App;

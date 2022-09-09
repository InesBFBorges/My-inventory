import React, { useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

const Modal = (props) => {
    const sectionInput = useRef(null);

    const {
        opened,
        setOpened,
        setSections,
        sections
    } = props
        
    function submitSection() {
        setSections(
            [...sections, {name: sectionInput.current.value, list: [], id: uuidv4()}]
          );
        sectionInput.current.value = "";
        setOpened();
    }

    return (
        <dialog className="dialog" open={opened}>
            <h4 className="dialog-title">Enter section name</h4>
            <input ref={sectionInput} className="dialog-input" type="text" placeholder="Section name" />

            <div className="dialog-btn-container">
                <button onClick={setOpened} className="dialog-btn-cancel" type="button">Cancel</button>
                <button onClick={submitSection} className="dialog-btn-submit" type="button">Submit</button>
            </div>
        </dialog>
    )
}

export default Modal;
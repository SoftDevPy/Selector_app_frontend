import { useState } from 'react'
import './styles.css'
const EditSelectors = ({cancelHandler, updateHandler, selectedRecord}) =>{
    const [formData, setFormData] = useState(selectedRecord)
    const inputHandler = (event) =>{
        const {name, value} = event.target
        const updatedData = {...formData, [name]:value}
        setFormData(updatedData)
    }
    const submitFormHandler = () =>{
        updateHandler(formData)
    }
console.log(formData.type)
    return (
        <div className="modal d-block" tabindex="-1" role="dialog">
            <div className="modal-dialog modal-md" role="document">
                <div className="custom-modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit Selector</h5>
                </div>
                <div className="modal-body">
                <form id="addSelectorForm" className="m-auto">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Selector Name</label>
                        <input type="text" name="name" className="form-control" id="name" onChange={inputHandler} value={formData.name} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Selector Type</label>
                        <select className="form-select" name="type" onChange={inputHandler} value={formData.type} required>
                            <option defaultValue value="">Choose Your Selector Type</option>
                            <option value="Xpath">Xpath</option>
                            <option value="Class">Class</option>
                            <option value="Id">Id</option>
                            <option value="CSS Selector">CSS Selector</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="path" className="form-label">Selector Path</label>
                        <input type="text" name="path" className="form-control" id="path" value={formData.path} onChange={inputHandler} required/>
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn  cancelBtn" onClick={cancelHandler}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={submitFormHandler}>Update</button>
                   
                </div>
                </div>
            </div>
        </div>
    )
}

export default EditSelectors

//Bootstrap - css framework that give styling mostly and components with style but not functionality

//react - you build your own component with functionality, you can add styling/component from bootstrap and add functionality
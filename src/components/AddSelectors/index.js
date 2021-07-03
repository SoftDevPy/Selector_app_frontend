import {useState} from 'react'
import {ToastProvider, useToasts } from 'react-toast-notifications'
import axios from 'axios'
import './styles.css'
/*{
    "category": "Salesforce main Login Page",
    "name": "Login Page Username",
    "path": "username",
    "type":"id"
}*/


const FormWithToasts = () =>{
    const [formData, setFormDate] = useState({})
    const { addToast } = useToasts()
    const inputHandler=(event)=>{
        const {name, value} = event.target
        const updatedData = {...formData, [name]:value}
        setFormDate(updatedData)
    }
    const submitFormHandler= (event)=>{
        event.preventDefault()
        console.log(formData)
        callServer()
        
        
    }
    const callServer=()=>{
        axios.post('https://python-selector-app.herokuapp.com/selectors', {...formData})
          .then(function (response) {
            addToast(response.data, {
                appearance: 'success',
                autoDismiss: true,
              })
            document.querySelector('form').reset()
          })
          .catch(function (error) {
              const message = error.message || 'Error Occurred !!'
            addToast(message, {
                appearance: 'error',
                autoDismiss: true,
              })
            console.log(error);
          });
        
    }
    return (
       
        <form id="addSelectorForm" className="m-auto" onSubmit={submitFormHandler}>
            <h2 className="text-center pb-5">Add Selector to Database</h2>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" name="category" id="category" onChange={inputHandler} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Selector Name</label>
                <input type="text" name="name" className="form-control" id="name" onChange={inputHandler} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="type" className="form-label">Selector Type</label>
                <select className="form-select" name="type" onChange={inputHandler} required>
                    <option defaultValue value="">Choose Your Selector Type</option>
                    <option value="Xpath">Xpath</option>
                    <option value="Class">Class</option>
                    <option value="Id">Id</option>
                    <option value="CSS Selector">CSS Selector</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="path" className="form-label">Selector Path</label>
                <input type="text" name="path" className="form-control" id="path" onChange={inputHandler} required/>
            </div>
            <div className="mb-3 text-center">
                 <button type="submit" className="btn btn-color">Submit</button>
            </div>
            
        </form>
       
    )
}

const AddSelectors = () => (
    <ToastProvider>
      <FormWithToasts />
    </ToastProvider>
  )
export default AddSelectors


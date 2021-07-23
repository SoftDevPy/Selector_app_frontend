
import {useState, useEffect} from 'react'
import {ToastProvider, useToasts } from 'react-toast-notifications'
import axios from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import SelectBox from '../SelectBox'
import EditSelectors from '../editSelectors'
import './styles.css'
const SelectorsListComponent = () =>{
    const [selectorDetails, setSelectorDetails] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [catName, setCatName] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState(null)
    const { addToast } = useToasts()
    useEffect(()=>{
        fetchAllSelectors()
        
    }, [])

    const fetchAllSelectors = () =>{
        axios.get('https://salesforce-selector-app-wn7tj.ondigitalocean.app/selectors')
        .then(function (response) {
          const {data} = response
          //setSelectorDetails([...data])
          const category = [...new Set(data.map(item=>item.category))]
          const categoryDropdown = category.map(item=>({ value: item, label: item }))
         
          setCategoryList([...categoryDropdown])
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    const selectHandler=(data)=>{
        console.log(data)
        setCatName(data.value)
        callCategoryApi(data.value)
    }

    const callCategoryApi = (categoryName) =>{
        
        axios.get(`https://salesforce-selector-app-wn7tj.ondigitalocean.app/catgetory/${categoryName}`)
        .then(function (response) {
          const {data} = response
          setSelectorDetails([...data])
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const deleteSelector = (selectorId) =>{
        axios.delete(`https://salesforce-selector-app-wn7tj.ondigitalocean.app/selectors/${selectorId}`)
        .then(function (response) {
            if(categoryList.length>1){
                callCategoryApi(catName)
            } else {
                fetchAllSelectors()
            }
            
            addToast('Address Deleted!!', {
                appearance: 'warning',
                autoDismiss: true,
              })
        })
        .catch(function (error) {
          console.error(error)
    })

  }
  const editSelectorServer = (record) =>{
    axios.put(`https://salesforce-selector-app-wn7tj.ondigitalocean.app/selector/${record.id}`,  {...record})
    .then(function (response) {
            callCategoryApi(catName)
        addToast('Updated Successfully!!', {
            appearance: 'success',
            autoDismiss: true,
          })
    })
    .catch(function (error) {
      console.error(error)
})

}


    const copyHandler = () =>{
        addToast('Address Copied!!', {
            appearance: 'success',
            autoDismiss: true,
          })
    }
    const cancelHandler = () =>{
        setShowModal(false)
        setSelectedRecord(null)
    }
    const updateHandler = (record) =>{
        editSelectorServer(record)
        setShowModal(false)
        setSelectedRecord(null)

    }
    const editHandler = (record) =>{
        setSelectedRecord(record)
        setShowModal(true)
    }
    return (
        <div>
            {showModal && <EditSelectors cancelHandler={cancelHandler} updateHandler={updateHandler} selectedRecord={selectedRecord}/>}
            <h2 className="text-center p-5">Selectors Address List</h2>
            <div className="row mb-5">
                <div className="col-4">
                     {categoryList.length?<SelectBox options={categoryList} name="category" classes="text-black" selectHandler={selectHandler} placeholder="Select your selector category"/>:null}
                </div>
            </div>
            
           {selectorDetails.length>0 ? <div className="table-responsive"> <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" className="minwidth160">Selector Category</th>
                    <th scope="col" className="minwidth160">Selector Name</th>
                    <th scope="col" className="minwidth130">Selector Type</th>
                    <th scope="col">Selector Path</th>
                    <th scope="col" className="minwidth130">Action</th>
                </tr>
            </thead>
            <tbody>
                {selectorDetails.length >0 ?selectorDetails.map((record,index)=><tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{record.category}</td>
                    <td>{record.name}</td>
                    <td>{record.type}</td>
                    <td className="path">
                   
                     <CopyToClipboard text={record.path}
                        onCopy={copyHandler}>
                        <span className="copySpan">{record.path}</span>
                     </CopyToClipboard> 
                    </td>
                    <td>
                        <button className="btn btn-sm btn-warning me-2 editBtn"  onClick={()=>editHandler(record)}>
                            Edit
                        </button>
                        <button className="btn btn-sm btn-danger deleteBtn" onClick={()=>{deleteSelector(record.id)}}>
                            Delete
                        </button>
                    </td>
                </tr>):<tr><td>No record Found</td></tr>}
            </tbody>
            </table></div>:null}
        </div>
    )
}

const SelectorsList = () => (
    <ToastProvider>
      <SelectorsListComponent />
    </ToastProvider>
  )
export default SelectorsList


import {useState, useEffect} from 'react'
import {ToastProvider, useToasts } from 'react-toast-notifications'
import axios from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import SelectBox from '../SelectBox'
import './styles.css'
const SelectorsListComponent = () =>{
    const [selectorDetails, setSelectorDetails] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [catName, setCatName] = useState('')
    const { addToast } = useToasts()
    useEffect(()=>{
        fetchAllSelectors()
        
    }, [])

    const fetchAllSelectors = () =>{
        axios.get('https://python-selector-app.herokuapp.com/selectors')
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
        
        axios.get(`https://python-selector-app.herokuapp.com/catgetory/${categoryName}`)
        .then(function (response) {
          const {data} = response
          setSelectorDetails([...data])
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const deleteSelector = (selectorId) =>{
        axios.delete(`https://python-selector-app.herokuapp.com/selector/${selectorId}`)
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

    const copyHandler = () =>{
        addToast('Address Copied!!', {
            appearance: 'success',
            autoDismiss: true,
          })
    }
    return (
        <div>
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
                        <button className="btn btn-sm btn-warning me-2">
                            Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={()=>{deleteSelector(record.id)}}>
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
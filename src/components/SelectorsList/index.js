
import {useState, useEffect} from 'react'
import axios from 'axios'

const SelectorsList = () =>{
    const [selectorDetails, setSelectorDetails] = useState([])
    useEffect(()=>{
        axios.get('https://python-selector-app.herokuapp.com/selectors')
          .then(function (response) {
            setSelectorDetails([...response.data])
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }, [])
    return (
        <div className="table-responsive">
            <h2 className="text-center p-5">Selectors List</h2>
            <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Selector Category</th>
                    <th scope="col">Selector Name</th>
                    <th scope="col">Selector Type</th>
                    <th scope="col">Selector Path</th>
                </tr>
            </thead>
            <tbody>
                {selectorDetails.length >0 ?selectorDetails.map((record,index)=><tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{record.category}</td>
                    <td>{record.name}</td>
                    <td>{record.type}</td>
                    <td>{record.path}</td>
                </tr>):<tr><td>No record Found</td></tr>}
            </tbody>
            </table>
        </div>
    )
}
export default SelectorsList
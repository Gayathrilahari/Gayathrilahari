
import React, { useState, useEffect } from 'react';
import './App.css';
import Pagination from './pagination';


function App() {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [pageSize,setPageSize]=useState(20);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');


    useEffect(() => {
        fetch('http://localhost:5000/customers')
            .then(res => res.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error:', error));
    }, []);
    const lastIndex=currentPage*pageSize;
    const firstIndex=lastIndex-pageSize;
    const currentPages=customers.slice(firstIndex,lastIndex);
    console.log(currentPages);
    
    const[search, setSearch] = useState("");
    const setSearchvalue=(e)=>{
        setSearch(e.target.value);
    }
    // const filteredCustomers = currentPages.filter(customer =>
    //     customer.customer_name.toLowerCase().includes(search.toLowerCase())
    //   );
      

      const filteredCustomers = currentPages.filter(customer =>
        customer.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        customer.location.toLowerCase().includes(search.toLowerCase())
      );
    
      const sortedCustomers = sortBy ? [...filteredCustomers].sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(a.created_at) - new Date(b.created_at);
        } else if (sortBy === 'time') {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
      }) : filteredCustomers;
    return (
        <>
        <div style={{display:'flex' ,justifyContent:'center'}}>
        <input type="text" name='search' value={search} placeholder='Search by Name/Location' onChange={setSearchvalue}></input>
        {/* <button onClick={setfilcust}></button> */}
        {/* {search} */}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        <option value="date">Date</option>
        <option value="time">Time</option>
      </select>

        </div>
        <div className='container'>
            <h1>Customers</h1>
            <table className='table'>
                <thead >
                    <tr>
                        <th >Sno</th>
                        <th >Customer Name</th>
                        <th >Age</th>
                        <th >Phone</th>
                        <th >Location</th>
                        <th colSpan={2}>Created At</th>
                        
                    </tr>
                </thead>
                <tbody >
                    {sortedCustomers.map((customer,i )=> (
                        <tr key={i}>
                            <td>{customer.sno}</td>
                            <td>{customer.customer_name}</td>
                            <td>{customer.age}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.location}</td>
                            <td>{new Date(customer.created_at).toLocaleDateString()}</td>
                            <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
            <Pagination 
             totalFields={customers.length}
             pageSize={pageSize} 
             setCurrentPage={setCurrentPage}
             currentPage={currentPage}
            />
            </div>
        </div>
        </>
    );
}

export default App;




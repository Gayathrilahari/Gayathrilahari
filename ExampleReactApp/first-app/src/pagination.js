import React from "react";

const Pagination =({totalFields,pageSize,setCurrentPage,currentPage})=>{
    let pages=[];
    for(let i=1;i<=Math.ceil(totalFields/pageSize);i++){
        console.log(i);
        pages.push(i);
    }
    console.log(pages);
    return(
        <div className="pagination">
            {
                pages.map((page,index)=>{
                    return (
                    <button key={index} onClick={()=> setCurrentPage(page)} className={page==currentPage ? 'active' : ''}>
                        {page}</button>
                );
                })
            }
            
        </div>

    )
}

export default Pagination
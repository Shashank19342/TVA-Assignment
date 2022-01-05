import React from "react";
import "./Pagination.css";

const Pagination = ({usersPerPage, totalUsers, currPage, paginate})=>{
    const pageNumbers = [];
    const maxPage = Math.ceil(totalUsers/usersPerPage);

    if(currPage>=3 && currPage<=maxPage-2){
        for(let i=currPage-2;i<=currPage+2;i++){
            pageNumbers.push(i)
        }
    }else if(currPage<3){
        for(let i=1;i<=5;i++){
            pageNumbers.push(i)
        }
    }else{
        for(let i=maxPage-4;i<=maxPage;i++){
            pageNumbers.push(i)
        }
    }

    return(
        <nav>
            <ul className="pageNumbers">
                {
                    pageNumbers.map((num)=>(
                        <li key={num} className="numbers" onClick={()=> paginate(num)} style={num===currPage?{backgroundColor: "#3f99bd"}:{}}>
                            <a>{num}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination;


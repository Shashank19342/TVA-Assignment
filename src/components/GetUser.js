import React from "react";
import "./GetUser.css";
import {useNavigate} from "react-router-dom"

const GetUsers = ({ users, loading, fnAsc, fnDsc, lnAsc, lnDsc, aAsc, aDsc, eAsc, eDsc })=>{

    const navigate = useNavigate();

    if(loading){
        return <h2>Loading...</h2>
    }

    return( <div className="table">
            <table>
                <thead>
                <tr>
                    <th className="key1">First Name <i className="fas fa-sort-up" onClick={fnAsc}></i><i className="fas fa-sort-down" onClick={fnDsc}></i></th>
                    <th className="key1">Last Name <i className="fas fa-sort-up" onClick={lnAsc}></i><i className="fas fa-sort-down" onClick={lnDsc}></i></th>
                    <th className="key1">Age <i className="fas fa-sort-up" onClick={aAsc}></i><i className="fas fa-sort-down" onClick={aDsc}></i></th>
                    <th className="key1">Email <i className="fas fa-sort-up" onClick={eAsc}></i><i className="fas fa-sort-down" onClick={eDsc}></i></th>
                    <th>Website </th>
                </tr>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <tr key={user.id}>
                            <td onClick={()=>navigate(`/id=${user.id}`)} className="firstName">{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                            <td style={{textAlign: "center"}}><a href={user.web} target="_blank">click <i className="fas fa-external-link-alt"></i></a></td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        );
}

export default GetUsers;

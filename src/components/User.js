import React,{useEffect,useState} from "react";
import "./User.css";
import axios from "axios";
import GetUsers from "./GetUser";
import Pagination from "./Pagination";

function User(){

    const[user, setuser] = useState([]);
    const[loading, setloading] = useState(false);
    const[currPage, setcurrPage] = useState(1);
    const[usersPerPage, setusersPerPage] = useState(10);
    const[searching, setsearching] = useState(false);

    const indexOfLastUser = currPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const[currUsers,setcurrUser] = useState([]);

    // Getting Data from API
    useEffect(()=>{
        setloading(true);
        axios.get("https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json").then((res)=>{
            setuser(res.data);
            setloading(false);
            setcurrUser(res.data.slice(indexOfFirstUser,indexOfLastUser));
        }).catch((err)=>console.log(err));
    }, []);

    useEffect(()=>{
        setcurrUser(user.slice(indexOfFirstUser,indexOfLastUser));
    }, [currPage]);


    // Paging
    const paginate = (pageNum)=>{
        setcurrPage(pageNum)
    };


    //  Sorting
    const fnAsc = ()=>{
        setcurrPage(1)
        const newUser = user.sort((a,b) => (a.first_name > b.first_name) ? 1 : ((b.first_name > a.first_name) ? -1 : 0))
        setcurrUser(newUser.slice(indexOfFirstUser,indexOfLastUser));
    }
    const fnDsc = ()=>{
        setcurrPage(1)
        const newUser = user.sort((a,b) => (a.first_name > b.first_name) ? -1 : ((b.first_name > a.first_name) ? 1 : 0))
        setcurrUser(newUser.slice(indexOfFirstUser,indexOfLastUser));
    }
    const lnAsc = ()=>{
        setcurrPage(1)
        const newUser = user.sort((a,b) => (a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0))
        setcurrUser(newUser.slice(indexOfFirstUser,indexOfLastUser));
    }
    const lnDsc = ()=>{
        setcurrPage(1)
        const newUser = user.sort((a,b) => (a.last_name > b.last_name) ? -1 : ((b.last_name > a.last_name) ? 1 : 0))
        setcurrUser(newUser.slice(indexOfFirstUser,indexOfLastUser));
    }
    const aAsc = ()=>{
        setcurrPage(1)
        const newUser = user.sort((a,b) => (a.age > b.age) ? 1 : ((b.age > a.age) ? -1 : 0))
        setcurrUser(newUser.slice(indexOfFirstUser,indexOfLastUser));
    }
    const aDsc = ()=>{
        setcurrPage(1)
        const newUser = user.sort((a,b) => (a.age > b.age) ? -1 : ((b.age > a.age) ? 1 : 0))
        setcurrUser(newUser.slice(indexOfFirstUser,indexOfLastUser));
    }
    const eAsc = ()=>{
        setcurrPage(1)
        const newUser = user.sort((a,b) => (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0))
        setcurrUser(newUser.slice(indexOfFirstUser,indexOfLastUser));
    }
    const eDsc = ()=>{
        setcurrPage(1)
        const newUser = user.sort((a,b) => (a.email > b.email) ? -1 : ((b.email > a.email) ? 1 : 0))
        setcurrUser(newUser.slice(indexOfFirstUser,indexOfLastUser));
    }


    // Searching

    const handleSearchByName = (e)=>{
        const searchName = e.target.value;
        setcurrPage(1);
        
        if(searchName==""){
            setsearching(false);
            const newUsers = user.slice(indexOfFirstUser,indexOfLastUser);
            setcurrUser(newUsers);
        }else{
            setsearching(true);
            const newUsers = user.filter((val)=>{
                if(val.first_name.toLowerCase().includes(searchName.toLowerCase()) || val.last_name.toLowerCase().includes(searchName.toLowerCase())){
                    return val;
                }
            })
            setcurrPage(1);
            setcurrUser(newUsers.slice(indexOfFirstUser,indexOfLastUser));
        }
    }

    return(
        <div className="user">
            <h1>Users</h1>
            <input type="search" onChange={handleSearchByName} placeholder="Search User's by First Name or Last Name" />
            <GetUsers users={currUsers} loading={loading} fnAsc={fnAsc} fnDsc={fnDsc} lnAsc={lnAsc} lnDsc={lnDsc} aAsc={aAsc} aDsc={aDsc} eAsc={eAsc} eDsc={eDsc} />
            <br />
            {
                !searching?<Pagination usersPerPage={usersPerPage} totalUsers={user.length} currPage={currPage} paginate={paginate}/>:""
            }
        </div>
    );
}

export default User;

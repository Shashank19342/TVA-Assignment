import React,{useState, useEffect} from "react";
import "./UserDetail.css";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

function UserDetail(){
    let { id } = useParams();
    const navigate = useNavigate();
    const[user,setuser] = useState([]);
    const[userDetail,setuserDetail] = useState();

    useEffect(()=>{
        axios.get("https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json").then((res)=>{
            setuser(res.data);
        }).catch((err)=>console.log(err));
    }, []);

    useEffect(()=>{
        setuserDetail(user.find((obj)=>{return (obj.id == id.substring(3))}));
    },[user])

    return(
        <div className="userDetail">
            <h1>User Details</h1>
            {
                userDetail?<div className="userInfo">
                    <div className="keys">
                        <p>First Name:</p>
                        <p>Last Name:</p>
                        <p>Company Name:</p>
                        <p>City:</p>
                        <p>State:</p>
                        <p>Zip:</p>
                        <p>Email:</p>
                        <p>Web:</p>
                        <p>Age:</p>
                    </div>
                    <div className="values">
                        <p>{userDetail.first_name}</p>
                        <p>{userDetail.last_name}</p>
                        <p>{userDetail.company_name}</p>
                        <p>{userDetail.city}</p>
                        <p>{userDetail.state}</p>
                        <p>{userDetail.zip}</p>
                        <p>{userDetail.email}</p>
                        <p><a href={userDetail.web} target="_blank"> {userDetail.web} <i className="fas fa-external-link-alt"></i></a></p>
                        <p>{userDetail.age}</p>
                    </div>
                </div>:""
            }
            <button onClick={()=>navigate("/")} className="back">Go Back</button>
        </div>
    )
}

export default UserDetail;

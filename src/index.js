import React, {useState} from "react";
import ReactDOM from "react-dom";
import './index.css';
import logo from './img/logo.jpg';
let userProfille = require("./userData");

function sortByLastName(a, b) {
    let AName = a.lastname.toUpperCase();
    let BName = b.lastname.toUpperCase();
    if(AName < BName) return -1;
    if(AName > BName) return 1;
    return 0;
}

const HeaderSite = () => {
    return (
        <div className="HeaderSite">
            <img className="Logo" src={logo}/>
            <div className="HeadText">User Profiles</div>
        </div>
    );
}

const UserButton = (props) => {
    function handleOnClick(){
        props.onClick(props.user);
    }

    const fullName = props.user.firstName + " " + props.user.lastname;
    return (
        <tr>
            <td>
                <button onClick={handleOnClick} className="UserButton">
                    {fullName}
                </button>
            </td>
        </tr>
    );
}

const InformationBlock = (props) => {
    return (
        <table className="InformationTable">
            <thead>
                <tr>
                    <th colSpan={5} align="center">Information</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th className="InformationTableTH">First Name</th>
                    <th className="InformationTableTH">Last Name</th>
                    <th className="InformationTableTH">Age</th>
                    <th className="InformationTableTH">Phone</th>
                    <th className="InformationTableTH">Role</th>
                </tr>
                <tr>
                    <td className="InformationTableTD">{props.user.firstName}</td>
                    <td className="InformationTableTD">{props.user.lastname}</td>
                    <td className="InformationTableTD">{props.user.age}</td>
                    <td className="InformationTableTD">{props.user.phone}</td>
                    <td className="InformationTableTD">{props.user.role}</td>
                </tr>
            </tbody>
        </table>
    );
}

const UserProfilesTable = (props) => {
    const rows = [];

    const users = props.users;
    users.sort(sortByLastName);
    users.forEach((user) => {
        rows.push(
            <UserButton 
            user={user}
            onClick={props.onClick} 
            key={user.id}/>
        );
    });

    return (
        <table>
            <thead>
                <tr align="center">
                    <th className="TableHeadText">User</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

const UserProfiles = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [id, setId] = useState(-1);
    const [user, setUser] = useState({id: -1, firstName: '', lastname: '', age: -1, phone: '', role: ''});

    function handleOnClick(user) {
        if(isClicked && id !== user.id) {
            setId(user.id);
            setUser(user);
        } else if(isClicked && id === user.id) {
            setIsClicked(false);
        } else if(!isClicked) {
            setIsClicked(true);
            setId(user.id);
            setUser(user);
        }
    }

    return(
        <div className="MainBlock">
            <HeaderSite />
            <br/>
            <UserProfilesTable 
            onClick={handleOnClick}
            users={props.users}/>
            <br/>
            {isClicked && <InformationBlock user={user}/>}
        </div>
    );
}

ReactDOM.render(
    <UserProfiles users={userProfille.userProfille}/>,
    document.getElementById('root')
);
import React from "react";
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

class HeaderSite extends React.Component {
    render() {
        return (
            <div className="HeaderSite">
                <img className="Logo" src={logo}/>
                <div className="HeadText">User Profiles</div>
            </div>
        );
    }
}

class UserButton extends React.Component {
    constructor(props){
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.onClick(this.props.user);
    }

    render() {
        const fullName = this.props.user.firstName + " " + this.props.user.lastname;
        return (
            <tr>
                <td>
                    <button onClick={this.handleOnClick} className="UserButton">
                        {fullName}
                    </button>
                </td>
            </tr>
        );
    }
}

class InformationBlock extends React.Component {
    render() {
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
                        <td className="InformationTableTD">{this.props.user.firstName}</td>
                        <td className="InformationTableTD">{this.props.user.lastname}</td>
                        <td className="InformationTableTD">{this.props.user.age}</td>
                        <td className="InformationTableTD">{this.props.user.phone}</td>
                        <td className="InformationTableTD">{this.props.user.role}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

class UserProfilesTable extends React.Component {
    render() {
        const rows = [];

        const users = this.props.users;
        users.sort(sortByLastName);
        users.forEach((user) => {
            rows.push(
                <UserButton 
                user={user}
                onClick={this.props.onClick} 
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
}

class UserProfiles extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.state = {
            isClicked: false,
            id: -1,
            user: {
                id: -1,
                firstName: "",
                lastname: "",
                age: -1,
                phone: "",
                role: ""
            }
        };
    }

    handleOnClick(user) {
        if(this.state.isClicked && this.state.id !== user.id){
            this.setState({
                id: user.id,
                user: user
            });
        } 
        else if(this.state.isClicked && this.state.id === user.id) {
            this.setState({
                isClicked: false
            })
        } else if(!this.state.isClicked) {
            this.setState({
                isClicked: true,
                id: user.id,
                user: user
            });
        }
    }

    render() {
        return (
            <div className="MainBlock">
                <HeaderSite />
                <br/>
                <UserProfilesTable 
                onClick={this.handleOnClick}
                users={this.props.users}/>
                <br/>
                {this.state.isClicked && <InformationBlock user={this.state.user}/>}
            </div>
        );
    }
}

ReactDOM.render(
    <UserProfiles users={userProfille.userProfille}/>,
    document.getElementById('root')
);
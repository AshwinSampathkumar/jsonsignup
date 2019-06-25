import React, { Component } from 'react';
import './App.css';
import DynamicForm from './components/DynamicForm';

class App extends Component {
  state = {
    data: [
      {id: 1, firstname:"a", lastname:"b", emailid:"abc@gmail.com", age:29, gender:"Female", maritalstatus:"Yes", membership:"Premium", mobilenumber: 9434279867},
      {id: 2, firstname:"Ashwin", lastname:"Sampath", emailid:"ashwintrix@gmail.com", age:22, gender:"Male", maritalstatus:"No", membership:"Premium", mobilenumber: 9600633462},
      {id: 3, firstname:"Vetri", lastname:"Maran", emailid:"nothing@gmail.com", age:38, gender:"Male", maritalstatus:"No",membership:"Regular", mobilenumber:6854895673}
    ],
    current: {}
  }
  onSubmit = (model) =>{
    let data = [];
    if (model.id) {
      data = this.state.data.filter((d) => {
        return d.id != model.id
      });
    } else {
      model.id = +new Date();
      data = this.state.data.slice();
    }
    
    this.setState({
      data: [model, ...data]
    });
  }
  onEdit = (id) => {
    let record = this.state.data.find((d) => {
      return d.id == id;
    });
    alert(JSON.stringify(record));
    this.setState({
      current: record
    })
  }

  render() {
    let data = this.state.data.map((d) => {
      return (
        <tr key={d.id}>
            <td>{d.firstname}</td>
            <td>{d.lastname}</td>
            <td>{d.emailid}</td>
            <td>{d.age}</td>
            <td>{d.gender}</td>
            <td>{d.mobilenumber}</td>
            <td><button onClick={()=>{this.onEdit(d.id)}}>edit</button></td>
        </tr>
      );
    });
      return (
      <div className="App">
        <DynamicForm className="form"
          title = "Registration"
          defaultValues = {this.state.current}
          model={[
            {key:"firstname",label: "FirstName", type:"text", props:{required:true}},
            {key:"lastname",label: "LastName", type:"text", props:{required:true}},
            {key:"emailid",label: "Email Address", props:{required:true}},
            {key:"age", label: "Age", type:"number"},
            {key: "gender",label:"Gender", type:"radio", options: [
              {key:"male",label:"Male",value:"Male"},
              {key:"female",label:"Female",value:"Female"},
              {key:"others",label:"Others", value:"Others"}
            ]},
            {key: "maritalstatus", label:"MaritalStatus", type:"checkbox", options:[
              {key:"yes", label:"Yes", value:"Yes"},
              {key:"no",label:"No",value:"No"}
            ]},
            {key:"membership", label:"Membership", type:"select", options:[
              {key:"normal", label:"Normal", value:"Normal"},
              {keu:"premium", label:"Premium", value:"Premium"}
            ]},
            {key:"mobilenumber", label:"Mobile Number" ,type:"number"}
          ]}
          onSubmit = {(model)=> {this.onSubmit(model)}}
          />
          <table border="1">
            <tbody>{data}</tbody>
          </table>
         
          </div>
    );
  }
  }


export default App;

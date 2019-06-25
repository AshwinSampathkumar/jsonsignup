import React from 'react';
import ReactDOM from 'react-dom';


export default class DynamicForm extends React.Component{
    state={};
    constructor(props){
        super(props);
    }
    onSubmit= (e) =>{
        e.preventDefault();
        if (this.props.onSubmit) {this.props.onSubmit(this.state);}
    }

    // onChange = (e,key) =>{
    //     this.setState({
    //         [key]: this[key].value
    //     })
    // }
    onChange = (e, key,type="single") => {
        console.log(`${key} changed ${e.target.value} type ${type}`);
        if (type === "single") {
            this.setState({
                [key]: e.target.value  
            });
        } else {
            let found = this.state[key] ?  
                            this.state[key].find ((d) => d === e.target.value) : false;
            
            if (found) {
                let data = this.state[key].filter((d) => {
                    return d !== found;
                });
                this.setState({
                    [key]: data
                });
            } else {
                this.setState({
                    [key]: [e.target.value, ...this.state[key]]
                });
            }
        }
}
    // renderForm=()=>{
    //     let model = this.props.model;
    //     let formUI = model.map((m) =>{
    //         let key =m.key;
    //         let type= m.type || "text";
    //         let props= m.props || {};
    //         return(
    //             <div key={key} className="form-group">
    //                 <label className="form-label"
    //                 key={"1" + m.key}
    //                 htmlFor={m.key}>
    //                 {m.label}
    //                 </label>
    //                 <input{...props}
    //                     ref={(key) => {this[m.key=key]}}
    //                     className="form-input"
    //                     type={type}
    //                     key={"i"+ m.key}     
    //                     onChange ={(e) => {this.onChange(e, key)}}
    //                 />

    //             </div>
    //         );
    //     });
    //     return formUI;
    // }

    renderForm = () => {
        let model = this.props.model;
        let defaultValues = this.props.defaultValues;
        
        let form = model.map((m) => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};
            let name= m.name;
            let value = m.value;

            let target = key;  
            value = this.state[target];

            let input =  <input {...props}
                    className="form-input"
                    type={type}
                    key={key}
                    name={name}
                    value={value}
                    onChange={(e)=>{this.onChange(e, target)}}
                />;

            if (type == "radio") {
               input = m.options.map((o) => {
                   let checked = o.value == value;
                    return (
                        <React.Fragment key={'fr' + o.key}>
                            <input {...props}
                                    className="form-input"
                                    type={type}
                                    key={o.key}
                                    name={o.name}
                                    checked={checked}
                                    value={o.value}
                                    onChange={(e)=>{this.onChange(e, o.name)}}
                            />
                            <label key={"ll" +o.key }>{o.label}</label>
                        </React.Fragment>
                    );
               });
               input = <div className ="form-group-radio">{input}</div>;
            }

            if (type == "select") {
                input = m.options.map((o) => {
                    let checked = o.value == value;
                    console.log("select: ", o.value, value);
                     return (
                            <option {...props}
                                className="form-input"
                                key={o.key}
                                value={o.value}
                            >{o.value}</option>
                     );
                });

                console.log("Select default: ", value);
                input = <select value={value} onChange={(e)=>{this.onChange(e, m.key)}}>{input}</select>;
             }

             if (type == "checkbox") {
                input = m.options.map((o) => {
                    let checked = false;
                    if (value && value.length > 0) {
                        checked = value.indexOf(o.value) > -1 ? true: false;
                    }
                    console.log("Checkbox: ",checked);
                     return (
                        <React.Fragment key={"cfr" + o.key}>
                            <input {...props}
                                className="form-input"
                                type={type}
                                key={o.key}
                                name={o.name}
                                checked={checked}
                                value={o.value}
                                onChange={(e)=>{this.onChange(e, m.key,"multiple")}}
                            />
                            <label key={"ll" +o.key }>{o.label}</label>
                        </React.Fragment>
                     );
                });

                input = <div className ="form-group-checkbox">{input}</div>;

             }
            
            return (
                <div key={'g' + key} className="form-group">
                    <label className="form-label"
                        key={"l" + key}
                        htmlFor={key}>
                        {m.label}
                    </label>
                    {input}
                </div>
            );
        });
        return form;
}
    render(){
        let title = this.props.title || "Dynamic Form";
        return(
            <div className={this.props.className}>
                <h3>{title}</h3>
                <form className="dynamic-form" onSubmit={(e) =>{this.onSubmit(e)}}>
                    {this.renderForm()}
                    <div className="form-group">
                        <button type="submit">submit</button>

                    </div>
                </form>
            </div>
        )
    }
}
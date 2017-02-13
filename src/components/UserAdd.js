import React, {Component} from 'react';

class UserAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form:{
        name:{
          valid:false,
          value:'',
          error:''
        },
        age:{
          valid: false,
          value:0,
          error:''
        },
        gender:{
          valid:false,
          value: '',
          error:''
        }
      }
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const {form: {name, age, gender}} = this.state;
    if(!(name.valid && !age.valid && gender.valid)){
      alert('你的输入不正确');
      return;
    }
    fetch('http://localhost:4000/user', {
      method:'post',
      body: JSON.stringify({name: name.value, age: age.value, gender: gender.value}),
      headers:{'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then(res => {
        if(res.id) {
          alert('success');
          this.setState({
            name:'',
            age:0,
            gender:''
          })
        } else {
          alert('failed');
        }
      })
      .catch(err => console.log(err));
  }

  handleValueChange(type, value, target) {
    let currentValue = value;
    if(target) {
      currentValue = Number(currentValue) || 0;
    }
    const {form} = this.state;
    const obj = {value:currentValue, valid:true, error:''}
    switch(type) {
      case 'name':
        if(value.length >= 5) {
          obj.error = '用户名最多4个字符';
          obj.valid = false;
        } else if(!value.trim().length) {
          obj.error = '请输入用户名';
          obj.valid = false;
        }
        break;
      case 'age': 
        if(value > 100 || value <=0) {
          obj.error = '请输入1~100之间的整数'
          obj.valid = false;
        }
        break;
      case 'gender':
        if(!value) {
          obj.error = '请选择性别';
          obj.valid = false;
        }
        break;
      default:break;
    }
    this.setState({
      form:{
        ...form,
        [type]:obj
      }
    });
  }

  render(){
    const {form: {name, age, gender}} = this.state;
    return (
      <div>
        <h2>添加用户</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>name</label>
          <input onChange={e => this.handleValueChange('name', e.target.value)} value={name.value}/>
          {!name.valid && (<span>{name.error}</span>)}
          <br/>
          <label>age</label>
          <input onChange={e => this.handleValueChange('age', e.target.value, true)} value={age.value}/>
          {!age.valid && (<span>{age.error}</span>)}
          <br/>
          <label>gender</label>
          <select onChange={e => this.handleValueChange('gender', e.target.value)} value={gender.value}>
            <option value="">请选择</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select> 
          {!gender.valid && (<span>{gender.error}</span>)}
          <br/>
          <button>add</button>
        </form>
      </div>
    );
  }
}

export default UserAdd;

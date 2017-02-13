import React, {Component} from 'react';

class UserAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      age:0,
      gender:''
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const {name, age, gender} = this.state;
    fetch('http://localhost:4000/user', {
      method:'post',
      body: JSON.stringify({name, age, gender}),
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
      currentValue = Number(currentValue);
    }
    this.setState({
      [type]:currentValue
    });
  }

  render(){
    return (
      <div>
        <h2>添加用户</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>name</label>
          <input onChange={e => this.handleValueChange('name', e.target.value)} value={this.state.name}/> <br/>
          <label>age</label>
          <input onChange={e => this.handleValueChange('age', e.target.value, true)} value={this.state.age}/> <br/>
          <label>gender</label>
          <select onChange={e => this.handleValueChange('gender', e.target.value)} value={this.state.gender}>
            <option value="">请选择</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select> <br/>
          <button>add</button>
        </form>
      </div>
    );
  }
}

export default UserAdd;

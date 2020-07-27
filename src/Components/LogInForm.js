import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
class LogInForm extends Component {
    state = { 
        newUser: false,
        username: "",
        password: "",
        confirmation: ""
     }

     handleChange = (event) => 
     this.setState({
         [event.target.name]: event.target.value 
     })

     handleNewUserSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:3001/api/v1/users", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: {
                username: this.state.username,
                password: this.state.password,
                interests: ""
                }
            })
            })
            .then(resp => resp.json())
            .then(user => console.log(user))
            
     }

     handleReturningUserSubmit = (event) => {
         event.preventDefault()

     }

    //  renderLogin = () => {
    //     const { username, password } = this.state;
    //     return (
    //         <>
    //             <input name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
    //             <input name="password" placeholder="Password" type="password" value={password} onChange={this.handleChange}/>
    //         </>
    //     )
    // }


    // renderSignup = () => {
    //     const { username, password, name, confirmation } = this.state;
    //     return (
    //         <>
    //             <input name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
    //             <input name="password" placeholder="Password" type="password" value={password} onChange={this.handleChange}/>
    //             <input name="confirmation" placeholder="Confirm Password"  type="password" value={confirmation} onChange={this.handleChange}/>
    //         </>
    //     )
    // }

     
    render() { 
        return ( 
            <Container className="log-in-page" fluid>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Title>Sign Up Nerd!</Card.Title>
                            <Card.Body>
                                <form className='new-form' onSubmit={this.handleNewUserSubmit}>
                                <input name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                                <input name="password" placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange}/>
                                <input name="confirmation" placeholder="Confirm Password"  type="password" value={this.state.confirmation} onChange={this.handleChange}/>
                                <button type="submit">Submit</button>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Title>Returning Reader? Log In!</Card.Title>
                            <Card.Body>
                            <form className='return-form' onSubmit={this.handleReturningUserSubmit}>
                            <input name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                            <input name="password" placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange}/>
                            <button type="submit">Submit</button>
                            </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
         );
    }
}
 
export default LogInForm;
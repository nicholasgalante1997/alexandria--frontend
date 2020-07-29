import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const resetForm = {
    username: "",
    password: "",
    confirmation: ""
}

class LogInForm extends Component {
    state = { 
        username: "",
        password: "",
        confirmation: "",
        currentUser: "",
        retUsername: "",
        retPassword: ""
     }

     handleChange = (event) => 
     this.setState({
         [event.target.name]: event.target.value 
     })

     handleNewUserSubmit = (event) => {
        event.preventDefault()
        if (this.state.password === this.state.confirmation) {
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
            .then(user => {this.props.setCurrentUser(user)
                this.setState(resetForm)
                this.props.history.push('/bookstore')}) 
            } else {
                alert('these passwords dont match! reader!')
            }      
     }

     handleReturningUserSubmit = (event) => {
        event.preventDefault()
        const user = [...this.props.users].find(user => (user.username === this.state.retUsername && user.password === this.state.retPassword))
        if (user === undefined) {
            alert('incorrect login sir/miss!')
        } else {
            this.props.setCurrentUser(user)
            this.setState(resetForm)
            this.props.history.push('/bookstore')
        }
     }

     
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
                            <input name="retUsername" placeholder="Username" value={this.state.retUsername} onChange={this.handleChange}/>
                            <input name="retPassword" placeholder="Password" type="password" value={this.state.retPassword} onChange={this.handleChange}/>
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
import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'


export default function Login() {
    const peselRef = useRef()
    const passwdRef = useRef()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const {login} =useAuth()
    const history = useHistory()
    async function handleSubmit(e)
    {
        e.preventDefault()
        setLoading(true)
        try {
            setError('')
            let signed = await login(peselRef.current.value, passwdRef.current.value)
            if (!signed)
            {
                setError('Unable to connect. Please try again later.')
            }
            else
            {
                setLoading(false)
                history.push("/")
            }
        } catch{
            setError('Failed to log in. Check your PESEL and Password')
        }

        setLoading(false)

    }



    return (
        <div style={{maxWidth: 400, display:'flex', flexDirection:'column'}}>
            <Card style={{minWidth: 400}}>
                <Card.Body>
                    <h2 className = "text-center mb-4">Log In</h2>
                    <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group id="name">
                            <Form.Label>PESEL</Form.Label>
                            <Form.Control type="text"  maxLength='11' minLength='1' pattern="[0-9]*" ref={peselRef} required/>
                        </Form.Group>
                        <Form.Group id="passwd">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwdRef} required/>
                        </Form.Group>
                        <Button className = "w-100" type="submit"> Log In </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className = "w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up!</Link>
            </div>
        </div>
    )
}

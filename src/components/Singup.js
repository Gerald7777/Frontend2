import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

export default function Singup() {
    const nameRef = useRef()
    const peselRef = useRef()
    const passwdRef = useRef()
    const passwdConfirmRef = useRef()
    const facilityRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    

    async function handleSubmit(e)
    {
        e.preventDefault()
        setLoading(true)
        if (passwdRef.current.value!==passwdConfirmRef.current.value)
        {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            let signed = await signup(nameRef.current.value, peselRef.current.value, passwdRef.current.value, facilityRef.current.value)
            if (!signed)
            {
                setError('Unable to register. Please try again later.')
            }
            else
            {
                setLoading(false)
                history.push("/login")
            }
        } catch{
            setError('Failed to sign up')
        }
        setLoading(false)   
    }



    return (
        <div style={{maxWidth: 400}}>
            <Card style={{minWidth: 400}}>
                <Card.Body>
                    <h2 className = "text-center mb-4">Register</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={nameRef}  required/>
                        </Form.Group>
                        <Form.Group id="pesel">
                            <Form.Label>PESEL</Form.Label>
                            <Form.Control type="text" maxLength='11' minLength='11' pattern="[0-9]*" ref={peselRef}  required/>
                        </Form.Group>
                        <Form.Group id="passwd">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwdRef}  required/>
                        </Form.Group>
                        <Form.Group id="passwdConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwdConfirmRef}  required/>
                        </Form.Group>
                        <Form.Group id="facility">
                            <Form.Label>Facility code - Ask your Doctor</Form.Label>
                            <Form.Control type="text" pattern="[0-9]*" ref={facilityRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit"> Sign Up </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className = "w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In!</Link>
            </div>
        </div>
    )
}

import React, {useRef, useState, useEffect} from 'react'
import {Button, Card, Form} from "react-bootstrap";
import {useAuth} from "../../contexts/AuthContext";
import jwt_decode from 'jwt-decode'
import {useHistory} from 'react-router-dom'
//import {Table} from "@material"




export class BedAssignPopup extends React.Component
    {
      async onCancel()
      {
         this.props.setPopup(false)
      }
      async onConfirm()
      {
         await this.props.assignBed(this.props.bedID, "95042704155")
         this.props.setPopup(false)

      }
      

      render()
      {
         console.log("rendering")

         return( 
         <div style={{position: "fixed", width: "100vw", height: "100vh", top:0, left: 0, right: 0, bottom: 0, margin: "auto", background: "rgba(0,0,0, 0.5)", display:"flex", justifyContent: "center", alignItems: "center", alignContent: "center"}}>
            <Card style={{width:400, height:"auto", margin:"auto", marginTop:"auto"}}>
               <Card.Body>
                  <h1>Assigning bed:<br/> </h1><h3>{this.props.bedID}</h3> <h1>To PESEL: </h1>
                  <Button onClick = {this.onConfirm.bind(this)}>Confirm</Button>
                  <Button onClick = {this.onCancel.bind(this)}>Cancel</Button>
                  
               </Card.Body>
            </Card>
         </div>
         )
         /*
        return (
            <div style={{position: "fixed", width: "100%", height: "100%", top: "0", left: "0", right: "0", bottom: "0", margin: "auto", backgroundcolor: "rgba(0,0,0, 0.5)", display:"flex", justifycontent: "center", alignitems: "center"}}>
                <Card style={{width:"400", height:"200", margins:"auto", display: "flex", justifycontent: "center", alignitems: "center"}}>
                    <Card.Body>
                        <h1>Assigning bed: {this.props.bedID} To PESEL: </h1>
                        <Form>
                           <Form.Body>
                              <Form.Control ref = {this.props.peselRef} maxLength='11' minLength='11' pattern="[0-9]*"> </Form.Control>
                              <Button onClick = {this.onConfirm}>Confirm</Button>
                              <Button onClick = {this.onCancel}>Cancel</Button>
                           </Form.Body>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
         )

         */
        }

      }

      
      
      export class ConfirmPopup extends React.Component
    {
      async onCancel()
      {
         this.props.setPopup(false)
      }
      

      render()
      {
         console.log("rendering")

         return( 
         <div style={{position: "fixed", width: "100vw", height: "100vh", top:0, left: 0, right: 0, bottom: 0, margin: "auto", background: "rgba(0,0,0, 0.5)", display:"flex", justifyContent: "center", alignItems: "center", alignContent: "center"}}>
            <Card style={{width:400, height:"auto", margin:"auto", marginTop:"auto"}}>
               <Card.Body>
                  <h3>{this.props.massage} {this.props.bedID}</h3>
                  <Button className="w-100" onClick = {this.props.onConfirm.bind(this)}>Confirm</Button>
                  <Button className="w-100" onClick = {this.onCancel.bind(this)}>Cancel</Button>
                  
               </Card.Body>
            </Card>
         </div>
         )
         /*
        return (
            <div style={{position: "fixed", width: "100%", height: "100%", top: "0", left: "0", right: "0", bottom: "0", margin: "auto", backgroundcolor: "rgba(0,0,0, 0.5)", display:"flex", justifycontent: "center", alignitems: "center"}}>
                <Card style={{width:"400", height:"200", margins:"auto", display: "flex", justifycontent: "center", alignitems: "center"}}>
                    <Card.Body>
                        <h1>Assigning bed: {this.props.bedID} To PESEL: </h1>
                        <Form>
                           <Form.Body>
                              <Form.Control ref = {this.props.peselRef} maxLength='11' minLength='11' pattern="[0-9]*"> </Form.Control>
                              <Button onClick = {this.onConfirm}>Confirm</Button>
                              <Button onClick = {this.onCancel}>Cancel</Button>
                           </Form.Body>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
         )

         */
        }

      }







export default function Doctor() {

    const {getBeds} = useAuth()
    const {getPatients} = useAuth()
    const {assignBed} = useAuth()
    const {currentUser} = useAuth()
    const {logout} = useAuth()
    const [beds,setBeds] = useState([])
    const [patients,setPatients] = useState([])
    const [popup, setPopup] = useState(false)
    const [confirmPopup, setConfirmPopup] = useState(false)
    const [bedID, setBedID] = useState("")
    const [confirmMass, setConfirmMass] = useState("")
    const [confirmFunction, setConfirmFunction] = useState()
    const history = useHistory()
    const patientRef = useRef()

    function logoutHandle(e)
    {
        e.preventDefault()
        logout()
        history.push('/login')
        return

    }

    
function fetchBeds() {
    getBeds().then(res => {
        setBeds(res)
    })
}




function fetchPatients(){
            getPatients().then(res => {
                setPatients(res)
            })

}
    useEffect( () => { fetchPatients() }, [ ] );
    useEffect( () => { fetchBeds() }, [ ] );


    async function handleAssign(bed, input)
    {
          try {
              //setError('')
              let signed = await assignBed(bed, input)
              if (!signed)
              {
                  //setError('Unable to connect. Please try again later.')
              }
          } catch{
              //setError('Failed to log in. Check your PESEL and Password')
          }

  
     }
    

    function renderBeds() {
      return beds.map((bed, index) => {
         const { _id, type, patientpesel } = bed //destructuring
         if (patientpesel === "")
         {
             //bed rdy to be assigned                
             return (
               <tr key={_id}>
                  <td>{_id}</td>
                  <td>{type}</td>
                  <td>{"Empty"}</td>
                  <td><Button onClick={()=>{
                     setBedID(_id)
                     setPopup(true)
                      
                   }} >Assign</Button></td>
   
               </tr>
            )
            
         }
         else if (patientpesel === "Pending")
         {
             //bed in cleaning
             return (
               <tr key={_id}>
                  <td>{_id}</td>
                  <td>{type}</td>
                  <td>Pending</td>
                  <td><Button onClick={()=>{
                     setBedID(_id)
                     setConfirmPopup(true)
                     setConfirmMass("Do you want to mark bed as cleaned: \n"+{bedID})
                     setConfirmFunction(()=>{
                        handleAssign(bedID, "")
                        setConfirmPopup(false)
                     })
                  }} >Cleaned</Button></td>
   
               </tr>
            )
         }
         else
         {
             //bed ocupied
             return (
               <tr key={_id}>
                  <td>{_id}</td>
                  <td>{type}</td>
                  <td>{patientpesel}</td>
                  <td><Button onClick={()=>{
                     setBedID(_id)
                     setConfirmPopup(true)
                     setConfirmMass("Do you want to free bed with id: \n"+{bedID})
                     setConfirmFunction(()=>
                     {
                        handleAssign(bedID, "Pending")
                        setConfirmPopup(false)
                  
                  })
                  }} >Free</Button></td>
   
               </tr>
            )
         }
      })
    }

   function renderPatients() {
      return patients.map((patients, index) => {
         const { PESEL, name } = patients //destructuring
         return (
            <tr key={PESEL}>
               <td>{PESEL}</td>
               <td>{name}</td>


            </tr>
         )
      })
   }

   



   const userData = jwt_decode(currentUser.token);

      return (
         
         <div style={{position:'relative', top:20, minWidth:'90%', minHeight:'90%', background:'#000000', display:'flex', justifyContent:'center'}}>
               <Card style={{minHeight: '90%', minWidth:'90%'}}>
                    <div style={{display: 'flex', flexDirection:'row'}}>
                        <h1>Welcome, {userData.name} </h1>
                        
                        <Button style={{width:100, height:50, margin:'auto'}} onClick={logoutHandle}> Log Out </Button>
                    </div>
                    <Card>
                           <h1 id='title'>Beds</h1>
                           <table id='students'>
                              <tbody>
                                 {renderBeds()}

                              </tbody>
                           </table>
                     </Card>
                     <Card>
                           <h1 id='title'>Patients</h1>
                           <table id='students'>
                              <tbody>
                                 {renderPatients()}
                              </tbody>
                           </table> 
                     </Card>
               </Card>
               {popup===true ? <BedAssignPopup setPopup = {setPopup} bedID = {bedID} assignBed = {handleAssign}/> : null}
               {confirmPopup===true ? <ConfirmPopup massage = {confirmMass} onConfirm={confirmFunction}   setPopup = {setConfirmPopup} bedID = {bedID}/> : null}
         </div>
      )



}
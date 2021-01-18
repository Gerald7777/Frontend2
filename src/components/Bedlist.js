import React, {useState, TextField, useRef, useEffect} from 'react'
import {Button,Card} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'

 
export default function Bedlist() {
    const {currentUser} = useAuth()
    const {getBeds} = useAuth()
    const [Beds, setBeds] = useState()
    useEffect(() => {fetchBeds()}, [])
    const [popup, setPopup] = useState(false);
    var asigningBed;
    /*
    async function bedAssignPopup (bedId)
    {
        const patPesel = useRef();

        return (
            <div style={{position: "fixed", width: "100vh", height: "100vh", top: "0", left: "0", right: "0", bottom: "0", margin: "auto", backgroundcolor: "rgba(0,0,0, 0.5)", display:"flex", justifycontent: "center", alignitems: "center"}}>
                <Card style={{width:"400", height:"200", margins:"auto", display: "flex", justifycontent: "center", alignitems: "center"}}>
                    <Card.Body>
                        <h1>Assigning bed: <br/> {bedID}<br/> To PESEL: <br/></h1>
                        <TextField ref = {patPesel} maxLength='11' minLength='11' pattern="[0-9]*"> </TextField> <br/>
                        
                    </Card.Body>
                </Card>
            </div>
            )
    }
    */
    function fetchBeds()
    {
        getBeds().then(res => {setBeds(res)})
        
    }
    function bedRender(bed)
    {
        var buttonstr = "";
        var onclickfunc;

        if (bed.patientpesel == ""||bed.patientpesel == "Empty")
        {
            //bed rdy to be assigned
            bed.patientpesel = "Empty"
            buttonstr = "Assign"
            onclickfunc = {function() {

            }}
        }
        else if (bed.patientpesel == "Pending")
        {
            //bed in cleaning
            buttonstr = "Cleaned"
        }
        else
        {
            //bed ocupied
            buttonstr = "Free"
        }

        return (
        <tr>
            <td>{bed._id}</td><td>{bed.type}</td><td>{bed.patientpesel}</td><td><Button >{buttonstr}</Button></td>
        </tr>
        )
    }





    console.log("tutaj")
    console.log(Beds)


    return(
    <div>
        <table style="width:90%">
            <tr>
                <th>ID</th><th>Type</th><th>User PESEL</th><th></th>
            </tr>
            {Beds.map(bed => { 
                return bedRender(bed);
            })}
        </table>
        
    </div>
    )
    //{popup ? bedAssignPopup(asigningBed) : null}
}

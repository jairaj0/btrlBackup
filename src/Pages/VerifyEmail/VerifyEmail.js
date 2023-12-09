import React,{useEffect , useState} from 'react'
import { sendRequest } from '../../Helper/helper';
import Failed from '../InfoPages/Failed/Failed';
import NoteFound from '../InfoPages/NotFound/NotFound';
import Success from '../InfoPages/Success/Success';

const VerifyEmail = () => {
    const [response, setResponse] = useState()

    useEffect(() => {
      (async () => {
        const hash = window.location.pathname.split("/")[2];
        const res = await sendRequest({"email_verify_hash":hash} , "verify-email" , "post");
        res.status === 200 ? setResponse('success') : res.status === 402 ? setResponse('fail') : res.status === 403 ? setResponse("not-found"): setResponse("nothing");
      })()
    }, [])
  return (
    (response === 'success') ? <Success /> : response === "fail" ? <Failed /> : response === "not-found" ? <NoteFound /> : <div></div>
  )
}

export default VerifyEmail
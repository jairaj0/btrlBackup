import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
const siteKey = "6Lcfp98UAAAAABziyJiLnVGGv8JVsntezK67XicF";

const ReCaptcha = ({checkCaptcha}) => {

    const recaptchaRef = React.createRef();
    const onChange = (value) =>{
        // checkCaptcha(value)
        const recaptchaValue = recaptchaRef.current.getValue();
        console.log(recaptchaValue)
        checkCaptcha(recaptchaValue)
  this.props.onSubmit(recaptchaValue);
      }
  return (
    <ReCAPTCHA
    ref={recaptchaRef}
    sitekey={siteKey}
    onChange={onChange}
  />
  )
}

export default ReCaptcha
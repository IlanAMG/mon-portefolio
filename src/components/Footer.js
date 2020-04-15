import React, {useState} from 'react'
import emailjs from 'emailjs-com'

export const Footer = () => {
    const initial_form = {
        user_name: "", 
        user_email: "",
        user_tel: "",
        message: ""
    }

    const [state, setState] = useState(initial_form)

     var service_id = "default_service";
     var template_id = "template_18JlHl4M";
     var user_id = "user_mIxa9YDPzwWE77Da7IeXu";

    const sendEmail = async (e) => {
        e.preventDefault();

        await emailjs.send(service_id, template_id, state, user_id)
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
        
        setState(initial_form)
      }

    return (
        <div className='footer'>
            <div className='container-titre-footer'>
                <h6>Voulez-vous <font>travailler</font> avec moi <font>?</font></h6>
                <span>Écrivez en remplissant le formulaire ci-dessous ou sur <font><a href="mailto:ilanamzallag.dev@gmail.com">ilanamzallag.dev@gmail.com</a></font></span>
            </div>
            <form className='container-input-footer' onSubmit={sendEmail}>
                <div className="wrapper-input">
                    <input onChange={e => setState({...state, user_name: e.target.value})} value={state.user_name} placeholder='Nom et prénom' type="text" name="user_name" required/>
                    <input onChange={e => setState({...state, user_email: e.target.value})} value={state.user_email} placeholder='Adresse e-mail' type="email" name="user_email" required/>
                    <input onChange={e => setState({...state, user_tel: e.target.value})} value={state.user_tel} placeholder='Numéro de téléphone' type="tel" name="user_tel" />
                </div>
                <textarea onChange={e => setState({...state, message: e.target.value})} value={state.message} placeholder='Votre message ...' name="message" cols="30" rows="10" required></textarea>
                <div className='wrapper-btn'>
                    <button className='button'>Envoyer</button>
                </div>
            </form>
            <div className='container-copyright-footer'>
                <span>Developed and designed</span>
                <span>By Ilan Amzallag</span>
                <span>&copy; Copyright All right reserved 2020</span>
            </div>
        </div>
    )
}

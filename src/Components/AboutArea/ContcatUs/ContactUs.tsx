import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import "./ContactUs.css";
import { Clear, ContactMail, Send } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ContactModel from "../../../Models/ContactDetailsModel";
import { useNavigate } from "react-router-dom";
import contactUsService from "../../../Service/ContactUsService";
import notifyService from "../../../Service/NotifyService";
import appConfig from "../../../Utils/AppConfig";

function ContactUs(): JSX.Element {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    function send(contact: ContactModel): void {
        contactUsService.addContactMessage(contact)
            .then(() => {
                notifyService.success("Thank you for getting in touch!")
                navigate(-1);
            })
            .catch(err => notifyService.error(err));

    }

    return (
        <div className="ContactUs">
            <Typography variant="h3">
                Contact Us &nbsp;
                <ContactMail fontSize="large" />
            </Typography>

            <form onSubmit={handleSubmit(send)}>
                <TextField label="Name" type="text" className="TextBox" {...register("name")} />
                <TextField label="Email" type="email" className="TextBox" {...register("email")} />
                <TextField label="Message" type="textarea" className="TextBox" {...register("message")} />

                <FormControlLabel control={<Checkbox />} label="Send me promotional emails" className="Left" />

                <ButtonGroup>
                    <Button color="primary" type="submit">Send &nbsp; <Send /></Button>
                    <Button color="secondary" type="reset">Clear &nbsp; <Clear /></Button>
                </ButtonGroup>

            </form>
        </div>
    );
}

export default ContactUs;

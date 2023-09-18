import axios from "axios";
import ContactDetailsModel from "../Models/ContactDetailsModel";
import appConfig from "../Utils/AppConfig";

class ContactUsService {
    public async addContactMessage(details: ContactDetailsModel): Promise<void> {
        await axios.post(appConfig.contactUsUrl, details);
    }
}

const contactUsService = new ContactUsService();

export default contactUsService;
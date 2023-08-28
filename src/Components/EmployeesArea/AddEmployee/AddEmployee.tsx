import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import EmployeeModel from "../../../Models/EmployeeModel";
import employeesService from "../../../Service/EmployeesService";
import notifyService from "../../../Service/NotifyService";
import appConfig from "../../../Utils/AppConfig";
import useImagePreview from "../../../Utils/UseImagePreview";
import "./AddEmployee.css";

function AddEmployee(): JSX.Element {

    const { register, handleSubmit } = useForm<EmployeeModel>();

    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState<File | null>(null);

    const previewSrc = useImagePreview(imageFile);

    function handleImage(e: any) {
        const files = e.target.files;
        if (!files || !files.item(0)) return;

        setImageFile(files?.item(0));
    }


    async function send(employee: EmployeeModel) {

        employee.image = (employee?.image as unknown as FileList)[0];

        console.log(employee)
        try {
            notifyService.success(`Employee added successfully`);

            await employeesService.addEmployee(employee);

            navigate(appConfig.employeesRoute);

        } catch (err) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddEmployee">
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>First Name</label>
                <input type="text" {...register("firstName")} required minLength={2} />

                <label>Last Name</label>
                <input type="text" {...register("lastName")} required minLength={2} />

                <label>Title</label>
                <input type="text" {...register("title")} required />

                <label>City</label>
                <input type="text" {...register("city")} required />

                <label>Country</label>
                <input type="text" {...register("country")} required />

                <label>Birthday</label>
                <input type="date" {...register("birthDate")} required max="2020-01-01" min="1980-01-01" />

                <div className="uploadImage">
                    <label>Image</label>
                    <input type="file" accept="images/*" {...register("image")} onChange={handleImage} />
                    <img src={previewSrc} />
                </div>

                <button>Add</button>
            </form>
        </div>
    );
}

export default AddEmployee;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeModel from "../../../Models/EmployeeModel";
import employeesService from "../../../Service/EmployeesService";
import notifyService from "../../../Service/NotifyService";
import appConfig from "../../../Utils/AppConfig";
import useImagePreview from "../../../Utils/UseImagePreview";
import "./EditEmployee.css";

function EditEmployee(): JSX.Element {

    // Form functions

    const { register, handleSubmit, setValue } = useForm<EmployeeModel>();

    // Redirect after success
    const navigate = useNavigate();

    // get employeeId from url
    const params = useParams();
    const id = +params.employeeId;


    // In order to show image from Be
    const [imageSrc, setImageSrc] = useState<string>("");

    // handle uploaded image preview
    const [imageFile, setImageFile] = useState<File | null>(null);

    const previewSrc = useImagePreview(imageFile);

    function handleImage(e: any) {
        const files = e.target.files;
        if (!files || !files.item(0)) return;

        setImageFile(files?.item(0));
    }

    useEffect(() => {
        employeesService.getOneEmployee(id).then(beEmployee => {
            setValue("firstName", beEmployee?.firstName);
            setValue("lastName", beEmployee?.lastName);
            setValue("title", beEmployee?.title);
            setValue("city", beEmployee?.city);
            setValue("country", beEmployee?.country);
            setValue("birthDate", beEmployee.birthDate);
            // setValue("imageName", beEmployee.imageName);

            setImageSrc(appConfig.employeesImagesUrl + beEmployee.imageName);
        }).catch(err => notifyService.error(err))
    }, []);

    async function update(employee: EmployeeModel) {
        employee.image = (employee?.image as unknown as FileList)[0];
        employee.id = id;

        try {

            await employeesService.updateEmployee(employee);

            notifyService.success(`Employee ${id} updated successfully`);

            navigate(appConfig.employeesRoute);

        } catch (err) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditEmployee">
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit(update)}>
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
                    <img src={previewSrc || imageSrc} />
                </div>

                <button>Update</button>
            </form>
        </div>
    );
}

export default EditEmployee;

import { useEffect, useState } from "react";

function useImagePreview(imageFile: File | null) {
    const [previewSrc, setPreviewSrc] = useState<string>("");

    useEffect(() => {
        if (!imageFile) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewSrc(reader.result as string);
        };

        reader.readAsDataURL(imageFile);
    }, [imageFile]);

    return previewSrc;
}

export default useImagePreview;
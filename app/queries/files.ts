import { supabase } from "@/app/lib/supabaseClient";

interface fileUpload {
    file: File,
    fileList: fileListItem[]
}

interface fileListItem {
    uid: String,
    type: String,
    thumbUrl: String,
    size: number,
    originFileObj: File,
    name: String,
    lastModified: number,
    lastModifiedDate: any,
}

export async function uploadImage(fileUploaded: fileUpload) {
    if (fileUploaded) {
        const {file} = fileUploaded
        const fileExt = file.name.split(".").pop();
    
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
        const bucketName = 'sapo'
        const filePath = `${bucketName}_${fileName}`;
    
        const { error } = await supabase.storage
            .from(bucketName)
            .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        });
    
        if (error) {
            return {
                success: false,
                data: {},
                error: error
            };
        }
    
        const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    
        return {
            success: true,
            data: {
                path: filePath,
                url: publicUrl,
            },
            error: ''
        };
    } else {
        return {
            success: false,
            data: {},
            error: 'Không thể upload ảnh lên hệ thống'
        };
    }
}

export async function deleteImage(fileUrl: string) {
    let arrUrl = fileUrl.split('/');
    const fileName = arrUrl[arrUrl.length - 1]
    const { data, error } = await supabase.storage.from("sapo").remove([fileName]);
    if (error) {
        return {
            success: false,
            error: 'Xóa ảnh thất bại'
        };
    }

    return {
        success: true,
        error: ''
    };
}

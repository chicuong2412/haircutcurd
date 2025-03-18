const customBase64Uploader = async (data) => {
    // convert file to base64 encoded
    if (data !== "") {
        let blob = await fetch(data).then((r) => {
            return r.blob();
        }).catch(() => {
            return ""
        });
        return blob;
    } else {
        return ""
    }
};

export async function getReaderBlob(data) {
    const file = data.imgSrc;
    const reader = new FileReader();
    let content;
    content = customBase64Uploader(file).then((blob) => {
        if (typeof blob === "object") {
            try {
                reader.readAsDataURL(blob);
            } catch (error) {
                return {
                    success: false
                };
            }

            return {
                reader: reader,
                success: true
            };
        } else {
            return {
                success: false
            };
        }
    })
    return content
}

export async function getContentBase64(data, callBack) {
    getReaderBlob(data).then((rp) => {
        if (rp.success) {
            rp.reader.onloadend = function () {
                callBack(data, rp.reader.result.split(",")[1]);
            }
        } else {
            callBack(data, "")
        }
    })
}
export let uploadedFile = false;

export function toggleUploadedFile() {
    !uploadedFile ? uploadedFile = true : uploadedFile = false;
}

export function checkUploadedFile(req, res, next) {

    if (!uploadedFile) {
        return res.status(403).json({error: 'Please upload a file first'})
    }

    next();
    
}
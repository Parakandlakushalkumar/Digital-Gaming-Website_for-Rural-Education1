import cloudinary from '../config/cloudinary.js';

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'assignment-submissions',
      resource_type: 'auto'
    });
    
    // Delete temporary file
    const fs = await import('fs');
    fs.unlinkSync(req.file.path);
    
    res.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        fileName: req.file.originalname,
        fileSize: req.file.size
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

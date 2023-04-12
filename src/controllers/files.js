const File = require('../models/filestore.js');

 

const uploadPage = (req, res) => {
  res.render('upload');
};

const uploadFile = async (req, res) => {
  if(!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({error: 'No files uploaded'});
  }

  const {sampleFile} = req.files;

  try{
    const newFile = new File(sampleFile);
    const doc = await newFile.save();
    return res.status(201).json({message:'File uploaded successfully',fileId: doc._id});
  } catch (err) {
    return res.status(500).json({error:'Something went wrong uploading, sorry!'});
  }
};

const retrieveFile = async (req, res) => {
  if(!req.query._id) {
    return res.status(400).json({error:'Missing FileID'});
  }

  let doc;
  try{
    doc = await File.findById(req.query._id).exec();
  } catch (err) {
    console.log(err);
    return res.status(500).json({error:'Something went wrong retrieving, sorry!'});
  }

  if(!doc) {
    return res.status(404).json({error:'File not found'});
  }

  res.set({
    'Content-Type': doc.mimetype,
    'Content-Length': doc.size,
    //Content-disposition header can do a lot of things apparently
    'Content-Disposition': `filename="${doc.name}"`,
  });

  return res.send(doc.data);
};

module.exports = {
  uploadPage,
  uploadFile,
  retrieveFile
}
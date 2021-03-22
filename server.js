require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const multer = require('multer')
const path = require('path')
const fileUpload = require('express-fileupload');
const authorize = require('./_middleware/authorize');
global.appRoot = path.resolve(__dirname);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/api', require('./controllers/users.controller'));
app.use('/api',require('./controllers/plan.controller'));
app.use('/api',require('./controllers/rd_Details.controller'));
app.use('/api',require('./controllers/transaction.controller'));
app.use('/api',require('./controllers/commission.controller'));

// global error handler
app.use(errorHandler);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/apidoc', express.static(path.join(__dirname)));
// app.use('/uploads/resumes', express.static(path.join(__dirname, '../uploads/resumes')));

//upload image

app.use(fileUpload());
app.post('/api/uploadImage', authorize(), function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.image;
    let fileName = sampleFile.name.split(".");
    fileName = fileName[0] + Date.now() + '.' + fileName[1];

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./uploads/' + fileName, function (err) {
        if (err)
            return res.status(500).send(err);
        res.send({ fileName: fileName });

    });
});


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('we are in </br>  Server listening on port ' + port), console.log("We Are in"));
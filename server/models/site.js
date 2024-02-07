const mongoose = require('mongoose');

const socialMediaSchema = mongoose.Schema({
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    tokopedia: {
        type: String,
    },
});

const Site = mongoose.model('Site', socialMediaSchema);
module.exports = { Site };

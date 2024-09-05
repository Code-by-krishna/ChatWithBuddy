const fs = require("fs");
const path = require("path");
const Users = require("../model/user");

class profiles {
    static async EditProfile(req, res, next) {
        try {
            const data = req.body;
            // console.log(data);
            if (req.file) {
                const user = await Users.findOne({ email: data.loginuserEmail });
                if (user.avatar) {
                    const oldavatar = path.join(__dirname, '..', 'uploads', user.avatar);
                    if (fs.existsSync(oldavatar)) {
                        fs.unlinkSync(oldavatar);
                    }
                }

            }

            const updateduserdata = {
                fullName: data.fullName,
                email: data.email,
                bio: data.bio,
                avatar: req.file.filename

            }
            // console.log(updateduserdata);
            // console.log(data.loginuserEmail);
            await Users.updateMany(
                { email: data.loginuserEmail },
                { $set: updateduserdata },
                { multi: true, runValidators: true }
            )
            const updateduser = await Users.findOne({
                email: data.email
            })
            console.log(updateduser.pnumber);
            return res.status(200).json({
                msg: 'User data updated successfully',
                fullName: updateduser.fullName,
                email: updateduser.email,
                bio: updateduser.bio,
                pnumber: updateduser.pnumber,
                avatar: updateduser.avatar,
            });

        } catch (err) {
            console.log("error", err);
            res.status(500).send('Server Error');
        }
    }


    static async UploadFile(req, res, next) {
        try {
            const { senderId, receiverId, conversationId } = req.body;
            if (!req.file) return res.status(400).send('No file uploaded.');

            const fileName = req.file.filename;


            res.json({ fileName });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = profiles;


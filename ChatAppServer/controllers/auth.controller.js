const twilio = require('twilio');
const bcryptjs = require("bcryptjs");
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

//User model
const Users = require("../model/user");

//Connect db
const db = require("../Db/connection");

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

class authanticateUser {
    static async registration(req, res, next) {
        try {
            // console.log(req.body);
            const { fullName, email, pnumber, password } = req.body;
            // console.log(pnumber)
            if (!fullName || !email || !password || !pnumber) {
                res.status(400).json({ msg: "These field can not be empty" });
            }
            else {
                const isAlreadyExist = await Users.findOne({ email });
                if (isAlreadyExist) {
                    res.status(400).json({ msg: "User already exist" });
                } else {
                    const otp = Math.floor(100000 + Math.random() * 900000);
                    // const newOtp = new Otps({ otp });
                    // await newOtp.save();
                    // Function to send OTP
                    function sendOtp(phoneNumber, otp) {
                        client.messages.create({
                            body: `Your OTP code is ${otp}`,
                            from: '++14255345342',
                            to: phoneNumber,
                        })
                            .then(message => console.log(`OTP sent successfully! Message SID: ${message.sid}`))
                            .catch(error => console.error('Error sending OTP:', error));
                    }
                    sendOtp(pnumber, otp);
                    const newUser = new Users({ fullName, email, pnumber });
                    bcryptjs.hash(password, 10, (err, hash) => {
                        newUser.set('password', hash);
                        // console.log(newUser);
                        newUser.save();
                        next(newUser);
                    })
                    return res.json({ otp: otp, email: email });
                }
            }
        } catch (error) {
            console.log("Error occure", error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password, generatedCaptcha, enteredCaptcha } = req.body;
            console.log(email, password, enteredCaptcha, generatedCaptcha);
            const user = await Users.findOne({
                email,
            })
            console.log(user);
            if (user?.isOTPverified === false) {
                console.log("hello")
                return res.status(400).json({ msg: 'Please verify OTP first' });
            }
            else if (enteredCaptcha !== generatedCaptcha) {
                return res.status(400).json({ msg: 'Invalid Captcha' });
            }
            else if (!email || !password) {
                res.status(400).json({ msg: "These field can not be empity" });
            } else {
                const user = await Users.findOne({ email });
                if (!user) {
                    return res.status(400).json({ msg: "user email or password is incorrect!!" });
                } else {
                    const validateUser = await bcryptjs.compare(password, user.password);
                    if (!validateUser) {
                        return res.status(400).json({ msg: "user email or password is incorrect!!" });
                    } else {
                        const payload = {
                            userId: user.id,
                            email: user.email
                        }
                        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 84600 });
                        await Users.updateOne({ _id: user._id }, {
                            $set: { token }
                        })
                        user.save();
                        const tokenValue = await Users.findOne({
                            _id: user.id
                        });
                        // console.log(tokenValue.token);
                        res.status(200).send({ user: { id: user._id, email: user.email, fullName: user.fullName }, token: tokenValue.token });
                    }
                }
            }
        } catch (error) {
            console.log("Error occure", error);
        }
    }

    static async OTPVerification(req, res, next) {
        console.log(req.body);
        const { enteredOtp, generatedOtp, email } = req.body;

        if (enteredOtp === generatedOtp) {
            await Users.updateOne(
                { email: email },
                { $set: { isOTPverified: true } }
            )

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ID,
                    pass: process.env.PASSWORD,
                },
            });

            // async..await is not allowed in global scope, must use a wrapper
            async function main(email) {
                // send mail with defined transport object
                const info = await transporter.sendMail({
                    from: '"ChatBuddy Notification" <ak8607861632@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "ChatBuddy Registration", // Subject line
                    text: "You are successfully registered to ChatBuddy ChatApp.", // plain text body
                    html: "<b>You are successfully registered to ChatBuddy ChatApp.</b>", // html body
                });

                console.log("Message sent: %s", info.messageId);
                // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
            }
            main(email);

            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    }

    static async EmailVerification(req, res, next) {
        try {
            const {email, password} = req.body;
            const isExist = await Users.findOne({ email });
            // console.log(isExist);
            if(!isExist) {
                return res.status(400).json({
                    msg: 'Enter Correct Email',
                })
            }else{
                const hashpassword = bcryptjs.hashSync(password,10); 
                console.log(hashpassword);
                await Users.updateOne({email: email},{
                    $set: { password: hashpassword }
                });
                return res.status(200).json({
                    msg: 'Password Updated Successfully!!'
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}



module.exports = authanticateUser;
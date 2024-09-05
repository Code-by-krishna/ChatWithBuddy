const Users = require("../model/user");

class Alluser {
    static async Fetchuser(req, res, next) {
        try {
            const userId = req.params.userId;
            const users = await Users.find({ _id: { $ne: userId } });
            const usersData = Promise.all(users.map(async (user) => {
                return { user: { email: user.email, fullName: user.fullName, receiverId: user._id } }
            }))
            return res.status(200).send(await usersData);
        } catch (error) {
            console.log("error", error);
        }
    }
}

module.exports = Alluser;
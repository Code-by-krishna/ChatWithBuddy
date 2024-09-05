const db = require("../Db/connection");
const Conversations = require("../model/Conversation");
const Users = require("../model/user");

class conversations {
    static async makeConversations(req, res, next) {
        try {
            const { senderId, receiverId } = req.body;
            const newConversation = new Conversations({ members: [senderId, receiverId] });
            await newConversation.save();
            return res.status(200).send("Conversation created successfully!!");
        } catch (err) {
            console.log("error", err);
        }
    }

    static async getConversations(req, res, next) {
        try {
            const userId = req.params.userId;
            const conversation = await Conversations.find({ members: { $in: [userId] } });
            const conversationUserData = Promise.all(conversation.map(async (conversation) => {
                const receiverId = conversation.members.find((member) => member !== userId);
                const user = await Users.findById(receiverId);
                return { user: { receiverId: user._id, email: user.email, fullName: user.fullName }, conversationId: conversation._id }
            }))
            return res.status(200).send(await conversationUserData);
        } catch (err) {
            console.log("error", err);
        }
    }
}

module.exports = conversations;
const Users = require("../model/user");
const Conversations = require("../model/Conversation");
const Messages = require("../model/Messages");

class messages {
    static async makeMessages(req, res, next) {
        try {
            const { conversationId, senderId, message, receiverId = '' } = req.body;
            if (!senderId || !message) return res.status(400).send("please fill all required fields");
            if (conversationId === 'new' && receiverId) {
                const newConversation = new Conversations({ members: [senderId, receiverId] });
                await newConversation.save();
                const newMessage = new Messages({ conversationId: newConversation._id, senderId, message });
                await newMessage.save();
                return res.status(200).send('Message sent successfully');
            } else if (!conversationId && !receiverId) {
                return res.status(400).send("please fill all required fields");
            }
            const newMessage = new Messages({ conversationId, senderId, message });
            await newMessage.save();
            return res.status(200).send("Message sent successfully!!");
        } catch (error) {
            console.log("error", error);
        }
    }


    static async getMessages(req, res, next) {
        try {
            const checkMessages = async (conversationId) => {
                const messages = await Messages.find({ conversationId });
                const messageUserData = Promise.all(messages.map(async (message) => {
                    const user = await Users.findById(message.senderId);
                    return { user: { id: user._id, email: user.email, fullName: user.fullName }, message: message.message }
                }))
                return res.status(200).send(await messageUserData);
            }
            const conversationId = req.params.conversationId;
            if (conversationId === 'new') {
                const checkConversation = await Conversations.find({ members: { $all: [req.query.senderId, req.query.receiverId] } })
                if (checkConversation.length > 0) {
                    checkMessages(checkConversation[0]._id);
                } else {
                    return res.status(200).json([]);
                }
            } else {
                return checkMessages(conversationId);
            }

        } catch (error) {
            console.log("error", error);
        }
    }
}

module.exports = messages;
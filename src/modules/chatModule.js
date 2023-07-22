const ChatModel = require('../models/chat');
const MessageModel = require('../models/message');
const SubscribeUserModule = require('../modules/subscribeUserModule');

const ChatModule = {
    find: async (users) => {
        try {
            const chat = await ChatModel.find({
                users: users,
            }).select('-__v');
            return { result: true, data: chat };
        } catch (error) {
            return { result: false, error: error };
        }
    },
    findById: async (data) => {
        try {
            const isSubscribe = await SubscribeUserModule.isSubscribe(data);
            if (isSubscribe.result) {
                const chat = await ChatModel.findById(data.chatId).select(
                    '-__v'
                );
                return { result: true, data: chat };
            } else {
                return { result: false, error: isSubscribe.error };
            }
        } catch (error) {
            return { result: false, error: `Чат не найден: ${error}` };
        }
    },
    sendMessage: async (data) => {
        const { users, messages } = data;
        let senderChat = await ChatModel.find({
            users: [users[0], users[1]],
        }).select('-__v');
        if (senderChat.length == 0) {
            senderChat = await ChatModel.find({
                users: [users[1], users[0]],
            }).select('-__v');
        }
        const newMessage = new MessageModel({
            author: users[0],
            text: messages,
        });
        if (senderChat.length !== 0) {
            const chatId = senderChat[0].id;
            try {
                await newMessage.save();
                await ChatModel.updateOne(
                    { id: chatId },
                    { $push: { messages: newMessage } }
                );
                return { result: true, data: 'Сообщение отправлено' };
            } catch (error) {
                return {
                    result: false,
                    error: `Сообщение не отправлено: ${error}`,
                };
            }
        } else {
            const newChat = new ChatModel({
                users: [users[0], users[1]],
                messages: newMessage,
            });
            try {
                await newMessage.save();
                await newChat.save();
                return { result: true, data: 'Новый чат создан' };
            } catch (error) {
                return {
                    result: false,
                    error: `Ошибка создания чата: ${error}`,
                };
            }
        }
    },

    readMessage: async (chatId, messId) => {
        try {
            let chat = await ChatModel.findById(chatId);
            const mess = chat.messages.find((item, index) => {
                return (item.id = messId);
            });
            mess.readAt = new Date();
            await ChatModel.findOneAndUpdate(
                {
                    id: chatId,
                },
                {
                    messages: chat.messages,
                }
            );
            return { result: true, data: chat };
        } catch (error) {
            return { result: false, error: `Сообщение не найдено` };
        }
    },

    getHistory: async (id) => {
        try {
            const chat = await ChatModel.findById(id);
            const messages = chat.messages;
            return { result: true, data: messages };
        } catch (error) {
            return { result: false, error: error };
        }
    },

    subscribe: async (data) => {
        try {
            const subscr = await SubscribeUserModule.createSubscribe(data);
            if (subscr.result) {
                return { result: true, data: subscr.data };
            } else {
                return { result: false, error: subscr.error };
            }
        } catch (error) {
            return { result: false, error: error };
        }
    },
};

module.exports = ChatModule;

const SubscribeUser = require('../models/subscribeUser');
const ChatModel = require('../models/chat');

const SubscribeUserModule = {
    create: async (item) => {
        const newSubscription = new SubscribeUser(item);
        try {
            await newSubscription.save();
            return { result: true, data: newSubscription };
        } catch (error) {
            return { result: false, error: error };
        }
    },
    createSubscribe: async (data) => {
        try {
            const userSubscription = await SubscribeUser.findOne({
                user: data.userId,
            }).select('-__v');
            if (userSubscription == null) {
                const newSubscription = new SubscribeUser({
                    user: data.userId,
                    chats: data.chatId,
                });
                try {
                    newSubscription.save();
                    return { result: true, data: newSubscription };
                } catch (error) {
                    return { result: false, error: error };
                }
            }
            if (userSubscription.length !== 0) {
                const chats = userSubscription.chats;
                const ifSubscription = chats.includes(data.chatId);
                if (!ifSubscription) {
                    await SubscribeUser.updateOne(
                        {
                            user: data.userId,
                        },
                        { $push: { chats: data.chatId } }
                    );
                }
                const chat = await ChatModel.findById(data.chatId).select(
                    '-__v'
                );
                return {
                    result: true,
                    data: chat.messages,
                };
            } else {
                const newSubscription = new SubscribeUser({
                    user: data.userId,
                    chats: data.chatId,
                });
                try {
                    newSubscription.save();
                    return { result: true, data: newSubscription };
                } catch (error) {
                    return { result: false, error: error };
                }
            }
        } catch (error) {
            return { result: false, error: error };
        }
    },

    isSubscribe: async (data) => {
        try {
            const userSubscription = await SubscribeUser.findOne({
                user: data.userId,
            });
            if (userSubscription == null) {
                return {
                    result: false,
                    error: 'Вы еще не подписаны на этот чат',
                };
            }
            if (userSubscription.length !== 0) {
                const chats = userSubscription.chats;
                const ifSubscription = chats.includes(data.chatId);
                if (!ifSubscription) {
                    return {
                        result: false,
                        error: 'Вы еще не подписаны на этот чат',
                    };
                }
                return { result: true, data: 'Вы подписаны на этот чат' };
            }
        } catch (error) {
            return { result: false, error: error };
        }
    },
};

module.exports = SubscribeUserModule;

const { schema, normalize, denormalize } = require("normalizr");

const user = new schema.Entity('users');
const chatMessage = new schema.Entity('chatMessages');
const messages = new schema.Entity('messages', {
    author: user,
    chatMessages: [chatMessage]
}, {idAttribute: 'email'});

const normalizeData = (originalData) => {
    const normalizedData = normalize(originalData, messages);
    return normalizedData;
}

const denormalizeData = (normalizedData) => {
    const denormalizedData = denormalize(normalizedData.result, messages, normalizedData.entities);
    return denormalizedData;
}

module.exports = {
    normalizeData,
    denormalizeData
}
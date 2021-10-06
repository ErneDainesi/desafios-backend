const { schema, normalize, denormalize } = require("normalizr");

const author = new schema.Entity("author", {idAttribute: 'email'});
const message = new schema.Entity("messages");
const timeAndDate = new schema.Entity("timeAndDates");
const chat = new schema.Entity("chats", {
    author,
    messages: [message],
    timeAndDate
})

const normalizeData = (originalData) => {
    const normalizedData = normalize(originalData, chat);
    return normalizedData;
}

const denormalizeData = (normalizedData) => {
    const denormalizedData = denormalize(normalizedData.result, chat, normalizedData.entities);
    return denormalizedData;
}

module.exports = {
    normalizeData,
    denormalizeData
}
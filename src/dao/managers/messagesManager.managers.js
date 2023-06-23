import { messageModels } from "../models/messagesManager.models.js";

export default class MessagesManagerDao {
  getLastMessages = async (limit = 20) => {
    try {
      const lastMessages = await messageModels.find({}).sort({ _id: -1 }).limit(limit);
      return lastMessages;
    } catch (error) {}
  };
 // recibe un mensaje como argumento y lo crea en la base de datos utilizando el modelo "messageModels"
  newMessage = async (message) => {
    try {
      await messageModels.create(message);
    } catch (error) {}
  };
}

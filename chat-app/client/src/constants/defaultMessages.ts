import { MessageData } from "../interfaces/MessageData";

export const displayMessageWhenEmptyFullDemo: MessageData = {
    role: "system",
    content: "I am your **SHPE 2023 Conference** expert. Ask me anything regarding the companies attending the conference and I will try my best to answer. I was made possible thanks to the information provided to me by the **SHPE UF Chapter**.",
};

export const displayMessageWhenEmptySimpleDemo: MessageData = {
    role: "system",
    content: "Welcome to the **SHPE 2023 Conference**. I am here to help with whatever you need.",
};

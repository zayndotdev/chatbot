import { Conversation } from "../components";

const chat = [
  { role: "user", text: "Hi there!" },
  { role: "assistant", text: "Hello! How can I help you today?" },
  { role: "user", text: "Can you tell me a joke?" },
  {
    role: "assistant",
    text: "Why don’t skeletons fight each other? Because they don’t have the guts.",
  },
  { role: "user", text: "Haha, that’s a good one." },
  { role: "assistant", text: "Glad you liked it! Want to hear another?" },
  { role: "user", text: "Yes, tell me another one." },
  {
    role: "assistant",
    text: "Why did the computer go to the doctor? Because it caught a virus!",
  },
  { role: "user", text: "😂 That’s funny. Do you know a riddle?" },
  {
    role: "assistant",
    text: "Sure! What has to be broken before you can use it?",
  },
  { role: "user", text: "Hmm… Is it an egg?" },
  { role: "assistant", text: "Correct! 🎉 Nice job." },
  { role: "user", text: "Cool! Can you give me a fun fact?" },
  {
    role: "assistant",
    text: "Did you know? Honey never spoils. Archaeologists found 3,000-year-old honey in Egyptian tombs that was still edible!",
  },
  { role: "user", text: "Wow, that’s amazing!" },
];

function Home() {
  return (
    <div>
      <Conversation chat={chat} />
    </div>
  );
}

export default Home;

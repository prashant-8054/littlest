import { useState } from "react"

export default function App() {

  const [beats, setBeats] = useState([]);
  const [myBeats, setMyBeats] = useState([]);
  const [following, setFollowing] = useState([]);
  const [customUsers, setCustomUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("feed");
  const [feedType, setFeedType] = useState("all");
  const [toast, setToast] = useState(null);

  const handlePost = ({ word, emoji, note, font, color, size}) => {
    const nb = {
      id: Date.now(),
      word,
      emoji,
      font,
      color,
      size,
      note,
      user: "you",
      time: "just now",
      reactions: { vibe: 0, empathize: 0, uplift: 0},
      userReacted: { vibe: false, empathize: false, uplift: false },
    };
    
    setBeats((prev) => [nb, ...prev]);
    setMyBeats((prev) => [...prev, { ...nb }]);
    setToast(`"${word}" ${emoji || ""} shared ✦`);
    setActiveTab("feed");
  };

  const handleReact = (beatId, key) => {
    setBeats((prev))
  }


  return (
    <h1></h1>
  );
}

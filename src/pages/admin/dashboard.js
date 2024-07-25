import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import RichTextEditor from "../../components/TextEditor/RichTextEditor";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lessons, setLessons] = useState([]);

  const handleAddLesson = async () => {
    const res = await fetch("/api/lessons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });
    if (res.ok) {
      const newLesson = await res.json();
      setLessons([...lessons, newLesson.data]);
    }
  };

  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Lesson Form */}
      <div>
        <h2>Create Lesson</h2>
        <input
          type="text"
          placeholder="Lesson Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <RichTextEditor value={description} onChange={setDescription} />
        <button onClick={handleAddLesson}>Add Lesson</button>
      </div>
      {/* Display List of Lessons */}
      <div>
        <h2>Lessons</h2>
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson._id}>{lesson.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

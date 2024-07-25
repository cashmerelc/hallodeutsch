import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Lesson() {
  const router = useRouter();
  const { id } = router.query;
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/lessons/${id}`)
        .then((res) => res.json())
        .then((data) => setLesson(data.data));
    }
  }, [id]);

  if (!lesson) return <div>Loading...</div>;

  return (
    <div>
      <h1>{lesson.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: lesson.description }}></div>
      {/* Render exercises and questions here */}
    </div>
  );
}

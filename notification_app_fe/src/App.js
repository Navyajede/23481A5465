import { useEffect, useState } from "react";
import { fetchNotifications } from "./services/notificationService";

function App() {

  const [notifications, setNotifications] =
    useState([]);

  const getPriorityScore = (notification) => {

    let score = 0;

    // Priority based on type
    if (notification.type === "placement") {
      score += 30;
    }
    else if (notification.type === "result") {
      score += 20;
    }
    else if (notification.type === "event") {
      score += 10;
    }

    // Recent notifications higher priority
    const createdTime =
      new Date(
        notification.createdAt
      ).getTime();

    const now = Date.now();

    const hours =
      (now - createdTime) /
      (1000 * 60 * 60);

    score += Math.max(0, 24 - hours);

    return score;
  };

  useEffect(() => {

    const loadNotifications =
      async () => {

      const data =
        await fetchNotifications();

      // unread notifications only
      const unread =
        data.filter(
          (n) => !n.read
        );

      // calculate score
      const scored =
        unread.map((n) => ({
          ...n,
          priorityScore:
            getPriorityScore(n),
        }));

      // sort descending
      scored.sort(
        (a, b) =>
          b.priorityScore -
          a.priorityScore
      );

      // top 10 only
      setNotifications(
        scored.slice(0, 10)
      );
    };

    loadNotifications();

  }, []);

  return (
    <div style={{ padding: 20 }}>

      <h1>Priority Inbox</h1>

      {
        notifications.map((n) => (

          <div
            key={n.id}
            style={{
              border: "1px solid gray",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >

            <h3>{n.title}</h3>

            <p>{n.message}</p>

            <small>
              Type: {n.type}
            </small>

          </div>
        ))
      }

    </div>
  );
}

export default App;
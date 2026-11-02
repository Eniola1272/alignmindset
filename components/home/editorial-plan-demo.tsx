"use client";

import { useState } from "react";
import Link from "next/link";

const INITIAL_TASKS = [
  { id: 1, text: "Complete two focused lessons", done: true },
  { id: 2, text: "Recreate one interface from scratch", done: false },
  { id: 3, text: "Share what I've learned and ask for feedback", done: false }
];

export function EditorialPlanDemo() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const doneCount = tasks.filter((t) => t.done).length;
  const progressPercent = (doneCount / tasks.length) * 100;

  return (
    <section className="plan-section" id="plan" aria-labelledby="plan-title">
      <div className="container">
        <div className="plan-top">
          <div>
            <span className="eyebrow">THE WORK BECOMES SIMPLE</span>
            <h2 id="plan-title" className="section-title">
              Your future,<br />
              <em>one week at a time.</em>
            </h2>
          </div>
          <p>
            It&apos;s easier to keep moving when the next step is clear. Here&apos;s an example of how
            one ambitious goal can become a practical 90-day plan—and what action looks like this week.
          </p>
        </div>

        <div className="plan-layout">
          {/* Left Board */}
          <div className="plan-board">
            <div className="board-top">
              <strong>YOUR PROGRESS PLAN / EXAMPLE</strong>
              <span>90-DAY OUTLOOK &nbsp; ↗</span>
            </div>

            <div className="board-name">
              <label>THE DESTINATION</label>
              <h3>Build a portfolio and become job-ready in design.</h3>
            </div>

            <div className="board-stages">
              <div className="board-stage">
                <small>DAYS 01—30</small>
                <strong>Learn the foundations</strong>
              </div>
              <div className="board-stage">
                <small>DAYS 31—60</small>
                <strong>Build real projects</strong>
              </div>
              <div className="board-stage">
                <small>DAYS 61—90</small>
                <strong>Share &amp; apply</strong>
              </div>
            </div>

            <div className="task-label">
              THIS WEEK&apos;S COMMITMENTS{" "}
              <span style={{ fontWeight: 400, letterSpacing: "normal", textTransform: "none" }}>
                · Try checking them off
              </span>
            </div>

            <div className="task-list">
              {tasks.map((task) => (
                <label key={task.id} className="task-row">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span>{task.text}</span>
                </label>
              ))}
            </div>

            <div className="progress-label">
              <span>A little progress is still progress.</span>
              <strong>{doneCount} / {tasks.length} DONE</strong>
            </div>

            <div className="progress-track" aria-label="Weekly progress">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Right Side Card */}
          <div className="plan-side">
            <div>
              <span className="eyebrow">DON&apos;T JUST PLAN TO CHANGE</span>
              <div className="enormous">
                90<span style={{ fontSize: ".27em", letterSpacing: 0 }}>d</span>
              </div>
            </div>

            <div>
              <h3>Give your ambition somewhere to go.</h3>
              <p>
                Think less about changing everything overnight. Think more about what you can build,
                practice, and prove over the next three months.
              </p>
              <Link className="text-link" href="/progress-builder?start=true">
                <span>Find your first step</span>
                <span className="arrow">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


import React, { createContext, useEffect, useState } from "react";
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, auth, authStateObserver } from "../services/firebase";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = authStateObserver((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const ref = collection(db, "users", user.uid, "tasks");
    const unsub = onSnapshot(ref, snap => {
      setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [user]);

  const addTask = async (title, priority, dueDate) => {
    if (!user) return;

    await addDoc(
      collection(db, "users", user.uid, "tasks"),
      {
        title,
        priority: priority || "Medium",
        completed: false,
        dueDate: dueDate ? new Date(dueDate) : null,
        createdAt: new Date()
      }
    );
  };

  const toggleTask = async (id, completed) => {
    if (!user) return;

    await updateDoc(
      doc(db, "users", user.uid, "tasks", id),
      { completed: !completed }
    );
  };

  const deleteTask = async (id) => {
    if (!user) return;

    await deleteDoc(
      doc(db, "users", user.uid, "tasks", id)
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

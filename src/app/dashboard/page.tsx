"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import styles from "./dashboard.module.scss";
import {
  Email,
  MapPin,
  PhoneCall,
  Slack,
  UserCheck,
} from "@deemlol/next-icons";

export default function Dashboard() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/auth");
  };

  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        router.push("/auth");
      }
    }
  }, [user, setUser, router]);

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 dir="rtl">خوش آمدید 👋</h1>
        <img src={user.picture} alt={user.name} className={styles.avatar} />
        <h2>{user.name}</h2>
        <p>
          <Email size={20} color="black" /> Email: {user.email}
        </p>
        <p>
          <PhoneCall size={20} color="black" /> Phone: {user.phone}
        </p>
        <p>
          <UserCheck size={20} color="black" /> Username: {user.username}
        </p>
        <p>
          <MapPin size={20} color="black" /> City: {user.city}
        </p>
        <p>
          <Slack size={20} color="black" /> Timezone: {user.timezone}
        </p>
        <button className={styles.logoutButton} onClick={handleLogout}>
          خروج
        </button>
      </div>
    </div>
  );
}

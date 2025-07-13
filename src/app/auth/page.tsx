"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import styles from "./auth.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const router = useRouter();

  const validatePhone = (value: string) => {
    return /^(\+98|0)?9\d{9}$/.test(value); // Validates Iranian phone numbers
  };

  const handleLogin = async () => {
    if (!phone.trim()) {
      setError("شماره تلفن نباید خالی باشد");
      return;
    }

    if (phone.length !== 11) {
      setError("شماره تلفن باید 11 رقم باشد");
      return;
    }

    if (!validatePhone(phone)) {
      setError("شماره تلفن معتبر نیست");
      return;
    }

    try {
      const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const data = await res.json();
      const user = data.results[0];
      setUser({
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        picture: user.picture.large,
        phone: user.phone,
        username: user.login.username,
        city: user.location.city,
        timezone: user.location.timezone.description,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          picture: user.picture.large,
          phone: user.phone,
          username: user.login.username,
          city: user.location.city,
          timezone: user.location.timezone.description,
        })
      );

      router.push("/dashboard");
    } catch (err) {
      console.error("خطا در دریافت کاربر", err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>ورود</h1>
      <b>
        <p>شماره همراه خود را وارد نمایید</p>
      </b>
      <Input
        dir="rtl"
        placeholder="شماره موبایل  (کد کشور +98)"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          setError("");
        }}
      />
      {error && <p className={styles.error}>{error}</p>}

      <Button onClick={handleLogin}>ثبت</Button>
    </div>
  );
}

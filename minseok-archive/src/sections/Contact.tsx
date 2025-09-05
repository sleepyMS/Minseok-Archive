import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { User, Mail, MessageSquare } from "lucide-react";

const Contact = () => {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("sending");
    setMessage("");

    // 1. 폼 데이터를 객체로 만듭니다.
    const form = e.currentTarget;
    const formData = new FormData(form);
    const templateParams = {
      user_name: formData.get("user_name") as string,
      user_email: formData.get("user_email") as string,
      message: formData.get("message") as string,
      // 2. 현재 시간 정보를 생성하여 추가합니다.
      from_time: new Date().toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // 3. sendForm 대신 send 메소드를 사용합니다.
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams, // 생성한 객체를 전달
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          setMessage("메시지가 성공적으로 전송되었습니다!");
          form.reset();
        },
        (error) => {
          setStatus("error");
          setMessage("메시지 전송에 실패했습니다. 다시 시도해주세요.");
          console.error("FAILED...", error.text);
        }
      );
  };

  return (
    <section id="contact" className="container mx-auto px-6 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
        Get in Touch
      </h2>
      <p className="text-secondary mb-12 text-center">
        함께 성장할 기회를 기다립니다.
      </p>

      <motion.form
        onSubmit={sendEmail}
        className="max-w-xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* 이름 입력 필드 */}
        <div className="relative">
          <User
            className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
            size={20}
          />
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full pl-12 pr-4 py-3 bg-secondary border border-default rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            data-interactive
          />
        </div>

        {/* 이메일 입력 필드 */}
        <div className="relative">
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
            size={20}
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full pl-12 pr-4 py-3 bg-secondary border border-default rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            data-interactive
          />
        </div>

        {/* 메시지 입력 필드 */}
        <div className="relative">
          <MessageSquare
            className="absolute left-4 top-5 text-secondary"
            size={20}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={5}
            className="w-full pl-12 pr-4 py-3 bg-secondary border border-default rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            data-interactive
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent-hover transition-colors disabled:bg-secondary disabled:cursor-not-allowed"
          data-interactive
          data-cursor-size="medium"
          data-cursor-text={
            status === "sending" ? "Sending..." : "Send Message"
          }
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </motion.form>

      {/* 전송 결과 메시지 */}
      {message && (
        <p
          className={`mt-6 text-center text-sm ${
            status === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </section>
  );
};

export default Contact;

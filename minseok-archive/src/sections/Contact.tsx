import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MessageSquare,
  Github,
  Linkedin,
  FileText,
} from "lucide-react";

// 소셜 링크 데이터
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/sleepyMS",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/minseok-choi-3214662a1/",
    icon: Linkedin,
  },
  {
    name: "Blog",
    url: "https://me-in-journey.com/",
    icon: FileText,
  },
];

const Contact = () => {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("sending");
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const templateParams = {
      user_name: formData.get("user_name") as string,
      user_email: formData.get("user_email") as string,
      message: formData.get("message") as string,
      from_time: new Date().toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
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
        Let's Create Together
      </h2>
      <p className="text-secondary mb-12 text-center max-w-2xl mx-auto">
        새로운 아이디어를 현실로 만들거나, 기존 프로젝트를 한 단계 발전시키는 데
        관심이 있으신가요?
        <br />
        언제든지 편하게 연락주세요. 함께 멋진 결과물을 만들어 갈 기회를
        기다립니다.
      </p>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* 왼쪽: 소셜 링크 및 추가 정보 */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">
              Find me on Social Media
            </h3>
            <div className="flex items-center gap-5">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-full border border-default"
                  whileHover={{ scale: 1.15, y: -5, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  data-interactive
                  data-cursor-size="medium"
                  aria-label={link.name}
                >
                  <link.icon className="text-primary" size={24} />
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">
              Direct Email
            </h3>
            <a
              href="mailto:your-email@example.com" // 👈 본인 이메일 주소로 변경하세요
              className="flex items-center gap-3 text-secondary hover:text-accent transition-colors"
              data-interactive
            >
              <Mail size={20} />
              <span>your-email@example.com</span>
            </a>
          </div>
        </motion.div>

        {/* 오른쪽: 연락처 폼 */}
        <motion.form
          onSubmit={sendEmail}
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
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
      </div>

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

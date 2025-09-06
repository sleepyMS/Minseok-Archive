// src/components/ProfileCard.tsx

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Building, GraduationCap } from "lucide-react";
import profileImage from "/src/assets/profile-image.png";

// profileData.json의 타입 정의
interface ProfileData {
  name: string;
  title: string;
  affiliation: string;
  major: string;
  profileImage: string;
  contact: {
    email: string;
    phone: string;
  };
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const ProfileCard: React.FC<{ data: ProfileData }> = ({ data }) => {
  return (
    // 카드 스타일을 About.tsx의 디자인과 어울리도록 조정합니다.
    <motion.div
      className="w-full bg-secondary p-6 rounded-lg text-center"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      {/* 이미지는 JSON 파일에서 불러옵니다 */}
      <motion.img
        src={profileImage}
        alt={data.name}
        className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-accent"
        variants={itemVariants}
      />
      <motion.h3
        className="text-2xl font-bold text-primary"
        variants={itemVariants}
      >
        {data.name}
      </motion.h3>
      <motion.p className="text-md text-accent mb-6" variants={itemVariants}>
        {data.title}
      </motion.p>

      {/* 구분선 */}
      <motion.hr
        className="border-t-2 border-accent/20 my-4"
        variants={itemVariants}
      />

      {/* 상세 정보 (아이콘과 함께) */}
      <motion.div
        className="space-y-3 text-left text-sm text-secondary"
        variants={itemVariants}
      >
        <div className="flex items-center">
          <Building size={16} className="text-accent mr-3 flex-shrink-0" />
          <span>{data.affiliation}</span>
        </div>
        <div className="flex items-center">
          <GraduationCap size={16} className="text-accent mr-3 flex-shrink-0" />
          <span>{data.major}</span>
        </div>
        <div className="flex items-center">
          <Mail size={16} className="text-accent mr-3 flex-shrink-0" />
          <a
            href={`mailto:${data.contact.email}`}
            className="hover:text-primary transition-colors break-all"
          >
            {data.contact.email}
          </a>
        </div>
        <div className="flex items-center">
          <Phone size={16} className="text-accent mr-3 flex-shrink-0" />
          <span>{data.contact.phone}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface TeamMember {
  position: string;
  name: string;
  image: string;
  description: string;
  id: string;
  bgColor: string;
}

/**
 * Molecule: TeamCard
 * Card de miembro del equipo con expansión en hover
 * Copiado EXACTAMENTE de Molokaih-web-v3/CardWorkers
 * ÚNICA diferencia: imagen pasa a color en hover
 */
export function TeamCard({ member }: { member: TeamMember }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      initial={{ width: "7.5%" }}
      animate={{ width: hover ? "23%" : "7.5%" }}
      transition={{ duration: 0.3 }}
      className="bg-primary h-dvh max-h-[900px] overflow-hidden border border-white/10 flex flex-col justify-between items-center relative last:rounded-r-4xl first:rounded-l-4xl"
      style={{ background: member.bgColor }}
    >
      <motion.div
        initial={{ height: "70%" }}
        animate={{ height: hover ? "50%" : "70%" }}
        transition={{ duration: 0.3 }}
        className="flex flex-col justify-center items-start"
      >
        <motion.p
          initial={{ rotate: "-90deg" }}
          animate={{ rotate: hover ? "0deg" : "-90deg" }}
          transition={{ duration: 0.3 }}
          className={`font-bold ${
            hover ? "text-2xl w-full" : "text-2xl 2xl:text-4xl w-max"
          } text-white uppercase px-5`}
        >
          {member.position}
        </motion.p>

        {hover && <p className="text-xl pb-5 px-5">{member.name}</p>}

        {
          <motion.p
            initial={{ position: "absolute", opacity: 0 }}
            animate={{
              position: hover ? "relative" : "absolute",
              opacity: hover ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="w-full px-5 opacity-90"
          >
            {member.description}
          </motion.p>
        }
      </motion.div>
      
      <motion.div
        initial={{ height: "30%" }}
        animate={{ height: hover ? "50%" : "30%" }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={member.image}
          width={1000}
          height={1000}
          alt={member.name}
          className={`w-full h-full transition-all duration-300 ${
            member.id === 'luciana' ? 'object-contain scale-[2.5] object-right translate-x-8' : 'object-cover'
          } ${
            hover ? "" : "grayscale-100"
          }`}
        />
      </motion.div>
    </motion.div>
  );
}


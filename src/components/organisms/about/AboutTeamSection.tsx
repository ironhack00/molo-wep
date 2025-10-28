"use client";

import { Heading } from "../../atoms/Heading";
import { Paragraph } from "../../atoms/Paragraph";
import { TeamCard } from "../../molecules/TeamCard";
import { teamMembersData } from "@/data/about/teamData";
import { cn, textSizes } from "@/utils/classNames";
import { useTranslations } from "@/lib/i18n/IntlProvider";
import Image from "next/image";

/**
 * Organism: AboutTeamSection
 * Sección del equipo Molokaih
 * Reutiliza: Heading, Paragraph, TeamCard (adaptado de Molokaih-web-v3)
 */
export function AboutTeamSection() {
  const t = useTranslations('about.team');
  const tAria = useTranslations('ariaLabels');
  
  // Combinar datos estáticos con traducciones
  const teamMembers = teamMembersData.map(member => ({
    ...member,
    position: String(t(`members.${member.id}.position`)),
    description: String(t(`members.${member.id}.description`)),
  }));
  
  return (
    <section 
      className="w-full max-w-[1920px] mx-auto flex flex-col justify-center items-center gap-8 py-16"
      aria-label={String(tAria('teamSection'))}
    >
      {/* Header */}
      <div className="w-full text-center relative px-5">
        <Heading 
          level="h2" 
          className={cn(
            textSizes.sectionTitle, "font-semibold pb-2 max-w-4xl mx-auto",
            "text-transparent bg-clip-text bg-gradient-to-t from-white/30 from-0% to-white to-50%"
          )}
        >
          {String(t('title'))}
        </Heading>
        <Paragraph size="md" className="text-sm sm:text-base text-white mt-2">
          {String(t('subtitle'))}
        </Paragraph>
      </div>

      {/* Team Cards Desktop - Cards expandibles */}
      <div className="w-full flex justify-center items-center max-lg:hidden px-5">
        <div className="flex justify-center items-center rounded-[32px] overflow-hidden max-w-[1800px]">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* Team Cards Mobile - Scroll horizontal */}
      <div className="lg:hidden w-full overflow-scroll pb-5 px-5">
        <div className="w-max flex justify-center items-center rounded-2xl overflow-hidden">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-primary w-[270px] h-dvh max-h-[900px] overflow-hidden border border-white/10 flex flex-col justify-between items-center relative"
              style={{ background: member.bgColor }}
            >
              <div className="flex flex-col justify-center items-start h-[50%]">
                <p className="font-bold text-xl w-full text-white uppercase px-5">
                  {member.position}
                </p>
                <p className="text-xl pb-5 px-5">{member.name}</p>
                <p className="w-full px-5 opacity-90">
                  {member.description}
                </p>
              </div>
              <div className="h-[50%]">
                <Image
                  src={member.image}
                  width={1000}
                  height={1000}
                  alt={member.name}
                  className={`w-full h-full grayscale-100 ${
                    member.id === 'luciana' ? 'object-contain scale-150 object-right translate-x-8' : 'object-cover'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


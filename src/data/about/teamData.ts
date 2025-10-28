/**
 * Data: Team Members
 * Miembros del equipo Molokaih (solo datos estáticos)
 * Las traducciones están en messages/[locale].json bajo about.team.members
 */

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  image: string;
  bgColor: string;
}

// Solo datos estáticos (no traducciones)
export const teamMembersData = [
  {
    id: "francisco",
    name: "Francisco Fernandez",
    image: "/images/team/francisco.webp",
    bgColor: "#25D9D8",
  },
  {
    id: "montserrat",
    name: "Montserrat Nassr",
    image: "/images/team/montserrat.webp",
    bgColor: "#25BED9",
  },
  {
    id: "jose",
    name: "José Nassr",
    image: "/images/team/jose.webp",
    bgColor: "#259DD9",
  },
  {
    id: "daniel",
    name: "Daniel Santiago",
    image: "/images/team/daniel.webp",
    bgColor: "#2582D9",
  },
  {
    id: "kevin",
    name: "Kevin Correa",
    image: "/images/team/kevin.webp",
    bgColor: "#255ED9",
  },
  {
    id: "fernando",
    name: "Fernando Pantoja",
    image: "/images/team/FernandoPantoja-DesarrolladorAutomatizaciones.webp",
    bgColor: "#2566D9",
  },
  {
    id: "guillermo",
    name: "Guillermo Fernandez",
    image: "/images/team/GuillermoFernandez-DesarrolladorFull-Stack.webp",
    bgColor: "#2566D9",
  },
  {
    id: "camila",
    name: "Camila Hauck",
    image: "/images/team/CamilaHauck-DisenadoraGrafica.webp",
    bgColor: "#D925AC",
  },
  {
    id: "denise",
    name: "Denise Giusfredi",
    image: "/images/team/Giusfredi-Denise-ProductoraAudiovisual.webp",
    bgColor: "#D92591",
  },
  {
    id: "luciana",
    name: "Luciana Suppa Pou",
    image: "/images/team/Luciana Suppa Pou - Community Manager.webp",
    bgColor: "#D9257C",
  },
  {
    id: "manu",
    name: "Manu Nair",
    image: "/images/team/manu nair-graphic design.webp",
    bgColor: "#D925AC",
  },
  {
    id: "laura",
    name: "Laura",
    image: "/images/team/laura.webp",
    bgColor: "#D9257C",
  },
  {
    id: "fernanda",
    name: "Fernanda",
    image: "/images/team/fernanda.webp",
    bgColor: "#D92591",
  },
];


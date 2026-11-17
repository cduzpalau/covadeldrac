import { Locale } from '@/lib/i18n';

export interface PreviewPhotoCopy {
  bannerBadge: string;
  bannerText: string;
  compareLiveLabel: string;
  hero: {
    imageAlt: string;
    captionTitle: string;
    captionSubtitle: string;
  };
  about: {
    profileAlt: string;
    profileBadge: string;
    espanaAlt: string;
    espanaCaption: string;
    peersAlt: string;
    peersCaption: string;
  };
  methodology: {
    targetsAlt: string;
    targetsBadge: string;
    targetsCaption: string;
    coachingAlt: string;
    coachingCaption: string;
  };
}

export const previewPhotoCopy: Record<Locale, PreviewPhotoCopy> = {
  ca: {
    bannerBadge: 'Vista prèvia de prova',
    bannerText: 'Proposta amb selecció de 6 fotografies (Hero, Qui sóc? i Metodologia). La web pública actual no s’ha modificat.',
    compareLiveLabel: 'Veure versió actual',
    hero: {
      imageAlt: 'Sergi Cebrián en el moment exacte de deixar anar la fletxa amb arc nu',
      captionTitle: 'Tècnica universal i instint competitiu',
      captionSubtitle: 'Sergi Cebrián • Des de la primera fletxa el 2010 fins a l’alta competició',
    },
    about: {
      profileAlt: 'Sergi Cebrián a màxima obertura competint en un campionat internacional de tir de camp de World Archery',
      profileBadge: 'World Archery • Tir de Camp',
      espanaAlt: 'Sergi Cebrián d’esquena amb l’equipació de la selecció espanyola davant la diana de camp',
      espanaCaption: 'Internacional representant Espanya en modalitat de tir de camp',
      peersAlt: 'Sergi Cebrián somrient amb l’equipació estatal al costat d’un arquer de l’equip dels Estats Units',
      peersCaption: 'Compartint línia de tir amb l’elit internacional',
    },
    methodology: {
      targetsAlt: 'Quatre dianes de tir de camp al bosc amb agrupacions de tres fletxes clavades al centre',
      targetsBadge: 'Confort • Sistema • Balanç',
      targetsCaption: 'Quan la tècnica s’adapta al cos i el treball té sistema, la fletxa n’és la conseqüència.',
      coachingAlt: 'Sergi Cebrián acompanyant i assessorant un arquer de La Cova del Drac durant una competició',
      coachingCaption: 'Treball de camp conjunt i gestió emocional real en competició amb els atletes de La Cova del Drac',
    },
  },
  es: {
    bannerBadge: 'Vista previa de prueba',
    bannerText: 'Propuesta con selección de 6 fotografías (Hero, ¿Quién soy? y Metodología). La web pública actual no se ha modificado.',
    compareLiveLabel: 'Ver versión actual',
    hero: {
      imageAlt: 'Sergi Cebrián en el instante exacto de soltar la flecha con arco desnudo',
      captionTitle: 'Técnica universal e instinto competitivo',
      captionSubtitle: 'Sergi Cebrián • Desde la primera flecha en 2010 hasta la alta competición',
    },
    about: {
      profileAlt: 'Sergi Cebrián en apertura completa compitiendo en un campeonato internacional de tiro de campo de World Archery',
      profileBadge: 'World Archery • Tiro de Campo',
      espanaAlt: 'Sergi Cebrián de espaldas con la equipación de la selección española frente a la diana de campo',
      espanaCaption: 'Internacional representando a España en modalidad de tiro de campo',
      peersAlt: 'Sergi Cebrián sonriendo con la equipación nacional junto a un arquero del equipo de Estados Unidos',
      peersCaption: 'Compartiendo línea de tiro con la élite internacional',
    },
    methodology: {
      targetsAlt: 'Cuatro dianas de tiro de campo en el bosque con agrupaciones de tres flechas en el centro',
      targetsBadge: 'Confort • Sistema • Balance',
      targetsCaption: 'Cuando la técnica se adapta al cuerpo y el trabajo tiene sistema, la flecha es la consecuencia.',
      coachingAlt: 'Sergi Cebrián acompañando y asesorando a un arquero de La Cova del Drac durante una competición',
      coachingCaption: 'Trabajo de campo conjunto y gestión emocional real en competición con los atletas de La Cova del Drac',
    },
  },
  en: {
    bannerBadge: 'Test Site Preview',
    bannerText: 'Curated 6-photo layout proposal (Hero, Who Am I? & Methodology). Your live public pages remain untouched.',
    compareLiveLabel: 'View current version',
    hero: {
      imageAlt: 'Sergi Cebrián at the exact millisecond of arrow release shooting barebow',
      captionTitle: 'Universal technique & competitive instinct',
      captionSubtitle: 'Sergi Cebrián • From first arrow in 2010 to international competition',
    },
    about: {
      profileAlt: 'Sergi Cebrián at full draw competing at an international World Archery field championship',
      profileBadge: 'World Archery • Field Archery',
      espanaAlt: 'Sergi Cebrián wearing his Spain national team jersey walking up to a field archery target',
      espanaCaption: 'Representing Spain internationally in Field Archery',
      peersAlt: 'Sergi Cebrián smiling in his Spain national team jacket alongside a Team USA archer',
      peersCaption: 'Competing alongside international peers on the world stage',
    },
    methodology: {
      targetsAlt: 'Four woodland field archery targets each pierced in the center bullseye by tight three-arrow groups',
      targetsBadge: 'Comfort • System • Balance',
      targetsCaption: 'When technique adapts to the body and training follows a clear system, grouping is the natural result.',
      coachingAlt: 'Sergi Cebrián walking alongside and coaching a La Cova del Drac archer between ends at a tournament',
      coachingCaption: 'Side-by-side field mentorship and real-time emotional management with La Cova del Drac athletes',
    },
  },
};

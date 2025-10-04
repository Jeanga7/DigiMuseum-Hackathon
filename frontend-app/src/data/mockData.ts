import { Artwork, Collection, Museum, VirtualRoom, ThematicTour } from '../types';

export const mockMuseum: Museum = {
  id: '1',
  name: {
    fr: 'Musée des Civilisations Noires',
    en: 'Museum of Black Civilizations',
    wo: 'Musée yi ñu Teemeer yu Ñuul'
  },
  description: {
    fr: 'Le Musée des Civilisations Noires de Dakar célèbre le patrimoine et les cultures africaines à travers une collection exceptionnelle d\'œuvres d\'art, d\'artefacts historiques et de témoignages contemporains.',
    en: 'The Museum of Black Civilizations in Dakar celebrates African heritage and cultures through an exceptional collection of artworks, historical artifacts, and contemporary testimonies.',
    wo: 'Musée des Civilisations Noires ci Dakar dafay tànn ak jaale patrimoine ak setal yu Afrik ci loolu ñu fetal ci benn collection bu xooti ci liggéey yu art, ay artefacts yu histoire ak ay témoignages yu contemporain.'
  },
  location: 'Route de l\'Aéroport, Dakar, Sénégal',
  coordinates: { lat: 14.7167, lng: -17.4677 }
};

export const mockCollections: Collection[] = [
  {
    id: 'col1',
    museum_id: '1',
    name: {
      fr: 'Royaumes et Empires',
      en: 'Kingdoms and Empires',
      wo: 'Réew yi ak Empire yi'
    },
    description: {
      fr: 'Découvrez la grandeur des royaumes et empires africains',
      en: 'Discover the greatness of African kingdoms and empires',
      wo: 'Xeex gëna-gëna réew yi ak empire yi Afrik'
    },
    display_order: 1,
    is_active: true
  },
  {
    id: 'col2',
    museum_id: '1',
    name: {
      fr: 'Art Contemporain',
      en: 'Contemporary Art',
      wo: 'Art yu Leeb'
    },
    description: {
      fr: 'L\'art africain contemporain dans toute sa diversité',
      en: 'Contemporary African art in all its diversity',
      wo: 'Art yu Afrik yu leeb ci loolu ñu tollu'
    },
    display_order: 2,
    is_active: true
  },
  {
    id: 'col3',
    museum_id: '1',
    name: {
      fr: 'Textiles et Tissages',
      en: 'Textiles and Weaving',
      wo: 'Siir ak Séw'
    },
    description: {
      fr: 'Les traditions textiles ancestrales',
      en: 'Ancestral textile traditions',
      wo: 'Aada yu njiit yu siir'
    },
    display_order: 3,
    is_active: true
  }
];

export const mockArtworks: Artwork[] = [
  {
    id: 'art1',
    collection_id: 'col1',
    qr_code: 'MCN001',
    title: {
      fr: 'Couronne Royale du Royaume du Kongo',
      en: 'Royal Crown of the Kingdom of Kongo',
      wo: 'Kuroon bu Buur bu Rew Kongo'
    },
    description: {
      fr: 'Cette magnifique couronne cérémonielle témoigne de la sophistication et du pouvoir du Royaume du Kongo (14e-19e siècle). Ornée de perles, de cuivre et de motifs sacrés, elle était portée lors des grandes cérémonies royales.',
      en: 'This magnificent ceremonial crown testifies to the sophistication and power of the Kingdom of Kongo (14th-19th century). Adorned with beads, copper and sacred motifs, it was worn during grand royal ceremonies.',
      wo: 'Kuroon bii bu xool-xoolal dafa wone témoin bu gëna-gëna ak doole bu Rew Kongo (14ème-19ème siècle). Bu njoone ak perle, cuivre ak motif yu santu, dañu ko samp ci ceremonie yu buur yu mag.'
    },
    artist: {
      fr: 'Artisan inconnu du Royaume du Kongo',
      en: 'Unknown artisan from Kingdom of Kongo',
      wo: 'Artisan bu ñu xamul ci Rew Kongo'
    },
    period: '16e siècle',
    origin: 'Royaume du Kongo (actuelle RDC/Angola)',
    materials: ['Cuivre', 'Perles', 'Fibres végétales'],
    cultural_significance: {
      fr: 'Symbole du pouvoir royal et de la continuité dynastique dans la culture Kongo. Les motifs représentent la connexion entre les mondes visible et invisible.',
      en: 'Symbol of royal power and dynastic continuity in Kongo culture. The motifs represent the connection between visible and invisible worlds.',
      wo: 'Sambal doole bu buur ak continuité dynastique ci setal Kongo. Motif yi dañu wone lëkkaloo ci àdduna bu xeex ak bi ñu xamul.'
    },
    display_order: 1,
    is_featured: true
  },
  {
    id: 'art2',
    collection_id: 'col1',
    qr_code: 'MCN002',
    title: {
      fr: 'Manuscrit de Tombouctou',
      en: 'Timbuktu Manuscript',
      wo: 'Bind bi Tombouctou'
    },
    description: {
      fr: 'Précieux manuscrit enluminé datant du 15e siècle, provenant des bibliothèques de Tombouctou. Il contient des traités scientifiques, poétiques et religieux, témoignant de l\'âge d\'or intellectuel de l\'Empire du Mali.',
      en: 'Precious illuminated manuscript dating from the 15th century, from the libraries of Timbuktu. It contains scientific, poetic and religious treatises, testifying to the intellectual golden age of the Mali Empire.',
      wo: 'Bind bu nit bu xewet ci 15ème siècle, jóge ci bibliothèque yi Tombouctou. Am na ay traité scientifique, poésie ak religion, dafa wone témoin jamono bu xam-xam bu Empire du Mali.'
    },
    artist: {
      fr: 'Érudits de Tombouctou',
      en: 'Scholars of Timbuktu',
      wo: 'Serign yi Tombouctou'
    },
    period: '15e siècle',
    origin: 'Tombouctou, Empire du Mali',
    materials: ['Papier', 'Encre', 'Enluminures d\'or'],
    cultural_significance: {
      fr: 'Ces manuscrits démontrent l\'excellence académique et scientifique de l\'Afrique médiévale. Tombouctou était un centre intellectuel majeur avec des universités attirant des étudiants de tout le continent.',
      en: 'These manuscripts demonstrate the academic and scientific excellence of medieval Africa. Timbuktu was a major intellectual center with universities attracting students from across the continent.',
      wo: 'Bind yii dañu sonn xam-xam ak science bu Afrik yu Moyen Âge. Tombouctou mooy benn xarale xam-xam bu mag ak université yu ñëw jàngalekat ci beneen-beneen kaw ci àdduna.'
    },
    display_order: 2,
    is_featured: true
  },
  {
    id: 'art3',
    collection_id: 'col2',
    qr_code: 'MCN003',
    title: {
      fr: 'Masque Contemporain: Renaissance',
      en: 'Contemporary Mask: Rebirth',
      wo: 'Masque yu Leeb: Yàgg bu Bees'
    },
    description: {
      fr: 'Œuvre de l\'artiste sénégalais Ousmane Sow, cette sculpture contemporaine revisite les masques traditionnels africains avec des matériaux modernes, créant un dialogue entre passé et présent.',
      en: 'Work by Senegalese artist Ousmane Sow, this contemporary sculpture revisits traditional African masks with modern materials, creating a dialogue between past and present.',
      wo: 'Liggéey bi artist sénégalais Ousmane Sow, sculpture bii bu leeb dafa dellu gis masque yu njiit yu Afrik ak matériel yu leeb, dafa sos dialogue ci sant ak leegi.'
    },
    artist: {
      fr: 'Ousmane Sow',
      en: 'Ousmane Sow',
      wo: 'Ousmane Sow'
    },
    period: '2015',
    origin: 'Dakar, Sénégal',
    materials: ['Métal recyclé', 'Bois', 'Pigments naturels'],
    cultural_significance: {
      fr: 'Cette œuvre illustre la réappropriation contemporaine des traditions africaines, questionnant l\'identité culturelle dans un monde globalisé.',
      en: 'This work illustrates the contemporary reappropriation of African traditions, questioning cultural identity in a globalized world.',
      wo: 'Liggéey bii dafa sonn ni aada yu Afrik ñëw dëkk ci leegi, am-am laaj ci identité culturelle ci àdduna bu globalisé.'
    },
    display_order: 3,
    is_featured: true
  },
  {
    id: 'art4',
    collection_id: 'col3',
    qr_code: 'MCN004',
    title: {
      fr: 'Kente Royal du Ghana',
      en: 'Royal Kente from Ghana',
      wo: 'Kente bu Buur bu Ghana'
    },
    description: {
      fr: 'Tissu Kente exceptionnel tissé à la main par les maîtres tisserands Akan du Ghana. Chaque couleur et motif possède une signification symbolique profonde, racontant l\'histoire et les valeurs du peuple Akan.',
      en: 'Exceptional hand-woven Kente cloth by master Akan weavers from Ghana. Each color and pattern has a deep symbolic meaning, telling the story and values of the Akan people.',
      wo: 'Siir Kente bu xewet bu séw ak loxo ci maître tisserand Akan yi Ghana. Kuy kuleer ak motif am na teew bu mag, dafa xalaat histoire ak jëfandikoo ñu Akan.'
    },
    artist: {
      fr: 'Tisserands Akan',
      en: 'Akan Weavers',
      wo: 'Séwkat Akan'
    },
    period: '18e siècle',
    origin: 'Empire Ashanti, Ghana',
    materials: ['Coton', 'Soie', 'Teintures naturelles'],
    cultural_significance: {
      fr: 'Le Kente est considéré comme un tissu sacré chez les Akan, traditionnellement réservé aux chefs et aux occasions spéciales. Il représente la richesse culturelle et l\'excellence artisanale africaine.',
      en: 'Kente is considered a sacred cloth among the Akan, traditionally reserved for chiefs and special occasions. It represents African cultural richness and artisanal excellence.',
      wo: 'Kente mooy siir bu santu ci Akan, ci njiit dañu ko jagle buur yi ak jamono yu xeewit. Dafa wone setal ak liggéey bu gëna-gëna ci Afrik.'
    },
    display_order: 4,
    is_featured: false
  },
  {
    id: 'art5',
    collection_id: 'col2',
    qr_code: 'MCN005',
    title: {
      fr: 'Photographie: Femmes de Dakar',
      en: 'Photography: Women of Dakar',
      wo: 'Nataal: Jigéen yi Dakar'
    },
    description: {
      fr: 'Série photographique poignante de la photographe Fatoumata Diabaté, capturant la force, l\'élégance et la modernité des femmes dakaroises dans leur quotidien.',
      en: 'Poignant photographic series by photographer Fatoumata Diabaté, capturing the strength, elegance and modernity of Dakar women in their daily lives.',
      wo: 'Série nataal bu Fatoumata Diabaté bu nataalkat, dafa laal doole, gëna-gëna ak leeb yu jigéen yi Dakar ci bes-bu-bés.'
    },
    artist: {
      fr: 'Fatoumata Diabaté',
      en: 'Fatoumata Diabaté',
      wo: 'Fatoumata Diabaté'
    },
    period: '2020',
    origin: 'Dakar, Sénégal',
    materials: ['Photographie numérique', 'Tirage argentique'],
    cultural_significance: {
      fr: 'Cette série questionne les représentations de la féminité africaine, mettant en lumière la diversité et l\'autonomie des femmes sénégalaises contemporaines.',
      en: 'This series questions representations of African femininity, highlighting the diversity and autonomy of contemporary Senegalese women.',
      wo: 'Série bii dafa am-am laaj ci ni ñu sonn jigéen yu Afrik, dafa sonn ni jigéen yu Senegaal ci leegi tollu ak am boroom-kër.'
    },
    display_order: 5,
    is_featured: false
  }
];

export const mockVirtualRooms: VirtualRoom[] = [
  {
    id: 'room1',
    museum_id: '1',
    name: {
      fr: 'Salle des Royaumes',
      en: 'Hall of Kingdoms',
      wo: 'Kër bi Réew yi'
    },
    description: {
      fr: 'Explorez les grands royaumes et empires d\'Afrique',
      en: 'Explore the great kingdoms and empires of Africa',
      wo: 'Xeex réew yi ak empire yu mag yu Afrik'
    },
    panorama_url: 'https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg',
    floor_number: 1,
    display_order: 1,
    hotspots: [
      { artwork_id: 'art1', x: 30, y: 50, label: mockArtworks[0].title },
      { artwork_id: 'art2', x: 70, y: 50, label: mockArtworks[1].title }
    ]
  },
  {
    id: 'room2',
    museum_id: '1',
    name: {
      fr: 'Galerie Contemporaine',
      en: 'Contemporary Gallery',
      wo: 'Galerie bu Leeb'
    },
    description: {
      fr: 'Art contemporain africain et diaspora',
      en: 'African contemporary art and diaspora',
      wo: 'Art yu leeb yu Afrik ak diaspora'
    },
    panorama_url: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg',
    floor_number: 2,
    display_order: 2,
    hotspots: [
      { artwork_id: 'art3', x: 50, y: 50, label: mockArtworks[2].title },
      { artwork_id: 'art5', x: 80, y: 45, label: mockArtworks[4].title }
    ]
  }
];

export const mockThematicTours: ThematicTour[] = [
  {
    id: 'tour1',
    museum_id: '1',
    name: {
      fr: 'Parcours des Empires',
      en: 'Empire Trail',
      wo: 'Yoon bu Empire yi'
    },
    description: {
      fr: 'Découvrez la grandeur des empires africains du Mali, Songhaï et Kongo à travers leurs trésors artistiques',
      en: 'Discover the greatness of African empires of Mali, Songhai and Kongo through their artistic treasures',
      wo: 'Xeex gëna-gëna empire yi Afrik Mali, Songhaï ak Kongo ci loolu ñu fetal ci ay trésor yu art'
    },
    duration_minutes: 45,
    difficulty: 'medium',
    icon: 'crown',
    artwork_sequence: ['art1', 'art2'],
    is_active: true
  },
  {
    id: 'tour2',
    museum_id: '1',
    name: {
      fr: 'Renaissance Africaine',
      en: 'African Renaissance',
      wo: 'Yàgg bu Bees bu Afrik'
    },
    description: {
      fr: 'Un voyage dans l\'art contemporain africain, entre tradition et modernité',
      en: 'A journey through contemporary African art, between tradition and modernity',
      wo: 'Benn yoon ci art yu leeb yu Afrik, ci ginnaw aada ak leeb'
    },
    duration_minutes: 30,
    difficulty: 'easy',
    icon: 'palette',
    artwork_sequence: ['art3', 'art5'],
    is_active: true
  },
  {
    id: 'tour3',
    museum_id: '1',
    name: {
      fr: 'Couleurs et Textiles',
      en: 'Colors and Textiles',
      wo: 'Kuleer ak Siir'
    },
    description: {
      fr: 'Explorez l\'art textile africain et sa symbolique profonde',
      en: 'Explore African textile art and its deep symbolism',
      wo: 'Xeex art bu siir yu Afrik ak teew bi am'
    },
    duration_minutes: 25,
    difficulty: 'easy',
    icon: 'shirt',
    artwork_sequence: ['art4'],
    is_active: true
  }
];

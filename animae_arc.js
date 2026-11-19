// ANIMAE — deck des 30 Archétypes (source : cartes.json V1, textes repris à l'identique).
// Champs ajoutés par Claude, À VALIDER : pat (déclencheurs de l'Ombre, déduits des mots-clés d'Ombre de la carte).
(function(){ const ARC = [
{
"id": "ARC-01",
"nom": "L’AIGLE",
"titre": "Le Visionnaire",
"famille": "Créateur",
"territoire": "Vision pionnière · Décision · Leadership vertical · Indépendance créatrice",
"lum": "Ouvre des voies inédites ; décide avec fermeté ; incarne un cap ; lance ce que d’autres finalisent ; architecte la direction.",
"omb": "Confond indépendance et isolement ; impatience face aux rythmes lents ; se désengage dans la construction longue ; écrase involontairement les initiatives.",
"lk": "Vision · Direction · Décision",
"ok": "Isolement · Impatience · Surplomb",
"ql": "Quelle hauteur de vue ou quel cap peux-tu mobiliser ici sans écraser ce qui existe déjà ?",
"adj": "La vision reste reliée au réel, au rythme du système et à la place des autres.",
"qo": "Si cette Ombre prenait le dessus ici, que chercherais-tu à contrôler ou à éviter en restant seul·e au-dessus de la situation ?",
"rc": "img/arc/a01_recto.jpg",
"vs": "img/arc/a01_verso.jpg",
"pat": [
"SOLO",
"FORCE"
]
},
{
"id": "ARC-02",
"nom": "LE LOUP",
"titre": "L’Architecte du lien",
"famille": "Connecteur",
"territoire": "Relation · Collectif · Transmission",
"lum": "Fédère ; construit des relations durables ; transmet et mentore ; détecte les dynamiques humaines ; devient le ciment d’une équipe.",
"omb": "S’oublie pour les autres ; trahison paralysante ; loyauté envers le toxique ; doute seul et recherche de validation.",
"lk": "Lien · Loyauté · Fédération",
"ok": "Oubli de soi · Loyauté toxique · Validation",
"ql": "Comment peux-tu créer du lien ici sans perdre ta propre place ?",
"adj": "Le lien soutient le collectif sans sacrifice de soi ni loyauté aveugle.",
"qo": "Qu’est-ce que ton besoin de lien ou de loyauté essaierait de protéger ici ?",
"rc": "img/arc/a02_recto.jpg",
"vs": "img/arc/a02_verso.jpg",
"pat": [
"FORCE",
"OUBLI"
]
},
{
"id": "ARC-03",
"nom": "LE LION",
"titre": "L’Expressif Souverain",
"famille": "Créateur",
"territoire": "Expression · Charisme · Influence · Créativité performative",
"lum": "Conviction ; transformation ; porte-parole ; crée de l’élan ; met les autres en mouvement.",
"omb": "Excès s’il n’est pas reconnu ; recherche la lumière ; vit la critique comme une attaque ; difficulté à finir.",
"lk": "Expression · Rayonnement · Influence",
"ok": "Besoin de reconnaissance · Surjeu · Défensivité",
"ql": "Quelle parole ou présence forte peut réellement servir la situation plutôt que simplement attirer l’attention ?",
"adj": "Le rayonnement sert un message, une action ou le collectif ; il ne dépend pas de l’admiration.",
"qo": "Si tu te sentais insuffisamment reconnu·e ici, comment ton Ombre pourrait-elle réagir ?",
"rc": "img/arc/a03_recto.jpg",
"vs": "img/arc/a03_verso.jpg",
"pat": [
"FORCE"
]
},
{
"id": "ARC-04",
"nom": "L’ÉLÉPHANT",
"titre": "Le Gardien de la Mémoire",
"famille": "Structurant",
"territoire": "Mémoire longue · Transmission · Loyauté · Protection de ce qui compte",
"lum": "Porte la mémoire collective ; protège personnes, valeurs et acquis ; transmet avec profondeur ; crée la confiance sur la durée ; veille à ce que l’essentiel ne se perde pas.",
"omb": "La mémoire devient un poids ; résistance au changement ; pardon difficile ; porte seul l’histoire du groupe ; utilise le passé pour justifier l’immobilisme.",
"lk": "Mémoire · Protection · Transmission",
"ok": "Poids du passé · Rigidité · Rétention",
"ql": "Qu’est-ce qui mérite d’être protégé ou transmis ici, sans empêcher l’évolution ?",
"adj": "Le passé éclaire la décision présente sans la figer.",
"qo": "Qu’est-ce que ton attachement à l’histoire chercherait à préserver, même au prix du mouvement ?",
"rc": "img/arc/a04_recto.jpg",
"vs": "img/arc/a04_verso.jpg",
"pat": [
"FORCE",
"OUBLI"
]
},
{
"id": "ARC-05",
"nom": "LE DAUPHIN",
"titre": "L’Innovateur Joyeux",
"famille": "Créateur",
"territoire": "Innovation · Créativité sociale · Communication émotionnelle · Adaptabilité",
"lum": "Innove face aux obstacles ; crée des ponts entre univers/personnes/idées ; énergie vitale ; intelligence émotionnelle ; grande adaptabilité.",
"omb": "Dispersion ; évite les conflits ; sabote par ennui ; sous-estime sa profondeur.",
"lk": "Innovation · Fluidité · Connexion",
"ok": "Dispersion · Évitement · Ennui",
"ql": "Quelle solution vivante, nouvelle ou plus fluide peux-tu tester ici sans fuir ce qui demande de la profondeur ?",
"adj": "L’innovation résout ou relie quelque chose de concret ; elle ne sert pas seulement à éviter l’inconfort.",
"qo": "Qu’est-ce que ton besoin de mouvement ou de légèreté chercherait à éviter ici ?",
"rc": "img/arc/a05_recto.jpg",
"vs": "img/arc/a05_verso.jpg",
"pat": [
"FLOU",
"EVITE"
]
},
{
"id": "ARC-06",
"nom": "LE CERF",
"titre": "Le Porteur de Grâce",
"famille": "Connecteur",
"territoire": "Sensibilité · Élégance · Discernement · Présence douce",
"lum": "Élève la qualité ; navigue les environnements complexes ; crée des espaces d’authenticité ; forte exigence de qualité.",
"omb": "Fuit la confrontation ; hyper-réactivité ; s’efface par tact ; perfectionnisme bloquant.",
"lk": "Sensibilité · Discernement · Grâce",
"ok": "Évitement · Hyper-réactivité · Effacement",
"ql": "Comment peux-tu apporter finesse et qualité ici sans t’effacer ni éviter la confrontation utile ?",
"adj": "La douceur reste présente sans renoncer à la clarté ni au cadre.",
"qo": "Qu’est-ce que ta recherche d’harmonie essaierait d’éviter ou de protéger ici ?",
"rc": "img/arc/a06_recto.jpg",
"vs": "img/arc/a06_verso.jpg",
"pat": [
"EVITE",

"OUBLI"
]
},
{
"id": "ARC-07",
"nom": "LA CHOUETTE",
"titre": "La Gardienne du Sens",
"famille": "Guide",
"territoire": "Discernement · Analyse · Intuition stratégique · Clarté dans le chaos",
"lum": "Identifie les angles morts ; transforme la complexité en clarté ; boussole éthique et intellectuelle ; crée outils, méthodes et cadres.",
"omb": "Analyse sans fin ; lucidité devenue cynisme ; coupure émotionnelle ; décroche silencieusement.",
"lk": "Discernement · Clarté · Sens",
"ok": "Sur-analyse · Cynisme · Distance",
"ql": "Quelle compréhension essentielle peux-tu extraire de cette situation sans rester prisonnier·ère de l’analyse ?",
"adj": "L’analyse produit une décision, une question juste ou un cadre utilisable.",
"qo": "Qu’est-ce que l’analyse te permettrait d’éviter de ressentir, choisir ou faire ici ?",
"rc": "img/arc/a07_recto.jpg",
"vs": "img/arc/a07_verso.jpg",
"pat": [
"SOLO",
"EVITE"
]
},
{
"id": "ARC-08",
"nom": "LE BISON",
"titre": "Le Bâtisseur Puissant",
"famille": "Structurant",
"territoire": "Puissance · Endurance · Construction · Détermination",
"lum": "Livre du solide ; endurance ; fiabilité ; concrétisation ; devient un socle.",
"omb": "Entêtement ; force écrasante ; néglige la régénération ; résiste au changement.",
"lk": "Puissance · Endurance · Construction",
"ok": "Entêtement · Écrasement · Surmenage",
"ql": "Que peux-tu construire ou soutenir avec constance ici sans forcer le système ?",
"adj": "La puissance est soutenable, proportionnée et laisse une place à l’ajustement.",
"qo": "Qu’est-ce que ta détermination chercherait à sécuriser en refusant de ralentir ou de changer ?",
"rc": "img/arc/a08_recto.jpg",
"vs": "img/arc/a08_verso.jpg",
"pat": [
"SURMENAGE",
"FORCE"
]
},
{
"id": "ARC-09",
"nom": "LA COLOMBE",
"titre": "Le Passeur de Lumière",
"famille": "Connecteur",
"territoire": "Universalité · Réconciliation · Mission · Élévation",
"lum": "Vision humaniste ; crée des ponts ; loyauté ; réconciliation.",
"omb": "Oubli de soi ; idéalisme ; exploitation énergétique ; désenchantement.",
"lk": "Réconciliation · Mission · Élévation",
"ok": "Sacrifice · Idéalisme · Désenchantement",
"ql": "Qu’est-ce qui peut être relié, réconcilié ou remis au service d’un sens plus grand ici ?",
"adj": "La mission n’efface ni les limites personnelles ni les réalités du terrain.",
"qo": "Qu’essaierais-tu de sauver ou d’harmoniser au point de t’oublier toi-même ?",
"rc": "img/arc/a09_recto.jpg",
"vs": "img/arc/a09_verso.jpg",
"pat": [
"FLOU",
"OUBLI"
]
},
{
"id": "ARC-10",
"nom": "LE RENARD",
"titre": "Le Stratège Créatif",
"famille": "Créateur",
"territoire": "Adaptabilité · Ingéniosité · Pensée latérale · Agilité",
"lum": "Trouve des solutions impossibles ; à l’aise dans l’incertitude ; négocie ; transforme les contraintes en leviers.",
"omb": "Devient insaisissable ; évitement ; manipulation ; chaos.",
"lk": "Ingéniosité · Agilité · Contournement",
"ok": "Évitement · Manipulation · Chaos",
"ql": "Quel détour intelligent ou quelle autre voie peux-tu créer ici sans contourner l’essentiel ?",
"adj": "La créativité stratégique résout le problème sans manipuler ni fuir la responsabilité.",
"qo": "Qu’est-ce que ton agilité chercherait à éviter en changeant sans cesse de voie ?",
"rc": "img/arc/a10_recto.jpg",
"vs": "img/arc/a10_verso.jpg",
"pat": [
"FLOU",
"EVITE",
"FORCE"
]
},
{
"id": "ARC-11",
"nom": "LE GORILLE",
"titre": "Le Sage Puissant",
"famille": "Structurant",
"territoire": "Sagesse incarnée · Force douce · Protection · Leadership silencieux",
"lum": "Autorité naturelle ; protection ; endurance ; intelligence émotionnelle.",
"omb": "Isolement ; devoir toxique ; intimidation ; frustration accumulée.",
"lk": "Force douce · Protection · Présence",
"ok": "Isolement · Intimidation · Devoir toxique",
"ql": "Comment peux-tu utiliser ta puissance ici pour sécuriser sans prendre toute la place ?",
"adj": "La force protège, contient et clarifie sans intimidation ni sacrifice silencieux.",
"qo": "Qu’est-ce que ton besoin de tenir ou protéger seul·e chercherait à éviter de demander ou de montrer ?",
"rc": "img/arc/a11_recto.jpg",
"vs": "img/arc/a11_verso.jpg",
"pat": [
"SOLO",
"FORCE"
]
},
{
"id": "ARC-12",
"nom": "L’ABEILLE",
"titre": "L’Architecte du Collectif",
"famille": "Structurant",
"territoire": "Organisation · Collectif · Efficacité systémique · Construction communautaire",
"lum": "Organise le chaos ; crée des systèmes autonomes ; fédère ; coordonne.",
"omb": "Se sacrifie pour la ruche ; rigidité/contrôle ; perd sa créativité individuelle ; désorientation si la mission s’effondre.",
"lk": "Organisation · Système · Collectif",
"ok": "Contrôle · Sacrifice · Perte d’identité",
"ql": "Quel système ou quelle coordination peut rendre le collectif plus autonome ici ?",
"adj": "L’organisation sert le vivant et le collectif sans contrôle excessif ni effacement individuel.",
"qo": "Qu’essaierais-tu de maintenir à tout prix si le système ou la mission menaçait de se désorganiser ?",
"rc": "img/arc/a12_recto.jpg",
"vs": "img/arc/a12_verso.jpg",
"pat": [
"FORCE",
"OUBLI"
]
},
{
"id": "ARC-13",
"nom": "LE SINGE",
"titre": "L’Explorateur Espiègle",
"famille": "Créateur",
"territoire": "Curiosité · Apprentissage · Expérimentation · Intelligence vive",
"lum": "Apprend et s’adapte vite ; énergie créative ; solutions originales ; transmission accessible.",
"omb": "Dispersion ; agitation ; imitation ; évitement de la profondeur.",
"lk": "Curiosité · Test · Apprentissage",
"ok": "Dispersion · Agitation · Surface",
"ql": "Quel test ou apprentissage concret peux-tu faire ici sans te disperser ?",
"adj": "L’exploration produit un apprentissage utile et ne saute pas constamment vers le prochain stimulus.",
"qo": "Qu’est-ce que ton besoin de nouveauté chercherait à éviter d’approfondir ?",
"rc": "img/arc/a13_recto.jpg",
"vs": "img/arc/a13_verso.jpg",
"pat": [
"FLOU"
]
},
{
"id": "ARC-14",
"nom": "LE LÉOPARD",
"titre": "Le Stratège Silencieux",
"famille": "Transformateur",
"territoire": "Stratégie · Patience · Action ciblée · Efficacité discrète",
"lum": "Repère les leviers cachés ; sang-froid ; discrétion compétitive ; résultats nets.",
"omb": "Enfermement ; froideur ; perfectionnisme paralysant ; déstabilisation par l’imprévu.",
"lk": "Patience · Précision · Levier",
"ok": "Froideur · Perfectionnisme · Contrôle",
"ql": "Quel levier précis mérite ton action ici plutôt qu’une agitation dispersée ?",
"adj": "La stratégie reste adaptable et ne se transforme pas en isolement ou immobilisme perfectionniste.",
"qo": "Qu’est-ce que l’attente parfaite ou la maîtrise totale essaierait de protéger ici ?",
"rc": "img/arc/a14_recto.jpg",
"vs": "img/arc/a14_verso.jpg",
"pat": [
"SURMENAGE",
"EVITE",
"FORCE"
]
},
{
"id": "ARC-15",
"nom": "LE FLAMANT ROSE",
"titre": "L’Esthète Rayonnant",
"famille": "Créateur",
"territoire": "Singularité · Esthétique · Rayonnement · Originalité assumée",
"lum": "Identité reconnaissable ; attire naturellement l’attention ; sens de l’audience ; crée des projets mémorables.",
"omb": "Dépend de la validation ; privilégie la forme au fond ; excès ; isolation.",
"lk": "Singularité · Beauté · Rayonnement",
"ok": "Validation · Excès · Forme sans fond",
"ql": "Comment ta singularité peut-elle donner une forme juste et mémorable à ce qui compte vraiment ici ?",
"adj": "La forme sert le fond et ne dépend pas entièrement du regard extérieur.",
"qo": "Qu’est-ce que ton besoin d’être reconnu·e ou singulier·ère chercherait à compenser ici ?",
"rc": "img/arc/a15_recto.jpg",
"vs": "img/arc/a15_verso.jpg",
"pat": [
"SURMENAGE",
"FLOU",
"FORCE"
]
},
{
"id": "ARC-16",
"nom": "LA FOURMI",
"titre": "L’Humble Bâtisseuse",
"famille": "Structurant",
"territoire": "Discipline · Travail collectif · Humilité productive · Persévérance",
"lum": "Livre toujours ; maintient l’effort dans la durée ; colonne vertébrale invisible des projets ; gère les détails ; garantit l’exécution.",
"omb": "S’efface jusqu’à disparaître ; attend la reconnaissance et accumule une frustration silencieuse ; rigidité des processus ; surmenage.",
"lk": "Discipline · Exécution · Persévérance",
"ok": "Effacement · Rigidité · Surmenage",
"ql": "Quel petit travail concret et régulier fera réellement avancer cette situation ?",
"adj": "La persévérance reste visible, soutenable et ouverte à l’amélioration du processus.",
"qo": "Qu’essaierais-tu de prouver ou de préserver en continuant à travailler sans te rendre visible ni ajuster le rythme ?",
"rc": "img/arc/a16_recto.jpg",
"vs": "img/arc/a16_verso.jpg",
"pat": [
"SURMENAGE",
"FORCE",
"OUBLI"
]
},
{
"id": "ARC-17",
"nom": "L’ARAIGNÉE",
"titre": "La Tisseuse de Mondes",
"famille": "Structurant",
"territoire": "Architecture invisible · Patience stratégique · Connexions profondes · Création de systèmes",
"lum": "Crée des infrastructures et des connexions stratégiques ; construit des systèmes durables.",
"omb": "Isolement ; immobilisme ; manipulation.",
"lk": "Architecture · Connexions · Système",
"ok": "Isolement · Immobilisme · Manipulation",
"ql": "Quels liens ou structures invisibles peux-tu tisser ici pour rendre l’ensemble plus cohérent ?",
"adj": "Les connexions servent le système sans enfermement, contrôle caché ni immobilisme.",
"qo": "Qu’est-ce que ton besoin de maîtriser le réseau ou d’attendre le bon moment chercherait à protéger ?",
"rc": "img/arc/a17_recto.jpg",
"vs": "img/arc/a17_verso.jpg",
"pat": [
"SOLO",
"EVITE",
"FORCE"
]
},
{
"id": "ARC-18",
"nom": "LA LIBELLULE",
"titre": "La Visionnaire du Moment",
"famille": "Créateur",
"territoire": "Légèreté · Transformation rapide · Vision multidimensionnelle · Agilité consciente",
"lum": "Agilité dans le changement ; apporte une perspective nouvelle ; transforme rapidement ; légèreté salvatrice.",
"omb": "Sous-estimation ; évite d’atterrir ; désengagement ; dispersion.",
"lk": "Agilité · Perspective · Transformation rapide",
"ok": "Dispersion · Désengagement · Non-atterrissage",
"ql": "Quel changement léger mais juste peux-tu introduire maintenant sans fuir l’atterrissage ?",
"adj": "La rapidité produit une transformation réelle et reste reliée à une suite concrète.",
"qo": "Qu’est-ce que ton besoin de légèreté ou de mouvement chercherait à éviter de stabiliser ?",
"rc": "img/arc/a18_recto.jpg",
"vs": "img/arc/a18_verso.jpg",
"pat": [
"FLOU",
"EVITE"
]
},
{
"id": "ARC-19",
"nom": "LA GIRAFE",
"titre": "La Visionnaire du Recul",
"famille": "Connecteur",
"territoire": "Vision long terme · Recul stratégique · Hauteur de vue · Diplomatie naturelle",
"lum": "Voit les tendances ; pense la stratégie durable ; sérénité dans la complexité.",
"omb": "Déconnexion du présent ; distance ; évitement ; frustration isolante.",
"lk": "Recul · Long terme · Diplomatie",
"ok": "Distance · Évitement · Déconnexion",
"ql": "Quelle distance juste te permet de voir plus loin sans perdre le contact avec le présent ?",
"adj": "Le recul éclaire une action ou une relation actuelle ; il ne devient pas détachement stérile.",
"qo": "Qu’est-ce que la hauteur de vue te permettrait d’éviter de vivre ou de traiter maintenant ?",
"rc": "img/arc/a19_recto.jpg",
"vs": "img/arc/a19_verso.jpg",
"pat": [
"SOLO",
"EVITE"
]
},
{
"id": "ARC-20",
"nom": "LA SOURIS",
"titre": "L’Exploratrice des Détails",
"famille": "Connecteur",
"territoire": "Observation fine · Discrétion · Intelligence des détails · Adaptabilité silencieuse",
"lum": "Repère les signaux faibles ; s’adapte ; fiabilité ; crée des relations profondes.",
"omb": "Effacement ; peur d’être vue ; accumulation non partagée ; ressentiment silencieux.",
"lk": "Détail · Signal faible · Discrétion",
"ok": "Effacement · Peur d’être vue · Ressentiment",
"ql": "Quel détail ou signal faible mérite d’être nommé ici avant qu’il devienne un problème plus grand ?",
"adj": "La finesse d’observation débouche sur une expression ou une action, pas sur l’effacement.",
"qo": "Qu’est-ce que ta discrétion chercherait à protéger en gardant pour toi ce que tu observes ?",
"rc": "img/arc/a20_recto.jpg",
"vs": "img/arc/a20_verso.jpg",
"pat": [
"SOLO",
"OUBLI"
]
},
{
"id": "ARC-21",
"nom": "LE LAPIN",
"titre": "L’Intuitif Fertile",
"famille": "Créateur",
"territoire": "Intuition · Fécondité créative · Sensibilité · Élan vital",
"lum": "Idées abondantes ; capte les besoins ; crée de la chaleur ; s’adapte.",
"omb": "Éponge émotionnelle ; peur paralysante ; dispersion ; besoin de sécurité.",
"lk": "Intuition · Fécondité · Sensibilité",
"ok": "Peur · Dispersion · Hyper-réceptivité",
"ql": "Quelle intuition mérite d’être transformée en quelque chose de concret ici ?",
"adj": "L’intuition est distinguée de la peur ambiante et mène à un choix ou un test.",
"qo": "Qu’est-ce que ton besoin de sécurité ou ta sensibilité absorberait au point de bloquer ton propre mouvement ?",
"rc": "img/arc/a21_recto.jpg",
"vs": "img/arc/a21_verso.jpg",
"pat": [
"FLOU",

"OUBLI"
]
},
{
"id": "ARC-22",
"nom": "L’OURS",
"titre": "Le Guérisseur Solitaire",
"famille": "Transformateur",
"territoire": "Régénération · Introspection · Force intérieure · Guérison par le retrait",
"lum": "Profondeur ; régénère les équipes ; résilience ; transforme les blessures en sagesse.",
"omb": "Isolement prolongé ; lenteur perçue comme indifférence ; blessures non montrées ; décalage.",
"lk": "Régénération · Retrait · Résilience",
"ok": "Isolement · Retrait prolongé · Blessure cachée",
"ql": "De quel retrait, silence ou temps de régénération as-tu réellement besoin ici, et pour revenir comment ?",
"adj": "Le retrait sert une régénération et prévoit un retour au lien ou à l’action.",
"qo": "Qu’est-ce que l’isolement te permettrait de ne pas montrer, demander ou affronter ici ?",
"rc": "img/arc/a22_recto.jpg",
"vs": "img/arc/a22_verso.jpg",
"pat": [
"SOLO",
"OUBLI"
]
},
{
"id": "ARC-23",
"nom": "LA SAUTERELLE",
"titre": "L’Audacieuse du Saut",
"famille": "Transformateur",
"territoire": "Saut · Instinct · Prise de risque intuitive · Courage du bond",
"lum": "Lance ; décide dans l’incertitude ; démarre ; teste, apprend, réajuste.",
"omb": "Saute sans discernement ; impatience ; instabilité ; dépendance à l’adrénaline.",
"lk": "Bond · Instinct · Risque",
"ok": "Impulsivité · Instabilité · Adrénaline",
"ql": "Quel saut limité mais réel mérite d’être tenté ici, avec suffisamment de discernement ?",
"adj": "Le risque est choisi, proportionné et suivi d’un atterrissage ou d’un apprentissage.",
"qo": "Qu’est-ce que l’envie de sauter immédiatement chercherait à éviter de préparer ou d’assumer ?",
"rc": "img/arc/a23_recto.jpg",
"vs": "img/arc/a23_verso.jpg",
"pat": [
"SURMENAGE",
"FLOU",
"FORCE"
]
},
{
"id": "ARC-24",
"nom": "LA TORTUE",
"titre": "La Sage du Temps Long",
"famille": "Structurant",
"territoire": "Patience · Ancrage · Sagesse du temps long · Endurance tranquille",
"lum": "Construit des fondations solides ; stabilité ; vision long terme ; expertise fiable.",
"omb": "Immobilisme ; résistance au changement ; sentiment de retard ; occasions manquées.",
"lk": "Patience · Ancrage · Long terme",
"ok": "Immobilisme · Retard · Résistance",
"ql": "Qu’est-ce qui mérite d’être consolidé lentement ici, sans confondre patience et immobilisme ?",
"adj": "Le temps long soutient un mouvement réel et reste capable de saisir une ouverture.",
"qo": "Qu’est-ce que la prudence ou le temps long essaierait de protéger en retardant encore le mouvement ?",
"rc": "img/arc/a24_recto.jpg",
"vs": "img/arc/a24_verso.jpg",
"pat": [
"EVITE"
]
},
{
"id": "ARC-25",
"nom": "LE COLIBRI",
"titre": "Le Maître de l’Essentiel",
"famille": "Créateur",
"territoire": "Précision · Beauté en mouvement · Énergie concentrée · Excellence dans le détail",
"lum": "Va à l’essentiel ; excellence ; impact concentré ; précision.",
"omb": "Perfectionnisme ; épuisement ; distance ; sélectivité excessive.",
"lk": "Essentiel · Précision · Concentration",
"ok": "Perfectionnisme · Épuisement · Sélectivité",
"ql": "Sur quoi ton énergie concentrée produirait-elle le plus d’impact ici ?",
"adj": "La précision sert l’essentiel sans perfectionnisme ni épuisement.",
"qo": "Qu’est-ce que ton exigence de précision chercherait à éviter de livrer, partager ou simplifier ?",
"rc": "img/arc/a25_recto.jpg",
"vs": "img/arc/a25_verso.jpg",
"pat": [
"SURMENAGE",
"EVITE"
]
},
{
"id": "ARC-26",
"nom": "LA CHAUVE-SOURIS",
"titre": "La Navigatrice de l’Invisible",
"famille": "Transformateur",
"territoire": "Perception subtile · Navigation dans l’inconnu · Courage de l’ombre · Révélation",
"lum": "Navigue l’incertitude ; identifie les dynamiques cachées ; nomme l’invisible ; transforme crises et passages sombres.",
"omb": "Isolement ; incompréhension ; confond profondeur et noirceur ; difficulté avec les environnements rationnels.",
"lk": "Invisible · Inconnu · Révélation",
"ok": "Isolement · Obscurité · Déconnexion du réel",
"ql": "Quel élément invisible ou non dit peux-tu reconnaître ici sans perdre le contact avec les faits ?",
"adj": "L’intuition subtile reste reliée à des indices observables et ouvre une possibilité.",
"qo": "Qu’est-ce que ton attrait pour l’invisible pourrait t’amener à surinterpréter ou à porter seul·e ?",
"rc": "img/arc/a26_recto.jpg",
"vs": "img/arc/a26_verso.jpg",
"pat": [
"SOLO"
]
},
{
"id": "ARC-27",
"nom": "LE PHÉNIX",
"titre": "Le Renaissant",
"famille": "Transformateur",
"territoire": "Renaissance · Transformation par l’épreuve · Transmission · Puissance régénératrice",
"lum": "Transforme les crises en leviers ; incarne la résilience ; transmet l’expérience ; recommence.",
"omb": "Addiction à la transformation ; intensité épuisante ; perte d’identité ; vide entre deux renaissances.",
"lk": "Renaissance · Résilience · Régénération",
"ok": "Intensité · Crise répétée · Perte d’identité",
"ql": "Qu’est-ce qui peut réellement renaître ici sans avoir besoin de tout détruire pour recommencer ?",
"adj": "La transformation conserve ce qui mérite de l’être et ne recherche pas la crise pour se sentir vivant.",
"qo": "Qu’est-ce que le besoin de renaître encore chercherait à éviter de stabiliser ou d’habiter durablement ?",
"rc": "img/arc/a27_recto.jpg",
"vs": "img/arc/a27_verso.jpg",
"pat": [
"SURMENAGE",
"OUBLI"
]
},
{
"id": "ARC-28",
"nom": "LE TAUREAU",
"titre": "L’Entrepreneur Incarné",
"famille": "Structurant",
"territoire": "Engagement total · Réalisation matérielle · Détermination · Puissance entrepreneuriale",
"lum": "Transforme les opportunités en revenus ; tient ses engagements ; stabilité ; construit des actifs durables.",
"omb": "Rigidité ; résistance au changement ; valeur personnelle liée aux résultats ; épuise les collaborateurs.",
"lk": "Réalisation · Engagement · Matérialisation",
"ok": "Rigidité · Résultat-identité · Épuisement",
"ql": "Qu’est-ce que tu peux rendre tangible et durable ici sans confondre ta valeur avec le résultat ?",
"adj": "La détermination produit du réel tout en restant adaptable et respectueuse des rythmes humains.",
"qo": "Qu’est-ce que la réussite matérielle ou le contrôle du résultat chercherait à prouver ou sécuriser ici ?",
"rc": "img/arc/a28_recto.jpg",
"vs": "img/arc/a28_verso.jpg",
"pat": [
"SURMENAGE",
"FORCE"
]
},
{
"id": "ARC-29",
"nom": "LE CYGNE",
"titre": "Le Diplomate Élégant",
"famille": "Connecteur",
"territoire": "Médiation · Intelligence politique · Diplomatie · Transformation des conflits en grâce",
"lum": "Transforme les conflits ; navigue les environnements complexes ; crée des alliances durables ; élève la qualité relationnelle.",
"omb": "Évitement ; sacrifie sa position ; vulnérabilité à la manipulation ; absence de position.",
"lk": "Médiation · Diplomatie · Alliance",
"ok": "Évitement · Auto-effacement · Manipulabilité",
"ql": "Comment peux-tu créer un espace de dialogue ici sans sacrifier ta propre position ?",
"adj": "La diplomatie protège le lien et la clarté de position en même temps.",
"qo": "Qu’est-ce que ton besoin de paix chercherait à éviter de dire ou de défendre ?",
"rc": "img/arc/a29_recto.jpg",
"vs": "img/arc/a29_verso.jpg",
"pat": [
"EVITE",
"OUBLI"
]
},
{
"id": "ARC-30",
"nom": "LE COQ",
"titre": "L’Éveilleur de Consciences",
"famille": "Guide",
"territoire": "Éveil · Annonce · Préparation du terrain · Semeur de possibles",
"lum": "Lance les cycles ; plante des graines ; donne un rythme collectif ; présence structurante.",
"omb": "Impose son rythme ; manque de reconnaissance ; rigidité rituelle.",
"lk": "Éveil · Annonce · Rythme",
"ok": "Rythme imposé · Besoin de reconnaissance · Ritualisation",
"ql": "Qu’est-ce qui a besoin d’être annoncé, réveillé ou préparé ici pour que le mouvement puisse commencer ?",
"adj": "L’annonce ouvre un cycle sans imposer le rythme ni réclamer la reconnaissance.",
"qo": "Qu’est-ce que ton besoin d’être entendu ou de donner le tempo chercherait à contrôler ici ?",
"rc": "img/arc/a30_recto.jpg",
"vs": "img/arc/a30_verso.jpg",
"pat": [
"FORCE"
]
}
];
  const D = window.ANIMAE_DATA; if(!D) return; window.ANIMAE_ARC = ARC;
  const norm = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[’']/g,"").toUpperCase().trim();
  D.archetypes = D.archetypes || [];
  ARC.forEach(c => { let a = D.archetypes.find(x => norm(x.nom) === norm(c.nom)); if(!a){ a = {}; D.archetypes.push(a); } Object.assign(a, c); });
})();

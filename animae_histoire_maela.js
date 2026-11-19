/* ANIMAE — Aventure jouable n°1 de MAËLA : « Entre deux maisons »
   CONTENU NOUVEAU (proposition V3 à valider par Dina Bus). Écrit à partir du Deck Personnages V0.2 :
   fil « Construire ↔ se redéfinir », tensions de Maëla, liens canon (Éléonore = tante, Inaya = via l'atelier,
   Gabriel = ancienne relation professionnelle), lieux canon (L'Atelier, Maison d'Éléonore, Café-librairie, Le Dehors),
   objet signature (foulard terracotta). Les Contextes et Défis cités sont ceux des decks (numéros canon).
   Jauges = les 4 Mondes : cap (MOI), liens (RELATIONS), ouvrage (ACTIVITÉS), elan (CORPS).
   Voies : C Conscience · A Action · L Alliance · D Adaptation. ombre:true = Maëla « porte seule ». */

const AVENTURES = window.AVENTURES || (window.AVENTURES = {});

AVENTURES.maela_1 = {
  heros:"maela", titre:"Entre deux maisons", duree:"15 à 20 minutes",
  accroche:"Dans trois jours, ce que Maëla a créé ouvre ses portes à l'Atelier. Elle porte tout. Jusqu'où ?",
  depart:{ elan:4, liens:3, ouvrage:2, cap:2 },
  flags:{ inaya:1, gabriel:0, verite:0, reduit:0, report:0, essentiel:"", foulard:"porté" },
  plan:["prologue","archetypes","lieu","lieu","gabriel","lieu","lieu","nuit","imprevu","lieu","final"],
  moments:["","Avant de repartir","Jour 1 · matin","Jour 1 · après-midi","Jour 2 · tôt le matin","Jour 2 · matin","Jour 2 · après-midi","Jour 2 · la nuit","Jour 3 · au réveil","Jour 3 · dernier après-midi","Le grand jour"],

  lieux:{
    ATELIER:{ nom:"L'Atelier", monde:"ACTIVITES", desc:"La grande fenêtre en trois parties. Les cartons. La liste." },
    ELEONORE:{ nom:"La maison d'Éléonore", monde:"RELATIONS", desc:"Ta tante. Le fauteuil vert. La maison où tu as grandi." },
    DEHORS:{ nom:"Le Dehors", monde:"CORPS", desc:"Le bord de mer. Marcher. Ne te coûte aucun Élan." },
    CARNET:{ nom:"Chez toi, le carnet", monde:"MOI", desc:"La table de la cuisine. Le carnet du tout premier jour." }
  },

  prologue:{ image:"maela_entre_deux_maisons.jpg", lieu:"Entre deux maisons",
    texte:`Trois jours. Dans trois jours, l'Atelier ouvre ses portes pour la première grande journée de ce que tu as créé.
Tu remontes la rue, un carton sous le bras, ton foulard terracotta noué autour du cou. Derrière toi, la maison d'Éléonore, où tu as grandi. Devant, l'Atelier, où tout se joue.
Ton téléphone vibre deux fois. Inaya : « Je peux aider ? » Puis Gabriel, que tu n'as pas vu depuis des années : « J'ai appris pour samedi. Si tu as besoin… »`,
    choix:[
      { t:"Répondre aux deux, sans ralentir : « Merci, je gère. »", voie:"A", ombre:true, fx:{elan:-1}, r:"Tu ranges le téléphone. Le carton te paraît un peu plus lourd.", s:"« Je gère » : deux mots qui ferment deux portes. Regarde ce qu'ils protègent." },
      { t:"T'arrêter à l'ombre du mur et relire les deux messages.", voie:"C", fx:{cap:1}, r:"Deux personnes ont pensé à toi ce matin. Tu ne l'avais pas vu comme ça.", s:"Tu t'es arrêtée. C'est rare chez quelqu'un qui porte un carton." },
      { t:"Répondre à Inaya : « Oui. Viens à l'Atelier. »", voie:"L", fx:{liens:1}, set:{inaya:1}, r:"Trois petits points, puis : « J'arrive !! »", s:"Tu as dit oui à quelqu'un de seize ans. Elle s'en souviendra." }
    ]},

  scenes:{
    ATELIER:[
      h => ({ titre:"La liste", ctx:12, defi:12, pnj:["inaya"],
        texte:`La liste est scotchée sur la grande fenêtre : vingt-trois lignes, de ton écriture. Inaya est déjà là, ses écouteurs autour du cou. Elle regarde la liste, puis toi.
« Dis-moi quoi faire. »`,
        choix:[
          { t:"Lui donner trois petites tâches. Garder le reste.", voie:"A", fx:{ouvrage:1}, set:{inaya:1}, r:"Elle plie des programmes en silence. C'est fait vite. Elle attend la suite.", s:"Tu as partagé le travail. Pas encore la responsabilité." },
          { t:"Lui confier l'accueil de samedi. En entier. À sa façon.", voie:"L", fx:{liens:1,ouvrage:1}, set:{inaya:2}, r:"Elle te regarde comme si tu venais de lui tendre des clés. « À ma façon ? Vraiment ? »", s:"Confier, c'est accepter que ce soit fait autrement. On verra si tu tiens." },
          { t:"« Assieds-toi, je vais te montrer. » Et tout faire toi-même.", voie:"A", ombre:true, fx:{ouvrage:2,elan:-1,liens:-1}, set:{inaya:0}, r:"Six lignes rayées en deux heures. Quand tu relèves la tête, Inaya a remis ses écouteurs.", s:"La liste avance. Inaya, elle, a reculé d'un pas." },
          { t:"Prendre un feutre et barrer avec elle ce qui n'est pas indispensable.", voie:"D", fx:{cap:1,ouvrage:1}, r:"Vingt-trois lignes deviennent quatorze. Inaya rit : « Les ballons, sérieux ? »", s:"Tu n'as rien fait de plus. Tu as fait moins, et c'est avancer aussi." }
        ]}),
      h => h.f.inaya === 2 ? ({ titre:"Autrement", ctx:10, defi:3, pnj:["inaya"],
        texte:`Tu pousses la porte et tu t'arrêtes. Inaya a tout déplacé. Plus d'estrade. Les tables en cercle. Tes panneaux, soigneusement empilés contre le mur.
« Comme ça, les gens se voient, dit-elle. Tu m'avais dit : à ma façon. »`,
        choix:[
          { t:"Tout remettre comme tu l'avais prévu.", voie:"A", ombre:true, fx:{liens:-2}, set:{inaya:0}, r:"Elle t'aide à replacer l'estrade, sans un mot. Puis elle prend son sac.", s:"Tu as repris ce que tu avais donné. Elle l'a compris avant toi." },
          { t:"Lui demander pourquoi le cercle. Et écouter jusqu'au bout.", voie:"C", fx:{cap:1,liens:1}, r:"« Parce que la dernière fois, personne n'osait parler. Toi, tu étais là-haut. » Tu n'avais jamais vu ta propre estrade d'en bas.", s:"Elle vient de te montrer ton projet depuis une autre place." },
          { t:"Garder son cercle. Y ajouter une seule chose à toi.", voie:"D", fx:{ouvrage:1,liens:1}, r:"Tu poses ton premier panneau au centre du cercle. Inaya hoche la tête : « Ok. Ça, ça marche. »", s:"Ni son idée, ni la tienne : la vôtre. C'est comme ça qu'un projet cesse d'appartenir à une seule personne." }
        ]}) : ({ titre:"Le mot sur la fenêtre", ctx:20, defi:9, pnj:[],
        texte:`L'Atelier est vide. Sur la grande fenêtre, à côté de ta liste, un papier plié. L'écriture ronde d'Inaya :
« Tu n'as pas vraiment besoin de moi. Bon courage pour samedi. »`,
        choix:[
          { t:"L'appeler tout de suite. Lui dire qu'elle a raison, et que tu as besoin d'elle.", voie:"L", fx:{liens:2}, set:{inaya:2}, r:"Un silence. Puis : « Tu me laisses vraiment faire, cette fois ? » Tu dis oui. Tu le penses presque.", s:"Demander de l'aide après l'avoir refusée demande plus de courage que la première fois." },
          { t:"Plier le mot dans ta poche. Finir seule ce qui reste.", voie:"A", ombre:true, fx:{ouvrage:2,elan:-1}, r:"À la tombée du jour, la liste est presque finie. Le mot est toujours dans ta poche.", s:"Tu as prouvé que tu pouvais le faire seule. Personne n'en doutait." },
          { t:"Relire le mot. Te demander depuis quand les gens partent en te souhaitant bon courage.", voie:"C", fx:{cap:2}, r:"Gabriel, autrefois, avait dit presque la même chose.", s:"Quand une phrase revient d'une personne à l'autre, elle ne parle plus seulement d'eux." }
        ]})
    ],
    ELEONORE:[
      h => ({ titre:"Le fauteuil vert", ctx:3, defi:6, pnj:["eleonore"],
        texte:`Éléonore t'attendait. La table est mise pour deux. Elle a sa broche, celle des grands jours, et elle te regarde poser ton sac sans t'asseoir.
« Mange. Et dis-moi une chose, ma fille : tu construis tout ça pour qui ? »`,
        choix:[
          { t:"T'asseoir. Manger vraiment. Une heure entière.", voie:"L", fx:{elan:2,liens:1}, r:"Du poisson, du riz, le bruit des couverts. Tu avais oublié que tu avais faim.", s:"Recevoir sans rendre tout de suite : tu viens de le faire. C'est plus difficile qu'il n'y paraît." },
          { t:"Répondre honnêtement : « Je ne sais plus. »", voie:"C", fx:{cap:2,liens:1}, set:{verite:1}, r:"Éléonore ne dit rien. Elle pose sa main sur la tienne. « Voilà une vraie réponse. »", s:"Tu as dit la phrase que tu évitais. Elle est moins lourde dehors que dedans." },
          { t:"« Pour tout le monde, tatie. Tout va bien. » Et repartir avec le plat.", voie:"A", ombre:true, fx:{elan:1,liens:-1,cap:-1}, r:"Elle emballe le plat dans un torchon. À la porte : « Tout le monde, ce n'est personne. »", s:"Tu as pris le repas et laissé la question. Elle t'attendra." }
        ]}),
      h => ({ titre:"La brochure", ctx:24, defi:13, pnj:["eleonore"],
        texte:`Sur la table basse, une brochure remplie au stylo bleu. Éléonore suit ton regard.
« Je me suis inscrite. Ça commence samedi matin. Je ne serai pas à ton ouverture avant midi. »
Tu comptais sur elle pour tenir la table d'accueil. Elle a soixante-huit ans et les yeux qui brillent.${h.f.verite ? `
Elle ajoute, plus bas : « Ce foulard, c'est moi qui te l'ai noué le jour où tu as commencé. Il n'est pas cousu à ton cou. »` : ""}`,
        choix:[
          { t:"Te réjouir pour elle. Vraiment. Même si ça te complique samedi.", voie:"L", fx:{liens:2,ouvrage:-1}, r:"« Tu me raconteras ? » Elle rit comme une jeune fille. Il te manque quelqu'un à l'accueil, et tu t'en fiches un peu.", s:"Tu viens de laisser quelqu'un que tu aimes ne pas être à ton service." },
          { t:"Lui demander de décaler d'une semaine.", voie:"A", ombre:true, fx:{liens:-1,ouvrage:1}, r:"Elle range la brochure dans un tiroir. « Bien sûr. » Le tiroir se ferme un peu trop doucement.", s:"Ton projet vient de coûter quelque chose à quelqu'un d'autre que toi." },
          { t:"« Comment tu fais, toi, pour recommencer ? »", voie:"C", fx:{cap:2}, r:"« Je ne recommence pas. Je continue autrement. Ce n'est pas pareil. »", s:"Continuer autrement. Garde cette phrase, elle pourrait servir avant samedi." }
        ]})
    ],
    DEHORS:[
      h => ({ titre:"Le bord de mer", ctx:13, defi:7, pnj:[],
        texte:`Le vent, le sel, tes sandales à la main. Pour la première fois de la journée, personne ne te demande rien.
Ton téléphone sonne. Un partenaire : il voudrait « juste ajouter un petit temps » dans le programme de samedi.`,
        choix:[
          { t:"Éteindre le téléphone. Marcher jusqu'au bout de la plage.", voie:"D", fx:{elan:2}, r:"Au bout, il y a un rocher plat. Tu t'y assois. Le monde ne s'est pas effondré.", s:"Tu as choisi ton corps avant ton programme. Note ce que ça t'a coûté : presque rien." },
          { t:"Répondre en marchant. Dire oui.", voie:"A", ombre:true, fx:{ouvrage:1,cap:-1}, r:"« Super, tu es géniale ! » Tu raccroches. La promenade est finie, tu le sais.", s:"Un oui de plus. Compte-les, d'ici samedi." },
          { t:"Répondre. Dire non, simplement.", voie:"C", fx:{cap:1,elan:1}, r:"« Ah. D'accord, pas de souci. » C'était donc possible.", s:"Une limite posée calmement. Personne n'est fâché. Retiens que c'était possible." }
        ]}),
      h => ({ titre:"Le muret", ctx:22, defi:11, pnj:[],
        texte:`Tu t'assois sur le muret, face à l'eau. Tu repenses au tout premier jour, quand ce projet n'était qu'une phrase dans un carnet.
Samedi approche. Si tu ne pouvais garder qu'une seule chose de cette journée, laquelle ?`,
        choix:[
          { t:"Les gens qui viendront. Qu'ils se sentent attendus.", voie:"L", fx:{cap:1,liens:1}, set:{essentiel:"gens"}, r:"Le reste — les panneaux, les horaires — vient de devenir du décor.", s:"Tu as choisi les personnes avant la forme. Ça va simplifier plusieurs décisions." },
          { t:"Que tout soit impeccable. Qu'on ne puisse rien te reprocher.", voie:"A", ombre:true, fx:{ouvrage:1,elan:-1}, set:{essentiel:"parfait"}, r:"Tu ressors la liste de ta poche. Il manque encore trois choses.", s:"« Qu'on ne puisse rien me reprocher. » À qui parles-tu, exactement ?" },
          { t:"Que ce soit encore toi. Que tu t'y reconnaisses.", voie:"C", fx:{cap:2}, set:{essentiel:"soi"}, r:"Tu ne sais pas encore ce que ça change. Mais ça change quelque chose.", s:"C'est la question de ta carte, Maëla : ce que tu construis correspond-il encore à celle que tu es devenue ?" }
        ]})
    ],
    CARNET:[
      h => ({ titre:"La première page", ctx:21, defi:1, pnj:[],
        texte:`La table de la cuisine, entre deux cartons. Tu ouvres le carnet à la première page. Ton écriture d'il y a quelques années, appliquée :
« Créer un endroit où les gens repartent plus grands qu'ils ne sont venus. »
Dessous, depuis, il n'y a plus que des listes.`,
        choix:[
          { t:"Écrire, sous la phrase, ce qui a changé depuis.", voie:"C", fx:{cap:2}, r:"Tu écris longtemps. La dernière ligne te surprend : « Moi aussi, je voulais repartir plus grande. »", s:"Tu viens de retrouver pour qui tu avais commencé. Tu étais dans la liste, au début." },
          { t:"Tourner la page et refaire le planning. Jusqu'à une heure du matin.", voie:"A", ombre:true, fx:{ouvrage:2,elan:-1}, r:"Le planning est parfait. Tu t'endors sur la table, le stylo à la main.", s:"Encore une liste sous la phrase. Elle commence à disparaître dessous." },
          { t:"Appeler quelqu'un et lire la phrase à voix haute.", voie:"L", fx:{liens:1,cap:1}, r:"Au bout du fil, un silence, puis : « C'est toujours ça, tu sais. On le sent. »", s:"Ce que tu ne peux plus voir seule, quelqu'un peut te le redire." }
        ]}),
      h => ({ titre:"Samedi en face", ctx:5, defi:17, pnj:[],
        texte:`Tu poses le carnet. Il faut regarder samedi en face, tel qu'il est : ce qui est prêt, ce qui ne l'est pas, et l'état dans lequel tu es.
Rien ne t'oblige à décider cette nuit. Mais une direction se dessine.`,
        choix:[
          { t:"Maintenir. Tout, comme prévu.", voie:"A", fx:{ouvrage:1}, r:"Tu soulignes « samedi » deux fois. C'est une décision, toi aussi tu peux t'y tenir.", s:"Maintenir est un choix, pas une habitude — à condition de l'avoir vraiment choisi." },
          { t:"Réduire : une demi-journée, trois temps forts, pas plus.", voie:"D", fx:{ouvrage:2,cap:1}, set:{reduit:1}, r:"Tu barres toute la colonne de droite. Ce qui reste tient dans une main.", s:"Tu as ajusté la forme pour garder le fond. C'est exactement ce qu'on appelle s'adapter." },
          { t:"T'autoriser une pensée interdite : et si tu reportais ?", voie:"C", fx:{cap:1,elan:1}, set:{report:1}, r:"Tu l'écris, pour voir : « Reporter ? » Le mot ne mord pas.", s:"Tu n'as rien décidé. Tu as seulement rouvert une porte que tu tenais fermée." }
        ]})
    ]
  },

  gabriel:{ titre:"La lampe ambrée", lieu:"Le Café-librairie", monde:"RELATIONS", ctx:1, defi:4, pnj:["gabriel"],
    texte:`Tu t'arrêtes au café-librairie pour un café à emporter. Sous la petite lampe ambrée, un homme lève les yeux de son livre. Gabriel. Sa vieille montre au poignet.
Vous avez travaillé ensemble pendant des années. Ça s'est mal terminé : tu faisais tout, il te l'a dit, tu ne lui as plus parlé.
« Je sais organiser une journée, Maëla. Laisse-moi la logistique de samedi. »`,
    choix:[
      { t:"Accepter. Lui tendre le double des clés.", voie:"L", fx:{ouvrage:2,liens:1}, set:{gabriel:1}, r:"Il prend les clés, regarde sa montre. « Huit heures samedi. J'y serai à sept. »", s:"Tu as laissé revenir quelqu'un de fiable. Le passé n'a pas eu besoin d'être réglé d'abord." },
      { t:"« C'est gentil. Mais c'est mon projet. »", voie:"A", ombre:true, fx:{liens:-1,elan:-1}, r:"Il referme son livre. « C'est exactement ce que tu disais à l'époque. »", s:"« Mon projet. » Il y a des années, la même phrase avait eu le même effet." },
      { t:"T'asseoir. Lui dire ce qui t'avait blessée, autrefois. Puis décider.", voie:"C", fx:{cap:1,liens:1,ouvrage:1}, set:{gabriel:1}, r:"Il t'écoute sans t'interrompre. « J'aurais dû le dire autrement. Mais je le pensais. » Tu lui tends les clés.", s:"Une vérité dite à la première personne, sans accuser. Le lien n'a pas cassé : il s'est remis à porter." }
    ]},

  nuit:{ titre:"Deux heures du matin", lieu:"Chez toi", monde:"MOI", ombre:true,
    texte:`Deux heures. Tu ne dors pas. Tu connais cette voix, elle parle bas et elle a toujours l'air raisonnable :
« Si tu ne le fais pas toi-même, ce ne sera pas fait. »
C'est ton Ombre. Elle n'est pas ton ennemie. Elle protège quelque chose.`,
    protege:[
      { t:"Ma place. Si je ne suis pas indispensable, que suis-je ?", k:"place" },
      { t:"Le projet. Personne n'y tient autant que moi.", k:"projet" },
      { t:"Les autres. Je ne veux décevoir personne.", k:"autres" }
    ],
    choix:[
      { t:"Te lever et travailler jusqu'à l'aube.", issue:"Subir l'automatisme", voie:"A", ombre:true, fx:{ouvrage:1,elan:-2}, r:"À six heures, deux lignes de plus sont rayées. Tes mains tremblent un peu sur la tasse.", s:"Tu as obéi à la voix. Regarde le prix : il est écrit sur ton corps, pas sur la liste." },
      { t:"Écrire trois lignes dans le carnet, puis te recoucher.", issue:"Réguler", voie:"D", fx:{elan:1,cap:1}, r:"« Ce n'est pas vrai que tout repose sur moi. C'est vrai que j'ai peur. » Tu dors avant d'avoir posé le stylo.", s:"Tu as répondu à ton Ombre sans lui obéir ni la chasser. C'est cela, réguler." },
      { t:"Envoyer un message, maintenant : « Je n'y arriverai pas seule. »", issue:"Demander appui", voie:"L", fx:{liens:2}, r:h=>h.f.gabriel ? "Éléonore répond à 2 h 04 : « Je sais, ma fille. Dors. On s'en occupe demain. »" : "C'est Gabriel qui répond, à 2 h 04 : « Je sais. Passe-moi les clés demain, je prends la logistique. »", apres:(h,fx)=>{ if(!h.f.gabriel){ h.f.gabriel=1; fx.ouvrage=(fx.ouvrage||0)+1; } }, s:"Tu l'as écrit. À deux heures du matin, à quelqu'un de réel. Peu de gens le font." }
    ]},

  imprevus:[
    { titre:"L'appel", lieu:"Au réveil", monde:"ACTIVITES", ctx:4, defi:8,
      texte:`Un numéro inconnu. Une radio locale : ils ont entendu parler de samedi et voudraient venir, avec un micro, t'interroger devant tout le monde.
C'est une chance. C'est aussi une chose de plus.`,
      choix:[
        { t:"Dire oui, et te préparer à parler.", voie:"A", fx:{ouvrage:-1,cap:1}, set:{radio:1}, r:"Tu notes l'heure. Ton cœur bat plus vite, et ce n'est pas seulement de la peur.", s:"Tu as accepté d'être vue. Une chose de plus à porter, mais celle-ci te ressemble." },
        { t:"Dire oui, et proposer qu'ils interrogent aussi ceux qui t'aident.", voie:"L", fx:{liens:1}, set:{radio:1}, r:"« Encore mieux », répond la journaliste.", s:"Tu as fait de la place dans la lumière. Elle n'en a pas moins brillé pour toi." },
        { t:"Dire non. Pas cette fois.", voie:"D", fx:{elan:1}, r:"« Une prochaine fois, alors. » Peut-être. Tu respires.", s:"Refuser une belle occasion pour tenir debout : c'est aussi tenir sa position." }
      ]},
    { titre:"L'eau", lieu:"Au réveil", monde:"ACTIVITES", ctx:23, defi:10,
      texte:`Un message à six heures : une fuite à l'Atelier. De l'eau sous la grande fenêtre, tout près des cartons de programmes.
Il faut quelqu'un sur place, tout de suite.`,
      choix:[
        { t:"Y courir toi-même.", voie:"A", ombre:true, fx:{elan:-1}, r:"Tu éponges à genoux pendant une heure. Les programmes sont sauvés. Ton dos, moins.", s:"Tu y es allée seule alors que deux personnes ont tes clés ou les auraient voulues." },
        { t:"Appeler quelqu'un et lui demander d'y aller.", voie:"L", fx:{liens:1}, r:h=>h.f.gabriel ? "Gabriel y est en dix minutes. « C'est réglé. Dors encore une heure. »" : h.f.inaya>=1 ? "Inaya y passe avant le lycée, avec sa mère et deux serpillières." : "Éléonore décroche à la première sonnerie. « J'y vais. J'ai encore les clés de tout, moi. »", s:"Tu as demandé avant de courir. Ce réflexe-là est nouveau." },
        { t:"Laisser quelques programmes prendre l'eau. On les réimprimera, ou pas.", voie:"D", fx:{ouvrage:-1,elan:1,cap:1}, r:"Tu finis ton café. C'est du papier.", s:"Tu as accepté une perte pour garder tes forces. Tout ne mérite pas d'être sauvé." }
      ]},
    { titre:"La rumeur", lieu:"Au réveil", monde:"RELATIONS", ctx:11, defi:20,
      texte:`À la boulangerie, on te reconnaît. « C'est vous, samedi, à l'Atelier ? Ma voisine vient. Et sa sœur. Tout le quartier en parle ! »
Tu ne t'y attendais pas. Ce que tu as créé existe déjà dans la bouche des autres.`,
      choix:[
        { t:"Sourire, remercier, et rester un moment à écouter ce qu'ils en disent.", voie:"C", fx:{cap:1,liens:1}, r:"Ils n'en disent pas ce que tu avais écrit sur les affiches. Ils en disent mieux.", s:"Ton projet a commencé à vivre sans toi. Écoute bien : c'est une bonne nouvelle." },
        { t:"Paniquer en silence : il faudra plus de chaises, plus de tout.", voie:"A", ombre:true, fx:{ouvrage:1,elan:-1}, r:"Tu repars avec ton pain et une nouvelle liste dans la tête.", s:"On t'a offert une joie, tu en as fait une tâche." },
        { t:"Leur demander un service : « Vous pourriez apporter des chaises ? »", voie:"L", fx:{liens:1,ouvrage:1}, r:"« Des chaises ? On en a douze ! » La boulangère note ton numéro.", s:"Tu as transformé des spectateurs en alliés. Il suffisait de demander." }
      ]},
    /* Événements nés de l'état de Maëla (ajout de conception, textes à valider) : ils remplacent le dé quand la situation s'y prête. */
    { titre:"Ce que tu sais, tu ne le dis pas", lieu:"Au réveil", monde:"MOI", cond:h=>h.j.cap>=4 && h.j.liens<=2,
      texte:`Au réveil, une phrase dans ta tête, nette comme une pierre : tu sais exactement ce que tu veux de samedi. Ce n'est pas ce qui est écrit sur les affiches.
Et tu réalises que personne ne le sait. Tu n'as laissé personne assez près pour l'entendre.`,
      choix:[
        { t:"La dire à voix haute à la première personne que tu croises.", voie:"L", fx:{liens:1}, r:"C'est la boulangère. Elle t'écoute, un peu surprise, puis dit : « Ben voilà. Pourquoi tu l'écris pas sur les affiches ? »", s:"Savoir ce qu'on veut ne suffit pas. Le dire est ce qui permet aux autres de venir y mettre leur part." },
        { t:"L'écrire dans un message pour Inaya et Gabriel, tout de suite.", voie:"C", fx:{liens:1,cap:1}, r:"Tu appuies sur envoyer avant d'avoir relu. Deux petits points apparaissent, puis disparaissent, puis reviennent.", s:"Tu as mis ta clarté en circulation. Elle t'appartient moins, et elle compte davantage." },
        { t:"La garder pour toi. Tu sais où tu vas, c'est suffisant.", voie:"A", ombre:true, fx:{ouvrage:1,liens:-1}, r:"Tu avances, sûre de toi, sans personne à tes côtés. Le matin est efficace et très silencieux.", s:"Une direction claire qu'on ne partage pas devient une solitude bien organisée." }
      ]},
    { titre:"Le trop-plein", lieu:"Au réveil", monde:"CORPS", cond:h=>h.j.ouvrage>=4 && h.j.elan<=2,
      texte:`Presque tout est prêt. Il reste une dizaine de petites choses. Et ton corps, ce matin, ne répond plus comme avant : les mains qui tremblent, une pesanteur derrière les yeux.
Tu es à deux pas du but. C'est là qu'on se casse, d'habitude.`,
      choix:[
        { t:"Tout finir aujourd'hui, coûte que coûte.", voie:"A", ombre:true, fx:{ouvrage:1,elan:-2}, r:"Tu finis. Tu es debout, tu es prête, et tu ne sens plus tes jambes.", s:"Arriver au bout vide, c'est arriver. Mais ce qui reste à samedi, c'est toi." },
        { t:"Choisir trois choses seulement. Le reste ne sera pas fait.", voie:"D", fx:{elan:1,cap:1,ouvrage:-1}, r:"Tu rayes sept lignes d'un seul trait. Elles ne manqueront à personne. Tu respires.", s:"Renoncer à ce qui ne compte pas libère l'énergie pour ce qui compte." },
        { t:"Appeler quelqu'un : « Il me reste ça, tu peux le prendre ? »", voie:"L", fx:{liens:1,elan:1}, r:"« Envoie-moi la liste. » Un silence, puis : « Tu aurais dû appeler plus tôt. »", s:"Demander tard est encore demander. Le plus dur a été de penser que c'était permis." }
      ]},
    { titre:"Les bras qui attendent", lieu:"Au réveil", monde:"ACTIVITES", cond:h=>h.j.liens>=4 && h.j.ouvrage<=2,
      texte:`Quatre messages avant huit heures : « Je suis dispo. » « Dis-moi quoi faire. » « Je peux venir cet après-midi. »
Tu as des gens prêts à t'aider. Et tu ne leur as rien préparé à faire.`,
      choix:[
        { t:"Faire la liste avec eux, tout de suite, au téléphone.", voie:"L", fx:{ouvrage:2,liens:1}, r:"Ensemble, la liste de vingt-trois lignes devient quatre colonnes avec des prénoms. Tu n'avais jamais vu ton projet à plusieurs.", s:"Les bras étaient là. Il manquait des tâches prêtes à être confiées." },
        { t:"Leur donner une seule tâche, simple, à chacun.", voie:"D", fx:{ouvrage:1,cap:1}, r:"Quatre tâches, quatre mercis. C'est peu, et c'est la première fois que le projet bouge sans toi.", s:"Commencer petit est une façon de faire confiance sans tout lâcher." },
        { t:"Répondre merci, ça ira, et faire seule.", voie:"A", ombre:true, fx:{ouvrage:1,liens:-1}, r:"Tu avances un peu, seule, avec quatre messages sans réponse. Quelqu'un a lu, et n'a pas insisté.", s:"Refuser une aide offerte coûte parfois plus que ce qu'elle aurait pris." }
      ]}
  ],

  stop:{ titre:"Le corps dit stop", lieu:"Là où tu es", monde:"CORPS",
    texte:`Tu te lèves, et le sol tangue. Tu te rassois. Tes jambes ne discutent plus.
Ce moment de la journée ne t'appartient pas : ton corps vient de le prendre.`,
    r:"Tu dors trois heures d'un sommeil sans rêve. Ce que tu devais faire n'a pas été fait. Tu es toujours là.",
    s:"Ton corps a fait ce que tu refusais de faire : il a posé une limite. Écoute-le avant qu'il ne recommence." },

  finals:[
    { id:"prevu", t:"Ouvrir, comme prévu.", cond:h=>true, note:h=>h.ouvrageEff>=5?"":"Tout n'est pas prêt : ce sera serré." },
    { id:"autre", t:"Ouvrir autrement : plus petit, plus simple, plus vrai.", cond:h=>h.f.reduit||h.j.cap>=4, verrou:"Il te faudrait y voir plus clair (Cap) ou avoir déjà réduit le programme." },
    { id:"relais", t:"Ouvrir la porte, puis passer le relais — et ton foulard.", cond:h=>(h.f.inaya===2||h.f.gabriel)&&h.j.liens>=4, verrou:"Il faudrait quelqu'un à qui tu as vraiment confié une part, et des Liens solides." },
    { id:"report", t:"Reporter. Appeler chacun, toi-même.", cond:h=>h.f.report, verrou:"Tu ne t'es jamais autorisée à y penser." }
  ],

  epilogues:{
    corps:{ titre:"Le corps a décidé", statut:"Aboutissement ouvert",
      texte:h=>`Samedi matin, tu ouvres la porte de l'Atelier, et tu t'assois sur la première chaise. Tu n'iras pas plus loin aujourd'hui.
Les gens arrivent quand même. Quelqu'un fait du café. Quelqu'un lit ta phrase, sur le premier panneau. La journée a lieu, de travers, sans toi au milieu.
Tu la regardes depuis ta chaise. C'est la première fois que tu vois ce que tu as construit.` },
    seule:{ titre:"Seule sur l'estrade", statut:"Aboutissement atteint",
      texte:h=>`Tout est impeccable. Les panneaux, les horaires, ton discours. On t'applaudit longtemps.
Le soir, tu ranges les chaises une par une. Personne n'est resté : personne ne savait où étaient les choses.
Tu as réussi. Tu dénoues ton foulard, et tu te demandes combien de samedis comme celui-là tu as encore en toi.` },
    partage:{ titre:"L'ouverture partagée", statut:"Aboutissement atteint",
      texte:h=>`Samedi, l'Atelier est plein. ${h.f.gabriel?"Gabriel est arrivé à sept heures, comme promis. ":""}${h.f.inaya===2?"À l'accueil, Inaya connaît déjà tous les prénoms. ":""}Tu parles peu. Tu circules.
À un moment, tu t'aperçois que tout fonctionne et que tu ne fais rien. Tu attends la panique. Elle ne vient pas.
Le soir, vous rangez à plusieurs. Quelqu'un dit : « On remet ça quand ? » — et ce « on » te fait monter les larmes aux yeux.` },
    autre:{ titre:"Une autre forme", statut:"Aboutissement en mouvement",
      texte:h=>`Pas d'estrade. Une demi-journée, trois temps, des chaises en cercle. Ce n'est pas la journée que tu avais annoncée.
C'est mieux : c'est celle que tu peux porter. ${h.f.essentiel==="gens"?"Les gens se sentent attendus, et c'était l'essentiel. ":""}${h.f.essentiel==="soi"?"Et tu t'y reconnais, enfin. ":""}
En partant, une femme te dit : « C'était simple. Ça fait du bien. » Tu notes la phrase dans le carnet, sous la première. Le projet vient de changer de forme. Toi aussi.` },
    relais:{ titre:"Le relais", statut:"Aboutissement atteint",
      texte:h=>`Tu ouvres la porte, tu dis trois phrases, et tu te tournes vers ${h.f.inaya===2?"Inaya":"Gabriel"}.
Tu dénoues ton foulard terracotta. ${h.f.inaya===2?"Tu le noues à son poignet. Elle ne dit rien : elle se redresse.":"Tu le poses sur la table d'accueil, entre vous deux. Il comprend."}
Puis tu vas t'asseoir dans le cercle, parmi les autres. De là, tu vois ce que tu as construit continuer sans tes mains. Tu ne savais pas que c'était cela, accomplir.` },
    report:{ titre:"Le report choisi", statut:"Aboutissement en mouvement",
      texte:h=>`Tu appelles tout le monde, toi-même, un par un. « Ce sera dans un mois. Je veux le faire bien, et je veux être debout. »
Tu attendais des reproches. On te répond : « Tu as raison. » « Prends soin de toi. » « On sera là. »
Samedi, tu dors jusqu'à dix heures. Puis tu vas voir la mer. Le projet n'est pas mort : il t'attend, et pour la première fois ce n'est pas l'inverse.` }
  },
  retour:"Ce que tu construis correspond-il toujours à la personne que tu es devenue en le construisant ?"
};

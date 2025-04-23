type TermsContent = {
  viewTitle: string;
  content: Array<{
    title: string;
    sections: Array<{
      title?: string;
      content: string;
    }>;
  }>;
};

type TermsData = {
  use: TermsContent;
  sale: TermsContent;
};

const useTerms = [
  {
    title: "Objet des CGU",
    sections: [
      {
        content:
          "Les présentes Conditions Générales d'Utilisation (CGU)" +
          "régissent l'accès et l'utilisation de la plateforme BrewBuddy," +
          " une application destinée à accompagner les brasseurs" +
          "amateurs dans la création et le suivi de leurs recettes de bière." +
          "En accédant à l'application, l'utilisateur accepte les" +
          "présentes CGU dans leur intégralité.",
      },
    ],
  },
  {
    title: "Accès à la plateforme",
    sections: [
      {
        title: "Conditions d'accès",
        content:
          "L'accès à la plateforme est réservé aux utilisateurs majeurs" +
          " (18ans ou plus) conformément à la réglementation sur l'alcool." +
          " Un système de vérification d'âge est en place " +
          "lors de l'inscription.",
      },
      {
        title: "Compatibilité technique",
        content:
          "L'utilisateur doit disposer d'un appareil compatible avec " +
          "l'application et des équipements nécessaires pour utiliser les " +
          "fonctionnalités, comme le boîtier IoT.",
      },
      {
        title: "Création de compte",
        content:
          " L'inscription est obligatoire pour accéder à certaines " +
          "fonctionnalités, notamment la gestion des recettes et " +
          "l'utilisation du boîtier IoT.",
      },
    ],
  },
  {
    title: "Droits et devoirs des utilisateurs",
    sections: [
      {
        title: "Droits des utilisateurs",
        content:
          "Consulter, créer et enregistrer des recettes. Utiliser les " +
          "fonctionnalités IoT associées au boîtier connecté.",
      },
      {
        title: "Obligations des utilisateurs",
        content:
          "Fournir des informations exactes lors de l'inscription. Ne pas " +
          "utiliser la plateforme à des fins illicites. Respecter les droits " +
          "de propriété intellectuelle.",
      },
    ],
  },
  {
    title: "Propriété intellectuelle",
    sections: [
      {
        title: "Propriété des recettes",
        content:
          "Les recettes soumises par les utilisateurs restent " +
          "leur propriété, mais l'utilisateur accorde à Brew Buddy " +
          "un droit non exclusif pour les intégrer à la bibliothèque " +
          "de recettes.",
      },
      {
        title: "Marque et design",
        content:
          'La marque "Brew Buddy" et le design du boîtier ' +
          "IoT sont protégés par les lois sur la propriété intellectuelle.",
      },
    ],
  },
  {
    title: "Limitation de responsabilité",
    sections: [
      {
        title: "Responsabilité liée au boîtier IoT",
        content:
          "Brew Buddy décline toute responsabilité en cas d'utilisation " +
          "non conforme du boîtier IoT. Les utilisateurs doivent lire " +
          " et respecter les consignes de sécurité.",
      },
      {
        title: "Disponibilité du service",
        content:
          "Brew Buddy s'efforce de maintenir la plateforme accessible " +
          "en permanence, mais ne peut garantir l'absence d'interruptions.",
      },
    ],
  },
  {
    title: "Protection des données personnelles",
    sections: [
      {
        title: "Collecte des données",
        content:
          "Les données personnelles sont collectées dans le respect du RGPD.",
      },
      {
        title: "Droits des utilisateurs",
        content:
          "Les utilisateurs disposent d'un droit d'accès, de modification, " +
          "et de suppression de leurs données via leur compte " +
          "ou en contactant support@brewbuddy.com",
      },
    ],
  },
];

const saleTerms = [
  {
    title: "Identification du vendeur",
    sections: [
      {
        content:
          "La boutique en ligne Brew Buddy est exploitée par " +
          "[Nom de l'entité ou de l'étudiant], " +
          "dans le cadre d'un projet étudiant.\n" +
          "Adresse : [Adresse fictive ou celle de l'établissement scolaire]\n" +
          "Email : support@brewbuddy.com\n" +
          "Numéro de téléphone : [Téléphone fictif ou non requis]",
      },
    ],
  },
  {
    title: "Objet des CGV",
    sections: [
      {
        content:
          "Les présentes Conditions Générales de Vente (CGV) " +
          "définissent les modalités de vente des produits proposés sur " +
          "la boutique en ligne de Brew Buddy, notamment le boîtier IoT. " +
          "En passant commande, l'acheteur accepte " +
          "les présentes CGV sans réserve.",
      },
    ],
  },
  {
    title: "Produits et services",
    sections: [
      {
        title: "Description des produits",
        content:
          "Le boîtier IoT proposé est décrit avec la plus grande " +
          " précision possible dans sa fiche produit (fonctionnalités, " +
          "compatibilité, prix). Les photographies et descriptions " +
          "sont fournies à titre indicatif et n'ont " +
          "pas de valeur contractuelle.",
      },
      {
        title: "Disponibilité",
        content:
          "Les produits sont proposés dans la limite des stocks disponibles. " +
          "En cas d'indisponibilité après commande, l'acheteur sera informé " +
          "et remboursé sous 14 jours.",
      },
    ],
  },
  {
    title: "Commandes",
    sections: [
      {
        title: "Processus de commande",
        content:
          "L'acheteur sélectionne les produits, les ajoute à son panier, " +
          "et valide sa commande après avoir accepté les présentes CGV.",
      },
      {
        title: "Informations requises",
        content:
          "L'acheteur doit fournir des informations exactes pour " +
          "traiter la commande. Brew Buddy ne pourra être tenu responsable " +
          "en cas d'erreur de saisie.",
      },
    ],
  },
  {
    title: "Prix et paiement",
    sections: [
      {
        title: "Prix",
        content:
          "Les prix sont indiqués en euros, toutes taxes comprises (TTC). " +
          "Les frais de livraison sont précisés avant la validation " +
          "de la commande.",
      },
      {
        title: "Modalités de paiement",
        content:
          "Le paiement est sécurisé et peut être effectué par carte " +
          "bancaire ou tout autre moyen proposé sur la boutique. Toutes les " +
          "transactions sont conformes aux normes PCI-DSS.",
      },
    ],
  },
  {
    title: "Livraison",
    sections: [
      {
        title: "Délais et frais",
        content:
          "Les commandes sont expédiées sous [délai] " +
          "après validation du paiement. Les frais de livraison " +
          "sont précisés lors de la commande et varient selon le mode choisi.",
      },
      {
        title: "Responsabilité",
        content:
          "Brew Buddy ne peut être tenu responsable des retards ou " +
          "défauts de livraison causés par le transporteur.",
      },
    ],
  },
  {
    title: "Droit de rétractation",
    sections: [
      {
        title: "Délai et conditions",
        content:
          "L'acheteur dispose de 14 jours pour exercer son droit " +
          "de rétractation sans avoir à justifier de motif. " +
          "Les produits doivent être retournés en parfait état " +
          "dans leur emballage d'origine.",
      },
      {
        title: "Remboursement",
        content:
          "Brew Buddy remboursera l'acheteur sous 14 jours " +
          "après réception du produit retourné.",
      },
    ],
  },
];

const terms: TermsData = {
  use: { viewTitle: "Conditions générales d'utilisation", content: useTerms },
  sale: { viewTitle: "Conditions générales de vente", content: saleTerms },
};

/* exports */
export { terms };
export type { TermsData };

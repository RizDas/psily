// lib/rules.ts
// Data for "Our Constitution" — app/rules/page.tsx reads from this file.
// Each article has a concise main provision (always visible) and an
// extended version made of five titled clauses (revealed on click).

export interface RuleSection {
  title: string;
  text: string;
}

export interface RuleArticle {
  numeral: string; // "0", "I", "II", ...
  title: string;
  provision: string; // the concise, always-visible rule
  sections: RuleSection[]; // exactly five clauses
}

export const ARTICLES: RuleArticle[] = [
  {
    numeral: "0",
    title: "On Mutual Love and Respect",
    provision:
      "We shall cherish, love, and honor one another with unwavering respect, tenderness, and devotion. We belong to one another, unconditionally and without reserve. Every Article that follows is built upon this single truth.",
    sections: [
      {
        title: "The Principle",
        text: "The Parties acknowledge that love and respect form the foundation of this Union and shall remain paramount in all interactions, decisions, and circumstances pertaining thereto.",
      },
      {
        title: "The Responsibility",
        text: "Each Party shall endeavor to express genuine affection, exercise kindness, uphold the dignity of the other, and conduct themselves in a manner befitting a relationship founded upon mutual care, trust, and esteem. Neither Party shall knowingly engage in conduct intended to demean, belittle, humiliate, or disregard the other.",
      },
      {
        title: "The Interpretation",
        text: "For the purposes of this Article, respect shall include consideration for each other's emotions, opinions, boundaries, and individuality, while love shall be understood as a continuing commitment to each other's well-being, happiness, and growth.",
      },
      {
        title: "The Exception",
        text: "Temporary disagreements, frustration, or emotional distress shall not constitute a breach of this Article, provided that both Parties make sincere efforts to restore harmony, understanding, and mutual regard within a reasonable time.",
      },
      {
        title: "Spirit of the Article",
        text: "This Article shall serve as the guiding principle of this Union. Every Article hereinafter set forth derives its meaning and force from the Parties' mutual acknowledgment that they belong to one another, unconditionally and without reserve.",
      },
    ],
  },
  {
    numeral: "I",
    title: "On Mutual Priority and Devotion",
    provision:
      "We shall always choose one another, holding each other close at heart and above all that is not truly essential.",
    sections: [
      {
        title: "The Principle",
        text: "The Parties acknowledge that an enduring Union requires mutual prioritization and affirm that this relationship shall remain of primary importance in their lives.",
      },
      {
        title: "The Obligation",
        text: "Each Party shall devote adequate time, attention, care, and emotional presence to the other and shall endeavor to ensure that neither feels neglected or secondary to avoidable distractions.",
      },
      {
        title: "The Interpretation",
        text: "Prioritization shall not require the abandonment of personal, familial, academic, professional, or health-related obligations, but shall signify a consistent willingness to value and accommodate the importance of the other Party.",
      },
      {
        title: "The Exception",
        text: "Temporary inability to accord immediate priority due to unavoidable circumstances shall not constitute a breach of this Article, provided that such circumstances are communicated in good faith.",
      },
      {
        title: "Spirit of the Article",
        text: "This Article embodies the understanding that the Parties shall continually choose one another as a lasting expression of commitment, affection, and devotion.",
      },
    ],
  },
  {
    numeral: "II",
    title: "On Reconciliation Through Communication",
    provision:
      "No anger, disagreement, or passing storm shall keep us apart for long; we shall always find our way back to one another through honest words and open hearts.",
    sections: [
      {
        title: "The Principle",
        text: "The Parties acknowledge that disagreements are natural within an enduring Union, but affirm that no conflict shall supersede their commitment to understanding and reconciliation.",
      },
      {
        title: "The Obligation",
        text: "Each Party shall make a sincere effort to re-establish communication, express concerns honestly, listen openly, and work together toward resolution.",
      },
      {
        title: "The Interpretation",
        text: "Reconciliation shall include honest dialogue, understanding, apology where warranted, forgiveness where possible, and the restoration of goodwill. Reasonable personal space shall not be deemed avoidance.",
      },
      {
        title: "The Exception",
        text: "Time required for reflection, emotional composure, or unavoidable obligations may reasonably delay discussion, provided the matter is revisited within a reasonable time.",
      },
      {
        title: "Spirit of the Article",
        text: "This Article embodies the understanding that conflicts are challenges to be faced together, not battles to be won, and that no disagreement shall outweigh the preservation of this Union.",
      },
    ],
  },
  {
    numeral: "III",
    title: "On Truthfulness and Complete Disclosure",
    provision:
      "We shall always be truthful and open with one another, knowing that even the bitterest truth is kinder than the sweetest lie.",
    sections: [
      {
        title: "The Principle",
        text: "The Parties acknowledge that trust is a cornerstone of this Union and shall be preserved through honesty and openness.",
      },
      {
        title: "The Obligation",
        text: "Neither Party shall knowingly lie, deceive, conceal, or withhold any matter that may reasonably affect the trust, understanding, or well-being of the other, notwithstanding any belief that disclosure may cause temporary hurt.",
      },
      {
        title: "The Interpretation",
        text: "A difficult truth conveyed with sincerity shall always be preferred to any falsehood, half-truth, misleading statement, or deliberate omission.",
      },
      {
        title: "The Exception",
        text: "Harmless nondisclosure for surprises, gifts, celebrations, or similar acts of affection shall not constitute a breach of this Article.",
      },
      {
        title: "Spirit of the Article",
        text: "This Article embodies the understanding that temporary pain caused by an honest truth is less harmful to this Union than the lasting damage caused by deception, however well-intentioned.",
      },
    ],
  },
  {
    numeral: "IV",
    title: "On Open Expression and Complete Clarity",
    provision:
      "We shall speak our hearts freely, sharing every concern, feeling, and wish, however small, for love grows through understanding, not silent guessing.",
    sections: [
      {
        title: "The Principle",
        text: "The Parties acknowledge that mutual understanding is best achieved through clear and honest communication and that neither Party is expected to discern unspoken thoughts or feelings.",
      },
      {
        title: "The Obligation",
        text: "Each Party shall communicate any concern, expectation, insecurity, or grievance, however small, and shall not allow unexpressed feelings to foster misunderstanding or resentment.",
      },
      {
        title: "The Interpretation",
        text: "The failure of one Party to recognize an uncommunicated issue shall not, by itself, constitute neglect or indifference. Expectations, needs, and boundaries are to be expressed openly and in good faith.",
      },
      {
        title: "The Exception",
        text: "A Party may take reasonable time to reflect or regain emotional composure, provided that the matter is addressed within a reasonable time.",
      },
      {
        title: "Spirit of the Article",
        text: "This Article embodies the understanding that sincere communication shall always be preferred over assumptions, silent resentment, or attempts at mind-reading.",
      },
    ],
  },
  {
    numeral: "V",
    title:
      "On Maintaining Appropriate Boundaries with Prior and Potential Romantic Interests",
    provision:
      "To preserve the trust, peace, and exclusivity of our bond, we shall choose one another over ties that may awaken doubt, insecurity, or fear in each others' hearts.",
    sections: [
      {
        title: "The Principle",
        text: "The Parties acknowledge that trust, emotional security, and exclusivity are strengthened by maintaining clear and respectful boundaries.",
      },
      {
        title: "The Obligation",
        text: "Neither Party shall knowingly maintain personal relationships or discretionary communication with individuals who might harbor, or have harbored, romantic interest in either Party, or toward whom either Party may have previously held romantic affections.",
      },
      {
        title: "The Interpretation",
        text: "Ordinary courtesy, unavoidable interactions, professional or academic correspondence, and familial associations shall not constitute a violation of this Article.",
      },
      {
        title: "The Exception",
        text: "Communication necessitated by unavoidable circumstances may be maintained, provided that it remains appropriate and reasonably limited.",
      },
      {
        title: "Spirit of the Article",
        text: "This Article embodies the understanding that the Parties shall willingly forgo discretionary associations that may give rise to insecurity or doubt, thereby preserving the trust, reassurance, and exclusivity of this Union.",
      },
    ],
  },
];

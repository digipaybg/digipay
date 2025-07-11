<script lang="ts">
type Schedule = {
  title: string;
  hours: string;
  type: "event" | "talks";
  talks?: Talk[];
};

type Talk = {
  title: string;
  organization: string;
  speakers: {
    name: string;
    position: string;
  }[];
};

const schedule: Schedule[] = [
  {
    title: "Registration",
    hours: "08:30 - 09:30",
    type: "event",
  },
  {
    title: "Opening Speeches",
    hours: "09:30 - 10:15",
    type: "talks",
    talks: [
      {
        title: "PSD3 / Fraud Data Sharing",
        organization: "European Commission",
        speakers: [
          {
            name: "Mairead McGuinness",
            position:
              "Commissioner, Directorate-General for Financial Stability",
          },
          {
            name: "John Berrigan",
            position: "Director General, FISMA",
          },
        ],
      },
      {
        title: "Payments in the Eurozone, SEPA INST, New Regulations",
        organization: "Bulgarian National Bank",
        speakers: [
          {
            name: "Dimitar Radev",
            position: "Governor, Bulgarian National Bank",
          },
          {
            name: "Petar Cobanov",
            position: "Deputy Governor, Banking Department",
          },
        ],
      },
    ],
  },
  {
    title:
      "Panel 1: Data Sharing Against Fraud, Solutions for Fraud Prevention",
    hours: "10:30 - 11:30",
    type: "talks",
    talks: [
      {
        title: "Fraud in Fintech – Bank and Fintech Company",
        organization: "GDCOC, IBS, BORICA, Printec Group, Socyber, Fram",
        speakers: [
          {
            name: "Svetlin Lazarov",
            position:
              "Commissioner, Head of Cyber Intelligence and Digital Forensics, GDCOC",
          },
          {
            name: "Goran Angelov",
            position: "Founder, IBS",
          },
          {
            name: "Svilen Stanchev",
            position: "BDM, IBS",
          },
          {
            name: "Albena Petkova",
            position: "Director Anti-Fraud and AML Services, BORICA",
          },
          {
            name: "Svetoslav Paskalev",
            position: "CEO, Printec Group",
          },
          {
            name: "Krasimir Kotsev",
            position: "Founder, Socyber",
          },
          {
            name: "Marina Schideroff",
            position: "Founder, Fram Creative Solutions",
          },
        ],
      },
    ],
  },
  {
    title: "Panel 2: Digital Wallet in Force",
    hours: "11:30 - 12:15",
    type: "debate",
    talks: [
      {
        title: "Payment Sovereignty in a Geopolitical Context",
        organization: "EPI, Bizum/Blik, Revolut",
        speakers: [
          {
            name: "Piotrz Jan Pietrzak",
            position: "Representative, EPI",
          },
          {
            name: "Fernando Rodriguez Ferrer",
            position: "Representative, Bizum/Blik",
          },
        ],
      },
    ],
  },
  {
    title: "Panel 3: Will New Crypto Asset Regulations Undermine AML?",
    hours: "12:15 - 13:15",
    type: "talks",
    talks: [
      {
        title: "Anti-Money Laundering and Crypto Regulations",
        organization: "AMLA, Evrotrust, Teranode, ACSS, ACAMS",
        speakers: [
          {
            name: "Bruna Szego",
            position: "Chair, EU Anti-Money Laundering Authority",
          },
          {
            name: "Olivier Salles",
            position: "CEO, AMLA",
          },
          {
            name: "George Dimitrov",
            position: "CEO, Evrotrust",
          },
          {
            name: "Alexander Gora",
            position: "Head of Identity & Digital Trust, Teranode Group",
          },
          {
            name: "Saskia Rietbroek",
            position: "Sanctions Expert, ACSS",
          },
          {
            name: "Gregory Dellas",
            position: "President, ACAMS Cyprus",
          },
        ],
      },
    ],
  },
  {
    title: "Panel 4: Who is Going to Change the World of Payments?",
    hours: "14:15 - 15:00",
    type: "talks",
    talks: [
      {
        title: "Sovereignty in Payments – Do We Need It?",
        organization: "Unicredit, TBI Bank, EWPN, Iris Solutions, Finware",
        speakers: [
          {
            name: "Hristiyan Prashkov",
            position: "Senior Manager, Digital Channels, UniCredit Bulbank",
          },
          {
            name: "Merima Mahmutovic",
            position: "Chair, EWPN; FS Strategy, Southeast Europe",
          },
          {
            name: "Galya Dimitrova",
            position: "Co-Founder, Iris Solutions",
          },
          {
            name: "Cosmin Cosma",
            position:
              "Chairman, Finware; Founder, Romanian Fintech Association",
          },
          {
            name: "Tsvetomir Doskov",
            position: "SVP, Financial Industry",
          },
        ],
      },
    ],
  },
  {
    title: "Panel 5: Cards vs A2A",
    hours: "15:00 - 15:30",
    type: "debate",
    talks: [
      {
        title: "Cards vs Account-to-Account Payments",
        organization: "BORICA, Mastercard",
        speakers: [
          {
            name: "Radoslav Dimitrov",
            position: "Senior Director, Card Business, BORICA",
          },
          {
            name: "Vanya Manova",
            position: "Country Manager, Mastercard (BG, MK, AL, XK)",
          },
        ],
      },
    ],
  },
  {
    title: "Panel 6: Fintechs in Security Era / How to Earn the Customer",
    hours: "15:30 - 16:45",
    type: "talks",
    talks: [
      {
        title: "Cybersecurity and Trust in Fintech",
        organization: "Paysafe, Baker Tilly, Amatas, Fintech Associations",
        speakers: [
          {
            name: "Giacomo Ostin",
            position: "VP Product Compliance, Paysafe",
          },
          {
            name: "Anestis",
            position:
              "Director, Head of Digital & Risk Advisory, Baker Tilly SEE",
          },
          {
            name: "Boris Goncharov",
            position: "Cybersecurity Consultant, Amatas",
          },
          {
            name: "Valeri Valtchev",
            position: "Chairman, Bulgarian Fintech Association",
          },
          {
            name: "Nikola Scoric",
            position: "Board Member, Croatian Fintech Association",
          },
        ],
      },
    ],
  },
];
</script>

<template>
  <div>
    <h1>{{ $t("home.schedule.title") }}</h1>
  </div>
</template>

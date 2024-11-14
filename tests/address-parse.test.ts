import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";
import { addressParser } from "../src/parsers";

const usAddresses: string[] = [
  "1600 Pennsylvania Ave NW, Washington, DC 20500, USA",
  "1 Infinite Loop, Cupertino, CA 95014",
  "350 Fifth Avenue, New York, NY 10118",
  "1600 Amphitheatre Parkway, Mountain View, CA 94043",
  "233 S Wacker Dr, Chicago, IL 60606, US",
  "700 Broadway; New York, NY 10003",
  "2211 North First Street, San Jose, CA, 95131",
  "11 Wall St, New York, NY 10005",
  "500 S Buena Vista St, Burbank, CA 91521",
  "9500 Gilman Dr, La Jolla, CA 92093",
  "600 Montgomery St, San Francisco, CA 94111",
  "400 Broad St, Seattle, WA 98109",
  "1515 Broadway, New York, NY, 10036",
  "300 Post St; San Francisco, CA 94108",
  "1445 New York Ave NW, Washington, DC 20005",
  "500 Fifth Ave, New York, NY 10110",
  "350 Mission St, San Francisco, CA 94105",
  "2100 Southbridge Pkwy, Birmingham, AL 35209",
  "600 Pine St, Seattle, WA 98101",
  "5301 Tennyson Pkwy, Plano, TX 75024",
];

const ukAddresses: string[] = [
  "221B Baker St, Marylebone, London NW1 6XE, UK",
  "10 Downing Street, Westminster, London SW1A 2AA",
  "Buckingham Palace, London SW1A 1AA",
  "30 St Mary Axe, London EC3A 8EP",
  "Trafalgar Square; London WC2N 5DN",
  "50 Liverpool Street, London EC2M 7PY",
  "42 The Shambles, York YO1 7LX, United Kingdom",
  "University of Oxford, Oxford OX1 2JD",
  "The British Library, 96 Euston Rd, London NW1 2DB",
  "Manchester Town Hall, Albert Square, Manchester M60 2LA",
  "1 St. John's Lane, London EC1M 4AA",
  "20 Fenchurch St, London EC3M 8AF",
  "2 Queen Caroline St, Hammersmith, London W6 9DX",
  "Edinburgh Castle, Castlehill, Edinburgh EH1 2NG",
  "45 Victoria St, Bristol BS1 6AD, UK",
  "221 Pentonville Rd, London N1 9UZ",
  "100 Wood St, London EC2V 7AN",
  "The Shard, 32 London Bridge St, London SE1 9SG",
  "20 Queen Elizabeth St, London SE1 2PJ",
  "30 Gresham St, London EC2V 7PG",
];

const restOfWorld: string[] = [
  "1 Hacker Way, Menlo Park, CA 94025, USA",
  "1 Eplson Dr, Epsom 2103, Auckland, New Zealand",
  "20 Albert Street, Auckland 1010, New Zealand",
  "Champs-Élysées, 75008 Paris, France",
  "Brandenburger Tor, Pariser Platz, 10117 Berlin, Germany",
  "Stureplan 2, 114 35 Stockholm, Sweden",
  "Plaza Mayor, 28012 Madrid, Spain",
  "Rua Augusta, 1100-048 Lisbon, Portugal",
  "Level 39, 120 Collins St, Melbourne VIC 3000, Australia",
  "Pearl River Tower, 15 Zhujiang W Rd, Tianhe, Guangzhou, China",
  "60 Boulevard de la Croisette, 06400 Cannes, France",
  "Basilica di San Pietro, Vatican City",
  "Nicolás Avellaneda 2000, Buenos Aires, Argentina",
  "1 George St, Singapore 049145",
  "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
  "11 Wall St, Johannesburg 2001, South Africa",
  "Avenida Paulista, 1000 - Bela Vista, São Paulo, Brazil",
  "Zaha Hadid Tower, Milan, Italy",
  "Keizersgracht 174, 1016 DW Amsterdam, Netherlands",
  "Rathausplatz 1, 1010 Vienna, Austria",
];

describe("Parsing Addresses", () => {
  it("UK address resolves to correct country", () => {
    const parsed = addressParser(
      "221B Baker St, Marylebone, London NW1 6XE, UK",
    );

    expect(parsed.countryName).toBe("United Kingdom");
    expect(parsed.countryCode).toBe("GBR");
  });

  it("UK address resolves to correct street, city and state", () => {
    const parsed = addressParser(
      "221B Baker St, Marylebone, London NW1 6XE, UK",
    );

    expect(parsed.street, "Marylebone");
    expect(parsed.countryCode, "GBR");
  });
});

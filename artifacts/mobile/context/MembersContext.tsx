import React, { createContext, useContext, useState } from "react";

export interface Member {
  id: string;
  name: string;
  fatherName: string;
  akka: string;
  country: string;
  countryCode: string;
  countryFlag: string;
  city: string;
  qualification: string;
  phone: string;
  online: boolean;
  bio?: string;
}

const MOCK_MEMBERS: Member[] = [
  {
    id: "1",
    name: "Ramesh Kumar karwa",
    fatherName: "Govind Das karwa",
    akka: "karwa",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Karachi",
    qualification: "MBA – Textile Business",
    phone: "3001234567",
    online: true,
    bio: "Wholesale textile trader in Karachi's Bolton Market, third-generation Maheshwari merchant.",
  },
  {
    id: "2",
    name: "Rajesh langhani",
    fatherName: "Sarwan langhani",
    akka: "langhani",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Hyderabad",
    qualification: "MBBS – Physician",
    phone: "3009876543",
    online: false,
    bio: "Medical doctor practicing in Hyderabad, active in Maheshwari Medical Society camps.",
  },
  {
    id: "3",
    name: "Chandan Bachani",
    fatherName: "Madaan lal Bachani",
    akka: "Bachani",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Mithi",
    qualification: "B.Com – Gold Merchant",
    phone: "3452001234",
    online: true,
    bio: "Traditional gold market dealer in Mithi, Tharparkar. Family roots in Dhatki-Maheshwari heritage.",
  },
  {
    id: "4",
    name: "Naresh Kumar Ladhar",
    fatherName: "Ram Chand Ladhar",
    akka: "Ladhar",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Karachi",
    qualification: "LLB – Advocate",
    phone: "3211234000",
    online: true,
    bio: "Practicing lawyer and community rights advocate in Karachi.",
  },
  {
    id: "5",
    name: "Prem Ramchandani",
    fatherName: "Bhagwan Das Ramchandani",
    akka: "Ramchandani",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Hyderabad",
    qualification: "Engineering – IT Sector",
    phone: "3002345678",
    online: false,
    bio: "Software engineer, active member of Pak Global Maheshwaris Forum.",
  },
  {
    id: "6",
    name: "Govinda Manwani",
    fatherName: "Kirshan Manwnai",
    akka: "Manwani",
    country: "UAE",
    countryCode: "+971",
    countryFlag: "🇦🇪",
    city: "Dubai",
    qualification: "B.Com – Import/Export",
    phone: "501234567",
    online: true,
    bio: "Commodity import businessman based in Dubai, originally from Umerkot.",
  },
  {
    id: "7",
    name: "Deepak Rathi",
    fatherName: "Mahesh Rathi",
    akka: "Rathi",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Karachi",
    qualification: "MBA – Finance",
    phone: "3331234567",
    online: true,
    bio: "Corporate finance professional in Karachi. Patron of Maheshwari scholarship fund.",
  },
  {
    id: "8",
    name: "Anand Kumar Dedha",
    fatherName: "Suresh Dedha",
    akka: "Dedha",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Umerkot",
    qualification: "B.Sc Agriculture",
    phone: "3451234567",
    online: false,
    bio: "Community elder and farmer based in Umerkot, Sindh.",
  },
  {
    id: "9",
    name: "Mohan Lal Lakhani",
    fatherName: "Tulsi Das lakhani",
    akka: "Lakhani",
    country: "UK",
    countryCode: "+44",
    countryFlag: "🇬🇧",
    city: "London",
    qualification: "Chartered Accountant",
    phone: "7900123456",
    online: false,
    bio: "CPA in London. Contributes to Maheshwari scholarship programs for Pakistani students.",
  },
  {
    id: "10",
    name: "Sunil Lohia",
    fatherName: "Hari Das Lohia",
    akka: "Lohia",
    country: "Canada",
    countryCode: "+1",
    countryFlag: "🇨🇦",
    city: "Toronto",
    qualification: "MS – Computer Science",
    phone: "4161234567",
    online: true,
    bio: "Software developer in Toronto, originally from Karachi.",
  },
  {
    id: "11",
    name: "Rajkumar Kella",
    fatherName: "Omprakash Kella",
    akka: "Kella",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Tharparkar",
    qualification: "B.Ed – School Teacher",
    phone: "3190123456",
    online: false,
    bio: "Teacher at a private school in Tharparkar. Advocate of Maheshwari Vedic traditions.",
  },
  {
    id: "12",
    name: "Hemraj Panpalia",
    fatherName: "Tara Chand Panpalia",
    akka: "Panpalia",
    country: "UAE",
    countryCode: "+971",
    countryFlag: "🇦🇪",
    city: "Abu Dhabi",
    qualification: "Diploma – Healthcare",
    phone: "551234567",
    online: true,
    bio: "Healthcare professional in Abu Dhabi, originally from Hyderabad.",
  },
  {
    id: "13",
    name: "Kishanlal karmani",
    fatherName: "Nandlal Karmani",
    akka: "Karmani",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Karachi",
    qualification: "B.Com – Wholesale Trade",
    phone: "3050123456",
    online: true,
    bio: "Second-generation commodity trader in Karachi's wholesale markets.",
  },
  {
    id: "14",
    name: "Dilip Kumar Ladhar",
    fatherName: "Bhawani Das Ladhar",
    akka: "Ladhar",
    country: "USA",
    countryCode: "+1",
    countryFlag: "🇺🇸",
    city: "Houston",
    qualification: "PhD – Medicine",
    phone: "7131234567",
    online: false,
    bio: "Medical researcher in Houston. Supports free medical camps in Tharparkar.",
  },
  {
    id: "15",
    name: "Tarachand Harani",
    fatherName: "Devchand Harani",
    akka: "Harani",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Hyderabad",
    qualification: "BBA – Family Business",
    phone: "3001987654",
    online: true,
    bio: "Family business owner in Hyderabad. Active in Maheshwari Action Forum.",
  },
];

interface MembersContextType {
  members: Member[];
  searchMembers: (query: string, akka?: string | null) => Member[];
  getMember: (id: string) => Member | undefined;
  getAkkas: () => string[];
}

const MembersContext = createContext<MembersContextType | null>(null);

export function MembersProvider({ children }: { children: React.ReactNode }) {
  const [members] = useState<Member[]>(MOCK_MEMBERS);

  function searchMembers(query: string, akka?: string | null) {
    let result = akka ? members.filter((m) => m.akka === akka) : members;
    if (!query.trim()) return result;
    const q = query.toLowerCase();
    return result.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.akka.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.country.toLowerCase().includes(q) ||
        m.qualification.toLowerCase().includes(q)
    );
  }

  function getMember(id: string) {
    return members.find((m) => m.id === id);
  }

  function getAkkas() {
    return [...new Set(members.map((m) => m.akka))].sort();
  }

  return (
    <MembersContext.Provider value={{ members, searchMembers, getMember, getAkkas }}>
      {children}
    </MembersContext.Provider>
  );
}

export function useMembers() {
  const ctx = useContext(MembersContext);
  if (!ctx) throw new Error("useMembers must be used within MembersProvider");
  return ctx;
}

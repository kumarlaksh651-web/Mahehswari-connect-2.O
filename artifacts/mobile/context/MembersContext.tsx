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
    name: "Rajesh Kumar Mahajan",
    fatherName: "Suresh Kumar Mahajan",
    akka: "Mahajan",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Karachi",
    qualification: "MBA",
    phone: "3001234567",
    online: true,
    bio: "Business owner in Karachi, dealing in textiles.",
  },
  {
    id: "2",
    name: "Vinod Oswal",
    fatherName: "Ramesh Oswal",
    akka: "Oswal",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Lahore",
    qualification: "MBBS",
    phone: "3009876543",
    online: false,
    bio: "Medical doctor serving the community.",
  },
  {
    id: "3",
    name: "Suresh Agarwal",
    fatherName: "Mahesh Agarwal",
    akka: "Agarwal",
    country: "UAE",
    countryCode: "+971",
    countryFlag: "🇦🇪",
    city: "Dubai",
    qualification: "B.Com",
    phone: "501234567",
    online: true,
    bio: "Finance professional based in Dubai.",
  },
  {
    id: "4",
    name: "Dinesh Gupta",
    fatherName: "Harish Gupta",
    akka: "Gupta",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Islamabad",
    qualification: "Engineering",
    phone: "3211234567",
    online: true,
  },
  {
    id: "5",
    name: "Ramesh Khetan",
    fatherName: "Ganesh Khetan",
    akka: "Khetan",
    country: "UK",
    countryCode: "+44",
    countryFlag: "🇬🇧",
    city: "London",
    qualification: "CPA",
    phone: "7901234567",
    online: false,
    bio: "Chartered accountant in London.",
  },
  {
    id: "6",
    name: "Pramod Mahajan",
    fatherName: "Vijay Mahajan",
    akka: "Mahajan",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Hyderabad",
    qualification: "LLB",
    phone: "3331234567",
    online: true,
    bio: "Practicing lawyer in Hyderabad.",
  },
  {
    id: "7",
    name: "Ashok Garg",
    fatherName: "Mohan Garg",
    akka: "Garg",
    country: "Canada",
    countryCode: "+1",
    countryFlag: "🇨🇦",
    city: "Toronto",
    qualification: "IT",
    phone: "4161234567",
    online: false,
  },
  {
    id: "8",
    name: "Manoj Jain",
    fatherName: "Sanjay Jain",
    akka: "Jain",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Multan",
    qualification: "B.Sc",
    phone: "3451234567",
    online: true,
  },
  {
    id: "9",
    name: "Kishan Oswal",
    fatherName: "Bhagwan Oswal",
    akka: "Oswal",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Rawalpindi",
    qualification: "MBA",
    phone: "3120123456",
    online: false,
  },
  {
    id: "10",
    name: "Ravi Agarwal",
    fatherName: "Shyam Agarwal",
    akka: "Agarwal",
    country: "USA",
    countryCode: "+1",
    countryFlag: "🇺🇸",
    city: "Houston",
    qualification: "MS",
    phone: "7131234567",
    online: true,
    bio: "Software engineer in Houston.",
  },
  {
    id: "11",
    name: "Gopal Sharma",
    fatherName: "Ram Sharma",
    akka: "Sharma",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Quetta",
    qualification: "B.Ed",
    phone: "3191234567",
    online: false,
  },
  {
    id: "12",
    name: "Deepak Gupta",
    fatherName: "Devraj Gupta",
    akka: "Gupta",
    country: "UAE",
    countryCode: "+971",
    countryFlag: "🇦🇪",
    city: "Abu Dhabi",
    qualification: "Diploma",
    phone: "551234567",
    online: true,
  },
  {
    id: "13",
    name: "Santosh Mahajan",
    fatherName: "Prem Mahajan",
    akka: "Mahajan",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Faisalabad",
    qualification: "B.Com",
    phone: "3051234567",
    online: true,
  },
  {
    id: "14",
    name: "Naresh Jain",
    fatherName: "Tarachand Jain",
    akka: "Jain",
    country: "Pakistan",
    countryCode: "+92",
    countryFlag: "🇵🇰",
    city: "Sialkot",
    qualification: "BBA",
    phone: "3241234567",
    online: false,
    bio: "Exporter based in Sialkot.",
  },
  {
    id: "15",
    name: "Pawan Garg",
    fatherName: "Madan Garg",
    akka: "Garg",
    country: "Saudi Arabia",
    countryCode: "+966",
    countryFlag: "🇸🇦",
    city: "Riyadh",
    qualification: "BE",
    phone: "551234567",
    online: true,
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

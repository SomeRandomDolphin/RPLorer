import bcrypt from "bcrypt";
import env from "../config/LoacEnv";
import { AdminPermission } from "@prisma/client";

const SUPERADMIN: AdminPermission = "SUPERADMIN";

export const admins = [
  {
    name: "BPH Admin",
    email: "bph@mabacup2023.com",
    password: bcrypt.hashSync("xgGUaGbKxCygrpuZ", env.HASH_SALT),
    permission: SUPERADMIN,
    divisiId: 1,
  },
  {
    name: "Event Admin",
    email: "event@mabacup2023.com",
    password: bcrypt.hashSync("DpmXxTqPDtESjnSR", env.HASH_SALT),
    divisiId: 2,
  },
  {
    name: "Sponsorship Admin",
    email: "Sponsorship@mabacup2023.com",
    password: bcrypt.hashSync("XJwVYJCjdzUSwpUA", env.HASH_SALT),
    divisiId: 3,
  },
  {
    name: "Fundraising Admin",
    email: "fundraising@mabacup2023.com",
    password: bcrypt.hashSync("RzPmSECfndFqycNg", env.HASH_SALT),
    divisiId: 4,
  },
  {
    name: "Design Creative Admin",
    email: "design@mabacup2023.com",
    password: bcrypt.hashSync("nAGHjWTSURykVxxc", env.HASH_SALT),
    divisiId: 5,
  },
  {
    name: "Documentation Admin",
    email: "documentation@mabacup2023.com",
    password: bcrypt.hashSync("PuYHXXVuMJPTbCWr", env.HASH_SALT),
    divisiId: 6,
  },
  {
    name: "Dekorasi Admin",
    email: "dekorasi@mabacup2023.com",
    password: bcrypt.hashSync("AspDkUWEbBsGhrRC", env.HASH_SALT),
    divisiId: 7,
  },
  {
    name: "Social Media Marketing Admin",
    email: "sosmed@mabacup2023.com",
    password: bcrypt.hashSync("QfSvBhhkPxkamMwe", env.HASH_SALT),
    divisiId: 8,
  },
  {
    name: "Content Creator Admin",
    email: "contentcreator@mabacup2023.com",
    password: bcrypt.hashSync("DtpavrGTcTMzdbMA", env.HASH_SALT),
    divisiId: 9,
  },
  {
    name: "Public Relation Admin",
    email: "publicrelation@mabacup2023.com",
    password: bcrypt.hashSync("yGfSmgQskdnfqPPY", env.HASH_SALT),
    divisiId: 10,
  },
  {
    name: "Consumption Admin",
    email: "consumption@mabacup2023.com",
    password: bcrypt.hashSync("bAJMDzkuwRvvKVZj", env.HASH_SALT),
    divisiId: 11,
  },
  {
    name: "Security and License Admin",
    email: "securitylicense@mabacup2023.com",
    password: bcrypt.hashSync("qwrVZFFtvMfGMthb", env.HASH_SALT),
    divisiId: 12,
  },
  {
    name: "Equipment Admin",
    email: "equipment@mabacup2023.com",
    password: bcrypt.hashSync("SbysmkKzFPBjzsvk", env.HASH_SALT),
    divisiId: 13,
  },
  {
    name: "Kestari Admin",
    email: "kestari@mabacup2023.com",
    password: bcrypt.hashSync("CWvywfXMqQgAMPUF", env.HASH_SALT),
    divisiId: 14,
  },
  {
    name: "Web Development Admin",
    email: "webdev@mabacup2023.com",
    password: bcrypt.hashSync("mhcRYtTCejrSDnjd", env.HASH_SALT),
    divisiId: 15,
  },
  {
    name: "Medical Admin",
    email: "medical@mabacup2023.com",
    password: bcrypt.hashSync("mhcRYtTCejrSDnjd", env.HASH_SALT),
    divisiId: 16,
  },
];

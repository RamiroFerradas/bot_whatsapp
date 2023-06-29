import { User } from "../../models/User";
import { checkDolarChanges } from "./checkDolarChanges";
import { firstMessage } from "./firstMessage";
import { fridayMessage } from "./fridayMessage";
import { nigthMessage } from "./nigthMessage";
import { ramdomMessage } from "./ramdomMessage";
import { secondMessage } from "./seccondMessage";

const cron = require("node-cron");
const { ID_RAMIRO, ID_GABRIEL, ID_BUGGA, ID_SANTI } = process.env;

const usuarios: User[] = [
  {
    id: ID_RAMIRO || "",
    nombre: "Ramiro",
    ciudad: "Rafaela",
  },
  {
    id: ID_GABRIEL || "",
    nombre: "Gabriel",
    ciudad: "Salta",
  },
  {
    id: ID_BUGGA || "",
    nombre: "Matias",
    ciudad: "Rafaela",
  },
  {
    id: ID_SANTI || "",
    nombre: "Santiago",
    ciudad: "Buenos aires",
  },
];

export const automatizedFunctions = async () => {
  cron.schedule(
    "00 08 * * *",
    () => {
      firstMessage(usuarios);
    },
    { scheduled: true, timezone: "America/Buenos_Aires" }
  );

  cron.schedule(
    "00 12 * * *",
    () => {
      secondMessage(usuarios);
    },
    { scheduled: true, timezone: "America/Buenos_Aires" }
  );

  cron.schedule(
    "* * * * *",
    () => {
      checkDolarChanges(usuarios);
    },
    { scheduled: true, timezone: "America/Buenos_Aires" }
  );

  cron.schedule(
    "30 20 * * *",
    () => {
      ramdomMessage(usuarios);
    },
    {
      scheduled: true,
      timezone: "America/Buenos_Aires",
    }
  );

  cron.schedule(
    "00 10 * * *",
    () => {
      fridayMessage(usuarios);
    },
    {
      scheduled: true,
      timezone: "America/Buenos_Aires",
    }
  );
  cron.schedule(
    "45 23 * * * *",
    () => {
      nigthMessage(usuarios);
    },
    {
      scheduled: true,
      timezone: "America/Buenos_Aires",
    }
  );
};

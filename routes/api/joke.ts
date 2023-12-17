import { FreshContext } from "$fresh/server.ts";

// Jokes courtesy of https://punsandoneliners.com/randomness/programmer-jokes/
const JOKES = [
  "Why do Java developers often wear glasses? They can't C#.",
  "A SQL query walks into a bar, goes up to two tables and says “can I join you?”",
  "Wasn't hard to crack Forrest Gump's password. 1forrest1.",
  "I love pressing the F5 key. It's refreshing.",
  "Called IT support and a chap from Australia came to fix my network connection.  I asked “Do you come from a LAN down under?”",
  "There are 10 types of people in the world. Those who understand binary and those who don't.",
  "Why are assembly programmers often wet? They work below C level.",
  "My favourite computer based band is the Black IPs.",
  "What programme do you use to predict the music tastes of former US presidential candidates? An Al Gore Rhythm.",
  "An SEO expert walked into a bar, pub, inn, tavern, hostelry, public house.",
];

const kv = await Deno.openKv(
  "https://api.deno.com/databases/60a4d8ba-1b6e-4a78-a27f-d53b3246f808/connect",
);

export const handler = async (_req: Request, _ctx: FreshContext): Response => {
  const prefs = {
    username: "ada",
    theme: "dark",
    language: "en-US",
  };
  const result = await kv.set(["preferences", "joke"], prefs);
  console.log(result);
  const entry = await kv.get(["preferences", "ada"]);
  console.log(entry.key);
  console.log(entry.value);
  console.log(entry.versionstamp);

  const randomIndex = Math.floor(Math.random() * JOKES.length);
  const body = JOKES[randomIndex];
  return new Response(body);
};

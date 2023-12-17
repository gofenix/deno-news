Deno.cron("Run once a minute in ts", "* * * * *", () => {
  console.log("Hello, cron.ts!");
});

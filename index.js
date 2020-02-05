const { fillAllDay } = require("./intratime");

const dates = [
  "20-12-2019",
  "23-12-2019",
  "24-12-2019",
  "02-01-2020",
  "03-01-2020",
  "07-01-2020",
  "08-01-2020",
  "09-01-2020",
  "10-01-2020",
  "13-01-2020",
  "14-01-2020",
  "15-01-2020",
  "16-01-2020",
  "17-01-2020",
  "20-01-2020",
  "21-01-2020",
  "22-01-2020",
  "23-01-2020",
  "24-01-2020",
  "27-01-2020",
  "28-01-2020",
  "29-01-2020",
  "30-01-2020",
  "31-01-2020",
  "03-02-2020",
  "04-02-2020",
  "05-02-2020"
].map(str => {
  const [day, month, year] = str.split("-");
  return new Date(`${year}-${month}-${day}`);
});

const token = process.env.token;
async function processDate(idx) {
  if (idx === dates.length) return;
  try {
    await fillAllDay(token, dates[idx]);
    console.log(`${dates[idx].toJSON()} filled correctly`);
  } catch (e) {
    console.log(`Error while processing: ${dates[idx].toJSON()}`);
    throw e;
  }

  console.log("waiting 5 mins...");
  await new Promise(res => setTimeout(res, 300_000));
  await processDate(idx + 1);
}

processDate(0)
  .then(() => console.log("all good"))
  .catch(e => console.error(e.message));

import { memoize } from "../../functions/memoize";

async function fetchUser(id: number) {
  console.log("Fetching from API...", id);

  // simulate API delay
  await new Promise((res) => setTimeout(res, 1000));

  return { id, name: "Uer " + id };
}

const memoizedFetch = memoize(fetchUser);

async function run() {
  console.time("First");
  console.log(await memoizedFetch(1));
  console.timeEnd("First");

  console.time("Second");
  console.log(await memoizedFetch(1));
  console.timeEnd("Second");
}

run();

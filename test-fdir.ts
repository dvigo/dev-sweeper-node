import { fdir } from "fdir";
import path from "path";

async function test() {
  const crawler = new fdir()
    .withFullPaths()
    .onlyDirs()
    .exclude((dirName) => dirName === "node_modules")
    .filter((dirName) => dirName === "node_modules")
    .crawl(".");

  const result = await crawler.withPromise();
  console.log(result);
}

test().catch(console.error);

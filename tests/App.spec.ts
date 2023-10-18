import { test, expect } from "@playwright/test";



// /**
//   The general shapes of tests in Playwright Test are:
//     1. Navigate to a URL
//     2. Interact with the page
//     3. Assert something about the page against your expectations
//   Look for this pattern in the tests below!
//  */

test.beforeEach(async ({ page }) => {
  // ... you'd put it here.
  await page.goto("http://localhost:8000/");
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see an input bar", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  // await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  // await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  // TODO WITH TA: Fill this in!
  // await page.goto("http://localhost:8000/");
  await expect(page.getByRole("button")).toBeVisible();
});

test("after I click the button, its label increments", async ({ page }) => {
  // TODO WITH TA: Fill this in to test your button counter functionality!
  // await page.goto("http://localhost:8000/");
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(
    page.getByRole("button", { name: "Submitted 4 times" })
  ).toBeVisible();
});

// test("after I click the button, my command gets pushed", async ({ page }) => {
//   // TODO: Fill this in to test your button push functionality!
// });

test("Test csv data table is being produced", async ({ page }) => {
  // await page.goto("http://localhost:8000/"); 
  const mockInput = "load_file normal.csv";
  await page.getByLabel("Command input").fill(mockInput);

  await page.locator("button").click();
  await page.waitForTimeout(5000);
  await page.waitForSelector(".repl-history");
  const viewCommand = "view";
  await page.getByLabel("Command input").fill(viewCommand);
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.getByRole("cell", { name: "Tiffney" })).toBeVisible();
});

test("after entering mode command, history displays in verbose mode", async ({page,}) => {
  // await page.goto("http://localhost:8000");
  // Fill input with the "verbose" command
  const mode = "mode";
  await page.getByLabel("Command input").fill(mode);
  await page.locator("button").click();

  // Wait for the content to appear in the history
  await page.waitForSelector(".repl-history");

  // Make sure mode switched output is displayed
  await expect(page.locator(".repl-history")).toContainText("verbose");
  const viewCommand = "view";
  await page.getByLabel("Command input").fill(viewCommand);
  // Make sure the Command: Output: format of verbose is produced
  await expect(page.locator(".repl-history")).toContainText("Command:");

  //Switch back to brief
  const brief = "brief";
  await page.getByLabel("Command input").fill(brief);
  await page.locator("button").click();

  // Wait for the content to appear in the history
  await page.waitForSelector(".repl-history");

  // Make sure mode switched output is displayed
  await expect(page.locator(".repl-history")).toContainText("brief");

});

test("load file then load a second, then view make sure it’s the second one", async ({page,}) => {
  // await page.goto("http://localhost:8000");

  //Load CSV 1: doesn't have Alice
  const mockInput = "load_file price.csv";
  await page.getByLabel("Command input").fill(mockInput);
  await page.locator("button").click();
  await page.waitForTimeout(5000);
  await page.waitForSelector(".repl-history");

  // Load CSV2 : has Alice
  const mockInput2 = "load_file noHeader.csv";
  await page.getByLabel("Command input").fill(mockInput2);
  await page.locator("button").click();
  await page.waitForTimeout(5000);
  await page.waitForSelector(".repl-history");

  //Now view the file
  const viewCommand = "view";
  await page.getByLabel("Command input").fill(viewCommand);
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");

  await expect(page.getByRole("cell", { name: "Alice" })).toBeVisible();

});
//Error - No CSV Loaded!
test("search without first loading a file", async ({page,}) => {
  // await page.goto("http://localhost:8000");
  // Search command
  const mode = "search 2 blue";
  await page.getByLabel("Command input").fill(mode);
  await page.locator("button").click();

  // Wait for the content to appear in the history
  await page.waitForSelector(".repl-history");

  // Make sure error is thrown
  await expect(page.locator(".repl-history")).toContainText("Error - No CSV Loaded");

});

test("view without first loading a file", async ({page,}) => {
  // await page.goto("http://localhost:8000");
  // view command
  const mode = "view";
  await page.getByLabel("Command input").fill(mode);
  await page.locator("button").click();

  // Wait for the content to appear in the history
  await page.waitForSelector(".repl-history");

  // Make sure error is thrown 
  await expect(page.locator(".repl-history")).toContainText("Error - No CSV Loaded");

});

test("test that search results get displayed", async ({ page }) => {
  // await page.goto("http://localhost:8000/"); 
  const mockInput = "load_file gradeBook.csv";
  await page.getByLabel("Command input").fill(mockInput);
  await page.locator("button").click();
  await page.waitForTimeout(5000);

  await page.waitForSelector(".repl-history");

  const command = "search 2 B";
  await page.getByLabel("Command input").fill(command);
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.getByRole("cell", { name: "Charlie" })).toBeVisible();
});

test("test invalid search command", async ({ page }) => {
  // await page.goto("http://localhost:8000/"); 
  const mockInput = "load_file price.csv";
  await page.getByLabel("Command input").fill(mockInput);
  await page.locator("button").click();
  await page.waitForTimeout(5000);

  await page.waitForSelector(".repl-history");

  //Search for out of bound/ doesn't exist
  const command = "search Price 600";
  await page.getByLabel("Command input").fill(command);
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("Result");
});


test("test invalid filepath", async ({ page }) => {
  // await page.goto("http://localhost:8000/"); 
  const mockInput = "load_file cool.csv";
  await page.getByLabel("Command input").fill(mockInput);
  await page.locator("button").click();
  await page.waitForTimeout(5000);

  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("cool.csv not present");
});

test("try loading more than one csv at once", async ({page,}) => {
  // await page.goto("http://localhost:8000");
  // load command
  const mockInput = "load_file normal.csv price.csv";
  await page.getByLabel("Command input").fill(mockInput);
  await page.locator("button").click();
  await page.waitForTimeout(5000);

  // Wait for the content to appear in the history
  await page.waitForSelector(".repl-history");

  // Make sure error is thrown
  await expect(page.locator(".repl-history")).toContainText("Extra Args after loadCSV");

});
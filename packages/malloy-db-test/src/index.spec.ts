/* eslint-disable no-console */
/*
 * Copyright 2021 Google LLC
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * version 2 as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { RuntimeList } from "./runtimes";

// No prebuilt shared model, each test is complete.  Makes debugging easier.

const runtimes = new RuntimeList([
  "bigquery", //
]);

afterAll(async () => {
  await runtimes.closeAll();
});

runtimes.runtimeMap.forEach((runtime, databaseName) => {
  it(`basic index  - ${databaseName}`, async () => {
    const model = await runtime.loadModel(
      `
        source: airports is table('malloytest.airports') {
        }
    `
    );
    let result = await model.search("airports", "SANTA", 10);
    // if (result !== undefined) {
    //   console.log(result);
    // } else {
    //   console.log("no result");
    // }
    expect(result).toBeDefined();
    if (result !== undefined) {
      expect(result[0].fieldName).toBe("county");
      expect(result[0].fieldValue).toBe("SANTA ROSA");
      expect(result[0].weight).toBe(26);
      expect(result.length).toBe(10);
    }

    result = await model.search("airports", "SANTA A", 100, "city");
    if (result !== undefined) {
      console.log(result);
      expect(result[0].fieldName).toBe("city");
      expect(result[0].fieldValue).toBe("SANTA ANA");
    }
  });

  it(`index value map  - ${databaseName}`, async () => {
    const model = await runtime.loadModel(
      `
        source: airports is table('malloytest.airports') {
        }
    `
    );
    const result = await model.searchValueMap("airports");
    // if (result !== undefined) {
    //   console.log(result[4].values);
    // } else {
    //   console.log("no result");
    // }
    expect(result).toBeDefined();
    if (result !== undefined) {
      expect(result[4].values[0].fieldValue).toBe("WASHINGTON");
      expect(result[4].values[0].weight).toBe(214);
    }
  });

  // it(`fanned data index  - ${databaseName}`, async () => {
  //   const result = await runtime
  //     .loadModel(
  //       `
  //       source: movies is table('malloy-303216.imdb.movies') {
  //       }
  //   `
  //     )
  //     .search("movies", "Tom");
  //   // if (result !== undefined) {
  //   //   console.log(result);
  //   // } else {
  //   //   console.log("no result");
  //   // }
  //   expect(result).toBeDefined();
  //   if (result !== undefined) {
  //     expect(result[0].fieldName).toBe("county");
  //     expect(result[0].fieldValue).toBe("SANTA ROSA");
  //     expect(result[0].weight).toBe(26);
  //   }
  // });
});

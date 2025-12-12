/**
 * @author Marco Cantusci
 * @version 1.0.0
 * @date 2025-12-10
 * @fileoverview This program keeps track of car stats.
 */

// constants and variables
let odometer: number = 65000.0; // mileage of Car
let oilChangeKM: number = 65000.0; // value since the last oil change
let carColor: string = "Black"; // color of Car
const carModel: string = "Honda Civic"; // model of Car
let newMileage: number = 0.0; // new mileage amount
const gasCost: number[] = new Array(10); // cost of gas per fill up.
let gasIndex: number = 0;

// carsStats function(2)
function carStats(carModel: string, carColor: string, odometer: number, oilChangeKM: number): string {
  let stats = "";
  stats += `\nCar Model: ${carModel}`;
  stats += `\nCar Colour: ${carColor}`;
  stats += `\nOdometer: ${odometer}`;
  stats += `\nLast Oil Change: ${oilChangeKM} km`;
  return stats;
}

// wrapCar function(3)
function wrapCar(): string {
  const newColor = prompt("Enter a new color to wrap your car: ") ||
    ("\n");
  return newColor;
}

// drive function(4)
function drive(odometer: number, newMileage: number) {
  const randomKM = Math.floor(Math.random() * (1000 - 100 + 1) + 100);
  newMileage = odometer + randomKM;
  return randomKM;
}

// fillUp function(5)
function fillUp(gasCost: number[], gasIndex: number) {
  let loop: string = "yes";
  while (loop.toLowerCase() == "yes") {
    let priceString: string =
      prompt(`Cost to fill up gas ${gasIndex + 1}: $`) || "0";

    while (parseFloat(priceString) <= -1) {
      priceString = prompt("Invalid input! Please enter a positive number: ") ||
        "0";
    }

    const priceNumber: number = parseFloat(priceString);
    gasCost[gasIndex] = priceNumber;
    gasIndex++;

    loop = prompt("Add another fill up? (yes/no): ") || ("no");
    loop.toLowerCase();

    while (loop === null || loop !== "yes" && loop !== "no") {
      loop = prompt("Invalid input. Please enter 'yes' or 'no':") || ("no");
    }
  }

  return gasIndex;
}

// displayCostToFillUp function(6)
function displayCostToFillUp(gasCost: number[], gasIndex: number): number {
  let counting: number = 0;
  let total: number = 0;

  for (let counter = 0; counter < gasIndex; counter++) {
    console.log("\n");
    console.log(`Fill up ${counter + 1}: $${gasCost[counter]}`);
    total += gasCost[counter];
    counting++;
  }

  const average: number = total / counting;
  return average;
}

// oilChange function(7)
function oilChange(mileage: number, oilChangeKM: number): boolean {
  if ((mileage - oilChangeKM) >= 5000) {
    console.log("An oil change was done.");
    return true;
  } else {
    return false;
  }
}

// output
// print carStats
console.log("Initial Car Stats");
console.log(carStats(carModel, carColor, odometer, oilChangeKM));

// print drive function
const driven: number = drive(odometer, newMileage);
console.log(`You drove ${driven} km`);
odometer += driven;

// print oilChange function
if (oilChange(odometer, oilChangeKM)) {
  oilChangeKM = odometer;
} else {
  console.log("Your car does not need an oil change.");
}

// print wrapCar function
carColor = wrapCar();

// print fillUp function
gasIndex = fillUp(gasCost, gasIndex);

// print gas costs/average
console.log(`\nAverage cost to fill up gas: $${displayCostToFillUp(gasCost, gasIndex)}`);

// print updated car stats
console.log("\n", carStats(carModel, carColor, odometer, oilChangeKM));

console.log("\nDone.");

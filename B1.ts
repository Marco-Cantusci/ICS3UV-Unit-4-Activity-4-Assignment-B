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
function carStats(): string {
  let stats: string = "";
  stats += `\nCar Model: ${carModel}`;
  stats += `\nCar Colour: ${carColor}`;
  stats += `\nOdometer: ${odometer}`;
  stats += `\nLast Oil Change: ${oilChangeKM} km`;
  return stats;
}

// wrapCar function(3)
function wrapCar(): string {
  const newColor: string = prompt("Enter a new color to wrap your car: ") ||
    ("\n");
  return newColor;
}

// drive function(4)
function drive(): number {
  const randomKM: number = Math.floor(Math.random() * (1000 - 100 + 1) + 100);
  newMileage = odometer + randomKM;
  return randomKM;
}

// fillUp function(5)
function fillUp(): void {
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
}

// displayCostToFillUp function(6)
function displayCostToFillUp(): number {
  let total: number = 0;
  let counting: number = 0;

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
console.log(carStats());

// print drive function
console.log(`You drove ${drive()} km`);
odometer = newMileage;

// print oilChange function
if (oilChange(odometer, oilChangeKM)) {
  oilChangeKM = odometer;
} else {
  console.log("Your car does not need an oil change.");
}

// print wrapCar function
carColor = wrapCar();

// print fillUp function
fillUp();

// print gas costs/average
console.log(`\nAverage cost to fill up gas: $${displayCostToFillUp()}`);

// print updated car stats
console.log("\n", carStats());

console.log("\nDone.");

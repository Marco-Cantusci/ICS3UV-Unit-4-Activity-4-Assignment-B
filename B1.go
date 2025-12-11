/**
 * @author Marco Cantusci
 * @version 1.0.0
 * @date 2025-12-10
 * @fileoverview This program keeps track of car stats.
 */

package main

import (
	"bufio"
	"fmt"
	"math"
	"math/rand/v2"
	"os"
	"strconv"
	"strings"
)

// constants and variables
var odometer float64 = 65000.0        // mileage of Car
var oilChangeKM float64 = 65000.0     // value since the last oil change
var carColor string = "Black"         // color of Car
const carModel string = "Honda Civic" // model of Car
var newMileage float64 = 0.0          // new mileage amount
var gasCost [10]float64               // cost of gas per fill up.
var gasIndex int = 0

var reader = bufio.NewReader(os.Stdin)

// carsStats function(2)
func carStats() string {
	var stats string = ""
	stats += fmt.Sprintf("\nCar Model: %s", carModel)
	stats += fmt.Sprintf("\nCar Colour: %s", carColor)
	stats += fmt.Sprintf("\nOdometer: %.2f", odometer)
	stats += fmt.Sprintf("\nLast Oil Change: %.2f km", oilChangeKM)
	return stats
}

// wrapCar function(3)
func wrapCar() string {
	fmt.Print("Enter a new colour to wrap your car: ")
	color, _ := reader.ReadString('\n')
	color = strings.TrimSpace(color)

	if color == "" {
		return carColor
	}
	return color
}

// drive function(4)
func drive() float64 {
	var randomKM float64 = rand.Float64()
	randomKM = math.Floor(randomKM*901) + 100
	newMileage = odometer + randomKM
	return randomKM
}

// fillUp function(5)
func fillUp() {
	var loop string = "yes"

	for strings.ToLower(loop) == "yes" {
		fmt.Printf("Cost to fill up gas %d: $", gasIndex+1)
		priceString, _ := reader.ReadString('\n')
		priceString = strings.TrimSpace(priceString)
		priceNumber, _ := strconv.ParseFloat(priceString, 64)

		for priceNumber < 0 {
			fmt.Print("Invalid input! PLease enter a positive number: ")
			priceString, _ = reader.ReadString('\n')
			priceString = strings.TrimSpace(priceString)
			priceNumber, _ = strconv.ParseFloat(priceString, 64)
		}
		if gasIndex < len(gasCost) {
			gasCost[gasIndex] = priceNumber
			gasIndex++
		}

		fmt.Print("Add another fill up? (yes/no): ")
		loop, _ = reader.ReadString('\n')
		loop = strings.TrimSpace(loop)

		for loop != "yes" && loop != "no" {
			fmt.Print("Invalid input! Please enter 'yes' or 'no': ")
			loop, _ = reader.ReadString('\n')
			loop = strings.TrimSpace(loop)
		}
	}
}

// displayCostToFillUp function(6)
func displayCostToFillUp() float64 {
	var total float64 = 0.0
	var counting int = 0

	for counter := 0; counter < gasIndex; counter++ {
		fmt.Println()
		fmt.Printf("Fill up %d: $%.2f\n", counter+1, gasCost[counter])
		total += gasCost[counter]
		counting++
	}

	if counting == 0 {
		return 0
	}

	var average float64 = total / float64(counting)
	return average
}

// oilChange function(7)
func oilChange(mileage float64, lastOilChange float64) bool {
	if (mileage - lastOilChange) >= 5000 {
		fmt.Println("An oil change was done.")
		return true
	}
	return false
}

// output
func main() {

	// print carStats
	fmt.Println("Initial Car Stats")
	fmt.Println(carStats())

	// print drive function
	fmt.Printf("You drove %.0f km\n", drive())
	odometer = newMileage

	// print oilChange function
	if oilChange(odometer, oilChangeKM) {
		oilChangeKM = odometer
	} else {
		fmt.Println("Your car does not need an oil change.")
	}

	// print wrapCar function
	carColor = wrapCar()

	// print fillUp function
	fillUp()

	// print gas costs/average
	fmt.Printf("\nAverage cost to fill up gas: $%.2f\n", displayCostToFillUp())

	// print updated car stats
	fmt.Println("\nUpdated Car Stats")
	fmt.Println(carStats())

	fmt.Println("\nDone.")
}

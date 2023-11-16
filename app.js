// Importing core modules
const fs = require('fs');
const path = require('path');

// File path for the JSON data
const filePath = path.join(__dirname, 'hospitalData.json');

// Read the JSON file and parse the data
function readData() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write data to the JSON file
function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// GET operation - Retrieve all hospitals
function getAllHospitals() {
  return readData();
}

// POST operation - Add a new hospital
function addHospital(name, patientCount, location) {
  const hospitals = readData();
  const newHospital = { name, patientCount, location };
  hospitals.push(newHospital);
  writeData(hospitals);
  return newHospital;
}

// PUT operation - Update a hospital
function updateHospital(hospitalName, updatedData) {
  const hospitals = readData();
  const index = hospitals.findIndex(hospital => hospital.name === hospitalName);

  if (index !== -1) {
    hospitals[index] = { ...hospitals[index], ...updatedData };
    writeData(hospitals);
    return hospitals[index];
  }

  return null;
}

// DELETE operation - Remove a hospital
function deleteHospital(hospitalName) {
  const hospitals = readData();
  const updatedHospitals = hospitals.filter(hospital => hospital.name !== hospitalName);
  writeData(updatedHospitals);
  return updatedHospitals;
}

// Example usage
console.log('Initial Hospitals:', getAllHospitals());

const newHospital = addHospital('City Hospital', 150, 'New York');
console.log('Added Hospital:', newHospital);

const updatedHospital = updateHospital('City Hospital', { patientCount: 200 });
console.log('Updated Hospital:', updatedHospital);

const remainingHospitals = deleteHospital('City Hospital');
console.log('Remaining Hospitals:', remainingHospitals);

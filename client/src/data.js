export const getDatesArray = (start, end) => {
  let datesArray = [];
  let date = new Date(start);

  while (date <= end) {
    datesArray.push(new Date(date).toUTCString());
    date.setDate(date.getDate() + 1)
  }

  return datesArray.length;
}

// let startDate = new Date('2020-02-02');
// let endDate = new Date('2020-02-02')

// getDates(startDate, endDate);


export const data = [{
    id: 1,
    name: 'Panadol',
    numOFTablets: 2,
    numOfTimesPerDay: 2,
    start: "Sat Mar 14 2020",
    end: "Sat Mar 18 2020",
    completed: false
},
{
    id: 2,
    name: 'Vitamins',
    numOFTablets: 2,
    numOfTimesPerDay: 3,
    start: "Sat Mar 14 2020",
    end: "Sat Mar 14 2020",
    completed: false
},
{
  id: 3,
  name: 'Paracetamol',
  numOFTablets: 1,
  numOfTimesPerDay: 1,
  start: "Sat Mar 14 2020",
    end: "Sat Mar 20 2020",
  // duration: [], duration would be an array of Day objects
  completed: false
}]

const Day = {
  id: 3,
  date: '',
  name: '',
  morning: {
    takeDrug: true,
    taken: false
  },
  afternoon: {
    takeDrug: true,
    taken: false
  },
  night: {
    takeDrug: true,
    taken: false
  },
}

// option 2
const Day2 = {
  id: 3,
  date: '',
  name: '',
  morning: true,
  afternoon: null,
  night: true,
}


// Text Fields for AddPrescription
// Name of Drug
// Dosage
//   Number of Tablets
//   Number of Times Per Day
//   Start Date
//   End Date

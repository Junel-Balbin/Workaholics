const display = document.getElementById("motivato", "physical", "mental", "misc");


const motivation = [{
  quote: "COUGH",
  person: "LAY YOUR HEAD OFF THE EDGE OF THE BED AND SAY YOUR SICK"
}, {
  quote: "COVID",
  person: "JUST GOT BACK FROM VEGAS AND APPARENTLY WHAT SUPPOSED TO STAY IN VEGAS DIDN'T"
}, {
  quote: "DIZZINESS",
  person: "I FORGOT TO EAT LUNCH, THINK MY BLOOD SUGAR IS LOW."
}, {
  quote: "HEADACHE",
  person: "IVE BEEN THINKING ABOUT ABOUT WORKING, NOW I HAVE A HEADACHE!"
}, {
  quote: "TAKOTSUBO",
  person: "MY SIGNIFICANT OTHER LEFT ME, NOW I HAVE BROKEN HEART SYNDROME."
}];

const physical = [{
    quote1: "DUI",
    person1: "I DROVE BECAUSE I COULDN'T AFFORD ANOTHER PARKING TICKET."
  }, {
    quote1: "MVC",
    person1: "I GOT INTO AN ACCIDENT CALLING OFF FROM WORK."
  }, {
    quote1: "SKYDIVING",
    person1: "MY CHUTE DIDN'T OPEN BUT I'M OK BECAUSE I WAS WEARING MY HELMET."
  }, {
    quote1: "PLAYING FOOTBALL",
    person1: "I WAS ON MY PLAYSTATION AND I HURT MY THUMBS CATCHING A BALL."
  }, {
    quote1: "GOT INTO A FIGHT",
    person1: "MY DOG WOULDN'T LISTEN TO ME, SO WE ARGUED ALL NIGHT LONG."
  }];

  const mental = [{
    quote2: "GOING CRAZY",
    person2: "I DROVE BECAUSE I COULDN'T AFFORD ANOTHER PARKING TICKET."
  }, {
    quote2: "FEELING DOWN",
    person2: "I GOT INTO AN ACCIDENT CALLING OFF FROM WORK."
  }, {
    quote2: "I WAS PUT ON A HOLD",
    person2: "MY CHUTE DIDN'T OPEN BUT I'M OK BECAUSE I WAS WEARING MY HELMET."
  }, {
    quote2: "MENTAL RESTRICTIONS",
    person2: "I WAS ON MY PLAYSTATION AND I HURT MY THUMBS CATCHING A BALL."
  }, {
    quote2: "ANXIOUS",
    person2: "MY DOG WOULDN'T LISTEN TO ME, SO WE ARGUED ALL NIGHT LONG."
  }];

  const misc = [{
    quote3: "GOING CRAZY",
    person3: "MY INLAWS ARE OVER FOR THE MONTH. THEY ARE MAKING ME CRAZY."
  }, {
    quote3: "FEELING DOWN",
    person3: "I SAW MY PAYCHECK NOW IM SAD AND DEPRESSED."
  }, {
    quote3: "I WAS PUT ON A HOLD",
    person3: "I DONT KNOW WHAT A 5150 IS BUT I DO KNOW NOW."
  }, {
    quote3: "MENTAL RESTRICTIONS",
    person3: "I SAW MY PSYCHIATRIST AND HE TOLD ME TO DO ONLY THINGS I ENJOY, LIKE SLEEP."
  }, {
    quote3: "ANXIOUS",
    person3: "CALL THE POLICE, BECUASE MY MIND IS KILLING ME."
  }];
function motivateMe() {
  const listLength = motivation.length;
  const randVal = motivation[Math.floor(Math.random() * listLength)];
  display.innerHTML = `<q>${randVal.quote}</q><br><br><small>${randVal.person}</small>`;
}
function physicalMe() {
    const listLength = physical.length;
    const randVal = physical[Math.floor(Math.random() * listLength)];
    display.innerHTML = `<q>${randVal.quote1}</q><br><br><small>${randVal.person1}</small>`;
  }
  function mentalMe() {
    const listLength = mental.length;
    const randVal = mental[Math.floor(Math.random() * listLength)];
    display.innerHTML = `<q>${randVal.quote2}</q><br><br><small>${randVal.person2}</small>`;
  }

  function miscMe() {
    const listLength = misc.length;
    const randVal = misc[Math.floor(Math.random() * listLength)];
    display.innerHTML = `<q>${randVal.quote3}</q><br><br><small>${randVal.person3}</small>`;
  }
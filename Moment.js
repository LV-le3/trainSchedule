var config = {
    apiKey: "AIzaSyCS0BlinhecVMJDEiVmR8AShYcRY2xow4Y",
    authDomain: "trainschedule-124f5.firebaseapp.com",
    databaseURL: "https://trainschedule-124f5.firebaseio.com",
    projectId: "trainschedule-124f5",
    storageBucket: "trainschedule-124f5.appspot.com",
    messagingSenderId: "1011558789144"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-user").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#name-input").val().trim();
  var trainLocation = $("#location-input").val().trim();
  var trainTime = $("#time-input").val().trim();
  var trainMin = $("#min-input").val().trim();
   
    var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1,"years");
    console.log(firstTimeConverted);


    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

   
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

   
    var tRemainder = diffTime % trainMin;
    console.log(tRemainder);

    
    var tMinutesTillTrain = trainMin - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  var newInput = {
    name: trainName,
    location: trainLocation,
    time: trainTime,
    min: trainMin,
  };


  database.ref().push(newInput);

  console.log(newInput.name);
  console.log(newInput.location);
  console.log(newInput.time);
  console.log(newInput.min);


  $("#name-input").val("");
  $("#location-input").val("");
  $("#time-input").val("");
  $("#min-input").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainLocation = childSnapshot.val().location;
  var trainTime = childSnapshot.val().time;
  var trainMin = childSnapshot.val().min;


  console.log(trainName);
  console.log(trainLocation);
  console.log(trainTime);
  console.log(trainMin);

 $("#train-name").append("<tr><td>" + trainName +"</td></tr>");
 $("#destination").append("<tr><td>" + trainLocation +"</td></tr>");
 $("#frequency").append("<tr><td>" + trainMin +"</td></tr>");


});


	
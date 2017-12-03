  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD2W65Z9wUJGSIBtYULdSIN9Dn1a09iQMQ",
    authDomain: "train-scheduler-9a8c5.firebaseapp.com",
    databaseURL: "https://train-scheduler-9a8c5.firebaseio.com",
    projectId: "train-scheduler-9a8c5",
    storageBucket: "",
    messagingSenderId: "878333236906"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  $('form').on('submit', function(event){
    

    var train_name = $('#name').val().trim();
    var destination = $('#destination').val().trim();
    var first_train_time = $('#first_train_time').val().trim();
    var frequency = $('#frequency').val().trim();

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("HH:mm"));

    var timeConverted = moment(first_train_time, "HH:mm").subtract(1,"years");
    var diffTime = moment().diff(moment(timeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var display_next_arrival = moment(nextTrain).format("HH:mm");


    database.ref().push({
      name: train_name,
      destination: destination,
      first_train_time: first_train_time,
      frequency: frequency,
      next_arrival: display_next_arrival,
      minutes_away: tMinutesTillTrain,
    });
  });


  database.ref().on("child_added", function(childSnapshot){

    var row = $('<tr class=data_row>');
    row.append('<td>' + childSnapshot.val().name + '</td>');
    row.append('<td>' + childSnapshot.val().destination + '</td>');
    row.append('<td>' + childSnapshot.val().frequency + '</td>');
    row.append('<td>' + childSnapshot.val().next_arrival + '</td>');
    row.append('<td>' + childSnapshot.val().minutes_away + '</td>');

    $('tbody').append(row);


  });







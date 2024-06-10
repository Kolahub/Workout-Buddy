const Workout = require("../Models/workoutsModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;

  try {
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    console.log(workouts);
    res.status(200).json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get a single workout-
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such Workout" });
  }

  res.status(200).json(workout);
};

//create a workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const user_id = req.user._id;
  console.log(req.body);

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }

  if (!reps) {
    emptyFields.push("reps");
  }
  console.log(emptyFields);

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({
        error: "please fill in all the fields",
        emptyFields: emptyFields,
      });
  }

  // add doc to db
  try {
    const workout = await Workout.create({ title, load, reps, user_id });
    console.log(workout);
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findByIdAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

//upadate a workout
const updateWorkout = async (req, res) => {
  const { id } = res.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};

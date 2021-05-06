const express = require("express");
const StudentModel = require("../Model/StudentModel");
const mongoose = require("mongoose");

exports.AddStudent = (req, res) => {
  const { name, age, marks } = req.body;
  const student = new StudentModel({
    name,
    age,
    marks
  });
  student
    .save()
    .then(() => {
      return res.status(201).json({
        message: "Saved"
      });
    })
    .catch(e => {
      return res.status(400).json({
        error: e
      });
    });
};

const bubbleSort = array => {
  var done = false;
  while (!done) {
    //if false then continue
    done = true; //suppose array is already sorted
    for (var i = 1; i < array.length; i++) {
      //24 > 23
      if (array[i - 1].age > array[i].age) {
        done = false;
        var tmp = array[i - 1]; //tmp-->a[0] 24
        array[i - 1] = array[i]; //a[0]-->23
        array[i] = tmp; //a[1]->24
      }
    }
  }

  return array;
};

exports.GetStudent = (req, res) => {
  StudentModel.find({})
    .then(data => {
      let result = [];
      if (data && data.length > 0) {
        result = bubbleSort(data);
      }

      return res.status(200).json({ result });
    })
    .catch(e => {
      return res.status(400).json({
        error: e
      });
    });
};

exports.GetTotalMarksStudent = (req, res) => {
  StudentModel.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$marks"
        }
      }
    },
    {
      $project: {
        total: 1,
        _id: 0
      }
    }
  ])
    .then(data => {
      return res
        .status(200)
        .json({ total: data.length > 0 ? data[0].total : 0 });
    })
    .catch(e => {
      return res.status(400).json({
        error: e
      });
    });
};

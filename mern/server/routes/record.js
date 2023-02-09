const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/comment").get(function(req, res) {
    let db_connect = dbo.getDb("myDatabase");
    db_connect.collection("comments").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/comment/:id").get(function(req, res) {
    let db_connect = dbo.getDb("myDatabase");
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect.collection("comments").findOne
    (myquery, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/comment/add").post(function(req, response){
    let db_connect = dbo.getDb("myDatabase");
    let myobj = {
        _id: ObjectId(req.body.id),
        // _id: req.body.id,
        user: req.body.user,
        contents: req.body.contents
    };
    db_connect.collection("comments").insertOne(myobj, function(err, res){
        if (err) throw err;
        response.json(res);
    });
});

recordRoutes.route("/comment/update/:id").post(function(req, response){
    let db_connect = dbo.getDb("myDatabase");
    let myquery = {_id: ObjectId(req.params.id)};
    let newValues = {
        $set: {
            user: req.body.user,
            contents: req.body.contents,
        }
    };
    db_connect.collection("comments").updateOne
    (myquery , newValues, function(err, res){
        if (err) throw err;
        response.json(res);
    });
});

recordRoutes.route("/comment/delete/:id").delete(function(req, response){
    let db_connect = dbo.getDb("myDatabase");
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect.collection("comments").deleteOne(myquery
    , function(err, res){
        if (err) throw err;
        response.json(res);
    });
});

recordRoutes.route("/comment/clear").delete(function(req, response){
    let db_connect = dbo.getDb("myDatabase");
    db_connect.collection("comments").deleteMany({}, function(err, res){
        if (err) throw err;
        response.json(res);
    });
});



recordRoutes.route("/drinks").get(function(req, res) {
    let db_connect = dbo.getDb("myDatabase");
    db_connect.collection("drinks").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});


recordRoutes.route("/drinks/clear").delete(function(req, response){
    let db_connect = dbo.getDb("myDatabase");
    db_connect.collection("drinks").deleteMany({}, function(err, res){
        if (err) throw err;
        response.json(res);
    });
});


recordRoutes.route("/drinks/upload").post(function(req, res) {
    let db_connect = dbo.getDb("myDatabase");
    let drinks = req.body;
    db_connect.collection("drinks").insertMany(drinks, function(err, result) {
    if (err) throw err;
        res.json({ message: "Drinks successfully added to the database" });
    });
});


recordRoutes.route("/drinks/add").post(function(req, response){
    let db_connect = dbo.getDb("myDatabase");
    let myobj = {
        strDrink: req.body.strDrink,
        strAlcoholic: req.body.strAlcoholic,
        strGlass: req.body.strGlass,
        strInstructions: req.body.strInstructions,
        strDrinkThumb: req.body.strDrinkThumb,
        strRating: [],
        strIngredients: req.body.strIngredients,
        strMeasures: req.body.strMeasures,
    };
    db_connect.collection("drinks").insertOne(myobj, function(err, res){
        if (err) throw err;
        response.json(res);
    });
});


recordRoutes.route("/drinks/delete/:id").delete(function(req, response){
    let db_connect = dbo.getDb("myDatabase");
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect.collection("drinks").deleteOne(myquery
    , function(err, res){
        if (err) throw err;
        response.json(res);
    });
});


recordRoutes.route("/drinks/:id").get(function(req, res) {
    let db_connect = dbo.getDb("myDatabase");
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect.collection("drinks").findOne
    (myquery, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/drinks/update/:id").post(function(req, response){
    let db_connect = dbo.getDb("myDatabase");
    let myquery = {_id: ObjectId(req.params.id)};
    let newValues = {
        $set: {
            strDrink: req.body.strDrink,
            strAlcoholic: req.body.strAlcoholic,
            strGlass: req.body.strGlass,
            strInstructions: req.body.strInstructions,
            strDrinkThumb: req.body.strDrinkThumb,
            strRating: req.body.strRating,
            strIngredients: req.body.strIngredients,
            strMeasures: req.body.strMeasures,
        }
    };
    db_connect.collection("drinks").updateOne
    (myquery
    , newValues, function(err, res){
        if (err) throw err;
        response.json(res);
    });
});


recordRoutes.route("/drinks/:id/average_rating").get(function(req, res) {
    let db_connect = dbo.getDb("myDatabase");
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect.collection("drinks").findOne
    (myquery, function(err, result) {
        if (err) throw err;
        let rating = result.strRating;
        let sum = 0;
        for (let i = 0; i < rating.length; i++) {
            sum += parseInt(rating[i], 10);
        }
        let avg = sum / rating.length;
        res.json(avg);
    });
});


recordRoutes.route("/drinks/:id/rating/add").post(function(req, response){
    let db_connect = dbo.getDb("myDatabase");
    let myquery = {_id: ObjectId(req.params.id)};
    let newValues = {
        $push: {
            strRating: req.body.strRating,
        }
    };
    db_connect.collection("drinks").updateOne
    (myquery
    , newValues, function(err, res){
        if (err) throw err;
        response.json(res);
    });
});


recordRoutes.route("/drinkscount").get(function (req, res) {
    let db_connect = dbo.getDb("myDatabase");
    db_connect
      .collection("drinks")
      .countDocuments({})
      .then(function (count) {
        res.json(count);
      })
      .catch(function (err) {
        throw err;
      });
  });
  
recordRoutes.route("/drinksalcoholic").get(function (req, res) {
    let db_connect = dbo.getDb("myDatabase");
    db_connect
      .collection("drinks")
      .countDocuments({ strAlcoholic: "Alcoholic" })
      .then(function (count) {
        res.json(count);
      })
      .catch(function (err) {
        throw err;
      });
  });


recordRoutes.route("/mostrateddrinks").get(function (req, res) {
    let db_connect = dbo.getDb("myDatabase");
    db_connect
        .collection("drinks")
        .aggregate([
            {
                $unwind: "$strRating"
            },
            
            {
                $group: {
                    _id: "$strDrink",
                    count: {
                        $sum: 1
                    }
                }    
            },
            {
                $sort: { count: -1 },
            },
            {
                $limit: 5,
            },
        ]).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
});


recordRoutes.route("/drinksingredients").get(function (req, res) {
    let db_connect = dbo.getDb("myDatabase");
    db_connect
        .collection("drinks")
        .aggregate([
            {
                $unwind: "$strIngredients"
            },
            {
                $group: {
                    _id: "$strIngredients",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: { count: -1 },
            },
            {
                $limit: 5,
            },
        ]).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/drinksglass").get(function (req, res) {
    let db_connect = dbo.getDb("myDatabase");
    db_connect
        .collection("drinks")
        .aggregate([
            {
                $group: {
                    _id: "$strGlass",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: { count: -1 },
            },
            {
                $limit: 5,
            },
        ]).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
});

  
recordRoutes.route("/drinksrecipemax").get(function (req, res) {
    let db_connect = dbo.getDb("myDatabase");
    db_connect
      .collection("drinks")
      .aggregate([
        {
          $project: {
            length: { $strLenCP: "$strInstructions" },
          },
        },
        {
          $sort: { length: -1 },
        },
        {
          $limit: 1,
        },
      ])
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});
  
recordRoutes.route("/drinksrecipemin").get(function (req, res) {
    let db_connect = dbo.getDb("myDatabase");
    db_connect
      .collection("drinks")
      .aggregate([
        {
          $project: {
            length: { $strLenCP: "$strInstructions" },
          },
        },
        {
          $sort: { length: 1 },
        },
        {
          $limit: 1,
        },
      ])
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });
  
recordRoutes.route("/drinksrecipeavg").get(function (req, res) {
    let db_connect = dbo.getDb("myDatabase");
    db_connect
      .collection("drinks")
      .aggregate([
        {
          $project: {
            length: { $strLenCP: "$strInstructions" },
          },
        },
        {
          $group: {
            _id: null,
            avg: { $avg: "$length" },
          },
        },
      ])
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

recordRoutes.route("/drinksingredientsmax").get(function (req, res) {
    let db_connect = dbo.getDb("myDatabase");
    db_connect
        .collection("drinks")
        .aggregate([
            {
                $project: {
                    length: { $size: "$strIngredients" },
                },
            },
            {
                $sort: { length: -1 },
            },
            {
                $limit: 1,
            },
        ]).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
});


recordRoutes.route("/drinksingredientsmin").get(function (req, res) {
    let db_connect = dbo.getDb("myDatabase");
    db_connect
        .collection("drinks")
        .aggregate([
            {
                $project: {
                    length: { $size: "$strIngredients" },
                },
            },
            {
                $sort: { length: 1 },
            },
            {
                $limit: 1,
            },
        ]).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/drinksingredientsavg").get(function (req, res) {
    let db_connect = dbo.getDb("myDatabase");
    db_connect
        .collection("drinks")
        .aggregate([
            {
                $project: {
                    length: { $size: "$strIngredients" },
                },
            },
            {
                $group: {
                    _id: null,
                    avg: { $avg: "$length" },
                },
            },
        ]).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
});


module.exports = recordRoutes;

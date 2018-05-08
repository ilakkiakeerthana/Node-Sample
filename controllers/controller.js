
var MongoClient = require('mongodb').MongoClient;
const dbConfig = require('../config.js');
var logging = require(dbConfig.PATH+'/log/logging');
const Utilities = require(dbConfig.PATH+'/Utilities/utilities.js');
var Users = require(dbConfig.PATH+'/models/usermodel'); 

/*exports.insert = (req, res, next) => {
    logging.info('Inside Insert Function 1');
    //console.log(req.photo);
    new Promise(function(resolve,reject){
    var user = new Users(
    {
        firstname:req.query.firstname, 
        lastname:req.query.lastname,
        emailid:req.query.emailid,
        phoneNumber:req.query.phoneNumber,
        password:Utilities.encrypt(req.query.password),
        role:req.query.role,
       // file:req.files.file.path
    });
    logging.info('Inside Insert Function 2');
    resolve(user);
    logging.info('Inside Insert Function 3');
    }).then((user)=>{
        logging.info('Inside Insert Function 4');
    user.save().then(function (err) {
        logging.info('Inside Insert Function 5');
    if (err) { return next(err); }
    logging.info('Inside Insert Function'+JSON.stringify(user));
    res.json({'message':'Inserted Successfully'});
    });
  });
}; */
    
exports.insert = (req, res) => {
    logging.info('Inside Insert Function');
    var userobj= {
        //userid:req.query.userid, // req.body.userid for POST method
        firstname:req.query.firstname, 
        lastname:req.query.lastname,
        emailid:req.query.emailid,
        phoneNumber:req.query.phoneNumber,
        password:Utilities.encrypt(req.query.password),
        role:req.query.role,
       // file:req.files.file.path
    }

   
    MongoClient.connect(dbConfig.url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("User");
      dbo.collection("UserData").insertOne(userobj, function(err, response) {
        if (err) {
            logging.error('Failed to Insert'+JSON.stringify(userobj));
            throw err};
        res.json({"message": "Inserted Successfully ."});
        db.close();
      });
    }); 
    logging.info('Inside Insert Function'+JSON.stringify(userobj));
};

exports.index = (req, res) => {
    const path=dbConfig.PATH+ "/view/head.html"
    logging.info(`Inside Index Function Redirect to${path}`);
    res.sendFile(path);
};

exports.add = (req, res) => {
    const path=dbConfig.PATH+ "/view/index.html";
    logging.info(`Inside Index Function Redirect to${path}`);
    res.sendFile(path);
};

exports.getData = (req, res) => {
    logging.info('Inside getData Function');
    MongoClient.connect(dbConfig.url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("User");
        dbo.collection("UserData").find({}).toArray(function(err, result) {
            if (err) throw err;
            logging.info('User Detail Retrived successfully');
            res.json(result);
            //console.log(res.query.firstname);
            db.close();
          });
      }); 
};

exports.updateIndex = (req, res) => {
    const path=dbConfig.PATH+ "/view/update.html";
    logging.info(`Inside updateIndex Function Redirect to${path}`);
    res.sendFile(path);
};
exports.deleteIndex = (req, res) => {
    const path=dbConfig.PATH+ "/view/delete.html";
    logging.info(`Inside deleteIndex Function Redirect to${path}`);
    res.sendFile(path);
};

exports.delete = (req, res) => {
    MongoClient.connect(dbConfig.url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("User");
        var myquery = { firstname: req.query.firstname};
        dbo.collection("UserData").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          logging.info('User Detail Deleted successfully');
          res.json({"message": "Deleted Successfully ."});
          db.close();
        });
      }); 
};

exports.update = (req, res) => {
MongoClient.connect(dbConfig.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("User");
    var myquery = { userid: req.query.userid};
    var newvalues = {
        $set:{
        firstname:req.query.firstname,
        lastname:req.query.lastname,
        password:req.query.password,
        emailid:req.query.emailid
        }
    }
    dbo.collection("UserData").updateOne(myquery, newvalues, function(err, re) {
      if (err) throw err;
      logging.info('User Detail Updated successfully');
      res.json({"message": "Updated Successfully ."});
      db.close();
    });
  }); 
}

exports.loginpage = (req, res) => {
    const path=dbConfig.PATH+ "/view/login.html";
    logging.info(`Inside login Function Redirect to${path}`);
    res.sendFile(path);
};

exports.login = (req, res) => {
    MongoClient.connect(dbConfig.url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("User");
        var myquery = { firstname: req.query.firstname,
                        password: req.query.password
                        };
      
        dbo.collection("UserData").findOne(myquery, function(err, re){
          if (err) throw err;
          logging.info('Successfully login');
          //res.json(re);
         /* if(re.stringify(req.query.firstname) == null){
            console.log(re + "null");
          }else{*/
            const path=dbConfig.PATH+ "/view/head.html"
            logging.info(`Inside Index Function Redirect to${path}`);
            res.sendFile(path);
          //}
          db.close();
        });
      }); 
}
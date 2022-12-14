const express = require('express');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@get api/profile/me,
//@access Private, 
//@desc get current users profile
router.get('/me', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']);
  
      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }
  
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

//@post api/profile,
//@access Private, 
//@desc create and update users profile
router.post('/', [
    auth, 
    [
        check('status', 'Status is required')
        .not()
        .isEmpty(),
        check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
], 
async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    }=req.body;
    
    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
    console.log(profileFields.skills);

    //build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(facebook) profileFields.social.facebook = facebook;
    try{
      //req.user.id comes through authentication, id populated by db
      let profile = await Profile.findOne({user: req.user.id});

      //Update proile
      if(profile){ 
        profile = await Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true}
      );
    return res.json(profile);
    }
    //create profile
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
    }
    catch(err){
      console.error(err.message);
      res.status(500).message("Server Error");
    }
})
module.exports = router;
